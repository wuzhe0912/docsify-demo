# Vue.js Initial Project

> 記錄初始化 Vue-cli 初始化流程 & Install Plugins

## 全域環境調整(vue-cli 4.0 以上版本) 2020/10

### 安裝新版本
```
npm install -g @vue/cli

# or

yarn global add @vue/cli
```

### 安裝指定版本
```
npm install -g @vue/cli@版本號

# or

yarn global add @vue/cli@版本號
```

### 檢查版本號，確認是否安裝成功
```
vue --version

# or

vue -V
```

### 移除
```
npm uninstall @vue/cli -g

# or

yarn global remove @vue/cli
```

## 修正 Yarn 版本問題

### clean yarn cache
yarn 更新至 v1.19.0 後，一度在終端機一直跳提醒，google 到的解法是清除 cache。
但目前已是 v1.22.0 已無目前問題。
```
yarn update v1.19.0 後，需清除一次 cache，指令如下：

yarn cache clean
```

## 專案創建
```
vue create project-name
```

### 版本未配對錯誤
```
若出現以下錯誤：Vue packages version mismatch:

代表需升級 Vue 的版本，指令如下：

yarn global add vue@2.6.12
```

### 選擇需要的項目
官方預設提供的 css 預處理器，存在一些配置上的錯誤，這邊不做使用
僅選擇 Router & Vuex(單元測試和 PWA 尚未掌握)
Router 採用 History Mode

### 進入項目並啟動
```
cd project
yarn server
```

## 插件安裝

### API
```
yarn add axios vue-axios
```

### 驗證
[vuelidate](https://github.com/vuelidate/vuelidate)
```
yarn add vuelidate
```

### 拖曳
[vuedraggable](https://github.com/SortableJS/Vue.Draggable)
```
yarn add vuedraggable
```

### 模板語言 & 預處理器
- `PUG`&`SCSS`

```
yarn add vue-cli-plugin-pug sass sass-loader --dev
```

## 專案結構
```
assets
components
views
```
### scss
```
assets
  - scss
    - color.scss => 基礎共用色碼
    - mixin.scss => 基礎共用函式
    - share.scss => @import 上面兩個基礎共用scss，建立共用參數
    - style.scss => @import share.scss => 全域 scss，權重最重，在此處 reset css

main.js
  - import 'scss/style.scss'
```
#### scss => vue.config.js
```
// 調整相對路徑，方便 component 引入樣式
chainWebpack: config => {
  config.resolve.alias
    .set('scss', resolve('src/assets/scss'))
}
```
### router
拆分為 index.js 和 map.js
當頁面數過多時，將 routes 抽離至 map.js，再載入到 index.js
### webpack 設定
建立 vue.config.js
```
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  // 調整本地端口
  devServer: {
    host: 'localhost',
    port: 8081,
    // 設置代理 => 解決跨域問題(調用後端API接口時通常不是同一個域名)
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        // websocket 縮寫 => ws
        ws: false,
        // 避免在訪問網址時，自動將原點移除
        changeOrigin: false
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
```