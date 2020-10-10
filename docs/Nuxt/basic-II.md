# 基礎觀念

> 記錄 Nuxt.js 專案開發與框架基礎觀念

## Nuxt.js 的注意事項
Nuxt => 基底語法以 node.js 為主，因此 node 不支援的語法，在 Nuxt 中也無法運作。
1. Nuxt 的 `created()` => 不可使用 window、alert、document 等原生屬性。
  - node.js 本身是在 server 端環境運行，而非瀏覽器，自然吃不到瀏覽器的屬性
2. Nuxt => 基底語法以 node.js 為主，因此 node 不支援的語法，即便是 Vue 的語法也不可行。
2. 需優先考慮 node 的執行環境。

### Router 路徑
Nuxt 本身已經封裝了許多 Vue-cli 功能，譬如 router 本身在 Vue 需要設置，但在 Nuxt 只要建立好頁面，router 就會自動匹配。

### 方法
- 同 Vue 相同，Nuxt 也是採用 shorthand：
```
methods: {
  formatter () {
  }
}
```

## install scss
在 Nuxt 環境中，`~`、`@`兩者皆通用，都被指向根目錄。但非 nuxt 結構的 js 檔與 nuxt.config.js 則不吃這個規則，必須使用過往的`./`尋找。
- install plugin
```
// pug
yarn add pug pug-plain-loader

// scss
yarn add node-sass sass-loader
```
但是放在靜態資源(static)內的引用規則稍有不同，僅透過`/`，e.g.：
```
link: [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
]
```

## nuxt.config.js 設定
- head
就是過往 HTML 頁面的 head 區塊，可以調整頁面的 title，或是添加 meta 來改善 SEO。需要稍微注意 static 靜態資源的飲用路徑略有不同僅`/`。

- css
可以註冊全域 css，方便整個專案調用。

## css
- nuxt 在 css 的環境中，使用 background 載入圖片時，不允許使用 `/`，正確寫法如下：
```
background: url("~assets/images/girl.jpg") no-repeat;
```
這邊也無法用 @ 來載入，唯一只能使用 `~`。

- 預設若圖片小於 1KB，會被 nuxt 轉為 base 64 編碼，使用 data uri 的形式引入。若需要調整上下限，可以在 nuxt.config.js 中的 build 進行調整。
```
build: {
  loaders: {
    imgUrl: { limit: 10000 } // 1000 => 1KB
  }
}
```

## 頁面結構
nuxt 和 vue 相似，router 對應要前往的頁面，且不需要我們來配置，而每個 page 則可以根據需要的 layout 來進行設定，再彙整到 <nuxt />，原理和 vue 的 router-view 雷同。

每個 page 預設父層 layout 直接使用 default.vue，但如果需要客製化，可以根據需求加入不同的 xxx.vue，再到需要的 page 從 export default 導入：
```
<script>
export default {
  layout: 'xxx'
}
</script>
```

## 錯誤頁面
根據 nuxt 官方的設定，在 layouts 下建立 error.vue，即可攔截錯誤 router，如果需要自定義頁面，同樣可以加入客製化 layout。

## head
在 nuxt.config.js，有全域的 head，但如果特定頁面需要調整 head，可以在 page 下的 export default 中放入 head 的格式，但需要注意改為 function 的寫法：
```
export default {
  layout: 'xxx',
  head () {
    return {
      title: this.title,
      meta: [],
      script: []
    }
  }
}
```

## nuxt-link
和 vue 的 router-link 本質相同，需要特別注意的是，nuxt-link 會提前先幫你預先載入好要連過去頁面的 css 資源。但如果該頁面有大量圖片或是樣式，可能會影響到 loading 速度，如果要關閉這個功能，寫法如下：
```
// pug 寫法
nuxt-link(to="/demo" no-prefetch)
```

## components
nuxt 的 component 有一些特點需要注意，在 nuxt 的 .vue 檔案中允許導入 head、asyncData，但這些寫法在 component 中的 .vue 是不允許的，只能寫在 pages 內的 .vue。命名規則上，官方採用開頭大寫書寫格式，但實際上可依團隊 coding style。