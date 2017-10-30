---
title: 来聊聊localStorage、sessionStorage和cookie
date: 2017-10-24 15:27:14
tags:
---
首先当然还得是来介绍一下基本概念.
##	基本概念

###	Cookie
对于`Cookie`,不用介绍的太多,想必大家也都很熟悉了.`Cookie`实际上是一小段的文本信息,每个Cookie的大小限制为4KB.

它的主要用途有保存登录信息，比如你登录某个网站市场可以看到浏览器提醒你需要“记住密码”，这通常就是通过在 `Cookie` 中存入一段辨别用户身份的数据来实现的。

###	web Storage

`sessionStorage` 和 `localStorage` 是**HTML5 Web Storage API** 提供的，可以方便的在`web`请求之间保存数据。有了本地数据，就可以避免数据在浏览器和服务器间不必要地来回传递。

在这之前,客户端存储数据都是使用cookie,但是大家都知道,每一次HTTP请求,都会带着cookie给后端,即使是不需要传输的情况下,这在无形之中就增加带宽的浪费,而`sessionStorage`和`localStorage`不会自动把数据发给服务器，仅在本地保存。


###	三者的异同
![](http://it.dyg.cn/wp-content/uploads/2017/08/Snipaste_2017-08-05_21-13-28.png)

**通过上图的表,大概总结一下webstorage API的好处:**
1.** 减少网络流量**：一旦数据保存在本地后，就可以避免再向服务器请求数据，因此减少不必要的数据请求，减少数据在浏览器和服务器间不必要地来回传递。
2. **快速显示数据**：性能好，从本地读数据比通过网络从服务器获得数据快得多，本地数据可以即时获得。再加上网页本身也可以有缓存，因此整个页面和数据都在本地的话，可以立即显示。
3.** 临时存储**：很多时候数据只需要在用户浏览一组页面期间使用，关闭窗口后数据就可以丢弃了，这种情况使用`sessionStorage`非常方便。
4. **更多丰富易用的接口**：`Web Storage`提供了一套更为丰富的接口，使得数据操作更为简便。

##	Webstorage API的简单使用
	//创建localStorage对象
	var localstroage = window.localStorage;  
	//存储值
	localstroage.setItem('name','Jack');  
	localstroage.setItem('uid','10001');  
	//获取值
	var openid = localstroage.getItem('openid');  
	console.log(openid);
	//删除值
	localstroage.removeItem('openid');  
	//清空值
	localstroage.clear(); 
而`sessionStorage`的使用则与`localStorage`完全一致.

此外,HTML5在提供了`storage`事件,当键值改变或者clear的时候，就可以触发`storage`事件,相当于加了个监听事件,这也是`cookie`原生没有的.


##应用场景和总结

我们的Storage API,可以用在**IM聊天记录**,**购物车**,**HTML5的游戏数据存储**,**内容多的表单**.
并非说有了`localStorage`、`sessionStorage`,`cookie`就会被淘汰了,就目前的客户端(浏览器)使用而言,`cookie`的使用率仍然是非常高的,只是在某种特定的情况下呢,使用我们的webStorageAPI会更加方便好用,更快的解决问题.


此外,我们的`webStorageAPI`也仍存在一些局限,一个是兼容性问题,是不支持IE8以下的,还有一个是如果用户使用的是浏览器的隐身模式的话,是无法访问用`localStorage`存储下来的值的。