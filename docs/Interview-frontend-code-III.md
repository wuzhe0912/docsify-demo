# 程式碼練習題目 - III

> 彙整網路上看到或是面試遇到的程式碼題目 III

## 1. 請列出下列 console.log() 結果
```
var a = 2;
console.log(++a * a)
a = 2;
console.log(--a * a)
```

Ans：
```
3 * 3 = 9
1 * 1 = 1
```
`a`為2，`++a`將會回傳`a`運算後的結果，因此這邊回傳`+1`變成`3`。相反的，如果是`a++`則運算完之後，僅回傳運算前的數值，即是`2`，所以如果今天變更題目如下：
```
var a = 2;
console.log(a++ * a)
a = 2;
console.log(a-- * a)
```

Ans：
```
3 * 2 = 6
1 * 2 = 2
```
- [MDN 運算式與運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Guide/Expressions_and_Operators)

## 2. 請列出下列 console.log() 結果
```
function sayPlayerName() {
  console.log(this.name);
}

var player = {
  name: 'Warlock',
  sayPlayerName: sayPlayerName,
  watch: {
    name: 'Warrior',
    sayPlayerName: sayPlayerName
  }
}

player.sayPlayerName();
player.watch.sayPlayerName();
```

Ans：
```
Warlock
Warrior
```

## 3. 請列出下列 console.log() 結果
```
var a = {};
var b = a;
var c = b = { num: 10 };
c.location = 'tokyo';
console.log(b);
```

Ans：
```
{
  location: "tokyo",
  num: 10
}
```
`Pass by reference(傳址)`記憶體中都會指向同一個位置，改變任一方都會導致，其他兩邊被影響。

## 4. 請列出下列 console.log() 結果
```
var list = [{
  name: '日本',
  locations: {
    honshu: '京都',
    shikoku: '土佐',
    kyushu: '福岡'
  }
}]

var array = [];

list.forEach(item => {
  array.push(item);
})

array[0].name = '美國';
array[0].locations.kyushu = '北九州';

console.log(list[0].name);
console.log(list[0].locations.kyushu);
console.log(array[0].locations.kyushu);
```

Ans：
```
美國
北九州
北九州
```
`Pass by reference(傳址)`記憶體中都會指向同一個位置，改變`array`這個陣列時，同時影響`list`這個陣列。

## 5. 請列出下列 console.log() 結果
```
var name = '織田';
var obj = {
  subObj: {
    name: '羽柴',
    myName: function() {
      setTimeout(() => {
        console.log(this.name);
      }, 0);
      console.log(this.name);
    }
  },
  name: '德川'
}

console.log(this.name);
var newName = obj.subObj.myName();
```

Ans：
```
織田
羽柴
羽柴
```

## 6. 請列出下列 console.log() 結果
```
var player = 'Rogue';
var newPlayer = player;
newPlayer = 'Mage';

console.log(player);
```

Ans：
```
Rogue
```
在原始型別中，記憶體採用`Pass by value(傳值)`的方式，也就是複製的形式。兩者自然都是獨立個體，不會受到後面賦值的影響。但如果今天改為物件型別，則會因為記憶體都指向同一個位址，導致前後互相影響。
```
var player = {
  name: 'Rogue'
}
var newPlayer = player;
console.log(1, newPlayer); // Rogue

player.name = 'Rogue2';
console.log(2, newPlayer); // Rogue2
```

## 7. 請列出下列 console.log() 結果
```
var num = 10;

function showNumber() {
  console.log(this.num);
}

var player = {
  num: 20,
  showNumber: function() {
    console.log(this.num);
  }
}

var oldPlayer = {
  num: 25
}

showNumber();
showNumber(player);
player.showNumber = player.showNumber.bind(oldPlayer);
player.showNumber();
```

Ans：
```
10
10
25
```
第一個函式執行，向外找`num`這個變數，印出`10`。第二個函式執行時，看似傳入`player`這個物件，但實際上`console`印的內容仍是尋找`this.num`而非`player.num`，故仍印出`10`。第三個函式執行前，已被`bind`綁在`oldPlayer`這個物件上，因此被強制指定為`25`。若希望印出`20`，則改寫為：
```
function showNumber(value) {
  console.log(this.num);
  if (value) console.log(value.num)
}
```

## 8. 請列出下列 console.log() 結果
```
function deposit(value) {
  this.money = value || 10000;
  return function() {
    return {
      count: function(price) {
        if (money < price) {
          return console.log(`售價：${price}，當前存款不足`);
        } else {
          return money = money - price;
        }
      },
      amount: function() {
        return console.log(`目前剩餘存款：${money}`);
      }
    }
  }
}

var wallet = deposit(9000);
wallet().count(3000);
wallet().amount();
```

Ans：
```
目前剩餘存款：6000
```