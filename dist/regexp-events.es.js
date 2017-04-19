/**
 * @classdesc the basic event class
 * @class Event
 */
class Event{
	/**
	 * @param  {String} type - the type of event, this can be anything, but its a good idea just to make it a string
	 * @param  {Emitter} target - the emitter that is firing this event
	 * @param  {Array} data - an array of arguments that is used on the listener functions
	 * @return {Event}
	 */
	constructor(type, target, data){
		/**
		 * the type of event, this can be anything, but its a good idea to to make it a string
		 * @type {String}
		 */
		this.type = type;

		/**
		 * a reference to the emitter that fired the event
		 * @type {Emitter}
		 */
		this.target = target;

		/**
		 * an array of arguments that are used when calling the listener function
		 * @type {Array}
		 */
		this.data = data;
	}
}

function clearListeners(eventMap, eventType, force){
	if(force)
		eventMap.delete(eventType);
	else{
		let listeners = eventMap.get(eventType);
		listeners.filter(listener => listener.removable).forEach((listener, i) => {
			listeners.splice(listeners.indexOf(listener), 1);
		});

		// if there are not listeners left, remove the array
		if(listeners.length === 0)
			eventMap.delete(eventType);
	}
}

function regexpEqual(r1, r2){
	return (
		r1 instanceof RegExp &&
		r2 instanceof RegExp &&
		r2.source === r1.source &&
		r2.global === r1.global &&
		r2.ignoreCase === r1.ignoreCase &&
		r2.multiline === r1.multiline &&
		r2.sticky === r1.sticky &&
		r2.unicode === r1.unicode
	);
}

/**
 * lodash 4.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

var index = isString;

/**
 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString$1 = objectProto$1.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array constructors, and
  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString$1.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

var index$1 = isFunction;

/**
 * lodash 4.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

var index$2 = isNil;

/**
 * a simple event emitter
 */
class Emitter{
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
		if(index$2(type))
			throw new Error('Emitter.on requires a String or a RegExp as the first argument');

		if(!index$1(func))
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
		if(index$2(type))
			throw new Error('Emitter.once requires a String or a RegExp as the first argument');

		if(!index$1(func))
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

		if(index(type)){
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
			});
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
				(index(event.type) && listenersEventType === event.type) ||
				// if the listenersEventType is a RegExp and the event type is a string, see if they match
				(index(event.type) && listenersEventType instanceof RegExp && listenersEventType.test(event.type)) ||
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

		if(index(eventType)){
			clearListeners(eventMap, eventType, force);
		}
		else if(eventType instanceof Event){
			this.clear(eventType.type, useRegExp, force);
		}
		else if(eventType instanceof RegExp){
			Array.from(eventMap).map(a => a[0]).forEach(listenersEventType => {
				if(
					// if the string matches the regex
					(index(listenersEventType) && useRegExp && eventType.test(listenersEventType)) ||
					// if the regex(s) match
					(listenersEventType instanceof RegExp && regexpEqual(listenersEventType, eventType))
				){
					clearListeners(eventMap, listenersEventType, force);
				}
			});
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

		if(index(eventType)){
			return eventMap.has(eventType) ? eventMap.get(eventType).length : 0;
		}
		else if(eventType instanceof Event){
			return eventMap.has(eventType.type) ? eventMap.get(eventType.type).length : 0;
		}
		else if(eventType instanceof RegExp){
			let total = 0;
			eventMap.forEach((listeners, listenersEventType) => {
				if(index(listenersEventType) && useRegExp && eventType.test(listenersEventType))
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

export { Emitter, Event };
//# sourceMappingURL=regexp-events.es.js.map
