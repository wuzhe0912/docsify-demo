# Prototype(原型/原型鍊)

> 記錄 Prototype 的基礎觀念與題目

## 基礎觀念
* 我們使用原型的目的，在於建立一個樣板或者說藍圖，透過這個樣板，我們放入屬性或方法，這樣可以快速建立`instance(實體)`：

```
function Person (name, type) {
  this.name = name
  this.type = type
}

var boy = new Person('Pitt', 'boy')
var girl = new Person('Tania', 'girl')
```

* 但是假若我宣告兩個變數，他們呼叫函式時，看似呼叫同一個，但實際在記憶體上，他們會分別各佔用一個空間，因此比對兩者是否相等時，會拿到`false`，如下：

```
function Person (name, type) {
  this.name = name
  this.type = type

  this.say = function () {
    console.log(`${this.name} is a ${this.type} say Hi!`)
  }
}

var boy = new Person('Pitt', 'boy')
var girl = new Person('Tania', 'girl')

console.log(boy.say === girl.say) // false
```

* 這種狀況，在專案規模小的時候差異不大，但大型專案或多或少會影響效能，因此可以透過`function prototype`來優化：

```
function Person (name, type) {
  this.name = name
  this.type = type
}

Person.prototype.say = function () {
  console.log(`${this.name} is a ${this.type} say Hi!`)
}

var boy = new Person('Pitt', 'boy')
var girl = new Person('Tania', 'girl')

console.log(boy.say === girl.say) // true
```

## 繼承
* 在`ES5`的語法，繼承的方式採用`Object.create()`：

```
function Person (name, type) {
  this.name = name
  this.type = type
}

var boy = new Person('Pitt', 'boy')
var newBoy = Object.create(boy)
console.log(newBoy)

// 印出
Person {}
  __proto__: Person
    name: "Pitt"
    type: "boy"
```
* 因為`newBoy`本身是沒有東西的，因此在原型鍊的條件下`__proto__`會向上去尋找，因此會找到`Person`。
* 又比如說，我宣告一個空陣列，當我`console.log()`印出這個空陣列時，可以看到`array`的`__proto__`中顯示陣列原型本身的操作方法，例如`filter`、`find`之類的。
* 若要查找`number`的`prototype`，則需要使用`Object.getPrototypeOf(10)`。

## Class
* 在`ES6`的語法中，引入了`Class`，但不同於其他程式語言，`JS`的`Class`本質上是語法糖，底層依然使用`prototype`。
* 需注意`Class`本身不可以改動父層的方法，但`prototype`可以。
* `Class`中有以下關鍵字與用法：
  - `class`、`constructor`：建立新的`class`
  - `extends`：繼承父類別
  - `static`：不需要`instance(實體化)`它所屬的類別，就可以被呼叫
  - `super`：呼叫父類別

* `Class`範例：

```
class Player {
  // 使用 function constructor (建構式)
  constructor (playerName, hp) {
    this.playerName = playerName
    this.hp = hp
  }

  playerStatus () {
    console.log(`玩家名稱：${this.playerName}，玩家血量：${this.hp}`)
  }
}

var Pitt = new Player('Pitt', 200)
Pitt.playerStatus()
```

* 子類別也可以透過`extends`&&`super`去繼承父類別的方法與屬性：

```
// father
class Player {
  // 使用 function constructor (建構式)
  constructor (playerName, hp) {
    this.playerName = playerName
    this.hp = hp
  }

  playerStatus () {
    console.log(`玩家名稱：${this.playerName}，玩家血量：${this.hp}`)
  }
}
var Pitt = new Player('Pitt', 200)
Pitt.playerStatus()

// son
class BeginnerPlayer extends Player {
  constructor (playerName, hp, job) {
    super(playerName, hp)
    this.job = job
  }

  playerJob () {
    console.log(`玩家：${this.playerName}，血量：${this.hp}，初始職業為${this.job}`)
  }
}

var Lisa = new BeginnerPlayer('Lisa', 300, '初心者')
Lisa.playerJob()
```