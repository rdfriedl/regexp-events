import EmitterTestSuite from "../Emitter.spec";
import EventTestSuite from "../Event.spec";
import { Emitter, Event } from "../../dist/regexp-events.es";

describe("ES Bundle:", () => {
	EmitterTestSuite(Emitter, Event);
	EventTestSuite(Event);
});
