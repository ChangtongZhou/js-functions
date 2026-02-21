# Debouncing — Interview Study Plan

---

## 1. What Is It?

Debounce delays a function's execution until a specified wait period has passed **with no new calls**. Every new call resets the timer.

**Analogy:** An elevator door closes only after X ms of no button presses.

---

## 2. Core Implementation (Memorize This)

```javascript
function debounce(func, wait = 0) {
  let timer = null;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, wait);
  };
}
```

**Line by line:**
- `let timer` — persists across calls via closure
- `clearTimeout(timer)` — cancels any pending call
- `timer = setTimeout(...)` — schedules a new trailing call
- `func.apply(context, args)` — preserves `this` and passes arguments

---

## 3. Immediate (Leading Edge) Variant

Fires on the **first** call immediately, then suppresses calls during the wait window.

```javascript
function debounce(func, delay, immediate = false) {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);

    if (timer == null && immediate) {
      func.apply(context, args);  // fire on leading edge
    }

    timer = setTimeout(() => {
      timer = null;               // reset so next burst fires immediately again
      if (!immediate) {
        func.apply(context, args);
      }
    }, delay);
  };
}
```

| Mode | Fires on | Use case |
|------|----------|----------|
| `immediate = false` (default) | Trailing edge (after last call) | Search input, resize |
| `immediate = true` | Leading edge (first call) | Button click, form submit |

---

## 4. Key Concepts to Know

### `this` context
- The returned function **must not be an arrow function** — `this` needs to be dynamically bound by the caller
- Use `func.apply(context, args)` inside `setTimeout` to preserve it

### `clearTimeout()` is safe
- Passing `null` or an invalid ID does nothing — no need to null-check before calling it

### Closure
- `timer` lives in the closure, shared across all calls to the debounced function

---

## 5. Common Bugs (Watch Out)

| Bug | Mistake | Fix |
|-----|---------|-----|
| Timer never schedules | `setTimeout = (fn, delay)` (comma operator) | `timer = setTimeout(fn, delay)` |
| Args passed wrong | `func.apply(ctx, func(args))` | `func.apply(ctx, args)` |
| Second burst doesn't fire immediately | Never reset `timer = null` | Reset inside `setTimeout` callback |
| Lost `this` | Returned function is arrow `() =>` | Use `function(...args)` |

---

## 6. Examples

### Single call — fires after wait
```javascript
debouncedFn(); // t=0, no call yet
// t=100ms: func fires
```

### Rapid calls — timer resets each time
```javascript
debouncedFn(); // t=0,  timer resets
debouncedFn(); // t=50, timer resets
// t=150ms: func fires once
```

---

## 7. Follow-up Questions You May Get

**`cancel()`** — clear the pending timer without firing:
```javascript
debounced.cancel = () => clearTimeout(timer);
```

**`flush()`** — immediately invoke and clear the timer:
```javascript
debounced.flush = () => {
  clearTimeout(timer);
  func.apply(context, args);
};
```

**Throttle vs Debounce:**
- **Debounce** — fires once after activity *stops*
- **Throttle** — fires at most once per interval *during* activity

---

## 8. Quick Mental Checklist for Interviews

- [ ] Return a `function` (not arrow) so `this` is dynamic
- [ ] Store `timer` in closure
- [ ] `clearTimeout` on every call
- [ ] `timer = setTimeout(...)` — assign to `timer`, not reassign `setTimeout`
- [ ] `func.apply(context, args)` inside the timeout
- [ ] Reset `timer = null` after firing (needed for immediate mode)
- [ ] Handle `immediate` flag if asked
