---
title: jQuery的插件机制
date: 2017-10-24 16:05:52
tags:
---

## jQuery框架现况分析和概述
![](http://it.dyg.cn/wp-content/uploads/2017/09/151009222057-15-1-300x207.png)
虽然jQuery的市场占有率正逐年下滑,但不可避免的,jQuery仍是目前前端领域里使用率最高的前端框架,仍旧需要深入学习它,利用它更方便的写出优秀的前端代码。

先来回顾一下,jQuery的优秀之处:
1. 强大的DOM选择器
2. 可靠的事件处理器
3. 完善的Ajax函数
4. 链式操作
5. 出色的浏览器兼容性
6. 强大的插件支持

而本篇文章主要讲解的就是`jQuery`框架强大的**插件系统**支持,且听我慢慢道来.

##	jQuery的插件系统概述
首先编写插件的目的很明确,就是为了能够让代码的**复用性更强**,**提高可维护性和开发效率**。

那首先,`jquery`的插件主要分为三种类型:

###	封装对象方法的插件
这种是将对象方法封装起来,用于对通过选择器获得JQuery对象进行操作,也是最常用的插件类型。

简单的举例就是我们在`jQuery`用的`addClass()`、`parent()`此类的方法都是属于这种类型的插件。

###	封装全局函数的插件

可以将独立的函数(方法)加到JQuey命名空间下.例如`jQuery`中的`$.Ajax()`和`$.trim()`这种就属于`jquery`编写的作为全局函数使用的插件。

###	选择器插件

这个就很好理解了,虽然我们的Jquery的选择器非常的强大且丰富,但仍不是尽善尽美的,仍然有时候需要扩展一些我们自定义的选择器。

**注意事项:**
为了防止我们内部编写的变量影响到全局空间,我们在编写插件的时候必须通过一段代码来包裹我们的编写的代码体。

	;(function($){
		/* 放置我们的插件代码,并且可以通过$来作为JQuery的缩写别名*/
	})(jQuery);
这样的话,我们写的插件里的变量不会污染到全局空间,而且我们在代码中还能继续使用过$来作为`jQuery`的缩写别名.

##	JQuery的插件机制

简单介绍了`jQuery`插件以及其类型,我们再来讲讲`jQuery`的插件机制,`jQuery`是用什么来创建我们的插件的呢？

`jQuery`提供了两个用于扩展`JQuery`功能的方法,即`jQuery.fn.extend(`)和`jQuery.extend()`方法。

`jQuery.fn.extend()`用来扩展我们前面提到的第一种类型的插件,

`jQuery.extend()`用来扩展第二和第三类型的插件。

这两个方法都接受一个`Object`类型的参数。


##	编写jQuery插件

###	封装JQuery对象方法的插件
在这里我们要编写一个能够设置对象颜色的插件。

	<!DOCTYPE html>
	<html>
	  <head>
	    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	    <script class="jquer" src="/js/sandbox/jquery/jquery-1.8.2.min.js" type="text/javascript"></script>
	    <title>演示代码</title>
	  </head>
	<body>
	    <div class='content'>hello</div>
	  </body>
	</html>
	<script>
	;(function($){
	  jQuery.fn.extend({
	    "color":function(value){
	      return this.css('color',value);
	    }
	  })
	})(jQuery);
	
	$(function(){
	  $('.content').color('red');
	});
	</script>
在这段代码中,我们通过`$.fn.extend()`就能够封装一个JQ对象的插件函数了。

通过`$('xxx').color('color')`,我们就能直接给DOM元素设置颜色了,极其方便好用。

### 封装全局函数的插件
同样的我们可以编写一个能够清除去除左侧空格的插件函数。

	<!DOCTYPE html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width">
	  <title>JS Bin</title>
	</head>
	<body>
	<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
	  <div class="content1">
	    
	  </div>
	</body>
	</html>
	<script>
	;(function($){
	    $.extend({
	        ltrim:function(text){
	            return (text||"").replace(/^\s+/g,"");
	        }
	    });
	})(jQuery);
	$(function(){
	    var str = "           2222";
	    alert($.ltrim(str));
	});
	</script>

在这段代码里,我们定义了一个全局函数的插件,来实现去除字符串左侧空格的功能,通过`$.extend()`设置后,我们就可以直接通过`$.ltrim(xxx)`来设置了。


###	封装自定义选择器

首先,我们以自带的选择器例子来做介绍:

	$("div:gt(1)")
这个例子中,选择器会首先找到所有div的元素,再遍历这些元素,然后将这些元素和”1″和下标一起传入gt选择器对应的选择器函数中。根据函数里编写的代码,如若返回true,则该元素会保留,反之,该元素就会被忽略。

而例子中的gt选择器函数转化成自定义的**选择器函数**是这样的:

	function(a,i,m){
	  return i>m[3]-0;
	}

第一个参数a:指的是当前遍历的DOM元素;

第二个参数i:指的是当前遍历的DOM元素的索引值,从0开始;

第三个参数m:他是由JQuery解析出来的一个数组.
![](http://it.dyg.cn/wp-content/uploads/2017/09/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20170910170144.png)

介绍完这些,接下来我们来自己编写一个自定义的选择器:

创建一个根据你传入的字符串等于DOM元素文本内容的选择器:

	<!DOCTYPE html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width">
	  <title>JS Bin</title>
	</head>
	<body>
	<script src="https://code.jquery.com/jquery-2.2.4.js"></script>
	  <p>111</p>
	  <p>222</p>
	  <p>333</p>
	  <p>444</p>
	  <p>555</p>
	  <p>666</p>
	  <p>777</p>
	</body>
	</html>
	<script>
	;(function($){
	  $.extend($.expr[":"],{
	    "equal": function(a,i,m){
	      return $(a).text()==m[3];
	    }
	  });
	})(jQuery);
	$(function(){
	  $('p:equal(111)').css('color',"red");
	});
	</script>

该选择器会根据传入的字符找到字符相等的元素。

因为选择器函数是属于调用**十分频繁**的函数,所以在编写的时候,一定要秉承优化再优化的原则,不能草草了事。


## 总结

以上就是jQuery的插件系统,利用好插件,可以给我们的开发工作带来十分大的效率提升。
