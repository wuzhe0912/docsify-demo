# 關於 this

> `JavaScript`的`this`是什麼？

## 全域環境(window)
當`this`沒有做任何處理時，即代表瀏覽器的環境：

```
console.log(this) // 印出整個 window 物件
```
如果此時宣告一個變數，同樣可以透過`this`在全域環境內找到：

```
var name = 'Pitt'
console.log(this.name) // 印出 Pitt
```

## 函式
在`function`內的`this`會尋找全域變數：

```
var name = 'Pitt'

var myName = function() {
  console.log(this); // 印出 window
  console.log(this.name); // 印出 Pitt
}

myName()
```


## 變數
但如果今天宣告一個變數為`object`或`array`來包裹`function`時，內部的`this`則會指向這個變數：

```
const obj = {
  arr: ['test1', 'test2'],
  plus() {
    console.log(this)
  }
}

obj.plus(); // 印出物件的內容
```

## bind
若想要強制綁定`this`的指定對象，可以透過`bind`的方式：

```
var newName = { name: 'Nancy' };
var name = 'Pitt'

function sayMyName() {
  console.log(this.name)
}

var newFunc = sayMyName.bind(newName)
newFunc() // 印出 Nancy
```