import EmitterTestSuite from "../Emitter.spec";
import EventTestSuite from "../Event.spec";
import { Emitter, Event } from "../../dist/regexp-events";

describe("CommonJS Bundle:", () => {
	EmitterTestSuite(Emitter, Event);
	EventTestSuite(Event);
});
