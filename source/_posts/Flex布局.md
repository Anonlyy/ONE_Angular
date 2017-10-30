---
title: Flex布局
date: 2017-10-24 14:50:29
tags:
---

开篇我们先来看看传统的CSS布局格式,布局的传统解决方案：

基于盒状模型，依赖 `display` 属性 + `position`属性 + `float`属性。它对于那些特殊布局非常不方便，比如，垂直居中和绝对居中就很不容易实现。况且 `float` 用多了还得清除浮动.

## Flex是什么鬼?
![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071002.png)

`Flex` 是 `Flexible Box` 的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为 `Flex` 布局,只要加个 `display` 属性。
在这里先不考虑各浏览器的适配问题.在文末会提供解决方案。

注意，设为 `Flex` 布局以后，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效。

###	基本概念
采用 `Flex` 布局的元素，称为 `Flex` 容器（flex container），简称"**容器**"。它的所有子元素自动成为容器成员，称为 `Flex` 项目（flex item），简称"**项目**"。

通俗的说,就是**容器**是父元素,**项目**是子元素。
![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)

容器默认存在两根轴：水平的**主轴**（main axis）和垂直的**交叉轴**（cross axis）。其实就是**横轴**和**纵轴**。

###	容器的属性
- `flex-direction`(属性决定主轴的方向（即项目的排列方向))
- `flex-wrap`(`flex-wrap`属性定义，如果一条轴线排不下，如何换行。)
- `flex-flow`(`flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式)
- `justify-content`(定义了项目在主轴上的对齐方式)
- `align-items`(定义项目在交叉轴上如何对齐)
- `align-content`(`align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。)

###	项目的属性

- `order`(性定义项目的排列顺序。数值越小，排列越靠前，默认为0。)
- `flex-grow`(属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。)
- `flex-shrink`(属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。)
- `flex-basis`(属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。)
- `flex`(是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为0 1 auto)
- `align-self`(属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性)

关于 Flex 布局的语法基础就讲到这里，相信能看到这里你一定会有收获。

如果你看完还是一头雾水的话，没关系，可以看[这篇文章](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)。


##	兼容性与各浏览器差异性解决方案

通过`PostCSS`的`autoprefixer`插件,即能自动添加浏览器私有前缀,防止出现各大浏览器中展示效果不同的情况。

访问这篇文章[《PostCSS入门》](http://www.xposean.xin/2017/10/24/PostCSS%E5%85%A5%E9%97%A8/)。

如果不想麻烦使用`PostCSS`,也可以通过`gulp`安装[gulp-autoprefixer](http://www.ydcss.com/archives/94)插件,一样可以达到效果。