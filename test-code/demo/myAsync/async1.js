const {
  testGen1,
} = require('./testData');

function myAsync1(generator) {
  return new Promise(
    (resolve, reject) => {
      // 获得迭代器对象
      const gen = generator();

      function _next(doneValue) {
        const {
          done,
          value,
        } = doneValue;

        if (done) {
          resolve();
          return;
        }

        // 执行完这一个后执行下一个
        value.then(() => {
          _next(gen.next());
        });
      }

      _next(gen.next());
    }
  );
}

myAsync1(testGen1);
