# 面試反饋記錄 - I

> 記錄面試中忘詞或沒有回答很順的問題

## JavaScript
### 淺拷貝和深拷貝：
- 為了避免物件型別中傳址的問題，導致都指向記憶體同一個位置，所以可以透過淺拷貝先複製出來：

```
// slice 會從括號內的索引位置開始進行 copy

var array1 = [1, 2, 3]
var array2 = array1.slice(0)
console.log(array2) // [1, 2, 3]

array1[1] = 4
console.log(array1) // [1, 4, 3]
console.log(array2) // [1, 2, 3]

// 展開運算符

var array1 = [10, 20, 30]
var array3 = [...array1]
console.log(array3) // [10, 20, 30]

array1[2] = 50
console.log(array1) // [10, 20, 50]
console.log(array3) // [10, 20, 30]
```

- 面對深層資料時，淺拷貝無法處理，需使用深拷貝的形式，這邊建議使用`Lodash`：

```
var object1 = {
  name: 'Amy',
  player: {
    name: 'Betty'
  }
}
var object2 = _.cloneDeep(object1)

object1.player.name = 'Alisa'
console.log(object1.player.name) // 'Alisa'
console.log(object2.player.name) // 'Betty'
```

### Object.assign
承前面的情境，操作物件資料時，不建議直接操作原始資料，建議先複製出來再進行操作：
```
var object1 = { num: 10 }
var object2 = Object.assign({}, object1)
console.log(object2) // { num: 10 }

object1.num = 100
console.log(object1) // { num: 100 }
console.log(object2) // { num: 10 }
```

### 函數防抖和節流
這兩個面向都是專注在前端性能優化這一塊：
當一個`input`輸入文字時，可能會不斷觸發判斷條件，為了節省效能，我們可以添加一個計時器，每隔幾秒才觸發一次來節省效能。其他諸如手機上的滾動或是觸控，都可以透過這個方式來節省。
- `Lodash 套件`：`lodash.debounce`

### 陣列操作 API
有時候真的是背不起來，只能多記錄幾次：
- 移出第一個，`shift()`、`splice`：
```
let array = [1, 2, 3]
let newArray = array.shift()
console.log(array) // [2, 3]
console.log(newArray) // 1
```
```
let array = [1, 2, 3]
let newArray = array.splice(0, 1)
console.log(array) // [2, 3]
console.log(newArray) // 1
```
- 移出最後一個，`pop()`、`splice`：
```
let array = [1, 2, 3]
let newArray = array.pop()
console.log(array) // [1, 2]
console.log(newArray) // 3
```
```
let array = [1, 2, 3]
let newArray = array.splice(-1, 1)
console.log(array) // [1, 2]
console.log(newArray) // 3
```

## Vue.js
- `computed`和`watch`的差異？

`computed`除了計算屬性的特性外，其主要目的是為了在目前已有的資料上進行更新，所以本身帶有緩存的特性。相反的`watch`則是監聽資料的變化，因此每次監聽時都是初始化的狀況。如果某筆資料必須相依另外一筆資料的話，則使用`computed`，但如果只是要監聽資料變化時，則使用`watch`。


## 常見前端性能優化的方法？
- `minify(最小化與醜化)`，直接透過打包處理
- 資源壓縮與合併，圖片能夠壓縮就壓縮
- 能用`css`處理就不使用圖片，使用圖片多採用`svg`
- 執行動畫時，使用`requestAnimationFrame`取代`setTimeout`和`setInterval`
- `webpack`設定上，盡可能減輕套件的體積，譬如：
```
config.plugin('lodash-replace').use(
  new LodashModuleReplacementPlugin({
    collections: true,
    paths: true,
  }),
);
```
- 緩存一些資料到本地的`localStorage`，例如用戶資料或是`token`
- `Layout`設計盡量增加複用性，減少大面積重新渲染的狀況
- 打開`LightHouse`，檢查問題方向，再加以處理