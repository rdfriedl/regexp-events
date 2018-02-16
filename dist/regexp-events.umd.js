/**
 * regexp-events v1.0.1
 * built Fri Feb 16 2018 07:39:37 GMT-0600 (CST)
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('regexp-events', ['exports'], factory) :
	(factory((global.RegExpEvents = {})));
}(this, (function (exports) { 'use strict';

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

	if (typeof type !== "string") throw new Error("Event.type has to be a string");

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
		key: "on",


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
			if (typeof eventType !== "string" && !(eventType instanceof RegExp) && !(eventType instanceof Event)) throw new Error("Emitter.on requires a String, Event or RegExp as the first argument");

			if (typeof listener !== "function") throw new Error("Emitter.on requires a function as the second argument");

			isStatic = findInArgArray(arguments, isBoolean, 2, false);
			times = findInArgArray(arguments, function (n) {
				return Number.isFinite(n) || n === Infinity;
			}, 2, Infinity);
			context = findInArgArray(arguments, function (o) {
				return (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object";
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
		key: "once",
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
		key: "off",
		value: function off(eventType, listener, context, force) {
			if (eventType == null) throw new Error("Emitter.off requires a String or a RegExp as the first argument");

			if (typeof listener !== "function") throw new Error("Emitter.off requires a function as the second argument");

			force = findInArgArray(arguments, isBoolean, 2, false);
			context = findInArgArray(arguments, function (o) {
				return (typeof o === "undefined" ? "undefined" : _typeof(o)) === "object";
			}, 2, undefined);

			if (eventType instanceof Event) eventType = eventType.type;

			var eventMap = this.eventMap;
			if (!eventMap) return this; // if there is not event map, just exit

			if (!eventMap.has(eventType)) eventMap.set(eventType, []);

			if (typeof eventType === "string") {
				var listeners = eventMap.get(eventType);
				listeners.forEach(function (listenerData, i) {
					if (listenerData.func === listener && listenerData.ctx === context && (listenerData.isStatic ? force : true)) listeners.splice(i, 1);
				});

				// remove the listener array if there are no listeners left
				if (listeners.length === 0) eventMap.delete(eventType);
			} else if (eventType instanceof RegExp) {
				eventMap.forEach(function (listeners, listenersEventType) {
					// if the regexp flags and source match then remove the listeners
					if (listenersEventType instanceof RegExp && isRegExpEqual(eventType, listenersEventType)) {
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
		key: "emit",
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
			} else if (typeof eventType === "string") event = new Event(eventType, args, this);else throw new Error("Emitter.emit requires a String or Event as the first argument");

			var listenerArgs = Array.from(event.args).concat([event]);
			eventMap.forEach(function (listeners, listenersEventType) {
				if (
				// if they are both strings and they match
				typeof event.type === "string" && listenersEventType === event.type ||
				// if the listenersEventType is a RegExp and the event type is a string, see if they match
				typeof event.type === "string" && listenersEventType instanceof RegExp && listenersEventType.test(event.type) ||
				// if they are both RegExp see if they match
				event.type instanceof RegExp && listenersEventType instanceof RegExp && isRegExpEqual(listenersEventType, event.type)) {
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
		key: "clear",
		value: function clear(eventType) {
			var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			var useRegExp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			var eventMap = this.eventMap;

			// if there is no event map, just exit
			if (!eventMap) return this;

			if (typeof eventType === "string") {
				clearListeners(eventMap, eventType, force);
			} else if (eventType instanceof Event) {
				clearListeners(eventMap, eventType.type, force);
			} else if (eventType instanceof RegExp) {
				Array.from(eventMap).map(function (a) {
					return a[0];
				}).forEach(function (listenersEventType) {
					if (
					// if the string matches the regex
					typeof listenersEventType === "string" && useRegExp && eventType.test(listenersEventType) ||
					// if the regex(s) match
					listenersEventType instanceof RegExp && isRegExpEqual(listenersEventType, eventType)) {
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
		key: "count",
		value: function count(eventType) {
			var useRegExp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

			var eventMap = this.eventMap;

			// if there is not event map, just exit
			if (!eventMap) return 0;

			if (typeof eventType === "string") {
				return eventMap.has(eventType) ? eventMap.get(eventType).length : 0;
			} else if (eventType instanceof Event) {
				return eventMap.has(eventType.type) ? eventMap.get(eventType.type).length : 0;
			} else if (eventType instanceof RegExp) {
				var total = 0;
				eventMap.forEach(function (listeners, listenersEventType) {
					if (
					// if the string matches the regex
					typeof listenersEventType === "string" && useRegExp && eventType.test(listenersEventType) ||
					// if the regex(s) match
					listenersEventType instanceof RegExp && isRegExpEqual(listenersEventType, eventType)) {
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
		key: "dispose",
		value: function dispose() {
			Emitter.removeEventMap(this);
			return this;
		}
	}, {
		key: "eventMap",


		/**
   * returns the Map used to store events
   * @return {Map}
   */
		get: function get$$1() {
			return Emitter.getEventMap(this);
		}
	}], [{
		key: "getEventMap",
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
		key: "createEventMap",
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
		key: "removeEventMap",
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
