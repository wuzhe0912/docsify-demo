# 程式碼練習題目 - II

> 彙整網路上看到或是面試遇到的程式碼題目 II

## 1. What is the output sequence(輸出順序)?
- Question：

```
setTimeout(funcB, 10);
setTimeout(funcD, 100);
funcA(funC);

// assume the below operation cost total 1 sec
var later = 0;
for (var i = 0; i < 1000; 1++) {
  later += i;
}
funE();

function funcA(item) {
  console.log('A');
  setTimeout(item, 0);
}

function funcB() {
  console.log('B');
}
function funcC() {
  console.log('C');
}
function funcD() {
  console.log('D');
}
function funcE() {
  console.log('E');
}
```

Ans：
```
A
E
C
B
D
```
非同步考題，依順序先執行`funcA`，印出`A`，同時傳入的參數`funcC`因為`setTimeout`，暫時存入`task queue(任務等待列表)`，接著執行`funcE`印出`E`。同步執行工作執行完畢，回頭檢視非同步的部分，依等待秒數依序印出`C`、`B`、`D`。

## 2. What is the output？
- Question：

```
var obj = function(item) {
  this.item = item;

  this.subItem = function() {
    console.log(this.item);
  };

  this.newItem = function() {
    setTimeout(this.subItem, 3);
  }
}

var newSubItem = new obj('Pitt');
newSubItem.newItem();
```

Ans：
```
undefined
```
變數在`setTimeout`時已被銷毀。

## 3. Please implement a counter
- Question：

```
function plus() {
  // code
}

var obj = plus();
obj.add() // 印出 1
obj.add() // 印出 2
```

Ans 1：
```
function plus() {
  var cash = 0;
  var newAdd = {
    add() {
      cash += 1;
      console.log(cash);
    }
  }
  return newAdd
}

var obj = plus();
obj.add();
obj.add();
```
Ans 2：
```
function plus() {
  var cash = 0;
  return {
    add: function() {
      cash += 1;
      console.log(cash);
    }
  }
}

var obj = plus();
obj.add();
obj.add();
```
因為沒有宣告新的物件，所以透過物件包裹的形式來`return`。

## 4. 試判斷下述程式碼依序執行的結果？
```
function a() {
  console.log('Warlock');
}

function b() {
  console.log('Druid');
  Promise.resolve().then(() => {
    console.log('Rogue');
  })
}

function c() {
  console.log('Mage');
}

function d() {
  setTimeout(c, 100);
  var temp = Promise.resolve().then(a);
  console.log('Warrior');
  setTimeout(b, 0);
}

d();
```

Ans：
```
Warrior
Warlock
Druid
Rogue
Mage
```
先跑完同步的印出內容，接著執行`promise`的結果，最後才跑`setTimeout`，並依等待秒數順序執行。

## 5. 請寫出輸出結果
```
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, 500)

  let j = i;

  setTimeout(() => {
    console.log(j);
  }, 1000)
}
```

Ans：
```
3
3
3
0
1
2
```
雖然`setTimeout`是非同步任務，但對瀏覽器而言，本身還有一個`計時器模組(timer)`，當迴圈開始執行時，`setTimeout`就被交給計時器模組。因此當`500毫秒`過去，迴圈已跑完`i`已被更新為`3`。

使用`let`則是因為作用域的關係，每次迴圈的過程中，會重新宣告一次變數，並將上一次的結果，作為這一次的初始值。因此可以解法也可以如下：
- example 1：

```
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

- example 2(將`i`傳入`IIFE`來隔離變數作用域)：

```
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, j * 1000)
  })(i);
}
```

## 6. 請依序填寫輸出的判斷結果
```
a = undefined;
console.log(a === b);

var a = null;
console.log(a === b);

b = null;
console.log(a === b);

var b = undefined;
console.log(a === b);
```

Ans：
```
var a
var b
a = undefined;
console.log(a); // undefined
console.log(b); // undefined
console.log(a === b); // true

a = null;
console.log(a); // null
console.log(b); // undefined
console.log(a === b); // false 

b = null;
console.log(a); // null
console.log(b); // null
console.log(a === b); // true

b = undefined;
console.log(a); // null
console.log(b); // undefined
console.log(a === b); // false
```
因為變數被提升，因此可以理解為變數宣告被拉到最前面。

## 7. 請問以下輸出結果為何？若僅在 plus 函式進行修改，如何調整為依序每隔一秒輸出一次？
```
const list = [7, 5, 3, 1];

const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  })
}

function plus() {
  list.forEach(async item => {
    const res = await square(item);
    console.log(res);
  });
}

plus();
```

Ans：
```
49
25
9
1
```
```
const list = [7, 5, 3, 1];

const square = num => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  })
}

function plus() {
  list.forEach((item, index) => {
    setTimeout(async () => {
      const res = await square(item);
      console.log(res);      
    }, index * 1000)
  });
}

plus();
```

## 8. 使用 ES6 語法，將以下陣列中重複值進行刪除
```
let array = [1, 2, 3, 1, 6, 5, 7, 7, 9, 10, 8, 8];
```

Ans：
```
const newArray = [...new Set(array)];
console.log(newArray); // [1, 2, 3, 6, 5, 7, 9, 10, 8]
```

- 將陣列進行順序整理，如果不使用判斷函式，預設會將元素轉換成字串，並採用`unicode`來判斷，這也會造成某些數字的排序錯誤。

```
newArray.sort((a, b) => a - b);
console.log(newArray); // [1, 2, 3, 5, 6, 7, 8, 9, 10]
```

## 9. 請列出下列 console.log() 結果
```
var a = NaN;
var b = undefined;
var c = false;
var d = 2;
var e = null;
var f = 'Object';

console.log(typeof a);
console.log(typeof b);
console.log(typeof c);
console.log(typeof d);
console.log(typeof e);
console.log(typeof f);
```

Ans：
```
number
undefined
boolean
number
object
string
```
雖然有`null`型別，但`type of()`沒辦法檢測。

`JS`原始型別有六種：
```
Boolean
String
Null
Undefined
BigInt
Symbol
```
另一種則是`Object`。

## 10. 請列出下列 console.log() 結果
```
var a = '2';
console.log(2 == a);
console.log(2 === a);
```

Ans：
```
true
false
```
`==`為不嚴謹判斷，在運算上會盡可能讓兩側相等，造成錯誤。`===`則是嚴謹判斷，`string`不等於`number`回傳`false`。