/**
 * regexp-events v1.0.0
 * built Thu Jul 13 2017 11:34:57 GMT-0500 (CDT)
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('regexp-events', ['exports'], factory) :
	(factory((global.RegExpEvents = {})));
}(this, (function (exports) { 'use strict';

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











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
 * @param  {Array} args - an array of arguments that is used on the listener functions
 * @return {Event}
 */
function Event(type, args, target) {
	classCallCheck(this, Event);

	if (!index(type)) throw new Error('Event.type has to be a string');

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
};

function clearListeners(eventMap, eventType, force) {
	if (force) {
		eventMap.delete(eventType);
	} else {
		var listeners = eventMap.get(eventType);
		listeners.filter(function (listener) {
			return !listener.isStatic;
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

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var index$2 = createCommonjsModule(function (module, exports) {
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
	for (var i = 0; i < args.length - start; i++) {
		if (fn(args[start + i])) return args[start + i];
	}return df;
}

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
   * @param  {RegExp|String|Event} eventType
   * @param  {Function} listener - the function to be called when the event fires
   * @param  {Object|Boolean|Number} [context] - the context to run the function under
   * @param  {Boolean|Number|Object} [isStatic=true] - whether this listener can be removed without force
   * @param  {Number|Boolean|Object} [times=Infinity] the times this listener can be called before it removes it self
   * @return {this}
   */
		value: function on(eventType, listener, context, isStatic, times) {
			if (!index(eventType) && !index$2(eventType) && !(eventType instanceof Event)) throw new Error('Emitter.on requires a String, Event or RegExp as the first argument');

			if (!index$1(listener)) throw new Error('Emitter.on requires a function as the second argument');

			isStatic = findInArgArray(arguments, isBoolean, 2, false);
			times = findInArgArray(arguments, function (n) {
				return Number.isFinite(n) || n === Infinity;
			}, 2, Infinity);
			context = findInArgArray(arguments, function (o) {
				return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
			}, 2, undefined);

			var eventMap = this.eventMap;
			if (!eventMap) eventMap = Emitter.createEventMap(this);

			if (eventType instanceof Event) eventType = eventType.type;

			if (!eventMap.has(eventType)) eventMap.set(eventType, []);

			// add the listener to the array
			eventMap.get(eventType).push({
				func: listener,
				ctx: context,
				times: times,
				isStatic: isStatic
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

	}, {
		key: 'once',
		value: function once(eventType, listener, context, isStatic) {
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

	}, {
		key: 'off',
		value: function off(eventType, listener, context, force) {
			if (eventType == null) throw new Error('Emitter.off requires a String or a RegExp as the first argument');

			if (!index$1(listener)) throw new Error('Emitter.off requires a function as the second argument');

			force = findInArgArray(arguments, isBoolean, 2, false);
			context = findInArgArray(arguments, function (o) {
				return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
			}, 2, undefined);

			if (eventType instanceof Event) eventType = eventType.type;

			var eventMap = this.eventMap;
			if (!eventMap) return this; // if there is not event map, just exit

			if (!eventMap.has(eventType)) eventMap.set(eventType, []);

			if (index(eventType)) {
				var listeners = eventMap.get(eventType);
				listeners.forEach(function (listenerData, i) {
					if (listenerData.func === listener && listenerData.ctx === context && (listenerData.isStatic ? force : true)) listeners.splice(i, 1);
				});

				// remove the listener array if there are no listeners left
				if (listeners.length === 0) eventMap.delete(eventType);
			} else if (index$2(eventType)) {
				eventMap.forEach(function (listeners, listenersEventType) {
					// if the regexp flags and source match then remove the listeners
					if (index$2(listenersEventType) && isRegExpEqual(eventType, listenersEventType)) {
						listeners.forEach(function (listenerData, i) {
							if (listenerData.func === listener && listenerData.ctx === context && (listenerData.isStatic ? force : true)) listeners.splice(i, 1);
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

	}, {
		key: 'emit',
		value: function emit(eventType) {
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

			if (eventType instanceof Event) {
				event = eventType;

				// if the event dose not have a target set it to this emitter
				if (event.target === undefined) event.target = this;
			} else if (index(eventType)) event = new Event(eventType, args, this);else throw new Error('Emitter.emit requires a String or Event as the first argument');

			var listenerArgs = Array.from(event.args).concat([event]);
			eventMap.forEach(function (listeners, listenersEventType) {
				if (
				// if they are both strings and they match
				index(event.type) && listenersEventType === event.type ||
				// if the listenersEventType is a RegExp and the event type is a string, see if they match
				index(event.type) && index$2(listenersEventType) && listenersEventType.test(event.type) ||
				// if they are both RegExp see if they match
				index$2(event.type) && index$2(listenersEventType) && isRegExpEqual(listenersEventType, event.type)) {
					listeners.forEach(function (listener) {
						listener.func.apply(listener.ctx, listenerArgs);
						if (--listener.times <= 0) _this.off(event.type, listener.func, listener.ctx, true);
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

	}, {
		key: 'clear',
		value: function clear(eventType) {
			var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var useRegExp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			var eventMap = this.eventMap;

			// if there is no event map, just exit
			if (!eventMap) return this;

			if (index(eventType)) {
				clearListeners(eventMap, eventType, force);
			} else if (eventType instanceof Event) {
				clearListeners(eventMap, eventType.type, force);
			} else if (index$2(eventType)) {
				Array.from(eventMap).map(function (a) {
					return a[0];
				}).forEach(function (listenersEventType) {
					if (
					// if the string matches the regex
					index(listenersEventType) && useRegExp && eventType.test(listenersEventType) ||
					// if the regex(s) match
					index$2(listenersEventType) && isRegExpEqual(listenersEventType, eventType)) {
						clearListeners(eventMap, listenersEventType, force);
					}
				});
			} else if (arguments.length === 1 && eventType === true) {
				// remove all listeners
				eventMap.clear();
			} else if ((eventType === false || eventType === undefined) && arguments.length <= 1) {
				// remove all listeners that are not static
				eventMap.forEach(function (listeners, type) {
					listeners.filter(function (listener) {
						return !listener.isStatic;
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
   * @param  {RegExp|String|Event} [eventType]
   * @param {Boolean} [useRegExp] - whether to use the RegExp to test other types
   * @return {Boolean}
   */

	}, {
		key: 'count',
		value: function count(eventType) {
			var useRegExp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var eventMap = this.eventMap;

			// if there is not event map, just exit
			if (!eventMap) return 0;

			if (index(eventType)) {
				return eventMap.has(eventType) ? eventMap.get(eventType).length : 0;
			} else if (eventType instanceof Event) {
				return eventMap.has(eventType.type) ? eventMap.get(eventType.type).length : 0;
			} else if (index$2(eventType)) {
				var total = 0;
				eventMap.forEach(function (listeners, listenersEventType) {
					if (
					// if the string matches the regex
					index(listenersEventType) && useRegExp && eventType.test(listenersEventType) ||
					// if the regex(s) match
					index$2(listenersEventType) && isRegExpEqual(listenersEventType, eventType)) {
						total += listeners.length;
					}
				});
				return total;
			} else {
				var _total = 0;
				eventMap.forEach(function (listeners) {
					_total += listeners.length;
				});
				return _total;
			}
		}

		/**
   * cleans up the emitter for GC
   */

	}, {
		key: 'dispose',
		value: function dispose() {
			Emitter.removeEventMap(this);
			return this;
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
   * @return {Map}
   */

	}, {
		key: 'createEventMap',
		value: function createEventMap(emitter) {
			var map = this.events || (this.events = new WeakMap());
			var events = new Map();
			map.set(emitter, events);
			return events;
		}

		/**
   * creates a new Map for the emitter
   * @param {Emitter} emitter
   * @return {Map}
   */

	}, {
		key: 'removeEventMap',
		value: function removeEventMap(emitter) {
			var map = this.events || (this.events = new WeakMap());
			if (map.has(emitter)) map.delete(emitter);
		}
	}]);
	return Emitter;
}();

exports.Emitter = Emitter;
exports.Event = Event;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=regexp-events.umd.js.map
