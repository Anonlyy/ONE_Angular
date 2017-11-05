---
title: CSS盒模型详解
date: 2017-11-05 12:38:19
tags:
---

在整理收集前端面试题的时候,经常有关于CSS盒模型的问题,属于经典问题了。很多博客里讲得也很模糊不清，于是，我在这里重新整理一下。


##	概念
可以认为每个html标签都是一个方块，然后这个方块又包着几个小方块，如同盒子一层层的包裹着，这就是所谓的盒模型。
其实就是我们平常F12检查元素的时候页面表示出来的这个图片。

![](https://user-gold-cdn.xitu.io/2017/10/25/9cb491d4bd5d326aeb16632280411283?imageView2/0/w/1280/h/960/ignore-error/1)

从上图即可知,正常的一个盒子的内容包括:
1. margin
2. border
3. padding
4. content
四部分组成。

##	分类和区别
那盒模型是分为 **IE盒模型** 和 **W3C标准盒模型**。

### 区别是?
1. W3C 标准盒模型：

属性`width`,`height`只包含内容`content`，不包含`border`和`padding`。

2. IE 盒模型：

属性`width`,`height`包含`border`和`padding`，指的是`content`+`padding`+`border`。

意思是什么呢?
就是如果是W3C 标准盒模型,那么我们的宽度和高度就不包括边框和内边距了,即这种模型下,我们如果已经设置了宽高度,那么即便改变了`border`和`padding`的大小,也不会改变整个元素的宽高。


##	日常开发注意事项

在我们日常的CSS开发中,默认浏览器渲染的时候都是 W3C 标准盒模型.
在这种盒模型下,我们的日常开发会遇到什么问题呢？
假设我们设定了一个div元素
	.box{
        width:200px;
        height:200px;
        background-color:pink;
	}

这个时候我们检查`.box`元素,没有意外,高宽都是200px.
那接着我们继续添加CSS元素,
	.box{
        width:200px;
        height:200px;
        background-color:pink;
        padding:20px;
        border:10px solid black;
	}	

这个时候我们再检查元素,高宽就变成了 200+20+20+10+10=260 了。
说明`padding`和`border`会把整个盒子**撑高撑大**。
那这种情况给我们的开发者就造成一种困扰,我已经设置高宽是200px的情况下,就是不想要有其他属性再去影响它了.
而且如果我们是一行多个元素百分比布局的情况下,一旦给单个元素添加了`padding`或`border`元素的话,就会影响单个元素宽度,"一行"变成"两行",极不美观.

于是,我们`CSS3`添加了一个属性:`box-sizing`,他的默认属性值就是`content-box`(即 W3C 标准盒模型),那么当我们的把属性值设置为`border-box`(IE盒模型)之后,以上出现的问题就迎刃而解了。

因为在这种模型下,我们盒子的宽高度是包括`padding`和`border`的,即便我们给某个元素设置了padding或border值,也不会变动元素的宽高度,也不会撑大撑高元素。

所以在日常CSS开发过程中,在设置全局css中(如bootstrap),我们都会给所有元素添加一个属性就是:
	box-sizing:border-box;

