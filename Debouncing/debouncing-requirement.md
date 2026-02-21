# Debouncing

## Overview

Debouncing is a technique used to control how many times we allow a function to be executed over time. When a JavaScript function is debounced with a wait time of X milliseconds, it must wait until after X milliseconds have elapsed since the debounced function was last called.

**Real-world analogy:** An elevator door closes only after X milliseconds of no button presses.

## Problem Statement

Implement a `debounce(callback, wait)` function that:

- Accepts a callback function and wait duration in milliseconds
- Returns a debounced function
- Delays callback execution until `wait` ms have passed without new invocations
- Resets the timer on each new invocation

## Examples

### Example 1: Single Call

```javascript
let i = 0;
function increment() {
  i++;
}
const debouncedIncrement = debounce(increment, 100);

debouncedIncrement(); // t=0, i=0
// t=100: increment() executes, i=1
```

### Example 2: Multiple Calls Reset Timer

```javascript
let i = 0;
const debouncedIncrement = debounce(increment, 100);

debouncedIncrement(); // t=0
debouncedIncrement(); // t=50 (timer resets)
// t=150: increment() executes, i=1
```

## Follow-up Requirements

1. Add `cancel()` method to cancel pending invocations
2. Add `flush()` method to immediately invoke pending callback
3. Implement `throttle()` - similar but with different behavior

## Resources

- [Lodash Debounce Documentation](https://lodash.com/docs/#debounce)
