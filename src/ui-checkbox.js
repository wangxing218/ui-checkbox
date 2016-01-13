/**
 * ui-checkbox单选插件
 * 基于jQuery
 */
; + function($) {
    "use strict";
    // 默认实例化配置
    var defaults = {
        skin: '',
        dataKey: 'ui-checkbox', //实例化后的data键值，方便后续通过data('ui-checkbox')取出；
        change: null //checkbox 值改变时的回调；
    };


    /**
     * ui-checkbox插件
     */
    $.fn.ui_checkbox = function(options) {
        var _this = $(this),
            _num = _this.length;
        $.fn.ui_checkbox.list = {};
        if (!_num)
            return;

        _this.each(function(index, el) {
            var _el = $(el),
                _name = _el.prop('name');
            if (!$.fn.ui_checkbox.list[_name]) {
                $.fn.ui_checkbox.list[_name] = new UI_checkbox($('input:checkbox[name="' + _name + '"]'), options);
            }
        })

    };

    /**
     * UI_checkbox对象
     * @param {[jQuery]} el  [jQuery选择后的对象，此处传入的为name值相同的一组checkbox]
     * @param {[object]} opt [设置的参数]
     */
    function UI_checkbox(el, opt) {
        this.el = el;
        this.name = this.el.prop('name');
        this._fisrt = this.el.eq(0);
        this._opt = $.extend({}, defaults, opt);
        return this._init();
    }

    // UI_choose 原型链扩展。
    UI_checkbox.prototype = {

        // init初始化;
        _init: function() {
            var _data = this._fisrt.data(this._opt.dataKey);
            // 如果已经实例化了，则直接返回
            if (_data)
                return _data;
            else
                this._fisrt.data(this._opt.dataKey, this);

            // 判断是否为IE8-
            var _ie = navigator.userAgent.toLocaleLowerCase().match(/msie ([\d.]+)/);
            if (_ie && _ie[1] <= 8.0) {
                this._lowIE = true;
            }
            // 组建dom,绑定事件
            this._setHtml();
            this._bindEvent();
        },

        // 组建并获取相关的dom元素-ul;
        _setHtml: function() {
            var _html = '<span class="ui-checkbox"></span>';
            var _this = this;
            this.el.each(function(index, el) {
                var _self = $(el);
                _self.after(_html);
                // ie8兼容
                _this._check(_self, _self.prop('checked'));
                _this._disable(_self, _self.prop('disabled'));
            });
            this._wrap = this.el.next('span.ui-checkbox').addClass(this._opt.skin);
            return this;
        },

        // 绑定事件；
        _bindEvent: function() {
            var _this = this;
            _this.el.on('change', function() {
                var _self = $(this);
                _this._check(_self, _self.prop('checked'));
                _this._triggerChange(_this.val(), _self);
            });
            return _this;
        },

        // 让指定元素选中/非选中的兼容写法
        _check: function(items, value) {
            value = value || false;
            items.prop('checked', value);
            var _wrap = items.next('span.ui-checkbox');
            if (this._lowIE) {
                value ? _wrap.removeClass('off').addClass('on') : _wrap.removeClass('on').addClass('off');
            }
            return this;
        },
        // 让指定元素选中/非选中的兼容写法
        _disable: function(items, disabled) {
            disabled = !!disabled || false;
            items.prop('disabled', disabled);
            var _wrap = items.next('span.ui-checkbox');
            if (this._lowIE) {
                disabled ? _wrap.addClass('disabled') : _wrap.removeClass('disabled');
            }
            return this;
        },
        // change 触发
        _triggerChange: function(value, items) {
            if (typeof this._opt.change == 'function'){
                this._opt.change.call(this, value, items);
            }
            this.change(value, items);
        },

        // 获取值；
        val: function(value) {
            // getValue
            if (arguments.length == 0) {
                var _val = [];
                this.el.filter(':checked').each(function(index, el) {
                    _val.push($(this).val());
                });
                return _val;
            }
            // setValue
            value = typeof value == 'object' ? value : [value];
            // 如果传入的数组为数字类型将全部转为字符串
            value = value.join(':::,:').split(':::,:');
            var _oValue = this.val();
            var _nValue = [];
            var _this = this;
            this.el.each(function(index, el) {
                var _self = $(this);
                if ($.inArray(_self.val(), value) >= 0) {
                    _this._check(_self, true);
                    _nValue.push(_self.val());
                } else {
                    _this._check(_self, false);
                }
            });
            _oValue.sort().toString() != _nValue.sort().toString() ? this._triggerChange(_nValue) : null;
            return this;
        },

        // selectAll全选
        selectAll: function() {
            var _val = [];
            this.el.each(function(index, el) {
                var _self = $(this);
                if (!_self.prop('disabled')) {
                    _val.push(_self.val());
                }else if(_self.prop('checked')){
                    _val.push(_self.val());
                }
            });
            this.val(_val);
        },

        // checkbox值改变事件；
        change: function(val, item) {},

        // 禁用
        disable: function(index) {
            if (index === undefined) {
                this._disable(this.el, true);
            } else {
                this._disable(this.el.eq(index), true);
            }
            return this;
        },

        // 启用
        enable: function(index) {
            if (index === undefined) {
                this._disable(this.el, false);
            } else {
                this._disable(this.el.eq(index), false);
            }
            return this;
        }
    };
}(jQuery);
