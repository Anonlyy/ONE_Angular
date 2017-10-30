---
title: PostCSS入门
date: 2017-10-24 14:25:07
tags:
---

## 概述
我想你应该已经听说过[PostCSS](http://postcss.com/),它比[libsass](https://github.com/postcss/benchmark#preprocessors)快了几乎两倍(并且比Ruby Sass快了28倍)； 或者听说过它支持[cssnext](http://cssnext.io/)和自动添加私有前缀而且可扩展功能,难道你一点都不好奇吗？

PostCSS最强大之处在于它是模块化并且基于插件的架构，不过这也是个缺点。如果你之前在项目中使用Sass(比如大多数的设计师和前端开发者)，你从不需要配置任何东西——Sass内置了全部实用功能，开箱即用。 然而，PostCSS需要你做一些配置。你不得不从一眼看不到底的[插件列表](https://github.com/postcss/postcss/blob/master/docs/plugins.md)选择插件并且自己把全部插件一起配置。但这同时意味着它的自定义程度高,足够实现你想要的。

## 现状
PostCSS在以惊人的速度发展，而且越来越受人欢迎。越来越多的人开始在了解它，使用它。因为他们意识到，在项目中使用PostCSS让他们意识到了眼前一亮。

![](http://www.w3cplus.com/sites/default/files/blogs/2015/1510/postcssdownloads.png)

2014年总共不到140万的下载量，但从2015年1月份到6月份已经超过380万个下载。

**[Autoprefixer](https://github.com/postcss/autoprefixer)**是PostCSS中最流行的插件，其中Google、Shopify、Twitter、Bootstrap和Codepen都在使用这个插件。Wordpress也使用Autoprefixer插件，而且还使用RTLCSS插件。Alibaba使用了几个PostCSS插件，以及也参加PostCSS的开发。



## 运行PostCSS
运行PostCSS的方法有很多种。你可以很容易地将它添加到Gulp、webpack的构建过程中；
或者是通过最简单的方式,即postcss-cli来构建都是OK的,但因为我是习惯使用gulp,所以接下来介绍的是通过gulp配置,如果想使用其他方式构建，请自行度娘或google。

在已经安装了gulp的配置环境下,我们直接开始进行postCSS的配置.

### 开始配置
首先在你的项目中创建两个文件夹，一个命名为src，另一个命名为dest。src文件夹用来放置未处理的CSS文件，而dest用来放置PostCSS插件处理后的文件。

接下来需要做的就是在你的项目中安装gulp-postcss插件，安装好之后就可以使用PostCSS处理器。

打开你的命令终端(CMD)，并且进入到你的项目根目录下，然后在命令终端输入下面的命令：

	npm install --save-dev gulp-postcss

安装完成后你的项目结构看起来就应该像这样：
![](http://www.w3cplus.com/sites/default/files/blogs/2015/1510/gulpproject.png)

现在通过编辑器打开gulpfile.js文件，并且创建gulp和gulp-postcss变量，如下面代码所示：

	var gulp = require('gulp'); 
	var postcss = require('gulp-postcss');

那我们现在可以设置一个任务，让PostCSS读取CSS原文件并且处理它。

添加的代码如下：

	gulp.task('css', function () {
      var processors = [ ];
      return gulp.src('./src/*.css').pipe(postcss(processors)).pipe(gulp.dest('./dest')); 
	});
我们一起来看一下上面的代码。在第一行，设置了一个任务名叫css。这个任务将会执行一个函数，同时在这个函数中创建了一个名为processors的数组。现在这个数组为空，这里将插入我们想使用的PostCSS插件。
在processors数组后面，我们指定了需要处理的目标文件，即src目录中的任何CSS文件。

这里面使用了两个.pipe()函数，设置postcss()执行PostCSS，并且给postcss()传递processors参数，后面会告诉PostCSS要使用哪个插件。

接下来的第二个.pipe()函数，指定结过PostCSS处理后的CSS放置在dest文件夹中。

### 添加PostCSS插件
假设,现在我们添加需要的PostCSS插件：**Autoprefixer**(处理浏览器私有前缀)著作权归作者所有。
运行下面的命令，将插件安装到你的项目:

	npm install autoprefixer --save-dev
接下来，在我们的项目中定义变量，将这些插件加载到我们的项目中。和前面的方式一样，在**gulpfile.js**文件中添加下面的代码：

	 var autoprefixer = require('autoprefixer');
然后将这个插件添加到processors数组中，更新后的数组如下：

	var processors = [ autoprefixer];
插件已经添加到了`processors`数组中了，这个时候`PostCSS`会知道将这些插件功能应用到我们的CSS源文件中。


### 测试编译

在src目录中创建一个测试文件style.css，并在这个文件中添加一些CSS的测试代码：

	 /* Testing autoprefixer */ 
	.autoprefixer { display: flex; }
在命令终端执行`gulp css`命令。在dest目录生成的文件会有下面的代码：

	/* Testing autoprefixer */ 
	.autoprefixer { 
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex; 
	}
如上面编译出来的代码你应该看到了Autoprefixer给需要的属性添加了浏览器的私有前缀，编译符合需求的代码。

#### 设置插件选项

注：每一个插件都有对应的配置参数选项，如果你想为一个插件配置选项参数，你可以在gulpfile.js文件中,在插件后面添加一对括号，并在里面传递选项的参数。例如，Autoprefixer需要指定对应的浏览器列表参数，你可以像这样设置：

	 var processors = [ 
	     autoprefixer({browsers: ['last 1 version']})
	 ];


## 总结
	
1. 通过`npm`(或`cnpm`)创建项目，并且将`gulp`安装到`gulpfile`文件
2. 安装`gulp-postcss`插件
3. 设置你的`gulpfile.js`文件，将`gulp`和`gulp-postcss`加载到项目中
4. 创建一个任务，来编译你的`CSS`
5. 在任务中，设置一个`processors`数组
6. 在`.pipe()`设置`一个postcss()`函数，并且将`processors`传递给它

你可以根据上面的教程介绍，遵循相同的步骤，你可以将`PostCSS`任何插件安装到项目中。

通过`npm install <plugin_name> –save-dev` 命令将插件安装到你的项目中
类似`var autoprefixer = require("autoprefixer")`代码在你的`gulpfile.js`文件中定义要加载的插件变量名
将变量名添加到你的`preprocessors`数组中