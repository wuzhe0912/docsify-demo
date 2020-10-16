# ES Module

> ES6 提供的模組化語法

## 模組化
* 現代`JS`開發，多已採用引入`component`的形式來組成專案結構

- 建立`tool.js`這個`component`並導出：

```
const add = ((item, subItem) => item + subItem)

export default add
```

- 但這邊需注意，若非使用打包工具建立的環境下，一般`script`無法判別`module`，需再加上`type`：

```
<script type="module" src="./js/index.js"></script>
```

- 接著引入`component`並使用：

```
import add from './tools.js'

console.log(add(5, 12)) // 印出 17
```

## 直接導出資料寫法
```
export const name = 'Pitt'
```

* 使用解構的方式引入

```
import add, { name } from './tools.js'

console.log(name)
```
* `export default`僅能使用一個，但`export`可以複數，同時`export`僅能使用變數的形式導出。

```
// export 導出函式

export const remove = (item, subItem) => {
  return item - subItem
}
```

* 同樣使用解構的方式引入

```
import add, { name, remove }  from './tools.js'

console.log(remove(10, 2)) // 印出 8
```