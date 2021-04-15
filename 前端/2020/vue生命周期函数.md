<a name="SxiuF"></a>
### 介绍

- [vue实例的生命周期](https://cn.vuejs.org/v2/guide/instance.html#%E5%AE%9E%E4%BE%8B%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)：从Vue实例创建、运行、到销毁期间，总是伴随着各种各样的事件，这些事件，统称为生命周期。
- [生命周期钩子](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)：就是生命周期事件的别名而已。

生命周期钩子 = 生命周期函数 = 生命周期事件。
<a name="LcUJo"></a>
### 
<a name="YXLHG"></a>
### 生命周期函数的主要分类

![11.png](https://cdn.nlark.com/yuque/0/2019/png/514813/1570632122260-a8d940b1-0352-4fa9-8450-2bafb371fa40.png#align=left&display=inline&height=270&name=11.png&originHeight=270&originWidth=396&size=11454&status=done&width=396)<br />根据上面这张图，我们把生命周期函数主要分为三类。

1、创建期间的生命周期函数

- 

- beforeCreate：实例刚在内存中被创建出来，此时，还没有初始化好 data 和 methods 属性
- created：实例已经在内存中创建OK，此时 data 和 methods 已经创建OK，此时还没有开始 编译模板。我们可以在这里进行Ajax请求。
- beforeMount：此时已经完成了模板的编译，但是还没有挂载到页面中
- mounted：此时，已经将编译好的模板，挂载到了页面指定的容器中显示。（mounted之后，表示真实DOM渲染完了，可以操作DOM了）

举例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="vue2.5.16.js"></script>
</head>
<body>
    <!--这个div区域就是MVVM中的 View-->
    <div id="app">
    </div>
</body>
<script>
    new Vue({
        el: '#app',
        data: {
            msg: 'hello vuejs'
        },
        // 这是第1个生命周期函数，表示实例完全被创建出来之前，会执行它
        beforeCreate: function () {
            console.log('01 beforeCreate', this.msg);
            //注意：在 beforeCreate 生命周期函数执行的时候，data 和 methods 中的 数据都还没有没初始化
        },
// 这是第2个生命周期函数
        created: function () {
            console.log('02 created', this.msg);
            //注意：如果要调用 methods 中的方法，或者操作 data 中的数据，最早，只能在 created 中操作
        },
// 这是第3个生命周期函数，表示 模板已经在内存中编辑完成了，但是尚未把模板渲染到页面中
        beforeMount: function () {
            console.log('03 beforeMount', this.msg);
            // 在 beforeMount 执行的时候，页面中的元素，还没有被真正替换过来，只是之前写的一些模板字符串
        },
// 这是第4个生命周期函数，表示，内存中的模板，已经真实的挂载到了页面中，用户已经可以看到渲染好的页面了
        mounted: function () {
            console.log('04 mounted', this.msg);
            // 注意： mounted 是 实例创建期间的最后一个生命周期函数，当执行完 mounted 就表示，实例已经被完全创建好了
            // 此时，如果没有其它操作的话，这个实例，就静静的 躺在我们的内存中，一动不动
        }
    });
</script>
</html>
```

打印结果：

![12.png](https://cdn.nlark.com/yuque/0/2019/png/514813/1570632142507-6985fc72-68cc-4efa-aa50-97ccf8cd5988.png#align=left&display=inline&height=254&name=12.png&originHeight=254&originWidth=854&size=23772&status=done&width=854)<br />运行期间的生命周期函数

- beforeUpdate：状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染DOM节点
- updated：实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了。

PS：数据发生变化时，会触发这两个方法。不过，我们一般用watch来做。

举例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="vue2.5.16.js"></script>
</head>
<body>
    <!--这个div区域就是MVVM中的 View-->
    <div id="app">
        <input type="button" value="修改flag" @click="myMethod">
        <h3 id="h3">{{ flag }}</h3>
    </div>
</body>
<script>
    new Vue({
        el: '#app',
        data: {
            msg: 'hello vue',
            flag: false
        },
methods: {
            myMethod: function () {
                this.flag = true;
            }
        },
// 接下来的是运行中的两个事件
        // 这时候，我们的界面还没有被更新【但是，数据被更新了吗？  数据肯定被更新了】
        beforeUpdate() {
            console.log('-------------05 beforeUpdate', this.msg);
// 结论：当执行 beforeUpdate 的时候，页面中的显示的数据，还是旧的，此时 data 数据是最新的，页面尚未和 最新的数据保持同步
            console.log('界面上DOM元素显示的内容：' + document.getElementById('h3').innerText)
            console.log('data 中的 msg 数据：' + this.flag)
        },
        updated() {
            console.log('-------------06 updated', this.msg);
// 结论：updated 事件执行的时候，页面和 data 数据已经保持同步了，都是最新的
            console.log('界面上DOM元素显示的内容：' + document.getElementById('h3').innerText)
            console.log('data 中的 msg 数据：' + this.flag)
        }
    });
</script>
</html>
```

当我们点击按钮后，运行效果是：<br />![21.png](https://cdn.nlark.com/yuque/0/2019/png/514813/1570632149756-41ed7ec7-7f2e-4199-873e-9bc39f707444.png#align=left&display=inline&height=389&name=21.png&originHeight=389&originWidth=1149&size=49979&status=done&width=1149)

可以看出：

- 当执行 beforeUpdate 的时候，页面中的显示的数据还是旧的，但此时 data 数据是最新的
- updated 事件执行的时候，页面和 data 数据已经保持同步了，都是最新的

3、销毁期间的生命周期函数

- beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。
- destroyed：Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

PS：可以在beforeDestory里清除定时器、或清除事件绑定。


