# Arrow Function 箭頭函式

> 縮減傳統函式寫法，更為簡潔便利

## 傳統函式寫法與箭頭函式寫法比較
* index.html

```
<span class="click1">click1</span>
<span class="click2">click2</span>
```
* index.js

```
document.querySelector('.click1').addEventListener('click', function() {
  console.log('click1')
})

document.querySelector('.click2').addEventListener('click', () => {
  console.log('click2')
})
```
將過往`function`改為`=>`。

## this 指向
* 需要注意的是，傳統函式中，`this`會指向`DOM`元素本身：

```
document.querySelector('.click1').addEventListener('click', function() {
  console.log(this) // 印出整個 a 標籤
})
```

* 但是箭頭函式中，`this`指向會往上一層跑到全域環境，所以也可以理解為在`arrow function`中沒有`this`。

```
document.querySelector('.click2').addEventListener('click', () => {
  console.log(this) // 印出整個 window 物件
})
```

* 因此如果需要找到該`DOM`元素，需要透過傳值的方式

```
document.querySelector('.click2').addEventListener('click', (e) => {
  console.log(e.target) // // 印出 a 標籤
})
```

## 變數指定
* 函式若在前方有宣告變數的情況下，可以簡寫成`arrow function`：

```
const add = () => {
  console.log('test')
}

add()
```
* 但需要注意，若前方沒有變數指定，則無法改寫為`arrow function`。

* 傳值的寫法：

```
const add = (val, subVal) => {
  return val + subVal
}

console.log(add(4, 14)) // 印出 18
```

* 若`return`僅一行的情況下，還可簡寫成：

```
const add = (val, subVal) => val + subVal

console.log(add(2, 8)) // 印出 10
```