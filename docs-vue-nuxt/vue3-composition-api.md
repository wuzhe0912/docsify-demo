# Composition API

> Vue 官方提供 3.0 版本寫法

## CDN 引入，並搭建結構
* `index.html`

```
<body>
  <div id="app">
    <span>{{ text }}</span>
  </div>

  <script src="https://unpkg.com/vue@next"></script>
</body>
```

## 建立 Vue 實體
* 在`2.x`版本中，建立實體採用`new Vue`的方式，但在`3.x`版本改用下述方法：
* `index.js`

```
const App = {}

Vue.createApp(App).mount('#app')
```
* 另外，在此前的初始化資料使用：

```
data () {
  return {}
}
```
* 但在`3.x`版本改用`setup()`，因此具體會呈現如下：

```
const { ref } = Vue

const App = {
  setup () {
    const text = ref('Hello Vue!')
  
    return {
      text
    }
  }
}

Vue.createApp(App).mount('#app')
```
* 透過解構的方式，將`ref`方法從`Vue`中提取出來，接著將資料用`ref`方法賦值給變數，並將需要的變數`return`回`template`上面進行渲染。

## 計數器