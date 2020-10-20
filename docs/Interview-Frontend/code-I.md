# 程式碼練習題目 - I

> 彙整網路上看到或是面試遇到的程式碼題目

## 1. 實作符合下面的 function
* Question：

```
plus(2, 5); // output 7
add(2)(5);  // output 7
```

* Ans：

第一題為一般`function`計算
```
function plus(item, subItem) {
  return item + subItem
}

console.log(plus(2, 5))
```
第二為閉包問題，利用子函式可以保存變數的特性進行`return`
```
function add(item) {
  return function (subItem) {
    return item + subItem
  }
}

console.log(add(2)(5))
```

## 2. foo 的值是什麼？
* Question 1：

```
var foo = 10 + '20';
```

* Ans：

當`string`和`number`相加時，會變成`string`形式，相反`number`則會正常計算
```
1020
```

* Question 2：

```
const a = 1 + 2 + '3'
console.log(a)
```

* Ans：

1 和 2 相加後，再和`'3'`一起轉成`string`
```
33
```

* Question 3：

```
const b = '5' + 6 + 8
console.log(b)
```

* Ans：

因為 6 已經被`'5'`轉成`string`，後面 8 也自然同樣被轉成`string`
```
568
```

## 3. window.foo 的值是什麼？
* Question：

```
( window.foo || ( window.foo = "bar" ) );
```

* Ans：

`window.foo`在邏輯運算中，僅有一側被賦值，自然使用`bar`，除非兩側都賦值，|| 判斷才會使用第一組。
```
bar
```

## 4. 下面的 statement(陳述式) 會回傳什麼？
* Question：

```
"Hello World!".split("").reverse().join("");
```

* Ans：

`split()`會將`string`進行分割，若有給定參數，則會根據該參數進行拆分並重組成陣列，譬如空格或是逗號，但因為這邊沒有，所以會根據每個字元拆，得到拆完的結果後，透過`reverse()`將陣列中的資料進行反轉，最後再透過`join()`將陣列中所有元素加入一個`string`。
```
"!dlroW olleH"
```

## 5. 下面 foo.length 的值是什麼？
* Question：

```
var foo = [];
foo.push(1);
foo.push(2);
```

* Ans：

宣告空陣列，依序透過`push()`塞值，`array`中會拿到兩個元素，長度為 2
```
2

console.log(foo)        // [1, 2]
console.log(foo.length) // 2
```

## 6. 下面這段依序會印出什麼？
* Question：

```
console.log('one');

setTimeout(function() {
  console.log('two');
}, 0);

console.log('three');
```

* Ans：

`JS`本身為單執行緒，遇到同步工作時會依序執行，但非同步工作則會先丟到`task queue(任務等待序列)`中，直到瀏覽器所有工作執行完，才會回頭來檢視`task queue`。
```
one
three
two
```

## 7. How can get 'Vue' & 'React'？
* Question：

```
var obj = {
  1: 'Vue',
  'props2': 'Angular',
  'props-3': 'React'
}
```

* Ans：

利用`[]`來操作屬性，將`key`中的 1 轉為`string`，同理可解`dash`的問題
```
console.log(obj[1])
console.log(obj['props-3'])
```

## 8. 變數會依序拿到什麼？
* Question：

```
myName = 'global'

function func() {
  console.log(myName)
  var myName = 'local'
  console.log(myName)
}

func()
```

* Ans：

`Hoisting(變量提升)`的問題，上面的`function`可拆解成如下：
```
myName = 'global'

function func() {
  var myName
  console.log(myName) // 印出 undefined (myName 已宣告但未賦值)
  myName = 'local'
  console.log(myName) // 印出 local
}

func()
```

## 9. 下面的兩個 console.log 的結果會是什麼？
* Question：

```
var foo = "Hello";

(function() {
  var bar = " World";
  console.log(foo + bar);
})();

console.log(foo + bar);
```

* Ans：

在第一個`console.log`時，`foo`可以使用全域變數，而`bar`則使用函式內的變數，結果正常。

但在第二個`console.log`時，函式已經結束了，啟動`GC機制(垃圾銷毀)`，`bar`這個變數已經被銷毀的情況下，也就變成`not defined`。
```
var foo = "Hello";

(function() {
  var bar = " World";
  console.log(foo + bar); // 印出 Hello World
})();

console.log(foo + bar); // 印出 bar is not defined
```

## 10. What is the output?
* Question：

```
var obj = {
  a1: 10,
  a2: [2, 4, 9]
}

var item = obj.a1
var subItem = obj.a2

obj.a1 = 5
obj.a2[0] = 3

console.log(item)
console.log(subItem)
```

* Ans：

這是傳值和傳址的問題，也就是`JS`在面對不同型別時，對記憶體的做法差異。

`obj.a1`是`number`型別，因此他賦值給`item`時，此時是採用複製的方式`Pass by value(傳值)`，因此`obj.a1`和變數`item`都已成為獨自的個體，改變一方不影響另一方。

但是對`Object`和`Array`這兩個型別來說，卻是採用`Pass by reference(傳址)`，同樣指到記憶體上同一個位置，因此改變任何一方，都會影響到另外一邊。
```
console.log(item)     // 10
console.log(subItem)  // [3, 4, 9]
```