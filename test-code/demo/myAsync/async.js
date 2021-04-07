const {
  testGen1,
  testGen3,
  testGen4,
} = require('./testData');

function myAsync(generator) {
  return new Promise(
    (resolve, reject) => {
      // 获得迭代器对象
      const gen = generator();

      function _next(doneValue) {
        const { done, value } =
          doneValue || {};

        if (done) {
          // 正确处理async的返回值
          resolve(value);
          return;
        }

        // 执行完这一个后执行下一个
        // 非promise自动包装为promise
        Promise.resolve(value)
          .then((data) => {
            // 捕获生成器内部非yield表达式抛出的错误
            try {
              // 将Promise resolve的内容赋值给await 左侧的变量
              _next(gen.next(data));
            } catch (err) {
              reject(err);
            }
          })
          .catch((err) => {
            // 捕获异常则向生成器抛出一个错误
            // 并恢复生成器的执行，返回带有 done 及 value 两个属性的对象。
            _next(gen.throw(err));
          });
      }

      _next();
    }
  );
}

myAsync(testGen4).catch((err) => {
  console.log('catch err');
  console.log(err);
});
