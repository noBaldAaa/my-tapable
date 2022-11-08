class SyncHook {
  constructor(args) {
    this.args = Array.isArray(args) ? args : []; //形参列表
    this.taps = []; //这是一个数组，用来存放我们的回调函数
  }

  tap(option, fn) {
    //如果传入的是字符串，包装成对象
    if (typeof option === "string") {
      option = { name: option };
    }
    const tapInfo = { ...option, type: "sync", fn }; //type=sync 注册的是同步回调函数fn
    this.taps.push(tapInfo);
  }

  call(...args) {
    const callFunction = this.compile({
      taps: this.taps, //tapInfo的数组 [{name,fn,type}]
      args: this.args, //形参数组
      type: "sync",
    }); //动态创建一个call方法 这叫懒编译或者动态编译，最开始没有，用的时候才去创建执行
    return callFunction(...args);
  }

  compile({ args, taps, type }) {
    const getHeader = () => {
      let code = "";
      code += `var taps=this.taps;\n`;
      return code;
    };

    const getContent = () => {
      let code = "";
      for (let i = 0; i < taps.length; i++) {
        code += `var fn${i}=taps[${i}].fn;\n`;
        code += `fn${i}(${args.join(",")});\n`;
      }
      return code;
    };

    return new Function(args.join(","), getHeader() + getContent());
  }
}

module.exports = SyncHook;
