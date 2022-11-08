const AsyncSeriesHook = require("../node_modules/tapable/lib/AsyncSeriesHook");

const hook = new AsyncSeriesHook(["param1", "param2"]); //先实例化，并定义回调函数的形参
console.time("time");
//异步钩子需要通过tapAsync函数注册事件,同时也会多一个callback参数，执行callback告诉hook该注册事件已经执行完成
hook.tapAsync("测试1", (param1, param2, callback) => {
  console.log("测试1接收的参数：", param1, param2);
  setTimeout(() => {
    callback();
  }, 1000);
});

hook.tapAsync("测试2", (param1, param2, callback) => {
  console.log("测试2接收的参数：", param1, param2);
  setTimeout(() => {
    callback();
  }, 2000);
});

hook.tapAsync("测试3", (param1, param2, callback) => {
  console.log("测试3接收的参数：", param1, param2);
  setTimeout(() => {
    callback();
  }, 3000);
});

hook.callAsync("hello", "world", (result) => {
  //等全部都完成了才会走到这里来
  console.log("这是成功后的回调", result);
  console.timeEnd("time");
});
