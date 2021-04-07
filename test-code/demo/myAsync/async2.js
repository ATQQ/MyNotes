const {
  testGen2,
} = require('./testData');

function myAsync2(generator) {
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
          // 正确处理async的返回值
          resolve(value);
          return;
        }

        // 执行完这一个后执行下一个
        // 非promise自动包装为promise
        Promise.resolve(value).then(
          (data) => {
            // 将Promise resolve的内容赋值给await 左侧的变量
            _next(gen.next(data));
          }
        );
      }

      _next(gen.next());
    }
  );
}

myAsync2(testGen2).then(console.log);
