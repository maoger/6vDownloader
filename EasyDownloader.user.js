// ==UserScript==
// @name         EasyDownloader
// @namespace    http://tampermonkey.net/
// @homepage     https://github.com/maoger/EasyDownloader
// @version      0.1
// @description  方便获取所有下载链接，批量下载。
// @author       Maoger
// @include      http*://*
// @require      http://code.jquery.com/jquery-3.2.1.js
// @updateURL    https://openuserjs.org/meta/maoger/EasyDownloader.meta.js

// ==/UserScript==

(function() {
    'use strict';

    // 定位
    var $DingWei = $("#search");

    // 新建：装载 下载链接 数据的容器
    var $XunLei_Container = $("<div/>")
        .html("<br /><hr /><span style='font-size: 16px'>当前页面的所有迅雷下载链接，如下所示；<br />在<b style='color: #ff0000'>打开迅雷</b>的情况下，<b style='color: #ff0000'>复制</b>以下链接即可批量下载。</span><br />");


    // 将 下载链接容器 插入 首页“下载链接”标签后
    $XunLei_Container.insertAfter($DingWei);

    // 新建：存放进度条的容器
    var $loadContainer = $("<div/>")
        .addClass("barSpace")
        .css({
            "margin" : "0.25px 0px",
            "background" : "grey",
            "border-radius" : "1px",
        });

    // 将进度条的容器插入 下载链接容器 和 首页“下载链接”标签 中间
    $loadContainer.insertAfter($DingWei);

    // 新建：进度条
    var $bar = $("<span/>")
        .attr("id" , "barsmooth" )
        .addClass("smooth")
        .css({
            "height" : "0.25px",
            "width" : "0%",
            "border-radius" : "1px",
            "display" : "block",
            "box-shadow" : "0px 0px 10px 1px #CC66FF",// 原来这里使用的是3B8CF8
            "background-color" : "#fff"
        });

    // 插入：将“进度条”插入“进度条容器”中
    $loadContainer.append($bar);

    // 定义：一个Number类型变量，用于设置进度条的width的百分比
    var m = 0;

    // 加载 下载链接
    var c ='';
    var hrefArr = document.getElementsByTagName('a');
    var n = hrefArr.length;
    for( var i=0; i<hrefArr.length; i++ ){
        // 设置进度条显示的百分比
        var loadingRate = self.setInterval(function (){
            if ( m < (i-1)*(200/n) ) {
                m = (i-1)*(200/n);
                $bar.css("width",m.toString() + "%");
            }
            else if( m < i*(200/n) ){
                m = m + 0.1;
                $bar.css("width",m.toString() + "%");
            }
            if ( m >= 100 ) {
                clearInterval(loadingRate);
                setTimeout(function(){
                    $loadContainer.css("margin","0px");
                    $bar.css({"width" : "0%","height":"0px"});
                },600);
            }
        },10);

        c = hrefArr[i].href;
        if (c.indexOf("ed2k")>=0){
            // 构建包裹元素
            var $elt = $("<table/>")
            .addClass("tablebox")
            .css({
                "text-align": "left"
            })
            .html("<span>" + c + "</span>");
            $XunLei_Container.append($elt);
        }

    }

var $hr = $("<div/>")
    .html("<hr /><br />");
$XunLei_Container.append($hr);
})();