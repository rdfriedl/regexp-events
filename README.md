# RegExp Events

[![CircleCI](https://img.shields.io/circleci/project/github/rdfriedl/regexp-events.svg?style=flat-square)](https://circleci.com/gh/rdfriedl/workflows/regexp-events)
[![Codecov](https://img.shields.io/codecov/c/github/rdfriedl/regexp-events.svg?style=flat-square)](https://circleci.com/gh/rdfriedl/workflows/regexp-events)
[![npm](https://img.shields.io/npm/v/regexp-events.svg?style=flat-square)](https://npmjs.org/package/regexp-events)
[![Docs: Published](https://img.shields.io/badge/Docs-Published-green.svg?style=flat-square)](http://www.rdfriedl.com/regexp-events/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A simple and small event emitter that supports regular expressions.

### Example

```javascript
let emitter = new Emitter();

// listen for an event
emitter.on("example-event", (message, event) => {
	console.log(message);
});

emitter.emit("example-event", "Hello World");

// or listen for all events on this emitter
emitter.on(/.*/, (arg1, arg2, event) => {
	console.log(arg1, arg2);
});

emitter.emit("test-event", "message", "arg2");
```

### Emitter

#### on(eventType: String|Event|RegExp, listener: Function, context: Object, isStatic = false, times = Infinity)

```javascript
let emitter = new Emitter();
let listener = () => {
	console.log("Hello World");
};
let context = {
	prop: "some-prop",
};

// bind a basic event
emitter.on("test", listener);

// bind an event with a RegExp
emitter.on(/test-.*/, listener);

// set the listeners context
emitter.on("test", listener, context);

// bind a static listener
// static listeners can only be removed by passing the "force=true" flag into either Emitter.off or Emitter.clear
emitter.on("test", listener, true);

// bind an event that will remove itself after being called X number of times
emitter.on(/test-.*/, listener, 10);

// its possible to pass the context, times, and isStatic arguments in any order
emitter.on("test", listener, true, context, 20);
emitter.on("test", listener, 18, true, context);
emitter.on("test", listener, context, true, 15);
emitter.on("test", listener, true, 15);
emitter.on("test", listener, 10, context);
emitter.on("test", listener, context, true);
```

#### once(eventType: String|Event|RegExp, listener: Function)

this is just like calling `emitter.on()` with `times` set to 1

#### off(eventType: String|Event|RegExp, listener: Function, context: Object, force = false)

unbinds a listener

```javascript
let emitter = new Emitter();
let context = {};
function listener() {}

// this will unbind the first listener that has the same eventType and listener
emitter.off("test", listener);

// this will not work because the original listener was not bound with a RegExp
emitter.on("test", listener);
emitter.off(/.*/, listener);

// if emitter.on was called with a context, then you have to pass the exact same context into emitter.off to unbind the listener
emitter.on("test", listener, context);

emitter.off("test", listener); // this wont work
emitter.off("test", listener, context); // this will since the listener has a context

// same as Emitter.on the last two arguments (context, force) can be provided in any order
emitter.off("test", listener, true);
emitter.off(/event-.*/, listener, context, true);
emitter.off("some-event", listener, true, context);
```

#### emit(eventType: String|Event, ...arguments)

```javascript
let emitter = new Emitter();
let listener = (arg1, arg2, event) => {
	console.log(arg1, arg2, event);
};

emitter.on("test", listener);

// the event is pass into the listener as the last argument
emitter.emit("test", 5, "message");

let event = new Event("test", [10, "another message"]);
emitter.emit(event);
```

#### clear(eventType: String|RegExp, force=false, useRegExp=true)

```javascript
let emitter = new Emitter();
function listener() {}

// this will clear all non-static listeners that are listening for the "test" event
emitter.on("test", listener);
emitter.clear("test");

// this will clear all non-static listeners
emitter.clear();

// this will clear absolutely every listener static or not
emitter.clear(true);

// this will clear all listeners that match the RegExp or that are equal to the RegExp
emitter.on("test2", listener);
emitter.on("test5", listener);
emitter.on(/test\d/, listener);
emitter.clear(/test\d/);

// if you want to only clear the listeners that have the same RegExp
emitter.clear(/test\d/, false, false);
```

#### count(eventType: String|RegExp, useRegExp=true)

```javascript
let emitter = new Emitter();
let context = {};
function listener() {}

emitter.on("test", listener);
emitter.on("test2", listener, true);
emitter.on("test3", listener, context);
emitter.on("test4", listener, 20);
emitter.on(/test\d/, listener);

// count all the listeners
emitter.count();
// -> 3

// count all the listeners of type
emitter.count("test");
// -> 1

// count all the listeners that match the RegExp or that have equal RegExp
emitter.count(/test\d/);
// -> 4

// count all the listeners that have a similar RegExp
emitter.count(/test\d/, false);
// -> 1
```
