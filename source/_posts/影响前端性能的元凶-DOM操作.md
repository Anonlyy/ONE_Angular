---
title: '影响前端性能的元凶:DOM操作'
date: 2017-10-24 21:42:09
tags:
---
今天我们来谈谈影响前端性能的主要元凶:**DOM操作.**

##	重视DOM操作的原因?
在**PC浏览器**的时代,一般的小批量重绘或回流是感觉不出浏览器卡顿的,这主要是因为PC端的浏览器性能强而且网速够快,但到了如今我们的**移动浏览器**时代,轻微的DOM操作,在我们性能稍弱,网速不够快的移动浏览器上,影响性能的表现就会很明显了。

## DOM操作为什么会影响性能

在浏览器中，`DOM`的实现和`ECMAScript`的实现是分离的。所以通过`JavaScript`代码调用DOM接 口，相当于两个独立模块的交互。相比较在同一模块中的调用，这种跨模块的调用其性能损耗是很高的。但`DOM`操作对性能影响最大其实还是因为它导致了浏览器 的**重绘**和**回流**。

**重绘**（repaint）:当前元素的颜色样式(背景颜色、字体颜色等)发生改变的时候，我们只需要把改变的元素重新的渲染一下即可，重绘主要改变外观风格（改个颜色，换个皮肤），不改变布局，不影响其他的dom。

**回流**（reflow）:指浏览器为了重新渲染部分或者全部的文档而重新计算文档中元素的位置和几何构造的过程。如`DOM`元素的增删、位置移动、尺寸大小的改变以及浏览器窗口尺寸改变。每个页面至少会有一次回流,就是在页面初次渲染的时候。

这其中,重绘对浏览器的性能影响较小,一般不做优化，但是能避免最好.主要是回流需要尽可能避免和优化。

## 浏览器的渲染原理

在渲染页面的过程中，浏览器会通过解析HTML文档来构建DOM树，解析`CSS`产生`CSS`规则树。`JavaScript`代码在解析过程中， 可能会修改生成的`DOM树`和`CSS`规则树。之后根据`DOM`树和`CSS`规则树构建渲染树，在这个过程中`CSS`会根据选择器匹配HTML元素。渲染树包括了每 个元素的大小、边距等样式属性，渲染树中不包含隐藏元素及`head`元素等不可见元素。最后浏览器根据元素的坐标和大小来计算每个元素的位置，并绘制这些元 素到页面上。重绘指的是页面的某些部分要重新绘制，比如颜色或背景色的修改，元素的位置和尺寸并没用改变；回流则是元素的位置或尺寸发生了改变，浏览器需 要重新计算渲染树，导致渲染树的一部分或全部发生变化。渲染树重新建立后，浏览器会重新绘制页面上受影响的元素。
![](http://it.dyg.cn/wp-content/uploads/2017/10/snipaste_20171013_112243.png)

这就是DOM树
![DOM树](http://it.dyg.cn/wp-content/uploads/2017/10/w_800-750x334.png)

**回流**的代价比**重绘**的代价高很多，重绘会影响部分的元素，而回流则有可能影响全部的元素。

>注意：回流必将引起重绘，而重绘不一定会引起回流。

## 那我们怎样优化和避免重绘和回流?

###	1. 合并多次的DOM操作为单次的DOM操作
	var element = document.getElementById('content');
	//多次的DOM操作
	element.style.borderColor = 'white';
	element.style.borderStyle = 'solid';
	element.style.borderWidth = '1px';
	//优化方案:1.可合并为一次
	element.style.cssText += 'border: 1px solid white;background-color:green;';
	//2.添加className
	element.className += 'empty';

###	2.把DOM元素隐藏后修改、动画效果应用到position属性为absolute或fixed的元素上
把DOM元素从页面流中脱离或隐藏，这样处理后，只会在DOM元素脱离和添加时，或者是隐藏和显示时才会造成页面的重绘或回流，对脱离了页面布局流的DOM元素操作就不会导致页面的性能问题。这种方式适合那些需要大批量修改DOM元素的情况。

	var myElement = document.getElementById('content');
	myElement.style.display = 'none';
	// 一些基于myElement的大量DOM操作
	...
	myElement.style.display = 'block';

### 3.克隆DOM元素到内存中
这种方式是把页面上的DOM元素克隆一份到内存中，然后再在内存中操作克隆的元素，操作完成后使用此克隆元素替换页面中原来的DOM元素。这样一来，**影响性能的操作就只是最后替换元素的这一步操作了，在内存中操作克隆元素不会引起页面上的性能损耗**。

	var old = document.getElementById('content');
	var newElement= old.cloneNode(true); //复制DOM元素到内存中
	// 一些基于clone的大量DOM 操作
	...
	//替换原来DOM元素
	old.parentNode.replaceChild(newElement, old);

###	4.使用JS模板引擎
在大批量的`DOM`元素操作,其实最方便或最有效的操作,应该是使用JS模板引擎,例如有`artTemplate`、`Mustache`等

###	5.使用Virtual DOM.
这也是目前主流的前端框架(`Reac`t、`Vue`、`Angular`)所使用的方式,将会在[下一节](http://www.xposean.xin/2017/10/24/VirtualDOM%E5%8E%9F%E7%90%86%E6%A6%82%E8%BF%B0/)详细讲述。
