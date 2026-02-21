/**
 * @param {Function} func
 * @param {number} wait
 * @return {Function}
 */
export default function debounce(func, wait) {
  let timer; // persists across calls via closure
  // Use closure - a wrapper function to ensure we don't run functions immediately
  return function (...args) {
    let context = this;
    // the returned function still has access to timer that living in the outer scope
    clearTimeout(timer);
    timer = setTimeout(() => {
      // call a function with an existing `this` context and passed along args
      func.apply(context, args);
    }, wait);
  };
}
// Test 1:
function sayHello() {
  console.log("Hello");
}
let test1 = debounce(sayHello, 3000);
test1();

// Test 2:
function sayHi() {
  console.log(`Hi ${this.name}`);
}
let person = {
  name: "Alice",
  sayHi: debounce(sayHi, 5000),
};
person.sayHi();
