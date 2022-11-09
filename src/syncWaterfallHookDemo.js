/**
 * SyncWaterfallHook是一个瀑布式类型的同步钩子。瀑布类型的钩子就是如果前一个事件函数的结果 `result !== undefined`，则 result 会作为后一个事件函数的第一个参数（也就是上一个函数的执行结果会成为下一个函数的参数）
 */

const { SyncWaterfallHook } = require("tapable");

const hook = new SyncWaterfallHook(["author", "age"]); //先实例化，并定义回调函数的形参

//通过tap函数注册事件
hook.tap("测试1", (param1, param2) => {
  console.log("测试1接收的参数：", param1, param2);
});

hook.tap("测试2", (param1, param2) => {
  console.log("测试2接收的参数：", param1, param2);
  return "123";
});

hook.tap("测试3", (param1, param2) => {
  console.log("测试3接收的参数：", param1, param2);
});

//通过call方法触发事件
hook.call("不要秃头啊", "99");
