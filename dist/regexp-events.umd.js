/**
 * regexp-events v0.1.1
 * built Thu Apr 20 2017 20:18:14 GMT-0500 (Central Daylight Time)
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('regexp-events', ['exports'], factory) :
	(factory((global.RegExpEvents = global.RegExpEvents || {})));
}(this, (function (exports) { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/**
 * @classdesc the basic event class
 * @class Event
 */
var Event =
/**
 * @param  {String} type - the type of event, this can be anything, but its a good idea just to make it a string
 * @param  {Emitter} target - the emitter that is firing this event
 * @param  {Array} data - an array of arguments that is used on the listener functions
 * @return {Event}
 */
function Event(type, target, data) {
	classCallCheck(this, Event);

	/**
  * the type of event
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
};

function clearListeners(eventMap, eventType, force) {
	if (force) eventMap.delete(eventType);else {
		var listeners = eventMap.get(eventType);
		listeners.filter(function (listener) {
			return listener.removable;
		}).forEach(function (listener, i) {
			listeners.splice(listeners.indexOf(listener), 1);
		});

		// if there are not listeners left, remove the array
		if (listeners.length === 0) eventMap.delete(eventType);
	}
}

function isRegExpEqual(r1, r2) {
	return r1 instanceof RegExp && r2 instanceof RegExp && r2.source === r1.source && r2.global === r1.global && r2.ignoreCase === r1.ignoreCase && r2.multiline === r1.multiline && r2.sticky === r1.sticky && r2.unicode === r1.unicode;
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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$3 = createCommonjsModule(function (module, exports) {
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

/**
 * a simple event emitter
 */

var Emitter = function () {
	function Emitter() {
		classCallCheck(this, Emitter);

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


	createClass(Emitter, [{
		key: 'on',


		/**
   * listens for an event of this emitter
   * @param  {RegExp|String|Event} type
   * @param  {Function} func - the function to be called when the event fires
   * @param  {*} [ctx] - the context to run the function under
   * @param  {Boolean} [removable=true] - whether this listener can be removed without force
   * @return {this}
   */
		value: function on(type, func, ctx) {
			var removable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

			if (index$2(type)) throw new Error('Emitter.on requires a String or a RegExp as the first argument');

			if (!index$1(func)) throw new Error('Emitter.on requires a function as the second argument');

			var eventMap = this.eventMap;
			if (!eventMap) eventMap = Emitter.createEventMap(this);

			if (type instanceof Event) type = type.type;

			if (!eventMap.has(type)) eventMap.set(type, []);

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
   * TODO: make once() accept a "removable" flag
   */

	}, {
		key: 'once',
		value: function once(type, func, ctx) {
			if (index$2(type)) throw new Error('Emitter.once requires a String or a RegExp as the first argument');

			if (!index$1(func)) throw new Error('Emitter.once requires a function as the second argument');

			var eventMap = this.eventMap;
			if (!eventMap) eventMap = Emitter.createEventMap(this);

			if (type instanceof Event) type = type.type;

			if (!eventMap.has(type)) eventMap.set(type, []);

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
   *
   * TODO add force flag to Emitter.off
   */

	}, {
		key: 'off',
		value: function off(type, func, ctx) {
			var eventMap = this.eventMap;
			var eventType = type;

			// if there is not event map, just exit
			if (!eventMap) return this;

			if (eventType instanceof Event) eventType = eventType.type;

			if (!eventMap.has(eventType)) eventMap.set(eventType, []);

			if (index(eventType)) {
				var listeners = eventMap.get(eventType);
				listeners.forEach(function (listener, i) {
					// done bother about force in this situation, because the user provied the exact type, function, and ctx
					if (listener.func === func && ctx === listener.ctx) listeners.splice(i, 1);
				});

				// remove the listener array if there are no listeners left
				if (listeners.length === 0) eventMap.delete(eventType);
			} else if (index$3(eventType)) {
				eventMap.forEach(function (listeners, listenersEventType) {
					// if the regexp flags and source match then remove the listeners
					if (index$3(listenersEventType) && isRegExpEqual(eventType, listenersEventType)) {
						listeners.forEach(function (listener, i) {
							if (listener.func === func && ctx === listener.ctx) listeners.splice(i, 1);
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
   * @param {String|Event} type
   * @param {...*} args - the arguments to be passed to the listeners. these will be ignored if an Event was passed in
   * @return {this}
   */

	}, {
		key: 'emit',
		value: function emit(type) {
			var _this = this;

			if (this.suppressEvents) return;
			var eventMap = this.eventMap;
			var event = void 0;

			// if there is not event map, just exit
			if (!eventMap) return this;

			// if its an event use the events type

			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (type instanceof Event) event = type;else event = new Event(type, this, args);

			var listenerArgs = Array.from(event.data || args).concat([event]);
			eventMap.forEach(function (listeners, listenersEventType) {
				if (
				// if they are both strings and they match
				index(event.type) && listenersEventType === event.type ||
				// if the listenersEventType is a RegExp and the event type is a string, see if they match
				index(event.type) && index$3(listenersEventType) && listenersEventType.test(event.type) ||
				// if they are both RegExp see if they match
				index$3(event.type) && index$3(listenersEventType) && isRegExpEqual(listenersEventType, event.type)) {
					listeners.forEach(function (listener) {
						listener.func.apply(listener.ctx, listenerArgs);
						if (listener.once) _this.off(event.type, listener.func, listener.ctx, true);
					});
				}
			});

			return this;
		}

		/**
   * removes all events of "type"
   * NOTE: passing no arguments will clean all listeners
   * NOTE: passing a single boolean will clear all listens and act as the force flag
   * @param {RegExp|String|Event|Boolean} [type] - the type of event
   * @param {Boolean} [force = false] - whether to force remove the listeners
   * @param {Boolean} [useRegExp = true] - whether to use the RegExp to test other types
   * @return {this}
   */

	}, {
		key: 'clear',
		value: function clear(type) {
			var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var useRegExp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			var eventMap = this.eventMap;
			var eventType = type;

			// if there is not event map, just exit
			if (!eventMap) return this;

			if (index(eventType)) {
				clearListeners(eventMap, eventType, force);
			} else if (eventType instanceof Event) {
				this.clear(eventType.type, useRegExp, force);
			} else if (index$3(eventType)) {
				Array.from(eventMap).map(function (a) {
					return a[0];
				}).forEach(function (listenersEventType) {
					if (
					// if the string matches the regex
					index(listenersEventType) && useRegExp && eventType.test(listenersEventType) ||
					// if the regex(s) match
					index$3(listenersEventType) && isRegExpEqual(listenersEventType, eventType)) {
						clearListeners(eventMap, listenersEventType, force);
					}
				});
			} else if (arguments.length === 1 && eventType === true) {
				eventMap.clear();
			} else if (eventType === false || eventType === undefined && arguments.length <= 1) {
				eventMap.forEach(function (listeners, type) {
					listeners.filter(function (listener) {
						return listener.removable;
					}).forEach(function (listener) {
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
   * @param  {RegExp|String|Event} [type]
   * @param {Boolean} [useRegExp] - whether to use the RegExp to test other types
   * @return {Boolean}
   */

	}, {
		key: 'count',
		value: function count(type) {
			var useRegExp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var eventMap = this.eventMap;
			var eventType = type;

			// if there is not event map, just exit
			if (!eventMap) return 0;

			if (index(eventType)) {
				return eventMap.has(eventType) ? eventMap.get(eventType).length : 0;
			} else if (eventType instanceof Event) {
				return eventMap.has(eventType.type) ? eventMap.get(eventType.type).length : 0;
			} else if (index$3(eventType)) {
				var total = 0;
				eventMap.forEach(function (listeners, listenersEventType) {
					if (index(listenersEventType) && useRegExp && eventType.test(listenersEventType)) total += listeners.length;else if (isRegExpEqual(listenersEventType, eventType)) total += listeners.length;
				});
				return total;
			} else {
				var _total = 0;
				eventMap.forEach(function (listeners, eventType) {
					_total += listeners.length;
				});
				return _total;
			}
		}
	}, {
		key: 'eventMap',


		/**
   * returns the Map used to store events
   * @return {Map}
   */
		get: function get$$1() {
			return Emitter.getEventMap(this);
		}
	}], [{
		key: 'getEventMap',
		value: function getEventMap(emitter) {
			var map = this.events || (this.events = new WeakMap());
			return map.get(emitter);
		}

		/**
   * creates a new Map for the emitter
   * @param {Emitter} emitter
   * @return {WeakMap}
   */

	}, {
		key: 'createEventMap',
		value: function createEventMap(emitter) {
			var map = this.events || (this.events = new WeakMap());
			var events = new Map();
			map.set(emitter, events);
			return events;
		}
	}]);
	return Emitter;
}();

exports.Emitter = Emitter;
exports.Event = Event;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=regexp-events.umd.js.map
