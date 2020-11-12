# 環境建立

> Nuxt.js 專案環境搭建

## 版控專案搭建流程
1. 建立`Gitlab repository`
2. 本地安裝`Nuxt project`

<!-- tabs:start -->
#### ** Yarn **
```
yarn create nuxt-app <project-name>

cd <project-name>
```
#### ** NPX **
```
npx create-nuxt-app <project-name>

cd <project-name>
```
<!-- tabs:end -->

3. 推送到遠端`Gitlab`

```
git remote add origin git@gitlab.com:xxx/xxx.git
git add .
git commit -m "initial commit"
git branch dev
git checkout dev
git push -u origin dev
```

## git push 失敗的解法
如果推送過程中，出現以下`error`：

```
GitLab: The project you were looking for could not be found.
fatal: Could not read from remote repository.
```

* 那代表遠端的`Gitlab`找不到我的`repository`位置，這邊會出現兩種可能：
1. 還沒加入`SSH Key`
2. `SSH Key`正確，但需要重新更換遠端的名稱

首先輸入下面的指令，檢查本機公鑰有沒有正常加入`Gitlab`：
```
ssh -T git@gitlab.com
```
如果之前有和`Gitlab`連動過`SSH Key`，但忘記自己設定的密碼，或是還沒有設定`SSH Key`，出現`Permission Denied (publickey)`，就請重跑以下流程：

1. 生成`SSH Key`：

```
ssh-keygen -t rsa -C "YOUR EMAIL"
```
```
Enter file in which to save the key // 可enter忽略

Enter passphrase (empty for no passphrase): // 設定私人密碼，需要自己記住
```

2. 進入`ssh`：

```
cd ~/.ssh/

id_rsa => 私鑰
id_rsa.pub => 公鑰 // 使用 vscode 將公鑰的檔案打開，複製裡面的內容
```

3. 回到`Gitlab`操作路徑：
- 點選右上角圖像`setting`
- 點擊左側`SSH Keys`
- 將剛剛複製的內容貼到中間的輸入框，並點擊下方的`add key`

4. 回到終端機，再次輸入`ssh -T git@gitlab.com`，這時會要求你輸入剛剛設定的私人密碼，成功後會看到下面文字：

```
Welcome to GitLab, @Your_name!
```

如果仍出現下面的`error`：

```
remote: The project you were looking for could not be found.
fatal: repository 'https://gitlab.com/Your_name/Your_project.git/' not found
```

代表需要更新並重配對一次遠端名稱：

```
git remote rename origin old-origin
git remote add origin git@gitlab.com:Your_name/Your_project.git
```

到這邊應該就大功告成了。