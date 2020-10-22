# 字符模板

> 將傳統字串的寫法改寫，更容易插入參數

## 傳統寫法
* 需要透過`+`號還有空格來明確區分參數和字串：

```
const playerData = (name, job) => {
  return '玩家名稱：' + name + '，職業：' + job
}

console.log(playerData('Pitt', '戰士'))
```

## 字串模板寫法
```
// 將 '' 改為 ``，參數則透過 ${} 進行包裹

const playerData = (name, job) => {
  return `玩家名稱：${name}，職業：${job}`
}

console.log(playerData('Pitt', '戰士'))
```

* 同時字串模板也支援換行功能，當字串模板為換行時，顯示時也同時會換行

```
const playerData = (name, job) => {
  return `
  玩家名稱：${name}
  ，職業：${job}
  `
}

console.log(playerData('Pitt', '戰士'))
```