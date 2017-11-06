---
title: 详解CSS中的函数
date: 2017-11-05 22:29:54
tags:
---


首先我们很好奇,css这一门都不能算的上是正常的编程语言,竟然还有函数这一回事,其实是有的,只是我们因为日常很少用到,所以一直没有听闻罢了。

## calc()

`calc()`从字面我们可以把他理解为一个函数`function`。其实calc是英文单词calculate(计算)的缩写，是css3的一个新增的功能，用于动态计算长度值。
通常會用來做數值的運算，尤其是針對於長寬等等，而他最特別的是運算的數值"不需要"相同單位.

###	calc()语法
calc()语法非常简单，就像我们小时候学加 （+）、减（-）、乘（*）、除（/）一样，使用数学表达式来表示：

	width: calc(四则运算);


###	calc()的运算规则
calc()使用通用的数学运算规则，但是也提供更智能的功能：

使用“+”、“-”、“*” 和 “/”四则运算；
可以使用百分比、px、em、rem等单位；
可以混合使用各种单位进行计算；
表达式中有“+”和“-”时，其前后必须要有空格，如”width: calc(12%+5em)”这种没有空格的写法是错误的；
表达式中有“*”和“/”时，其前后可以没有空格，但建议留有空格。


###	例子
	<!DOCTYPE html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width">
	  <title>JS Bin</title>
	</head>
	  <style>
	   .box{
	    width: 100%;
	    height: 500px;
	    background-color:red;
	    border:1px solid blue;
	  }
	
	  .box-child{
	    width: calc(100% - 100px);
	    height: calc(100% - 200px);
	    background-color:yellow;
	    border:1px solid #eee;
	  }
	  </style>
	<body>
	  <div class="box">
	    box
	    <div class="box-child">box-child</div>
	  </div>
	</body>
	</html>

![](https://i.imgur.com/tgYs6C4.png)

从效果我们可以看出,calc()可以动态计算我们的宽度,而且运算的时候數值"不需要"相同單位.

此外我们的居中方式也多了一种,通过calc()的话:

	<!DOCTYPE html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width">
	  <title>JS Bin</title>
	</head>
	  <style>
	    #box{
	      width: 200px;
	      height: 200px;
	      background-color:#eee;
	      position:absolute;
	      top:calc(50% - 100px);
	      left: calc(50% - 100px);
	    }
	  </style>
	<body>
	  <div id="box"></div>
	</body>
	</html>




## attr()
`attr()` 函数返回选择元素的属性值。
`content`属性和`attr`函数,在我们实际开发过程还是十分有用的,就是用来动态生成文本内容并展示在页面上.

### attr()的日常使用
下面让我们看看 attr 和 content 如何相互配合产生神奇效果的
	<div class="title" data-title="attr"></div>

	div[data-line]:after { 
		content:attr(data-title);
        display:block;
        font-size:12px;
        margin-top: 10px;
	}

在页面就会直接展示attr这段文字了,然后我们通过`JavaScript`改变`data-title`的值,就能够动态改变文字的显示了。十分简单.
不需要用`JavaScript`里拼装字符串,CSS3里就能完成这些，是不是感觉CSS3可以部分的替代Javascript了！
attr的动态生成页面内容的能力着实是一件让人兴奋的事情。你实际上可以用它配合content对页面的很多其他元素和属性进行操作。


## linear-gradient()
linear-gradient() 函数用于创建一个线性渐变的 "图像"。
以往我们做渐变效果,只能通过图片来实现,但现在有了`linear-gradient()`,我们就能通过它来制作想要的渐变背景了。
为了创建一个线性渐变，你需要设置一个起始点和一个方向（指定为一个角度）的渐变效果。你还要定义终止色。终止色就是你想让Gecko去平滑的过渡，并且你必须指定至少两种，当然也会可以指定更多的颜色去创建更复杂的渐变效果。

### linear-gradient()语法

	background: linear-gradient(direction, color-stop1, color-stop2, ...);

`direction`是指用角度值指定渐变的方向（或角度）。
 to left：设置渐变为从右到左。相当于: 270deg
 to right：设置渐变从左到右。相当于: 90deg
 to top：设置渐变从下到上。相当于: 0deg
 to bottom：设置渐变从上到下。相当于: 180deg。这是默认值，等同于留空不写。
 xxxdeg:设置渐变角度。
`color-stop1、color-stop2....`用于指定渐变的起止颜色,颜色数量不限制,即可以制作大于两种颜色以上的渐变背景。

因为很简单,所以就不多介绍了,[详细可看MDN
](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient)