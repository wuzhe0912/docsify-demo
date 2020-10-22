# 自動部署 (Auto deploy use Netlify)

> 記錄 Hexo 站點架設後，自動部署的方式

- step 1：
    先在 GitHub 建立遠端 repository
- step 2：
    copy repository 的 url
- step 3：
    回到 project 內，將本地和遠端進行關聯
    ```
    https://github.com/your-githubname/your-repository
    ```
- step 4：
    進行 commit
    ```
    git add ./
    ```
    ```
    git commit -m 'commit information'
    ```
- step 5：
    推送到遠端
    ```
    git push --set-upstream origin master
    ```
- step 6：
    打開最上層的`_config.yml`，修改設定
    ```
    deploy:
      type: git # 部署方式
      repository: https://github.com/wuzhe0912/pittwu-blog.git # 關聯 github
      branch: run-page # 部署用 branch
    ```
    安裝 Hexo 部署插件
    ```
    yarn add hexo-deployer-git
    ```
- step 7：
    執行指令
    ```
    hexo clean  // 清除舊的靜態文件
    
    hexo g      // 生成新的靜態文件
    
    hexo d      // 部署
    ```
    這時候本地的 Hexo 資料已推送到遠端的 Github repository
- step 8：
    接著在[Netlify](https://www.netlify.com/)建立帳號，因為我們要關聯 GitHub，所以選擇第三方登入(使用 GitHub 帳號)
- step 9：
    登入後，選擇右側的 New site from Git，再來選關聯 GitHub，授權完成後，選擇對應的 repository
- step 10：
    Branch 需選擇剛剛`_config.yml`輸入的 branch name，下方 command 和 Publish 兩欄則清空，最後點選 Deploy site
- step 11：
    很快就能在左上角看到 Netlify 幫我們生成的網址，但其中網址名的部分是亂數生成的，可以點選 Change site name 修改。
- step 12：
    日後只要本地寫完文章，執行下面三道指令，即可完成自動部署。
    ```
    hexo clean
    hexo g
    hexo d
    ```