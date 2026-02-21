function debouncing(func, delay, immediate = false) {
  let timer;
  return function (...args) {
    let context = this;
    clearTimeout(timer);
    if (timer == null && immediate) {
      func.apply(context, args);
    }

    timer = setTimeout(() => {
      if (!immediate) {
        func.apply(context, args);
      }
      timer = null;
    }, delay);
  };
}

// Tests:
function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function run() {
  // Test 1: fires immediately on first call
  let count1 = 0;
  const fn1 = debouncing(() => count1++, 200, true);
  fn1();
  console.log(
    "Test 1 - After first call, callCount:",
    count1,
    count1 === 1 ? "PASS" : "FAIL (expected 1)",
  );

  // Test 2: rapid calls suppressed
  let count2 = 0;
  const fn2 = debouncing(() => count2++, 200, true);
  fn2();
  fn2();
  fn2();
  console.log(
    "Test 2 - After 3 rapid calls, callCount:",
    count2,
    count2 === 1 ? "PASS" : "FAIL (expected 1)",
  );

  // Test 3: second burst fires immediately after delay
  let count3 = 0;
  const fn3 = debouncing(() => count3++, 200, true);
  fn3();
  console.log(
    "Test 3 - First burst callCount:",
    count3,
    count3 === 1 ? "PASS" : "FAIL (expected 1)",
  );
  await wait(300);
  fn3();
  console.log(
    "Test 3 - Second burst callCount:",
    count3,
    count3 === 2 ? "PASS" : "FAIL (expected 2)",
  );
}

run();
