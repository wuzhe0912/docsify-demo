# Linux 主機環境安裝(GCP)

> 記錄 GCP 上操作 Linux 主機環境安裝

## 環境安裝
- `install node`
- `install nvm`，安裝完後需重開終端機：

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

- `nvm`安裝指令這邊不再贅述：

```
nvm ls-remote

nvm install v13.14.0

nvm ls

node -v
```

- `install pm2`：

```
npm install pm2 -g
```
- 需注意`pm2`會安裝在當前的`node`版本下，未來如果使用`nvm`切換`node`版本，會導致`pm2`失效。
- 解決方式，可以將當前的`pm2`刪除，再到對應的`node`版本重新安裝`pm2`。

- `Linux install git`：

```
sudo apt update
sudo apt install git
```

- `Linux install nginx`：

```
sudo apt update
sudo apt install nginx
```