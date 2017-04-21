A simple and small event emitter that supports regular expressions.

### Example
```javascript
let emitter = new Emitter();

// listen for an event
emitter.on('example-event', (message, event) => {
    console.log(message);
});

emitter.emit('example-event', 'Hello World');

// or listen for all events on this emitter
emitter.on(/.*/, (arg1, arg2, event) => {
    console.log(arg1, arg2);
});

emitter.emit('test-event', 'message', 'arg2');
```
