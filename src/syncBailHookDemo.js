/**
 * SyncBailHook是一个保险类型的同步Hook，意思是只要其中一个有返回了，后面的就不执行了
 */

const SyncBailHook = require("../node_modules/tapable/lib/SyncBailHook");

const hook = new SyncBailHook(["param1", "param2"]); //先实例化，并定义回调函数的形参

//通过tap函数注册事件
hook.tap("测试1", (param1, param2) => {
  console.log("测试1接收的参数：", param1, param2);
});

//该监听函数有返回值
hook.tap("测试2", (param1, param2) => {
  console.log("测试2接收的参数：", param1, param2);
  return "123";
});

hook.tap("测试3", (param1, param2) => {
  console.log("测试3接收的参数：", param1, param2);
});

//通过call方法触发事件
hook.call("hello", "world");

function anonymous(param1, param2) {
  let fn0 = this.taps[0].fn;
  fn0(param1, param2);

  let fn1 = this.taps[1].fn;
  fn1(param1, param2);
}
anonymous("实参1", "实参2");
