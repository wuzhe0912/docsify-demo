# Themes - Next

> 關於 Next 風格主題的安裝筆記

## 挑選主體
[挑選 Hexo 主題網址](https://hexo.io/themes/)，此處以`Next`為例。
step1. 安裝`theme`
```
cd hexo-blog
git clone https://github.com/theme-next/hexo-theme-next themes/next
```
step2. 修改設定`_config.yml`
```
theme: landscape => theme: next
```
重新啟動`hexo s`
## 參數設定
在`themes/next/_config.yml`中，可以透過調整參數，開啟非常多功能，以下條列其中。
### 主題
Next 有四種 Scheme 可以選擇，預設主題風格是 Muse，找到 scheme 設定，再將想選擇的註釋去除即可。
e.g.
```
# Schemes
# scheme: Muse
# scheme: Mist
# scheme: Pisces
scheme: Gemini
```
### 開啟社群帳號連結
打開或新增個人社群網站連結，僅須將註釋去除即可。
```
social:
  GitHub: https://github.com/wuzhe0912 || github
  E-Mail: mailto:kgb00128@gmail.com || envelope
```
### 文章預覽
```
auto_excerpt:
  enable: false
  length: 150
```
也可以透過`<!--more-->`來裁切，在`<!--more-->`以上的文字，會出現在預覽。
### 啟用文章閱讀進度條
```
reading_progress:
  enable: true
```
### 左側啟用文章閱讀%數
```
back2top:
  enable: true
  # Back to top in sidebar.
  sidebar: true
  # Scroll percent label in b2t button.
  scrollpercent: true
```
### 開啟網站底部用戶訪問量
```
busuanzi_count:
  enable: true
```
接著調整`themes/next/layout/_third-party/statistics/busuanzi-counter.swig`中這兩行程式碼，可以在 i 標籤插入中文描述。
```
<i class="fa fa-{{ theme.busuanzi_count.total_visitors_icon }}"></i>

<i class="fa fa-{{ theme.busuanzi_count.total_views_icon }}"></i>
```
### 調整文章末尾 tag 樣式
```
tag_icon: true
```
### 增加本地搜索功能
安裝插件
```
yarn add hexo-generator-search hexo-generator-searchdb
```
調整設定為 true
```
local_search:
  enable: true
```
## 關於作者
### 新增大頭貼
step 1 建立存放圖片用的資料夾
```
mkdir source/images
```
step 2 將大頭貼的照片丟入資料夾`source/images`，接著在主題設定`themes/next/_config.yml`中，設定大頭貼路徑。
```
avatar:
  url: /images/avatar.jpeg
```
### 調整大頭貼樣式
邊框改為圓形，設為 true
```
rounded: false => rounded: true
```
hover 時，添加旋轉特效
```
rotated: false => rotated: true
```
## 上方添加 Github Fork 圖片
step 1 首先到[GitHub Corners](http://tholman.com/github-corners/)或是[GitHub Ribbons](https://github.blog/2008-12-19-github-ribbons/)尋找自己喜歡的樣式，並 copy code
step 2 打開`themes/next/layout/_layout.swig`，在`<div class="headband"></div>`下面
step 3 將`href`後面的網址，替換成個人`GitHub`主頁。
重新啟動服務`hexo s`。