// ==UserScript==
// @name         6vDownloader
// @homepage     https://github.com/maoger/6vDownloader
// @version      0.7.200222
// @description  [追剧专用]方便获取所有视频的下载链接，批量下载。
// @author       Maoger
// @match        http*://*.6vhao.tv/*
// @match        http*://*.66s.cc/*
// @match        http*://*.6vgood.com/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @updateURL    https://openuserjs.org/meta/maoger/6vDownloader.meta.js
// @copyright    2019-2020, maoger (https://openuserjs.org/users/maoger)
// @license      MIT

// ==/UserScript==

(function() {
    'use strict';

    var $position = $("body");
    var $hr = $("<div/>")
        .html("<br /><hr /><br />");

    // ed2k
    var $ed2k_Container = $("<div/>")
        .html("<br /><hr /><span style='font-size: 16px'>当前页面的所有迅雷下载链接，如下所示；<br />在<b style='color: #ff0000'>打开迅雷</b>的情况下，<b style='color: #ff0000'>复制</b>以下链接即可批量下载。<br /><br /><strong>类型1：</strong> ed2k类型（电驴）下载链接：<hr style='height:1px;border:none;border-top:1px dashed #ADADAD;'/></span>");
    $ed2k_Container.insertAfter($position);

    // magnet
    var $magnet_container = $("<div/>")
        .html("<br /><hr /><span style='font-size: 16px'><strong>类型2：</strong> magnet类型（磁力）下载链接:<hr style='height:1px;border:none;border-top:1px dashed #ADADAD;'/></span>");
    $magnet_container.insertAfter($ed2k_Container);
    $hr.insertAfter($magnet_container);

    // thunder
    var $thunder_container = $("<div/>")
        .html("<br /><hr /><span style='font-size: 16px'><strong>类型3：</strong> thunder类型（迅雷）下载链接:<hr style='height:1px;border:none;border-top:1px dashed #ADADAD;'/></span>");
    $thunder_container.insertAfter($magnet_container);
    $hr.insertAfter($thunder_container);

    // 进度条
    var $loadContainer = $("<div/>")
        .addClass("barSpace")
        .css({
            "margin" : "0.25px 0px",
            "background" : "grey",
            "border-radius" : "1px",
        });
    $loadContainer.insertAfter($position);
    var $bar = $("<span/>")
        .attr("id" , "barsmooth" )
        .addClass("smooth")
        .css({
            "height" : "0.25px",
            "width" : "0%",
            "border-radius" : "1px",
            "display" : "block",
            "box-shadow" : "0px 0px 10px 1px #CC66FF",
            "background-color" : "#fff"
        });
    $loadContainer.append($bar);

    var m = 0;

    var c ='';
    var hrefArr = document.getElementsByTagName('a');
    var n = hrefArr.length;
    for( var i=0; i<hrefArr.length; i++ ){
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

        var $elt = $("<table/>")
            .addClass("tablebox")
            .css({
                "text-align": "left"
            });

        if (c.indexOf("ed2k://")>=0){
            $elt.html("<span>" + c + "</span>");
            $ed2k_Container.append($elt);
        }
        if (c.indexOf("magnet:?")>=0){
            $elt.html("<span>" + c + "</span>");
            $magnet_container.append($elt);
        }
        if (c.indexOf("thunder://")>=0){
            $elt.html("<span>" + c + "</span>");
            $thunder_container.append($elt);
        }
    }
})();