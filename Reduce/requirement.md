# Array.prototype.myReduce

`Array.prototype.reduce` is a way of "reducing" elements in an array by calling a "reducer" callback function on each element of the array in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.

Implement `Array.prototype.reduce`. To avoid overwriting the actual `Array.prototype.reduce` which is being used by the autograder, we shall instead implement it as `Array.prototype.myReduce`.

## Examples

```js
[1, 2, 3].myReduce((prev, curr) => prev + curr, 0); // 6
[1, 2, 3].myReduce((prev, curr) => prev + curr, 4); // 10
```
