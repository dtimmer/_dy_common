/**
 * 自动获取form表单并转换成对象返回
 * @param  {String} name form表单的name
 * @return {Object}      返回表单元素键值对对象
 */
function getFormByName(name) {
  var __formParams = {};
  if(document.forms[name]) {
    [].forEach.call(document.forms[name], function(v, i) {
      // 如果为多选select，需要遍历options获取数组
      if(v.type == "select-multiple") {
        __formParams[v.name] = [].filter.call(v.options, function(v) {
          return v.selected
        }).map(function(v) {
          return v.value;
        });
      } else {
        __formParams[v.name] = v.value;
      }
    });
  }
  return __formParams;
}

/**
 * 获取鼠标选中的文本
 */
function getSlecttion() {
  // h5获取选择文本
  if(window.getSlecttion) {
    return window.getSlecttion().toString();
  } else {  // ie
    return document.selection.createRange().text;
  }
}

/**
 * 页面加载完毕之后自动执行
 * @return {Function} 执行函数，将需要自动执行的方法作为参数传入
 */
var whenReady = (function() {
	var funcs = [];	// 保存所有需要执行的方法
	var ready = false;	// 页面准备完毕之后，修改为true

	// 当文档处理完毕，调用事件处理程序
	function handler(e) {
		// 如果执行过了，直接返回
		if(ready) {
			return;
		}

		// 如果发生过readysyayechange事件，但是状态不为complete，那么文档没有准备好
		if(e.type === "readystatechange" && document.readyState !== "complete") {
			return;
		}

		// 运行所有注册函数
		for(var i = 0; i < funcs.length; i++) {
			funcs[i].call(document);
		}

		// 设置ready为true,并移除所有方法
		ready = true;
		funcs = null;
	}

	// 为接收到的任何事件注册处理程序
	if(document.addEventListener) {
		document.addEventListener("DOMContentLoaded", handler, false);
		document.addEventListener("readystatechange", handler, false);
		document.addEventListener("load", handler, false);
	} else if(document.attachEvent) {	// 处理ie兼容
		document.attachEvent("onreadystatechange", handler);
		document.attachEvent("onload", handler);
	}

	// 返回whenReady函数
	return function whenReady(f) {
		if(ready) {
			f.call(document);
		} else {
			funcs.push(f);
		}
	}
}());
