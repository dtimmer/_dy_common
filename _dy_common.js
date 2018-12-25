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
