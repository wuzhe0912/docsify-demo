# 架站與手動部署(GCP)

> 記錄 Nuxt.js 搭配 GCP 前期架站準備工作

## 環境
1. node => 已使用 nvm 管理安裝版本。
2. git => homebrew 已安裝。
3. GitLab 帳號已申請。

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

## Build
- GitLab create new project
- install(這邊嘗試使用 npx)
```
npx create-nuxt-app project-name
```
- 連接上遠端 repository
```
git init => 通常現在腳手架工具都會處理好，可省略

// 按照 GitLab 步驟執行
1. git remote add origin https://gitlab.com/xxx
2. git add.
3. git commit -m 'initial commit'
4. git branch develop
5. git push -u origin develop
```

### Push Error
這邊在 push branch 到 GitLab 時遇到一個問題，狀況如下：
```
GitLab: The project you were looking for could not be found.
fatal: Could not read from remote repository.
```
遠端的 GitLab 找不到我的 repository 位置，這邊會出現兩種可能，第一是還沒加入 SSH Key，第二是 SSH Key 正確，但需要重新更換遠端的名稱，首先輸入下面的指令，檢查本機公鑰有沒有正常加入 GitLab：
```
ssh -T git@gitlab.com
```
如果出現 `Permission Denied (publickey)` 那就需要執行生成 SSH Key，並將公鑰加入 GitLab。
1. 生成 SSH Key：
```
ssh-keygen -t rsa -C "YOUR EMAIL"

cd ~/.ssh/

// 注意生成過程中，會要求設定私人密碼，需要自己記住
```
2. 進入 ssh 底下，會看到兩個新的檔案：
```
id_rsa => 私鑰
id_rsa.pub => 公鑰 // 使用 vscode 將公鑰的檔案打開，複製裡面的內容
```
3. 回到 GitLab，操作路徑：
```
點選右上角圖像/setting/左側 SSH Keys

// 將剛剛複製的內容貼到中間的輸入框，並點擊下方的 add key
```
4. 回到終端機，再次輸入`ssh -T git@gitlab.com`，這時會要求你輸入剛剛設定的私人密碼，成功後應該會看下面的文字：
```
Welcome to GitLab, @Your_name!
```
到這邊第一步設定 SSH Keys 完成，但我嘗試重新 push 一次依然失敗：
```
remote: The project you were looking for could not be found.
fatal: repository 'https://gitlab.com/Your_name/Your_project.git/' not found
```
5. 重新更新並配對一次遠端名稱：
```
git remote rename origin old-origin
git remote add origin git@gitlab.com:Your_name/Your_project.git
```
到此，檔案就能正常推送到遠端了。

## 架站與部署
1. 建立 GCP 帳號
2. 操作路徑：左側 menu/Computer Engine/VM 執行個體/建立
3. 機器類型 => g1-small(小型專案)
4. 開機磁碟 => Ubuntu 18.04 LTS
5. 防火牆 => 允許 HTTP 流量、允許 HTTPS 流量

## 登入 Linux 主機
- google gcp 瀏覽器介面登入
打開 gcp 專案，專案右側有一個 dropdown 連接 ssh，點擊打開下拉選單，選擇在瀏覽視窗中開啟。
- 操作指令
大多和 mac 的操作相同，記錄比較少用的指令：
下載 url 上的檔案
```
wget (網址路徑)
```
刪除資料
```
rm (檔案名稱)
```
刪除資料夾
```
rm -r (資料名稱)
```
複製文件到指定路徑
```
cp 檔案名稱 欲加入的檔案名稱
```
複製資料夾
```
cp -r a b
```
建立檔案
```
touch 檔案名稱
```
查看系統記憶體
```
free -h
```
登出 Linux
```
exit
```
重開機 Linux
```
sudo reboot
```

## PM2
一個開源的 Node.js 流程管理器，重開機可以自動重啟 Node，另外也能針對 cpu 進行負載均衡設定。Nuxt 需安裝 nuxt-start 套件來搭配使用 pm2。
- install pm2
```
npm install pm2 -g
or
yarn global add pm2 
```
- install nuxt-start
```
npm install nuxt-start
or
yarn add nuxt-start
```

## 使用 PM2 架設 Nuxt 站台(本地)
- 生產環境
1. pm2 init => 初始化，產生 ecosystem.config.js
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
}
```
2. yarn run build
3. pm2 start => 啟用 ecosystem.config.js 的內容

## pm2 指令
啟動 pm2 => ecosystem.config.js
```
pm2 start
```
查看目前的 server
```
pm2 list
```
停用全部 server
```
pm2 stop all
```
刪除指定 ID 的 server
```
pm2 delete 4
```
刪除全部 server
```
pm2 delete all
```
重新整理所有 server => 使用情境，git pull 後需重新整理 server
```
pm2 reload all
```
儲存目前的 pm2 server，重開機後會還原
```
pm2 save
```
檢查 pm2 錯誤(使用 log 排查)
```
pm2 log
```

- pm2 容易被快取卡住，這時候必須砍掉重新安裝 pm2
```
npm uninstall pm2 -g
~/.pm2   => 這個要整個砍掉(不然會被快取)
npm install pm2 -g
```

## GCP Linux 主機安裝環境(server)
1. install node.js
  - install nvm
  ```
  wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
  ```
  - 安裝後，為了要生效 nvm，需要重新啟動終端機
  - nvm ls-remote => nvm install last-version
2. install pm2
```
npm install pm2 -g
```
pm2 目前會安裝在當前的node版本資料夾下，未來如果使用nvm切換node版本，會導致pm2失效。
3. install git
```
sudo apt update
sudo apt install git
```
4. install nginx
```
sudo apt update
sudo apt install nginx
```

## git 手動部署 + 遠端 Linux 操作
- 先將 develop 分支進行 commit
```
git add .
git commit -m 'commit content'
```
- 切回 master 分支，再將 develop merge
```
git checkout master
git merge develop
```
- master 推送到 Gitlab
```
git push -u origin master
```
- 回到 gcp
1. 瀏覽器打開 Linux 介面
2. git clone 專案(注意 gitlab 是否已先切回 master 分支)
  - 日後遠端 gitlab 專案若有更新(git pull 進行同步) => pm2 reload id
3. cd 專案
4. npm install
5. npm run build
6. 啟用 pm2 站台

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