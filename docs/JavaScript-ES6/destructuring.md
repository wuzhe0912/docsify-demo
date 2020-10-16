# Destructuring 解構賦值

> 一種更容易取值的方式

## 傳統取值的方法

```
const data = {
  player: 'Pitt',
  str: 20,
  agi: 30
}

console.log(data.str) // 印出 20
```

## 解構的做法

```
const data = {
  player: 'Pitt',
  str: 20,
  agi: 30
}

const { player, str, agi } = data

console.log(player, str, agi) // Pitt 20 30
```
透過`key`將物件中的資料解構出來。

## 將物件嵌進物件
- 若有 a 物件，希望放入 b 物件中，也可透過解構的方式：

```
const data = {
  player: 'Pitt',
  str: 20,
  agi: 30,
}

const playerData = {
  data,
  newPlayer: 'Numi',
}

console.log(playerData)
```
* 印出以下展開結果

```
{
  data: {
    player: 'Pitt',
    str: 20,
    agi: 30,
  },
  newPlayer: 'Numi',
}
```
