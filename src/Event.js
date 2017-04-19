/**
 * @classdesc the basic event class
 * @class Event
 */
export default class Event{
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
