/**
 * [自动获取form表单并转换成对象返回]
 * @param  {[String]} name [form表单的name]
 * @return {[Object]}      [返回表单元素键值对对象]
 */
function getFormByName(name) {
  var __formParams = {};
  if(document.forms[name]) {
    [].forEach.call(document.forms[name], function(v, i) {
      __formParams[v.name] = v.value;
    });
  }
  return __formParams;
}
