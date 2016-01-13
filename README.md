#ui-checkbox 多选插件
可统一checkbox在不同浏览器下的显示效果
##[demo](http://wangxing218.github.io/ui-checkbox/test/demo.html)

##基于jquery,使用非常方便！
```javascript
// 实例化所有的checkbox
$('.ui-checkbox').ui_checkbox();

// 取得已实例的checkbox对象,默认将data值存在checkbox同组（name相同）的第一个元素
var uc = $('#ur_01').data('ui-checkbox');

// 值改变事件
uc.change = function(val, item) {
    $('#info').text(val);
}

// API

// uc.val()             //获取值
// uc.val(['2','3'])    //设置值
// uc.selectAll()       //全选
// uc.disable(2)        //禁用指定元素（不给参数时禁用所有checkbox）
// uc.enable(2)         //启用指定元素（不给参数时启用所有checkbox）

```
##兼容性
IE8+, Chrome, Firefox, Edge, 360, Sougou 等主流浏览器;

##作者
###网站： <a href="http://www.boyxing.com/" target="_blank">www.boyxing.com 星仔博客</a>
### QQ ： <a href="http://wpa.qq.com/msgrd?v=3&uin=1263996779&site=qq&menu=yes" target="_blank">1263996779</a>



