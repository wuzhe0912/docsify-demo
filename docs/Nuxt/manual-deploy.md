# 架站與手動部署(GCP)

> 記錄 Nuxt.js 搭配 GCP 前期架站準備工作

## 關於 Nuxt.js
- 優點
  - 核心要解決 SPA 網站的 SEO 問題
  - 對於個人開發者來說，如果熟悉 Node.js 可以將前後端整合在同一專案
  - 促使前端可以處理一部分後端功能，例如緩存資料之類的，使 API 負擔減輕
  - Nuxt.js 可以多做一層轉發關於安全性的資訊，對網站安全較佳
- 缺點
  - 沒有 SEO 需求的網站，基本不需要使用 Nuxt.js(例如後台)
  - 學習 Nuxt.js 需要理解部分後端原理知識，學習成本高
  - 開發難度增加，Server 的負擔也會變重


## 網域設定 DNS
- 設定 A 記錄
1. 前往任何網址商購買網址 => 這邊使用 godady
2. 購買完成後，打開右上角的 My Products => 進入自己購買的網址
3. 選擇要綁定的 Domain，點擊右方的 DNS 進入
4. 選擇第一列的 A 記錄，右邊可以進行編輯
5. 複製 gcp 專案的外部 IP，貼到指向欄位(Points to)
6. 將 gcp 外部 IP 轉為靜態 => 左側選單/VPC網路/外部IP位址/調整類型

## Nginx 反向代理設定
- nginx => 一種網頁伺服器，就是架設網頁的軟體，其他還有 IIS、Apache

一般而言，node.js 為求提高效能，多會採用 nginx 來架站。
1. node 使用 pm2 建立後，port 的設定不可低於1024，避免安全性問題。
2. 架設 nginx server(nginx 監聽 80 port)
3. nginx 透過反向代理機制，將來源網址代理到 node 站台

- nginx 指令
1. 啟動 nginx server
```
sudo nginx
```
2. 重新整理 nginx server
```
sudo nginx -s reload
```
3. 快速停用 server
```
sudo nginx -s stop
```
4. nginx 位置：/etc/nginx => 預設
5. 檢查 nginx log
```
nginx log
```

## nginx config 設定
- 第一個入口點 => nginx.conf
- vi 編輯器 => 常見的是 vim，這邊使用 nano

1. sudo nano /etc/nginx/conf.d/pittwu.fun.conf
2. 
```
server {
  server_name pittwu.fun www.pittwu.fun;
  location / {
    proxy_pass http://localhost:3001;
  }
}
```

## SSL 憑證
SSL For Free => 取得免費憑證(憑證機構：Let's Encypt)，缺點每三個月會過期，為此 Linux 可以透過 certbot 來自動更新憑證。
- install certbot
1. 指令：
```
1. sudo apt-get update
2. sudo apt-get install software-properties-common // 載入 certbot 的 ppa
3. sudo add-apt-repository ppa:certbot/certbot
4. sudo apt-get update
5. sudo apt-get install python-certbot-nginx # install python's certbot for nginx
```
2. 產生憑證：
```
sudo certbot --nginx 
```
3. 重新整理 nginx：
```
sudo nginx -s reload
```
4. 檢查憑證續約狀況
```
sudo certbot renew --dry-run
```
5. 執行憑證續約動作
```
sudo certbot renew
```