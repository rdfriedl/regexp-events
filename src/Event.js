/**
 * @classdesc the basic event class
 * @class Event
 */
export default class Event {
	/**
	 * @param  {String} type - the type of event, this can be anything, but its a good idea just to make it a string
	 * @param  {Emitter} target - the emitter that is firing this event
	 * @param  {Array} args - an array of arguments that is used on the listener functions
	 * @return {Event}
	 */
	constructor(type, args, target) {
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
	}
}
