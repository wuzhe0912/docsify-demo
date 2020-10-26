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