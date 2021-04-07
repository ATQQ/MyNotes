async function demo1() {
  const a = await 1;
  const b = await new Promise(
    (res, rej) => {
      setTimeout(() => {
        res(2);
      }, 2000);
    }
  );
  const c = await Promise.resolve(3);
  console.log(a, b, c);

  try {
    const d = await Promise.reject(4);
  } catch (error) {
    console.log(error);
  }
  return [a, b, c];
}
// demo1().then(console.log).catch(err=>{
//     console.log('catch err');
//     console.log(err);
// })
// myAsync(function* () {
//   const a = yield 1;

//   //   const k = 1
//   //   k=2

//   const b = yield new Promise(
//     (res, rej) => {
//       setTimeout(() => {
//         res(2);
//       }, 2000);
//     }
//   );
//   const c = yield Promise.resolve(3);
//   console.log(a, b, c);

//   try {
//     const d = yield Promise.reject(4);
//   } catch (error) {
//     console.log(error);
//   }

//   return [a, b, c];
// })
//   .then(console.log)
//   .catch((err) => {
//     console.log('catch err');
//     console.log(err);
//   });

async function demo2() {
  const a = await 'hello';
  const b = await 'world';
  console.log(a, b);

  b = 'err';

  return a + b;
}
// demo2()
//   .then(console.log)
//   .catch((err) => {
//     console.log('catch err');
//     console.log(err);
//   });

// myAsync(function* () {
//   const a = yield 'hello';
//   const b = yield 'world';
//   console.log(a, b);

//   b = 'err';

//   return a + b;
// })
//   .then(console.log)
//   .catch((err) => {
//     console.log('catch err');
//     console.log(err);
//   });
