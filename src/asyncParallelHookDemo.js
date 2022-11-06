const { AsyncParallelHook } = require("tapable");

const hook = new AsyncParallelHook(["param1", "param2"]); //先实例化，并定义回调函数的形参
console.time("time");
//异步钩子需要通过tapAsync函数注册事件,同时也会多一个callback参数，执行callback告诉hook该注册事件已经执行完成
hook.tapAsync("测试1", (param1, param2, callback) => {
  setTimeout(() => {
    console.log("测试1接收的参数：", param1, param2);
    callback();
  }, 2000);
});

hook.tapAsync("测试2", (param1, param2, callback) => {
  console.log("测试2接收的参数：", param1, param2);
  callback();
});

hook.tapAsync("测试3", (param1, param2, callback) => {
  console.log("测试3接收的参数：", param1, param2);
  callback();
});

//call方法只有同步钩子才有，异步钩子得使用callAsync
hook.callAsync("hello", "world", (err) => {
  //等全部都完成了才会走到这里来
  console.log("这是成功后的回调", err);
  console.timeEnd("time");
});
