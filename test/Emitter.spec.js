import Emitter from '../src/Emitter';
import Event from '../src/Event';
import {isRegExpEqual} from '../src/utils';

function expectListenerCount(emitter, type, count, useRegExp = true){
	expect(emitter).to.be.defined;
	expect(emitter.eventMap).to.be.an.instanceof(Map);
	if(typeof type === 'string'){
		if(count === 0) {
			expect(emitter.eventMap.size).to.equal(0);
		}
		else {
			expect(emitter.eventMap.get(type)).to.be.defined;
			if(emitter.eventMap.get(type))
				expect(emitter.eventMap.get(type)).to.have.lengthOf(count);
		}
	}
	else if(type instanceof RegExp){
		let total = 0;
		emitter.eventMap.forEach((listeners, listenersEventType) => {
			if(typeof listenersEventType === 'string' && useRegExp && type.test(listenersEventType))
				total += listeners.length;
			else if(isRegExpEqual(listenersEventType, type))
				total += listeners.length;
		});
		expect(total).to.equal(count);
	}
	else {
		if(count === 0) {
			expect(emitter.eventMap.size).to.equal(0);
		}
		else {
			let total = 0;
			emitter.eventMap.forEach(listeners => total += listeners.length);
			expect(total).to.equal(count);
		}
	}
}

describe('Emitter', function() {
	beforeEach(function(){
		this.emitter = new Emitter();
		this.listener = sinon.stub();
	});

	describe('on', function() {
		it('(String, Function)', function() {
			this.emitter.on('test', this.listener);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.be.undefined;
			expect(data.isStatic).to.equal(false);
			expect(data.times).to.equal(Infinity);
		});

		it('(String, Function, context)', function() {
			let context = {};
			this.emitter.on('test', this.listener, context);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(false);
			expect(data.times).to.equal(Infinity);
		});
		it('(String, Function, context, times)', function() {
			let context = {};
			this.emitter.on('test', this.listener, context, 10);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(false);
			expect(data.times).to.equal(10);
		});
		it('(String, Function, context, times, isStatic)', function() {
			let context = {};
			this.emitter.on('test', this.listener, context, 10, true);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});
		it('(String, Function, context, isStatic)', function() {
			let context = {};
			this.emitter.on('test', this.listener, context, true);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(Infinity);
		});
		it('(String, Function, context, isStatic, times)', function() {
			let context = {};
			this.emitter.on('test', this.listener, context, true, 10);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});

		it('(String, Function, isStatic)', function() {
			this.emitter.on('test', this.listener, true);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.be.undefined;
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(Infinity);
		});
		it('(String, Function, isStatic, context)', function() {
			let context = {};
			this.emitter.on('test', this.listener, true, context);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(Infinity);
		});
		it('(String, Function, isStatic, times)', function() {
			this.emitter.on('test', this.listener, true, 10);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.be.undefined;
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});
		it('(String, Function, isStatic, context, times)', function() {
			let context = {};
			this.emitter.on('test', this.listener, true, context, 10);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});
		it('(String, Function, isStatic, times, context)', function() {
			let context = {};
			this.emitter.on('test', this.listener, true, 10, context);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});

		it('(String, Function, times)', function() {
			this.emitter.on('test', this.listener, 10);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.be.undefined;
			expect(data.isStatic).to.equal(false);
			expect(data.times).to.equal(10);
		});
		it('(String, Function, times, context)', function() {
			let context = {};
			this.emitter.on('test', this.listener, 10, context);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(false);
			expect(data.times).to.equal(10);
		});
		it('(String, Function, times, isStatic)', function() {
			this.emitter.on('test', this.listener, 10, true);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.be.undefined;
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});
		it('(String, Function, times, context, isStatic)', function() {
			let context = {};
			this.emitter.on('test', this.listener, 10, context, true);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});
		it('(String, Function, times, isStatic, context)', function() {
			let context = {};
			this.emitter.on('test', this.listener, 10, true, context);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.ctx).to.equal(context);
			expect(data.isStatic).to.equal(true);
			expect(data.times).to.equal(10);
		});

		it('(RegExp, Function)', function() {
			let regexp = /test\d/;
			this.emitter.on(regexp, this.listener);
			expectListenerCount(this.emitter, regexp, 1);

			let data = this.emitter.eventMap.get(regexp)[0];
			expect(data.func).to.equal(this.listener);
		});

		it('(Event, Function)', function() {
			this.emitter.on(new Event('test'), this.listener);
			expectListenerCount(this.emitter, 'test', 1);

			let data = this.emitter.eventMap.get('test')[0];
			expect(data.func).to.equal(this.listener);
		});

		it('() throws if there is no event type', function () {
			expect(() => {
				this.emitter.on();
			}).to.throw(Error);
		});

		it('(Number|Null|Function) throws if the eventType is not a String, Event or RegExp', function () {
			expect(() => {
				this.emitter.on(10);
			}).to.throw(Error);

			expect(() => {
				this.emitter.on(this.listener);
			}).to.throw(Error);

			expect(() => {
				this.emitter.on(Null);
			}).to.throw(Error);
		});

		it('(String) throws if listener function is no provided', function () {
			expect(() => {
				this.emitter.on('testing');
			}).to.throw(Error);
		});

		it('(String, Null) throws if listener is not a function', function () {
			expect(() => {
				this.emitter.on('testing', 50);
			}).to.throw(Error);
		});
	});

	describe('off', function() {
		it('only removes the first listener that matches', function () {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
			this.emitter.off('test', this.listener);
			expectListenerCount(this.emitter, 'test', 1);
		});

		it('(String, Function) removes listener', function() {
			this.emitter.on('test', this.listener);
			this.emitter.off('test', this.listener);
			expectListenerCount(this.emitter, 'test', 0);
		});
		it('(String, Function) dose not remove static listener', function() {
			this.emitter.on('test', this.listener, true);
			this.emitter.off('test', this.listener);
			expectListenerCount(this.emitter, 'test', 1);
		});

		it('(String, Function, context) removes listener with context', function() {
			let ctx = {};
			this.emitter.on('test', this.listener, ctx);
			this.emitter.off('test', this.listener, ctx);
			expectListenerCount(this.emitter, 'test', 0);
		});

		it('(String, Function) dost not remove listener with different context', function() {
			let ctx = {};
			let ctx2 = {};
			this.emitter.on('test', this.listener, ctx);
			this.emitter.on('test', this.listener, ctx2);
			this.emitter.off('test', this.listener, ctx);
			expectListenerCount(this.emitter, 'test', 1);
		});

		it('(Event, Function) removes listener', function() {
			this.emitter.on('test', this.listener);
			this.emitter.off(new Event('test'), this.listener);
			expectListenerCount(this.emitter, 'test', 0);
		});

		it('(RegExp, Function) removes listener', function() {
			let regexp = /test.*/;
			this.emitter.on(regexp, this.listener);
			this.emitter.off(regexp, this.listener);
			expectListenerCount(this.emitter, regexp, 0);
		});

		it('(String, Function, force=true) removes static listener', function() {
			this.emitter.on('test', this.listener, true);
			this.emitter.off('test', this.listener, true);
			expectListenerCount(this.emitter, 'test', 0);
		});
		it('(String, Function, force=false) dose not remove static listener', function() {
			this.emitter.on('test', this.listener, true);
			this.emitter.off('test', this.listener, false);
			expectListenerCount(this.emitter, 'test', 1);
		});

		it('(String, Function, context, force=true) removes static listener', function() {
			let ctx = {};
			this.emitter.on('test', this.listener, ctx, true);
			this.emitter.off('test', this.listener, ctx, true);
			expectListenerCount(this.emitter, 'test', 0);
		});
		it('(String, Function, context, force=false) dose not remove static listener', function() {
			let ctx = {};
			this.emitter.on('test', this.listener, ctx, true);
			this.emitter.off('test', this.listener, ctx, false);
			expectListenerCount(this.emitter, 'test', 1);
		});

		it('(String, Function, force=true, context) removes static listener', function() {
			let ctx = {};
			this.emitter.on('test', this.listener, true, ctx);
			this.emitter.off('test', this.listener, true, ctx);
			expectListenerCount(this.emitter, 'test', 0);
		});
		it('(String, Function, force=false, context) dose not remove static listener', function() {
			let ctx = {};
			this.emitter.on('test', this.listener, true, ctx);
			this.emitter.off('test', this.listener, false, ctx);
			expectListenerCount(this.emitter, 'test', 1);
		});
	});

	describe('clear', function() {
		it('() removes all listeners', function () {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener);
			this.emitter.clear();
			expectListenerCount(this.emitter, 'test', 0);
			expectListenerCount(this.emitter, 'test2', 0);
		});

		it('() dose not remove static listeners', function () {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener, true);
			this.emitter.clear();
			expectListenerCount(this.emitter, 'test', 1);
		});

		it('(force=true) removes static listeners', function () {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener, true);
			this.emitter.clear(true);
			expectListenerCount(this.emitter, 'test', 0);
		});

		it('(force=false) dose not remove static listeners', function () {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener, true);
			this.emitter.clear(false);
			expectListenerCount(this.emitter, 'test', 1);
		});

		it('(String) removes all listeners of type', function() {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
			this.emitter.clear('test');
			expectListenerCount(this.emitter, 'test', 0);
		});

		it('(String, force=true) removes static listeners of type', function() {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener, true);
			this.emitter.clear('test', true);
			expectListenerCount(this.emitter, 'test', 0);
		});

		it('(String, force=false) dose not remove static listeners of type', function() {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener, true);
			this.emitter.clear('test', false);
			expectListenerCount(this.emitter, 'test', 1);
		});

		it('(Event) removes all listeners of event type', function() {
			this.emitter.on(new Event('test'), this.listener);
			this.emitter.on('test', this.listener);
			this.emitter.clear(new Event('test'));
			expectListenerCount(this.emitter, 'test', 0);
		});

		it('(RegExp) removes listeners with matching String or same RegExp', function () {
			this.emitter.on(/test\d/, this.listener);
			this.emitter.on('test10', this.listener);
			this.emitter.clear(/test\d/);
			expectListenerCount(this.emitter, 'test10', 0);
			expectListenerCount(this.emitter, /test\d/, 0, false);
		});

		it('(RegExp, force=false, useRegexp=false) only removes matching RegExp', function () {
			this.emitter.on(/test\d/, this.listener);
			this.emitter.on('test10', this.listener);
			this.emitter.clear(/test\d/, false, false);
			expectListenerCount(this.emitter, 'test10', 1);
			expectListenerCount(this.emitter, /test\d/, 0, false);
		});

		it('(RegExp, force=false, useRegexp=false) takes RegExp flags into account when comparing regexes', function () {
			this.emitter.on(/test\d/i, this.listener);
			this.emitter.clear(/test\d/, false, false);
			expectListenerCount(this.emitter, /test\d/i, 1, false);
			this.emitter.clear(/test\d/i, false, false);
			expectListenerCount(this.emitter, /test\d/i, 0, false);
		});
	});

	describe('count', function() {
		it('() returns total number of all listeners on the emitter', function() {
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener);
			expect(this.emitter.count()).to.equal(2);
		});

		it('(String) returns number of listeners of that type', function() {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener);
			expect(this.emitter.count('test')).to.equal(2);
		});

		it('(Event) returns number of listeners of Event.type', function() {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener);
			expect(this.emitter.count(new Event('test'))).to.equal(2);
		});

		it('(RegExp) returns number of listeners that match the RegExp', function() {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener);
			this.emitter.on('test3', this.listener);
			this.emitter.on('test10', this.listener);
			expect(this.emitter.count(/test\d/)).to.equal(3);
			expect(this.emitter.count(/.*/)).to.equal(5);
		});

		it('(RegExp, useRegExp=false) returns number of listeners that have a identical RegExp', function() {
			this.emitter.on(/test\d/g, this.listener);
			this.emitter.on(/test\d/, this.listener);
			this.emitter.on('test10', this.listener);
			expect(this.emitter.count(/test\d/, false)).to.equal(1);
			expect(this.emitter.count(/test\d/g, false)).to.equal(1);
		});
	});

	describe('once', function() {
		it('removes listener after the event is fired', function() {
			this.emitter.once('test', this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
			expectListenerCount(this.emitter, 'test', 0);
		});
	});

	describe('emit', function() {
		it('throws error if eventType is not a string', function() {
			this.emitter.on('test', this.listener);
			expect(() => {
				this.emitter.emit(null);
			}).to.throw(Error);
		});

		it('(String) calls listeners', function() {
			this.emitter.on('test', this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
		});

		it('(String, args...) calls listeners with arguments', function() {
			this.emitter.on('test', this.listener);
			this.emitter.emit('test',1,2,3);
			expect(this.listener).to.have.been.calledWith(1,2,3);
		});

		it('(String, args...) passes the Event as the last arguments', function() {
			this.emitter.on('test', (...args) => {
				expect(args[args.length-1]).to.be.an.instanceof(Event);
			});
			this.emitter.emit('test',1,2,3);
		});

		it('(Event) calls listeners', function() {
			this.emitter.on(new Event('test'), this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
		});

		it('(Event) emits the Event that is passed in', function () {
			let event = new Event('test');
			this.emitter.on('test', this.listener);
			this.emitter.emit(event);
			expect(this.listener).to.have.been.calledWithExactly(event);
		});

		it('(Event) calls listeners with Event.args', function () {
			let event = new Event('test',[1,2,3]);
			this.emitter.on('test', this.listener);
			this.emitter.emit(event);
			expect(this.listener).to.have.been.calledWithExactly(1,2,3,event);
		});

		it('(Event) sets Event.target if its not already set', function () {
			this.emitter.on('test', this.listener);

			let event = new Event('test',[1,2,3]);
			this.emitter.emit(event);
			expect(event.target).to.equal(this.emitter);

			let target = {};
			event = new Event('test',[1,2,3], target);
			this.emitter.emit(event);
			expect(event.target).to.equal(target);
		});

		it('dost not fire the event if Emitter.suppressEvents == true', function () {
			this.emitter.on('test', this.listener);
			this.emitter.suppressEvents = true;
			this.emitter.emit('test');
			expect(this.listener).not.to.have.been.called;
		})

		it('removes listener after calling is the correct number of times', function () {
			this.emitter.on('test', this.listener, undefined, false, 10);
			for(let i = 0; i < 20; i++)
				this.emitter.emit('test');

			expect(this.listener).to.have.callCount(10);
		})
	});
});
