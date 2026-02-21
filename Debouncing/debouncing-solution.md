# Debouncing

Debounce, along with throttle, are among the most common front-end interview questions—the front-end equivalent of inverting a binary tree. Ensure you're very familiar with this pattern.

## Solution

A debounce function delays invoking a callback until after a specified wait duration has elapsed since the last invocation.

### Key Implementation Details

**1. Timer Management**

- Use `setTimeout` to delay function invocation
- Store the `timeoutID` to cancel pending timers
- If the function is called again before the timer fires, clear the existing timer with `clearTimeout(timeoutID)` and schedule a new one

**2. Preserve `this` Context**

- Use `Function.prototype.apply()` or `Function.prototype.call()` to invoke the callback with the correct `this` value
- Store a reference to `this` before the `setTimeout` callback executes

### Implementation

```javascript
/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait = 0) {
  let timeoutID = null;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutID);

    timeoutID = setTimeout(function () {
      timeoutID = null;
      func.apply(context, args);
    }, wait);
  };
}
```

### Alternative with Arrow Functions

```javascript
export default function debounce(func, wait = 0) {
  let timeoutID = null;
  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      timeoutID = null;
      func.apply(this, args);
    }, wait);
  };
}
```

### Edge Cases

The primary pitfall is preserving the correct `this` context. Two approaches work:

1. Store `this` in a variable before the async callback
2. Use an arrow function, which captures `this` lexically

Also, we should not implement the returned function using an arrow function for reasons mentioned above. The `this` value of the returned function needs to be dynamically determined when executed.

Read this article for a more in-depth explanation.

### Techniques

- Using `setTimeout`
- Closures
- How `this` works
- Invoking functions via `Function.prototype.apply()` / `Function.prototype.call()`

### Notes

`clearTimeout()` is a forgiving function — passing an invalid ID silently does nothing; no exception is thrown. Hence we don't have to check for `timeoutID === null` before calling `clearTimeout()`.

### Resources

- [Debouncing and Throttling Explained Through Examples](https://css-tricks.com/debouncing-throttling-explained-examples/)
- [Implementing Debounce in JavaScript](https://www.freecodecamp.org/news/javascript-debounce-example/)
- [clearTimeout() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout)
