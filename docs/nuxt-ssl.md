# HTTPS、SSL 憑證設定

> 記錄 nginx 如何安裝免費的 SSL 憑證

## SSL 憑證
- `SSL For Free` => 取得免費憑證(憑證機構：Let's Encypt)，缺點每三個月會過期，為此`Linux`可以透過`certbot`來自動更新憑證。

- `install certbot`流程：
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

3. 重新整理`nginx`：

```
sudo nginx -s reload
```

4. 檢查憑證續約狀況：

```
sudo certbot renew --dry-run
```

5. 執行憑證續約動作：

```
sudo certbot renew
```

## 前述手動部署總結
後續專案開發流程如下：
1. 本地開發(`dev`)
2. `git commit`
3. 合併進入`master`分支
4. 登入`Linux`主機
5. `cd project`
6. `git pull`
7. `npm run build`
8. `pm2 reload id`
9. 網站上線
