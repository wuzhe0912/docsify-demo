# Nginx 反向代理設定

> 記錄如何設定 Nginx 反向代理

## 關於 Nginx
- `Nginx`：一種網頁伺服器，就是架設網頁的軟體，其他還有`IIS(asp.net)`、`Apache(PHP)`，一般而言，`node.js`為求提高效能，多會採用`nginx`來架站。

1. `node`使用`pm2`建立後，`port`的設定不可低於`1024`，避免安全性問題。
2. 架設`nginx server`(`nginx`監聽`80 port`)
3. `nginx`透過反向代理機制，將來源網址代理到`node`站台

## Nginx 指令
- 啟動`nginx server`：

```
sudo nginx
```

- 重新整理`nginx server`：

```
sudo nginx -s reload
```

- 快速停用`server`：

```
sudo nginx -s stop
```

- `nginx`位置：`/etc/nginx(預設)`
- 檢查`nginx log`：

```
nginx log
```

## nginx config 設定
- 第一個入口點：`nginx.conf`
- `vi`編輯器：常見的是`vim`，這邊使用`nano`
1. `sudo nano /etc/nginx/conf.d/pittwu.fun.conf`
2. 
```
server {
  server_name pittwu.fun www.pittwu.fun;
  location / {
    proxy_pass http://localhost:3001;
  }
}
```
3. 設定完成重新整理`nginx server`，需記得專案的`pm2 start`已開啟，否則會跳到`502`。如果重整正常，網頁會自動代理到目前專案內容。