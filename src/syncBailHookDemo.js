/**
 * SyncBailHook是一个保险类型的同步Hook，意思是只要其中一个有返回了，后面的就不执行了
 */

const { SyncBailHook } = require("tapable");

const hook = new SyncBailHook(["author", "age"]); //先实例化，并定义回调函数的形参

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
hook.call("不要秃头啊", "99");
