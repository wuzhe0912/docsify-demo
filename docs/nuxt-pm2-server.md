# PM2 設定與環境安裝

> 記錄如何使用 pm2 架設 Nuxt 站台

## 關於 PM2
使用`Nuxt`架設網站，本質上就是使用`Node`架設網站，而`pm2`是常見用來架設管理`Node`的工具：
- 重開機時會自動重新啟動`node`程式
- `cpu`自動負載平衡(需設定)
- 建議使用`nuxt-start`套與`pm2`搭配。

## 安裝
- `pm2`全域安裝
- `nuxt-start`套件安裝

<!-- tabs:start -->
#### ** Yarn **
```
yarn global add pm2

yarn add nuxt-start
```
#### ** NPM **
```
npm install pm2 -g

npm install nuxt-start
```
<!-- tabs:end -->

## 使用 pm2 架設 nuxt 站台(生產環境)
1. `pm2 init` => 產生`ecosystem.config.js`：

```
module.exports = {
  apps:[{
    name: 'project_name',
    script: './node_modules/nuxt-start/bin/nuxt-start.js',
    instances: 'max', // 負載平衡模式下的 cpu 數量
    exec_mode: 'cluster', // 負載平衡模式
    max_memory_restart: '1G', // 緩存了多少記憶體重新整理
    port: 3001 // 指定伺服器上的 port 
  }]
};
```

2. `yarn build` or `npm run build`
3. `pm2 start` => 啟用`ecosystem.config.js`的內容進行架站

## pm2 指令
- 啟動`pm2` => 執行`ecosystem.config.js`

```
pm2 start
```

- 查看目前的`server`

```
pm2 list
```

- 停用全部`server`

```
pm2 stop all
```

- 刪除指定`ID`的`server`

```
pm2 delete 2
```

- 刪除全部`server`

```
pm2 delete all
```

- 重新整理所有`server` => 使用情境，當`git pull`後需重新整理`server`

```
pm2 reload all
```

- 儲存目前的`pm2 server`，重開機後會還原

```
pm2 save
```

- 檢查`pm2`錯誤(使用`log`排查)

```
pm2 log
```

- 因為`pm2`容易被快取卡住，若遇到這一狀況，必須砍掉重新安裝`pm2`

```
npm uninstall pm2 -g
~/.pm2   => 這個要整個砍掉(不然會被快取)
npm install pm2 -g
```