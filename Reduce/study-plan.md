# Study Plan: Array.prototype.myReduce

## Key Things to Nail in the Interview

### 1. Optional `initialValue`
Do **not** use a default parameter like `initialValue = undefined` — that makes it impossible to distinguish "user passed `undefined`" from "user passed nothing."

Use `arguments.length >= 2` instead to check if an initial value was provided.

### 2. No `initialValue` Behavior
When no `initialValue` is given:
- The **first element** becomes the accumulator
- Iteration **starts at index 1**

### 3. Empty Array Edge Case
An empty array with no `initialValue` should **throw a `TypeError`** — same as native behavior.

### 4. Pass All 4 Args to the Callback
Always pass all four arguments to the reducer:
```js
callback(accumulator, currentValue, currentIndex, array)
```
The native spec includes them even if most callbacks ignore the last two.

### 5. Use `this` Correctly
Since `myReduce` is called on the array instance, `this` refers to it.
- Use a **regular function** (not an arrow function) — arrow functions would break `this`
- For **sparse arrays**, use `i in this` to skip holes
- For no `initialValue`, find the **first non-hole element** as the accumulator

> Key distinction: `i in this` **fails** for holes, **passes** for `undefined` values

---

## Edge Cases to Handle

| Case | With `initialValue` | Without `initialValue` |
|------|--------------------|-----------------------|
| Empty array | Returns `initialValue` | Throws `TypeError` |
| Single-value array | Runs callback once | Returns the single element |
| Sparse array `[1, 2, , 4]` | Skips holes | Skips holes, first non-hole is accumulator |
| Passing index and array | `currentIndex` starts at 0 | `currentIndex` starts at 1 |

---

## Sparse Array Behavior
```js
[1, 2, , 4].myReduce((prev, curr) => prev + curr, 0); // 7 (hole at index 2 is skipped)
```
Empty/hole values should be **ignored** while traversing — use `i in this` to check.
