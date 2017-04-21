import Emitter from '../src/Emitter';
import Event from '../src/Event';

describe('Emitter', function() {
	beforeEach(function(){
		this.emitter = new Emitter();
		this.listener = sinon.stub();
	});

	describe('on', function() {
		it('(Event) calls listener', function() {
			this.emitter.on(new Event('test'), this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
		});

		it('(String) calls listener', function() {
			this.emitter.on('test', this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
		});

		it('(String) runs listener in ctx', function() {
			let ctx = {
				testVar: 'testing'
			};
			this.emitter.on('test', this.listener, ctx);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
			expect(this.listener).to.have.been.calledOn(ctx);
		});

		it('(String) calls listeners with arguments', function() {
			this.emitter.on('test-event', (arg1, arg2, event) => {
				expect(arg1).to.equal('testing');
				expect(arg2).to.equal(3);
				expect(event instanceof Event).to.be.true;
			});

			this.emitter.emit('test-event', 'testing', 3);
		});

		it('(RegExp) calls listener', function() {
			this.emitter.on(/test\d/, this.listener);
			this.emitter.emit('test');
			this.emitter.emit('test5');
			this.emitter.emit('test2');
			this.emitter.emit('test');
			expect(this.listener).to.have.callCount(2);
		});

		it('throws if there is no event type', function () {
			expect(() => {
				this.emitter.on();
			}).to.throw(Error);
		});

		it('throws if function is no provided', function () {
			expect(() => {
				this.emitter.on('testing');
			}).to.throw(Error);
		});
	});

	describe('off', function() {
		it('(String) removes listener', function() {
			let fn = function(){};
			this.emitter.on('test', fn);
			this.emitter.off('test', fn);
			expect(this.emitter.count('test')).to.equal(0);
		});

		it('(String) removes listener with context', function() {
			let fn = function(){};
			let ctx = {};
			this.emitter.on('test', fn, ctx);
			this.emitter.off('test', fn, ctx);
			expect(this.emitter.count('test')).to.equal(0);
		});

		it('(String) dost not remove listener with different context', function() {
			let fn = function(){};
			let ctx = {};
			let ctx2 = {};
			this.emitter.on('test', fn, ctx);
			this.emitter.on('test', fn, ctx2);
			this.emitter.off('test', fn, ctx);
			expect(this.emitter.count('test')).to.equal(1);
		});

		it('(Event) removes listener', function() {
			let fn = function(){};
			this.emitter.on('test', fn);
			this.emitter.off(new Event('test'), fn);
			expect(this.emitter.count('test')).to.equal(0);
		});

		it('(RegExp) removes listener', function() {
			let fn = function(){};
			this.emitter.on(/.*/, fn);
			expect(this.emitter.count()).to.equal(1);
			this.emitter.off(/.*/, fn);
			expect(this.emitter.count()).to.equal(0);
		});

		it('(RegExp) removes listener with context', function() {
			let fn = function(){};
			let ctx = {};
			this.emitter.on(/.*/, fn, ctx);
			expect(this.emitter.count()).to.equal(1);
			this.emitter.off(/.*/, fn, ctx);
			expect(this.emitter.count()).to.equal(0);
		});

		it('(RegExp) dost not remove listener with different context', function() {
			let fn = function(){};
			let ctx = {};
			let ctx2 = {};
			this.emitter.on(/.*/, fn, ctx);
			this.emitter.on(/.*/, fn, ctx2);
			this.emitter.off(/.*/, fn, ctx);
			expect(this.emitter.count(/.*/)).to.equal(1);
		});

		it('removes un-removable listeners', function() {
			let fn = function(){};
			let ctx = {};
			this.emitter.on('test', fn, ctx, false);
			this.emitter.off('test', fn, ctx);
			expect(this.emitter.count('test')).to.equal(0);
		});
	});

	describe('clear', function() {
		it('() removes all removable listeners', function () {
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener);
			this.emitter.clear();
			expect(this.emitter.count()).to.equal(0);
		});

		it('() dose not remove us-removable listeners', function () {
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener, {}, false);
			this.emitter.clear();
			expect(this.emitter.count()).to.equal(1);
		});

		it('(force=false) dose not remove us-removable listeners', function () {
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener, {}, false);
			this.emitter.clear(false);
			expect(this.emitter.count()).to.equal(1);
		});

		it('(force=true) removes all listeners with force flag set', function () {
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener, {}, false);
			this.emitter.clear(true);
			expect(this.emitter.count()).to.equal(0);
		});

		it('(String) removes all listeners of type', function() {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
			this.emitter.clear('test');
			expect(this.emitter.count('test')).to.equal(0);
		});

		it('(Event) removes all listeners of event type', function() {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
			this.emitter.clear(new Event('test'));
			expect(this.emitter.count('test')).to.equal(0);
		});

		it('(RegExp) remove all listeners that match the RegExp', function () {
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener);
			this.emitter.on('test3', this.listener);
			this.emitter.clear(/test\d/);
			expect(this.emitter.count()).to.equal(2);
			this.emitter.clear(/.*/);
			expect(this.emitter.count()).to.equal(0);
		});
		it('(RegExp) remove RegExp and matching strings', function () {
			this.emitter.on(/test\d/, this.listener);
			this.emitter.on('test10', this.listener);
			this.emitter.clear(/test\d/);
			expect(this.emitter.count()).to.equal(0);
		});

		it('(RegExp) tests for RegExp flags', function () {
			this.emitter.on(/test\d/i, this.listener);
			this.emitter.on('test10', this.listener);
			this.emitter.clear(/test\d/);
			expect(this.emitter.count()).to.equal(1);
			this.emitter.clear(/test\d/i, false, false);
			expect(this.emitter.count()).to.equal(0);
		});

		it('(RegExp) with useRegexp=false only removes matching RegExp', function () {
			this.emitter.on(/test\d/, this.listener);
			this.emitter.on('test10', this.listener);
			this.emitter.clear(/test\d/, false, false);
			expect(this.emitter.count()).to.equal(1);
		});

		it('dose not remove listeners that cant be removed', function() {
			this.emitter.on('test', this.listener, {}, false);
			this.emitter.clear('test');
			this.emitter.clear();
			expect(this.emitter.count('test')).to.equal(1);
		});

		it('removes un-removable listeners with force', function() {
			this.emitter.on('test', this.listener, {}, false);
			expect(this.emitter.count('test')).to.equal(1);
			this.emitter.clear('test', true);
			expect(this.emitter.count('test')).to.equal(0);
		});
	});

	describe('count', function() {
		it('() returns total number of all listeners on the emitter', function() {
			this.emitter.clear();
			this.emitter.on('test', this.listener);
			this.emitter.on('test2', this.listener);
			expect(this.emitter.count()).to.equal(2);
		});

		it('(String) returns number of listeners', function() {
			this.emitter.clear();
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
			expect(this.emitter.count('test')).to.equal(2);
		});

		it('(Event) returns number of listeners', function() {
			this.emitter.clear();
			this.emitter.on('test', this.listener);
			this.emitter.on('test', this.listener);
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

		it('(RegExp) includes listeners that are RegExp and are identical', function() {
			this.emitter.on(/.*/, this.listener);
			this.emitter.on('test10', this.listener);
			expect(this.emitter.count(/test\d/)).to.equal(1);
			expect(this.emitter.count('test10')).to.equal(1);
			expect(this.emitter.count(/.*/, false)).to.equal(1);
			expect(this.emitter.count(/.*/)).to.equal(2);
			expect(this.emitter.count()).to.equal(2);
		});
	});

	describe('once', function() {
		it('(String) calls listener', function() {
			this.emitter.once('test', this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
		});

		it('(Event) calls listener', function() {
			this.emitter.once(new Event('test'), this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
		});

		it('(RegExp) calls listener', function() {
			this.emitter.once(/t.sT/i, this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
		});

		it('removes listener when fired', function() {
			this.emitter.clear();
			this.emitter.once('test', this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
			expect(this.emitter.count('test')).to.equal(0);
		});

		it('throws if there is no event type', function () {
			expect(() => {
				this.emitter.once();
			}).to.throw(Error);
		});

		it('throws if function is no provided', function () {
			expect(() => {
				this.emitter.once('testing');
			}).to.throw(Error);
		});
	});

	describe('emit', function() {
		it('(String) calls listeners', function() {
			this.emitter.on('test', this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
		});

		it('(Event) calls listeners', function() {
			this.emitter.on(new Event('test'), this.listener);
			this.emitter.emit('test');
			expect(this.listener).to.have.been.called;
		});

		it('(RegExp) only fires for listeners with type RegExp', function() {
			this.emitter.on('test', this.listener);
			this.emitter.on(/.*/, this.listener);
			this.emitter.emit(/.*/);
			expect(this.listener).to.have.callCount(1);
		});

		it('(Event) emits the Event that is passed in', function () {
			let event = new Event('test');
			this.emitter.on('test', this.listener);
			this.emitter.emit(event);
			expect(this.listener).to.have.been.called;
		});

		it('(Event) calls listeners with Event.args', function () {
			let event = new Event('test',this.emitter,[1,2,3]);
			this.emitter.on('test', this.listener);
			this.emitter.emit(event);
			expect(this.listener).to.have.been.calledWithExactly(1,2,3,event);
		});

		it('dost not fire the event if suppressEvents == true', function () {
			this.emitter.on('test', this.listener);
			this.emitter.suppressEvents = true;
			this.emitter.emit('test');
			expect(this.listener).not.to.have.been.called;
		})
	});
});
