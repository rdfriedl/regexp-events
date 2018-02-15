import EmitterTestSuite from "../Emitter.spec";
import EventTestSuite from "../Event.spec";
import Emitter from "../../src/Emitter";
import Event from "../../src/Event";

describe("Source:", () => {
	EmitterTestSuite(Emitter, Event);
	EventTestSuite(Event);
});
