const testGen1 = function* () {
  const a = yield Promise.resolve(1);
  console.time('temp');
  const b = yield new Promise((res) => {
    setTimeout(() => {
      res(2);
    }, 2000);
  });
  const c = yield Promise.resolve(3);
  console.log(a, b, c);
  console.timeEnd('temp');
  return [a, b, c];
};
const testGen2 = function* () {
  const a = yield 1;
  console.time('temp');
  const b = yield new Promise((res) => {
    setTimeout(() => {
      res(2);
    }, 2000);
  });
  const c = yield 3;
  console.log(a, b, c);
  console.timeEnd('temp');
  return [a, b, c];
};

const testGen3 = function* () {
  console.time('temp');
  const b = yield new Promise(
    (res, rej) => {
      setTimeout(() => {
        res(2);
      }, 2000);
    }
  );
  console.log(b);
  try {
    const d = yield Promise.reject(4);
  } catch (error) {
    console.log(error);
  }
  console.timeEnd('temp');
};

const testGen4 = function* () {
  console.time('temp');
  const b = yield new Promise(
    (res, rej) => {
      setTimeout(() => {
        res(2);
      }, 2000);
    }
  );
  console.log(b);
  console.timeEnd('temp');
  b = 'err';
};

module.exports = {
  testGen1,
  testGen2,
  testGen3,
  testGen4,
};
