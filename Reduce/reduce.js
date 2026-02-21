/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  let hasNoInitialVal = initialValue === undefined;
  if (this.length < 1 && hasNoInitialVal) {
    throw new TypeError(
      "Cannot use reduce with empty array and no initial value.",
    );
  }
  // set initial value depends if it exists
  let acc = hasNoInitialVal ? this[0] : initialValue;

  // pass all 4 arguments: acc, currVal, currIndex, array
  for (let i = hasNoInitialVal ? 1 : 0; i < this.length; i++) {
    // Handle sparse arrays like [1, , 2, , 3]
    if (i in this) {
      acc = callbackFn(acc, this[i], i, this);
    }
  }
  return acc;
};

let test1 = [1, 2, 3].myReduce((prev, curr) => prev + curr, 0);
console.log("test1", test1);

let test2 = [1, , 2, , 3].myReduce((prev, curr) => prev + curr, 0);
console.log("test2", test2);
