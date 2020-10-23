# Linux 手動部署

> 記錄 Linux 手動部署流程與操作指令

## master 分支調整
- 檢查`dev`有無尚未`commit`內容，若有則進行`commit`並推送到遠端：

```
git status

git add .

git commit -m 'commit content'

git push
```

- 切到`master`分支，並將`dev`內容合併進來，推送到遠端：

```
git checkout master

git merge dev

git push -u origin master
```

- 因為是手動部署，所以將`default branch`切到`master`：
  - 點選`Gitlab`左側的`Settings`，選擇`Repository`
  - 展開`Default Branch`，將`dev`切換為`master`

- 若要在開發過程中需要保護`master`分支，可以展開`Protected Branches`：
  - 選擇`master`並將合併和推送的允許者都選維護者，點擊`Protect`

## GCP Linux 主機部署網站
- 瀏覽器打開介面，`git clone`專案，並輸入`Gitlab`使用者名稱和密碼：

```
git clone https://gitlab.com/your_name/your_project.git
```

- `cd`到專案，並進行安裝和打包

```
cd project

npm install

npm run build
```

- 啟動`pm2`架站：

```
pm2 start
```

- 遠端`Gitlab`專案更新做法：

```
git pull

npm install

npm run build
```

- 更新指定`pm2`站台或是全站台更新

```
pm2 reload id名稱

pm2 reload all
```

## 網域設定 DNS
- 設定 A 記錄
1. 前往任何網址商購買網址 => 這邊使用`GoDaddy`
2. 購買完成後，打開右上角的`My Products` => 進入自己購買的網址
3. 選擇要綁定的`Domain`，點擊右方的`DNS`進入
4. 選擇第一列的 A 記錄，右邊可以進行編輯
5. 複製`GCP`專案的外部 IP，貼到指向欄位(Points to)
6. 將`GCP`的`IP`轉為固定 => 左側選單/VPC網路/外部IP位址/將類型從臨時轉為靜態