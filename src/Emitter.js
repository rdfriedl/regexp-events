import Event from "./Event";
import { clearListeners, isRegExpEqual } from "./utils";
import isString from "lodash.isstring";
import isFunction from "lodash.isfunction";
import isRegExp from "lodash.isregexp";

function isBoolean(v) {
	return v === true || v === false;
}

function findInArgArray(args, fn, start, df) {
	for (let i = 0; i < args.length - start; i++) if (fn(args[start + i])) return args[start + i];

	return df;
}

/**
 * a simple event emitter
 */
export default class Emitter {
	constructor() {
		/**
		 * whether to suppress all events on this emitter
		 * @type {Boolean}
		 */
		this.suppressEvents = false;
	}

	/**
	 * returns the Map that is used to store events for emitters
	 * @param {Emitter} emitter
	 * @return {WeakMap}
	 */
	static getEventMap(emitter) {
		let map = this.events || (this.events = new WeakMap());
		return map.get(emitter);
	}

	/**
	 * creates a new Map for the emitter
	 * @param {Emitter} emitter
	 * @return {Map}
	 */
	static createEventMap(emitter) {
		let map = this.events || (this.events = new WeakMap());
		let events = new Map();
		map.set(emitter, events);
		return events;
	}

	/**
	 * creates a new Map for the emitter
	 * @param {Emitter} emitter
	 * @return {Map}
	 */
	static removeEventMap(emitter) {
		let map = this.events || (this.events = new WeakMap());
		if (map.has(emitter)) map.delete(emitter);
	}

	/**
	 * returns the Map used to store events
	 * @return {Map}
	 */
	get eventMap() {
		return Emitter.getEventMap(this);
	}

	/**
	 * listens for an event of this emitter
	 * @param  {RegExp|String|Event} eventType
	 * @param  {Function} listener - the function to be called when the event fires
	 * @param  {Object|Boolean|Number} [context] - the context to run the function under
	 * @param  {Boolean|Number|Object} [isStatic=true] - whether this listener can be removed without force
	 * @param  {Number|Boolean|Object} [times=Infinity] the times this listener can be called before it removes it self
	 * @return {this}
	 */
	on(eventType, listener, context, isStatic, times) {
		if (!isString(eventType) && !isRegExp(eventType) && !(eventType instanceof Event))
			throw new Error("Emitter.on requires a String, Event or RegExp as the first argument");

		if (!isFunction(listener)) throw new Error("Emitter.on requires a function as the second argument");

		isStatic = findInArgArray(arguments, isBoolean, 2, false);
		times = findInArgArray(arguments, n => Number.isFinite(n) || n === Infinity, 2, Infinity);
		context = findInArgArray(
			arguments,
			o => {
				return typeof o === "object";
			},
			2,
			undefined,
		);

		let eventMap = this.eventMap;
		if (!eventMap) eventMap = Emitter.createEventMap(this);

		if (eventType instanceof Event) eventType = eventType.type;

		if (!eventMap.has(eventType)) eventMap.set(eventType, []);

		// add the listener to the array
		eventMap.get(eventType).push({
			func: listener,
			ctx: context,
			times: times,
			isStatic: isStatic,
		});
		return this;
	}

	/**
	 * binds a listener that removes its self once the event is fired
	 * @param  {RegExp|String|Event} eventType
	 * @param  {Function} listener
	 * @param  {Object|Boolean} [context] - the context to run the functions under
	 * @param  {Boolean|Object} [isStatic = false] - whether this listener can be removed without using force
	 * @return {this}
	 */
	once(eventType, listener, context, isStatic) {
		return this.on(eventType, listener, 1, context, isStatic);
	}

	/**
	 * removes a listener
	 * @param  {RegExp|String|Event} eventType
	 * @param  {Function} listener - this has to be the exact function that was bound
	 * @param  {*|Boolean} [context] - this has to be the exact context that was bound with the listener
	 * @param  {Boolean} [force=false] - whether to force remove the listeners
	 * @return {this}
	 */
	off(eventType, listener, context, force) {
		if (eventType == null) throw new Error("Emitter.off requires a String or a RegExp as the first argument");

		if (!isFunction(listener)) throw new Error("Emitter.off requires a function as the second argument");

		force = findInArgArray(arguments, isBoolean, 2, false);
		context = findInArgArray(arguments, o => typeof o === "object", 2, undefined);

		if (eventType instanceof Event) eventType = eventType.type;

		let eventMap = this.eventMap;
		if (!eventMap) return this; // if there is not event map, just exit

		if (!eventMap.has(eventType)) eventMap.set(eventType, []);

		if (isString(eventType)) {
			let listeners = eventMap.get(eventType);
			listeners.forEach((listenerData, i) => {
				if (listenerData.func === listener && listenerData.ctx === context && (listenerData.isStatic ? force : true))
					listeners.splice(i, 1);
			});

			// remove the listener array if there are no listeners left
			if (listeners.length === 0) eventMap.delete(eventType);
		} else if (isRegExp(eventType)) {
			eventMap.forEach((listeners, listenersEventType) => {
				// if the regexp flags and source match then remove the listeners
				if (isRegExp(listenersEventType) && isRegExpEqual(eventType, listenersEventType)) {
					listeners.forEach((listenerData, i) => {
						if (
							listenerData.func === listener &&
							listenerData.ctx === context &&
							(listenerData.isStatic ? force : true)
						)
							listeners.splice(i, 1);
					});

					// remove the listener array if there are no listeners left
					if (listeners.length === 0) eventMap.delete(listenersEventType);
				}
			});
		}

		return this;
	}

	/**
	 * fires ad event on this emitter
	 * @param {String|Event} eventType
	 * @param {...*} args - the arguments to be passed to the listeners. these will be ignored if an Event was passed in
	 * @return {this}
	 */
	emit(eventType, ...args) {
		if (this.suppressEvents) return;
		let eventMap = this.eventMap;
		let event;

		// if there is not event map, just exit
		if (!eventMap) return this;

		// if its an event use the events type
		if (eventType instanceof Event) {
			event = eventType;

			// if the event dose not have a target set it to this emitter
			if (event.target === undefined) event.target = this;
		} else if (isString(eventType)) event = new Event(eventType, args, this);
		else throw new Error("Emitter.emit requires a String or Event as the first argument");

		let listenerArgs = Array.from(event.args).concat([event]);
		eventMap.forEach((listeners, listenersEventType) => {
			if (
				// if they are both strings and they match
				(isString(event.type) && listenersEventType === event.type) ||
				// if the listenersEventType is a RegExp and the event type is a string, see if they match
				(isString(event.type) && isRegExp(listenersEventType) && listenersEventType.test(event.type)) ||
				// if they are both RegExp see if they match
				(isRegExp(event.type) && isRegExp(listenersEventType) && isRegExpEqual(listenersEventType, event.type))
			) {
				listeners.forEach(listener => {
					listener.func.apply(listener.ctx, listenerArgs);
					if (--listener.times <= 0) this.off(event.type, listener.func, listener.ctx, true);
				});
			}
		});

		return this;
	}

	/**
	 * removes all events of "eventType"
	 * NOTE: passing no arguments will clean all listeners
	 * NOTE: passing a single boolean will clear all listens and act as the force flag
	 * @param {RegExp|String|Event|Boolean} [eventType] - the type of event
	 * @param {Boolean} [force = false] - whether to force remove the listeners
	 * @param {Boolean} [useRegExp = true] - whether to use the RegExp to test other types
	 * @return {this}
	 */
	clear(eventType, force = false, useRegExp = true) {
		let eventMap = this.eventMap;

		// if there is no event map, just exit
		if (!eventMap) return this;

		if (isString(eventType)) {
			clearListeners(eventMap, eventType, force);
		} else if (eventType instanceof Event) {
			clearListeners(eventMap, eventType.type, force);
		} else if (isRegExp(eventType)) {
			Array.from(eventMap)
				.map(a => a[0])
				.forEach(listenersEventType => {
					if (
						// if the string matches the regex
						(isString(listenersEventType) && useRegExp && eventType.test(listenersEventType)) ||
						// if the regex(s) match
						(isRegExp(listenersEventType) && isRegExpEqual(listenersEventType, eventType))
					) {
						clearListeners(eventMap, listenersEventType, force);
					}
				});
		} else if (arguments.length === 1 && eventType === true) {
			// remove all listeners
			eventMap.clear();
		} else if ((eventType === false || eventType === undefined) && arguments.length <= 1) {
			// remove all listeners that are not static
			eventMap.forEach((listeners, type) => {
				listeners.filter(listener => !listener.isStatic).forEach(listener => {
					listeners.splice(listeners.indexOf(listener), 1);
				});

				// if there are no listeners left, remove the array
				if (listeners.length === 0) eventMap.delete(type);
			});
		}

		return this;
	}

	/**
	 * returns the number of listeners bound to the event
	 * @param  {RegExp|String|Event} [eventType]
	 * @param {Boolean} [useRegExp] - whether to use the RegExp to test other types
	 * @return {Boolean}
	 */
	count(eventType, useRegExp = true) {
		let eventMap = this.eventMap;

		// if there is not event map, just exit
		if (!eventMap) return 0;

		if (isString(eventType)) {
			return eventMap.has(eventType) ? eventMap.get(eventType).length : 0;
		} else if (eventType instanceof Event) {
			return eventMap.has(eventType.type) ? eventMap.get(eventType.type).length : 0;
		} else if (isRegExp(eventType)) {
			let total = 0;
			eventMap.forEach((listeners, listenersEventType) => {
				if (
					// if the string matches the regex
					(isString(listenersEventType) && useRegExp && eventType.test(listenersEventType)) ||
					// if the regex(s) match
					(isRegExp(listenersEventType) && isRegExpEqual(listenersEventType, eventType))
				) {
					total += listeners.length;
				}
			});
			return total;
		} else {
			let total = 0;
			eventMap.forEach(listeners => {
				total += listeners.length;
			});
			return total;
		}
	}

	/**
	 * cleans up the emitter for GC
	 */
	dispose() {
		Emitter.removeEventMap(this);
		return this;
	}
}
