export function clearListeners(eventMap, eventType, force) {
	if (force) {
		eventMap.delete(eventType);
	} else {
		let listeners = eventMap.get(eventType);
		listeners.filter(listener => !listener.isStatic).forEach((listener, i) => {
			listeners.splice(listeners.indexOf(listener), 1);
		});

		// if there are not listeners left, remove the array
		if (listeners.length === 0) eventMap.delete(eventType);
	}
}

export function isRegExpEqual(r1, r2) {
	return (
		r1 instanceof RegExp &&
		r2 instanceof RegExp &&
		r2.source === r1.source &&
		r2.global === r1.global &&
		r2.ignoreCase === r1.ignoreCase &&
		r2.multiline === r1.multiline &&
		r2.sticky === r1.sticky &&
		r2.unicode === r1.unicode
	);
}
