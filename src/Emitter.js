import Event from './Event';
import {clearListeners, regexpEqual} from './utils';
import isString from 'lodash.isstring';
import isFunction from 'lodash.isfunction';
import isNil from 'lodash.isnil';

/**
 * a simple event emitter
 */
export default class Emitter{
	constructor(){
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
	static getEventMap(emitter){
		let map = this.events || (this.events = new WeakMap());
		return map.get(emitter);
	}

	/**
	 * creates a new Map for the emitter
	 * @param {Emitter} emitter
	 * @return {WeakMap}
	 */
	static createEventMap(emitter){
		let map = this.events || (this.events = new WeakMap());
		let events = new Map();
		map.set(emitter, events);
		return events;
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
	 * @param  {RegExp|String|Event} type
	 * @param  {Function} func - the function to be called when the event fires
	 * @param  {*} [ctx] - the context to run the function under
	 * @param  {Boolean} [removable=true] - whether this listener can be removed without force
	 * @return {this}
	 */
	on(type, func, ctx, removable = true){
		if(isNil(type))
			throw new Error('Emitter.on requires a String or a RegExp as the first argument');

		if(!isFunction(func))
			throw new Error('Emitter.on requires a function as the second argument');

		let eventMap = this.eventMap;
		if(!eventMap)
			eventMap = Emitter.createEventMap(this);

		if(type instanceof Event)
			type = type.type;

		if(!eventMap.has(type))
			eventMap.set(type, []);

		eventMap.get(type).push({
			func: func,
			ctx: ctx,
			once: false,
			removable: removable
		});
		return this;
	}

	/**
	 * binds a listener that removes its self once the event is fired
	 * @param  {RegExp|String|Event} type
	 * @param  {Function} func
	 * @param  {*} [ctx] - the context to run the functions under
	 * @return {this}
	 *
	 * TODO: make once() accept a "removable" flag 15/4/17
	 */
	once(type, func, ctx){
		if(isNil(type))
			throw new Error('Emitter.once requires a String or a RegExp as the first argument');

		if(!isFunction(func))
			throw new Error('Emitter.once requires a function as the second argument');

		let eventMap = this.eventMap;
		if(!eventMap)
			eventMap = Emitter.createEventMap(this);

		if(type instanceof Event)
			type = type.type;

		if(!eventMap.has(type))
			eventMap.set(type, []);

		eventMap.get(type).push({
			func: func,
			ctx: ctx,
			once: true,
			removable: true
		});
		return this;
	}

	/**
	 * removes a listener
	 * NOTE: this dose not take a "force" flag, since to remove a listener through this method you have to provide the exact type, function, and ctx
	 * @param  {RegExp|String|Event} type
	 * @param  {Function} func - this has to be the exact function that was bound
	 * @param  {*} [ctx] - this has to be the exact context that was bound with the listener
	 * @return {this}
	 */
	off(type, func, ctx){
		let eventMap = this.eventMap;
		let eventType = type;

		// if there is not event map, just exit
		if(!eventMap)
			return this;

		if(eventType instanceof Event)
			eventType = type.type;

		if(!eventMap.has(eventType))
			eventMap.set(eventType, []);

		if(isString(type)){
			let listeners = eventMap.get(eventType);
			listeners.forEach((listener, i) => {
				// done bother about force in this situation, because the user provied the exact type, function, and ctx
				if(listener.func === func && ctx === listener.ctx)
					listeners.splice(i,1);
			});

			// remove the listener array if there are no listeners left
			if(listeners.length === 0)
				eventMap.delete(eventType);
		}
		else if(eventType instanceof RegExp){
			eventMap.forEach((listeners, listenersEventType) => {
				// if the regexp flags and source match then remove the listeners
				if(listenersEventType instanceof RegExp && regexpEqual(eventType, listenersEventType)){
					listeners.forEach((listener, i) => {
						if(listener.func === func && ctx === listener.ctx)
							listeners.splice(i,1);
					});

					// remove the listener array if there are no listeners left
					if(listeners.length === 0)
						eventMap.delete(listenersEventType);
				}
			})
		}

		return this;
	}

	/**
	 * fires ad event on this emitter
	 * @param {String|Event} type
	 * @param {...*} args - the arguments to be passed to the listeners
	 * @return {this}
	 */
	emit(type, ...args){
		if(this.suppressEvents) return;
		let eventMap = this.eventMap;
		let event;

		// if there is not event map, just exit
		if(!eventMap)
			return this;

		// if its an event use the events type
		if(type instanceof Event)
			event = type;
		else
			event = new Event(type, this, args);

		let listenerArgs = Array.from(args).concat([event]);
		eventMap.forEach((listeners, listenersEventType) => {
			if(
				// if they are both strings and they match
				(isString(event.type) && listenersEventType === event.type) ||
				// if the listenersEventType is a RegExp and the event type is a string, see if they match
				(isString(event.type) && listenersEventType instanceof RegExp && listenersEventType.test(event.type)) ||
				// if they are both RegExp see if they match
				(event.type instanceof RegExp && listenersEventType instanceof RegExp && regexpEqual(listenersEventType, event.type))
			){
				listeners.forEach(listener => {
					listener.func.apply(listener.ctx, listenerArgs);
					if(listener.once)
						this.off(event.type, listener.func, listener.ctx);
				});
			}
		});

		return this;
	}

	/**
	 * removes all events of "type"
	 * NOTE: passing no arguments will clean all listens
	 * NOTE: passing a single boolean will clear all listens and act as the force flag
	 * @param {RegExp|String|Event|Boolean} [type] - the type of event
	 * @param {Boolean} [force = false] - whether to force remove the listeners
	 * @param {Boolean} [useRegExp = true] - whether to use the RegExp to test other types
	 * @return {this}
	 */
	clear(type, force = false, useRegExp = true){
		let eventMap = this.eventMap;
		let eventType = type;

		// if there is not event map, just exit
		if(!eventMap)
			return this;

		if(isString(eventType)){
			clearListeners(eventMap, eventType, force);
		}
		else if(eventType instanceof Event){
			this.clear(eventType.type, useRegExp, force);
		}
		else if(eventType instanceof RegExp){
			Array.from(eventMap).map(a => a[0]).forEach(listenersEventType => {
				if(
					// if the string matches the regex
					(isString(listenersEventType) && useRegExp && eventType.test(listenersEventType)) ||
					// if the regex(s) match
					(listenersEventType instanceof RegExp && regexpEqual(listenersEventType, eventType))
				){
					clearListeners(eventMap, listenersEventType, force);
				}
			})
		}
		else if(eventType === true){
			eventMap.clear();
		}
		else if(eventType === false || eventType === undefined){
			eventMap.forEach((listeners, type) => {
				listeners.filter(listener => listener.removable).forEach(listener => {
					listeners.splice(listeners.indexOf(listener), 1);
				});

				// if there are not listeners left, remove array
				if(listeners.length === 0)
					eventMap.delete(type);
			});
		}

		return this;
	}

	/**
	 * returns the number of listeners bound to the event
	 * @param  {RegExp|String|Event} [type]
	 * @param {Boolean} [useRegExp] - whether to use the RegExp to test other types
	 * @return {Boolean}
	 */
	count(type, useRegExp = true){
		let eventMap = this.eventMap;
		let eventType = type;

		// if there is not event map, just exit
		if(!eventMap)
			return 0;

		if(isString(eventType)){
			return eventMap.has(eventType) ? eventMap.get(eventType).length : 0;
		}
		else if(eventType instanceof Event){
			return eventMap.has(eventType.type) ? eventMap.get(eventType.type).length : 0;
		}
		else if(eventType instanceof RegExp){
			let total = 0;
			eventMap.forEach((listeners, listenersEventType) => {
				if(isString(listenersEventType) && useRegExp && eventType.test(listenersEventType))
					total += listeners.length;
				else if(regexpEqual(listenersEventType, eventType))
					total += listeners.length;
			});
			return total;
		}
		else{
			let total = 0;
			eventMap.forEach((listeners, eventType) => {
				total += listeners.length;
			});
			return total;
		}
	}
}
