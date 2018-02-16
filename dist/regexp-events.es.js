/**
 * regexp-events v1.0.0
 * built Tue Feb 13 2018 19:24:32 GMT-0600 (CST)
 */
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

var lodash_isstring = isString;

/**
 * @classdesc the basic event class
 * @class Event
 */
class Event {
	/**
	 * @param  {String} type - the type of event, this can be anything, but its a good idea just to make it a string
	 * @param  {Emitter} target - the emitter that is firing this event
	 * @param  {Array} args - an array of arguments that is used on the listener functions
	 * @return {Event}
	 */
	constructor(type, args, target) {
		if (!lodash_isstring(type)) throw new Error("Event.type has to be a string");

		/**
		 * the type of event
		 * @type {String}
		 */
		this.type = type;

		/**
		 * an array of arguments that are used when calling the listener function
		 * @type {Array}
		 */
		this.args = args || [];

		/**
		 * a reference to the emitter that fired the event
		 * @type {Emitter}
		 */
		this.target = target;
	}
}

function clearListeners(eventMap, eventType, force) {
	if (force) {
		eventMap.delete(eventType);
	} else {
		let listeners = eventMap.get(eventType);
		listeners.filter(listener => !listener.isStatic).forEach((listener, i) => {
			listeners.splice(listeners.indexOf(listener), 1);
		});

		// if there are not listeners left, remove the array
		if (listeners.length === 0) eventMap.delete(eventType);
	}
}

function isRegExpEqual(r1, r2) {
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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]';
var funcTag = '[object Function]';
var genTag = '[object GeneratorFunction]';
var nullTag = '[object Null]';
var proxyTag = '[object Proxy]';
var undefinedTag = '[object Undefined]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto$1.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$1.toString;

/** Built-in value references. */
var Symbol = root.Symbol;
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString$1(value);
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
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
  return value != null && (type == 'object' || type == 'function');
}

var lodash_isfunction = isFunction;

var lodash_isregexp = createCommonjsModule(function (module, exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var regexpTag = '[object RegExp]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `exports`. */
var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * The base implementation of `_.isRegExp` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 */
function baseIsRegExp(value) {
  return isObject(value) && objectToString.call(value) == regexpTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
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

/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
 * @example
 *
 * _.isRegExp(/abc/);
 * // => true
 *
 * _.isRegExp('/abc/');
 * // => false
 */
var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

module.exports = isRegExp;
});

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
class Emitter {
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
		if (!lodash_isstring(eventType) && !lodash_isregexp(eventType) && !(eventType instanceof Event))
			throw new Error("Emitter.on requires a String, Event or RegExp as the first argument");

		if (!lodash_isfunction(listener)) throw new Error("Emitter.on requires a function as the second argument");

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

		if (!lodash_isfunction(listener)) throw new Error("Emitter.off requires a function as the second argument");

		force = findInArgArray(arguments, isBoolean, 2, false);
		context = findInArgArray(arguments, o => typeof o === "object", 2, undefined);

		if (eventType instanceof Event) eventType = eventType.type;

		let eventMap = this.eventMap;
		if (!eventMap) return this; // if there is not event map, just exit

		if (!eventMap.has(eventType)) eventMap.set(eventType, []);

		if (lodash_isstring(eventType)) {
			let listeners = eventMap.get(eventType);
			listeners.forEach((listenerData, i) => {
				if (listenerData.func === listener && listenerData.ctx === context && (listenerData.isStatic ? force : true))
					listeners.splice(i, 1);
			});

			// remove the listener array if there are no listeners left
			if (listeners.length === 0) eventMap.delete(eventType);
		} else if (lodash_isregexp(eventType)) {
			eventMap.forEach((listeners, listenersEventType) => {
				// if the regexp flags and source match then remove the listeners
				if (lodash_isregexp(listenersEventType) && isRegExpEqual(eventType, listenersEventType)) {
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
		} else if (lodash_isstring(eventType)) event = new Event(eventType, args, this);
		else throw new Error("Emitter.emit requires a String or Event as the first argument");

		let listenerArgs = Array.from(event.args).concat([event]);
		eventMap.forEach((listeners, listenersEventType) => {
			if (
				// if they are both strings and they match
				(lodash_isstring(event.type) && listenersEventType === event.type) ||
				// if the listenersEventType is a RegExp and the event type is a string, see if they match
				(lodash_isstring(event.type) && lodash_isregexp(listenersEventType) && listenersEventType.test(event.type)) ||
				// if they are both RegExp see if they match
				(lodash_isregexp(event.type) && lodash_isregexp(listenersEventType) && isRegExpEqual(listenersEventType, event.type))
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

		if (lodash_isstring(eventType)) {
			clearListeners(eventMap, eventType, force);
		} else if (eventType instanceof Event) {
			clearListeners(eventMap, eventType.type, force);
		} else if (lodash_isregexp(eventType)) {
			Array.from(eventMap)
				.map(a => a[0])
				.forEach(listenersEventType => {
					if (
						// if the string matches the regex
						(lodash_isstring(listenersEventType) && useRegExp && eventType.test(listenersEventType)) ||
						// if the regex(s) match
						(lodash_isregexp(listenersEventType) && isRegExpEqual(listenersEventType, eventType))
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

		if (lodash_isstring(eventType)) {
			return eventMap.has(eventType) ? eventMap.get(eventType).length : 0;
		} else if (eventType instanceof Event) {
			return eventMap.has(eventType.type) ? eventMap.get(eventType.type).length : 0;
		} else if (lodash_isregexp(eventType)) {
			let total = 0;
			eventMap.forEach((listeners, listenersEventType) => {
				if (
					// if the string matches the regex
					(lodash_isstring(listenersEventType) && useRegExp && eventType.test(listenersEventType)) ||
					// if the regex(s) match
					(lodash_isregexp(listenersEventType) && isRegExpEqual(listenersEventType, eventType))
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

export { Emitter, Event };
//# sourceMappingURL=regexp-events.es.js.map
