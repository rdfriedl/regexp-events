import Emitter from "../src/Emitter";
import Event from "../src/Event";
import { isRegExpEqual } from "../src/utils";

function expectListenerCount(emitter, type, count, useRegExp = true) {
	expect(emitter).to.exist;
	expect(emitter.eventMap).to.be.an.instanceof(Map);
	if (typeof type === "string") {
		if (count === 0) {
			expect(emitter.eventMap.size).to.equal(0);
		} else {
			expect(emitter.eventMap.get(type)).to.exist;
			if (emitter.eventMap.get(type)) expect(emitter.eventMap.get(type)).to.have.lengthOf(count);
		}
	} else if (type instanceof RegExp) {
		let total = 0;
		emitter.eventMap.forEach((listeners, listenersEventType) => {
			if (typeof listenersEventType === "string" && useRegExp && type.test(listenersEventType))
				total += listeners.length;
			else if (isRegExpEqual(listenersEventType, type)) total += listeners.length;
		});
		expect(total).to.equal(count);
	} else {
		if (count === 0) {
			expect(emitter.eventMap.size).to.equal(0);
		} else {
			let total = 0;
			emitter.eventMap.forEach(listeners => (total += listeners.length));
			expect(total).to.equal(count);
		}
	}
}

describe("Emitter", () => {
	let emitter, listener;

	beforeEach(() => {
		emitter = new Emitter();
		listener = sinon.stub();
	});

	describe("createEventMap", () => {
		it("should create an eventMap if one dose not exist", () => {
			Emitter.events = null;

			Emitter.createEventMap(emitter);

			expect(Emitter.events).to.exist;
		});

		it("should not create a new events map if one exists", () => {
			let events = Emitter.events;

			Emitter.createEventMap(emitter);

			expect(Emitter.events).to.equal(events);
		});
	});

	describe("removeEventMap", () => {
		it("should not create an eventMap if one dose not exist", () => {
			Emitter.events = null;

			Emitter.removeEventMap(emitter);

			expect(Emitter.events).to.be.null;
		});
	});

	describe("on", () => {
		it("(String, Function)", () => {
			emitter.on("test", listener);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.be.undefined;
			expect(data.isStatic).to.equal(false);
			expect(data.times).to.equal(Infinity);
		});

		it("(String, Function, context)", () => {
			let context = {};
			emitter.on("test", listener, context);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(false);
			expect(data.times).to.equal(Infinity);
		});
		it("(String, Function, context, times)", () => {
			let context = {};
			emitter.on("test", listener, context, 10);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(false);
			expect(data.times).to.equal(10);
		});
		it("(String, Function, context, times, isStatic)", () => {
			let context = {};
			emitter.on("test", listener, context, 10, true);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});
		it("(String, Function, context, isStatic)", () => {
			let context = {};
			emitter.on("test", listener, context, true);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(Infinity);
		});
		it("(String, Function, context, isStatic, times)", () => {
			let context = {};
			emitter.on("test", listener, context, true, 10);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});

		it("(String, Function, isStatic)", () => {
			emitter.on("test", listener, true);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.be.undefined;
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(Infinity);
		});
		it("(String, Function, isStatic, context)", () => {
			let context = {};
			emitter.on("test", listener, true, context);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(Infinity);
		});
		it("(String, Function, isStatic, times)", () => {
			emitter.on("test", listener, true, 10);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.be.undefined;
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});
		it("(String, Function, isStatic, context, times)", () => {
			let context = {};
			emitter.on("test", listener, true, context, 10);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});
		it("(String, Function, isStatic, times, context)", () => {
			let context = {};
			emitter.on("test", listener, true, 10, context);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});

		it("(String, Function, times)", () => {
			emitter.on("test", listener, 10);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.be.undefined;
			expect(data.isStatic).to.equal(false);
			expect(data.times).to.equal(10);
		});
		it("(String, Function, times, context)", () => {
			let context = {};
			emitter.on("test", listener, 10, context);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(false);
			expect(data.times).to.equal(10);
		});
		it("(String, Function, times, isStatic)", () => {
			emitter.on("test", listener, 10, true);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.be.undefined;
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});
		it("(String, Function, times, context, isStatic)", () => {
			let context = {};
			emitter.on("test", listener, 10, context, true);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});
		it("(String, Function, times, isStatic, context)", () => {
			let context = {};
			emitter.on("test", listener, 10, true, context);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});

		it("(RegExp, Function)", () => {
			let regexp = /test\d/;
			emitter.on(regexp, listener);
			expectListenerCount(emitter, regexp, 1);

			let data = emitter.eventMap.get(regexp)[0];
			expect(data.func).to.equal(listener);
		});

		it("(Event, Function)", () => {
			emitter.on(new Event("test"), listener);
			expectListenerCount(emitter, "test", 1);

			let data = emitter.eventMap.get("test")[0];
			expect(data.func).to.equal(listener);
		});

		it("() throws if there is no event type", () => {
			expect(() => {
				emitter.on();
			}).to.throw(Error);
		});

		it("(Number|Null|Function) throws if the eventType is not a String, Event or RegExp", () => {
			expect(() => {
				emitter.on(10);
			}).to.throw(Error);

			expect(() => {
				emitter.on(listener);
			}).to.throw(Error);

			expect(() => {
				emitter.on(Null);
			}).to.throw(Error);
		});

		it("(String) throws if listener function is no provided", () => {
			expect(() => {
				emitter.on("testing");
			}).to.throw(Error);
		});

		it("(String, Null) throws if listener is not a function", () => {
			expect(() => {
				emitter.on("testing", 50);
			}).to.throw(Error);
		});
	});

	describe("off", () => {
		it("only removes the first listener that matches", () => {
			emitter.on("test", listener);
			emitter.on("test", listener);
			emitter.off("test", listener);
			expectListenerCount(emitter, "test", 1);
		});

		it("(String, Function) removes listener", () => {
			emitter.on("test", listener);
			emitter.off("test", listener);
			expectListenerCount(emitter, "test", 0);
		});
		it("(String, Function) dose not remove static listener", () => {
			emitter.on("test", listener, true);
			emitter.off("test", listener);
			expectListenerCount(emitter, "test", 1);
		});

		it("(String, Function, context) removes listener with context", () => {
			let ctx = {};
			emitter.on("test", listener, ctx);
			emitter.off("test", listener, ctx);
			expectListenerCount(emitter, "test", 0);
		});

		it("(String, Function) dost not remove listener with different context", () => {
			let ctx = {};
			let ctx2 = {};
			emitter.on("test", listener, ctx);
			emitter.on("test", listener, ctx2);
			emitter.off("test", listener, ctx);
			expectListenerCount(emitter, "test", 1);
		});

		it("(Event, Function) removes listener", () => {
			emitter.on("test", listener);
			emitter.off(new Event("test"), listener);
			expectListenerCount(emitter, "test", 0);
		});

		it("(RegExp, Function) removes listener", () => {
			let regexp = /test.*/;
			emitter.on(regexp, listener);
			emitter.off(regexp, listener);
			expectListenerCount(emitter, regexp, 0);
		});

		it("(String, Function, force=true) removes static listener", () => {
			emitter.on("test", listener, true);
			emitter.off("test", listener, true);
			expectListenerCount(emitter, "test", 0);
		});
		it("(String, Function, force=false) dose not remove static listener", () => {
			emitter.on("test", listener, true);
			emitter.off("test", listener, false);
			expectListenerCount(emitter, "test", 1);
		});

		it("(String, Function, context, force=true) removes static listener", () => {
			let ctx = {};
			emitter.on("test", listener, ctx, true);
			emitter.off("test", listener, ctx, true);
			expectListenerCount(emitter, "test", 0);
		});
		it("(String, Function, context, force=false) dose not remove static listener", () => {
			let ctx = {};
			emitter.on("test", listener, ctx, true);
			emitter.off("test", listener, ctx, false);
			expectListenerCount(emitter, "test", 1);
		});

		it("(String, Function, force=true, context) removes static listener", () => {
			let ctx = {};
			emitter.on("test", listener, true, ctx);
			emitter.off("test", listener, true, ctx);
			expectListenerCount(emitter, "test", 0);
		});
		it("(String, Function, force=false, context) dose not remove static listener", () => {
			let ctx = {};
			emitter.on("test", listener, true, ctx);
			emitter.off("test", listener, false, ctx);
			expectListenerCount(emitter, "test", 1);
		});
	});

	describe("clear", () => {
		it("() removes all listeners", () => {
			emitter.on("test", listener);
			emitter.on("test", listener);
			emitter.on("test2", listener);
			emitter.clear();
			expectListenerCount(emitter, "test", 0);
			expectListenerCount(emitter, "test2", 0);
		});

		it("() dose not remove static listeners", () => {
			emitter.on("test", listener);
			emitter.on("test", listener, true);
			emitter.clear();
			expectListenerCount(emitter, "test", 1);
		});

		it("(force=true) removes static listeners", () => {
			emitter.on("test", listener);
			emitter.on("test", listener, true);
			emitter.clear(true);
			expectListenerCount(emitter, "test", 0);
		});

		it("(force=false) dose not remove static listeners", () => {
			emitter.on("test", listener);
			emitter.on("test", listener, true);
			emitter.clear(false);
			expectListenerCount(emitter, "test", 1);
		});

		it("(String) removes all listeners of type", () => {
			emitter.on("test", listener);
			emitter.on("test", listener);
			emitter.clear("test");
			expectListenerCount(emitter, "test", 0);
		});

		it("(String, force=true) removes static listeners of type", () => {
			emitter.on("test", listener);
			emitter.on("test", listener, true);
			emitter.clear("test", true);
			expectListenerCount(emitter, "test", 0);
		});

		it("(String, force=false) dose not remove static listeners of type", () => {
			emitter.on("test", listener);
			emitter.on("test", listener, true);
			emitter.clear("test", false);
			expectListenerCount(emitter, "test", 1);
		});

		it("(Event) removes all listeners of event type", () => {
			emitter.on(new Event("test"), listener);
			emitter.on("test", listener);
			emitter.clear(new Event("test"));
			expectListenerCount(emitter, "test", 0);
		});

		it("(RegExp) removes listeners with matching String or same RegExp", () => {
			emitter.on(/test\d/, listener);
			emitter.on("test10", listener);
			emitter.clear(/test\d/);
			expectListenerCount(emitter, "test10", 0);
			expectListenerCount(emitter, /test\d/, 0, false);
		});

		it("(RegExp, force=false, useRegexp=false) only removes matching RegExp", () => {
			emitter.on(/test\d/, listener);
			emitter.on("test10", listener);
			emitter.clear(/test\d/, false, false);
			expectListenerCount(emitter, "test10", 1);
			expectListenerCount(emitter, /test\d/, 0, false);
		});

		it("(RegExp, force=false, useRegexp=false) takes RegExp flags into account when comparing regexes", () => {
			emitter.on(/test\d/i, listener);
			emitter.clear(/test\d/, false, false);
			expectListenerCount(emitter, /test\d/i, 1, false);
			emitter.clear(/test\d/i, false, false);
			expectListenerCount(emitter, /test\d/i, 0, false);
		});
	});

	describe("count", () => {
		it("should return 0 if eventMap has not been created yet", () => {
			Emitter.events = null;

			expect(emitter.count("testing")).to.equal(0);
		});

		it("() returns total number of all listeners on the emitter", () => {
			emitter.on("test", listener);
			emitter.on("test2", listener);
			expect(emitter.count()).to.equal(2);
		});

		it("(String) returns number of listeners of that type", () => {
			emitter.on("test", listener);
			emitter.on("test", listener);
			emitter.on("test2", listener);
			expect(emitter.count("test")).to.equal(2);
		});

		it("(Event) returns number of listeners of Event.type", () => {
			emitter.on("test", listener);
			emitter.on("test", listener);
			emitter.on("test2", listener);
			expect(emitter.count(new Event("test"))).to.equal(2);
		});

		it("(RegExp) returns number of listeners that match the RegExp", () => {
			emitter.on("test", listener);
			emitter.on("test", listener);
			emitter.on("test2", listener);
			emitter.on("test3", listener);
			emitter.on("test10", listener);
			expect(emitter.count(/test\d/)).to.equal(3);
			expect(emitter.count(/.*/)).to.equal(5);
		});

		it("(RegExp, useRegExp=false) returns number of listeners that have a identical RegExp", () => {
			emitter.on(/test\d/g, listener);
			emitter.on(/test\d/, listener);
			emitter.on("test10", listener);
			expect(emitter.count(/test\d/, false)).to.equal(1);
			expect(emitter.count(/test\d/g, false)).to.equal(1);
		});
	});

	describe("once", () => {
		it("removes listener after the event is fired", () => {
			emitter.once("test", listener);
			emitter.emit("test");
			expect(listener).to.have.been.called;
			expectListenerCount(emitter, "test", 0);
		});
	});

	describe("emit", () => {
		it("throws error if eventType is not a string", () => {
			emitter.on("test", listener);
			expect(() => {
				emitter.emit(null);
			}).to.throw(Error);
		});

		it("(String) calls listeners", () => {
			emitter.on("test", listener);
			emitter.emit("test");
			expect(listener).to.have.been.called;
		});

		it("(String, args...) calls listeners with arguments", () => {
			emitter.on("test", listener);
			emitter.emit("test", 1, 2, 3);
			expect(listener).to.have.been.calledWith(1, 2, 3);
		});

		it("(String, args...) passes the Event as the last arguments", () => {
			emitter.on("test", (...args) => {
				expect(args[args.length - 1]).to.be.an.instanceof(Event);
			});
			emitter.emit("test", 1, 2, 3);
		});

		it("(Event) calls listeners", () => {
			emitter.on(new Event("test"), listener);
			emitter.emit("test");
			expect(listener).to.have.been.called;
		});

		it("(Event) emits the Event that is passed in", () => {
			let event = new Event("test");
			emitter.on("test", listener);
			emitter.emit(event);
			expect(listener).to.have.been.calledWithExactly(event);
		});

		it("(Event) calls listeners with Event.args", () => {
			let event = new Event("test", [1, 2, 3]);
			emitter.on("test", listener);
			emitter.emit(event);
			expect(listener).to.have.been.calledWithExactly(1, 2, 3, event);
		});

		it("(Event) sets Event.target if its not already set", () => {
			emitter.on("test", listener);

			let event = new Event("test", [1, 2, 3]);
			emitter.emit(event);
			expect(event.target).to.equal(emitter);

			let target = {};
			event = new Event("test", [1, 2, 3], target);
			emitter.emit(event);
			expect(event.target).to.equal(target);
		});

		it("dost not fire the event if Emitter.suppressEvents == true", () => {
			emitter.on("test", listener);
			emitter.suppressEvents = true;
			emitter.emit("test");
			expect(listener).not.to.have.been.called;
		});

		it("removes listener after calling is the correct number of times", () => {
			emitter.on("test", listener, undefined, false, 10);
			for (let i = 0; i < 20; i++) emitter.emit("test");

			expect(listener).to.have.callCount(10);
		});
	});

	describe("dispose", () => {
		it("should call Emitter.removeEventMap", () => {
			sinon.spy(Emitter, "removeEventMap");

			emitter.dispose();

			expect(Emitter.removeEventMap).to.have.been.called;
		});
	});
});
