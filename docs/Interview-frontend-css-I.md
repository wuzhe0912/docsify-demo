# CSS - I

> 整理常見 CSS 面試題目 I

## 1. 簡單聊聊 box-model
`box-model`可以理解為前端工程師製作網頁的一種工具，透過它可以定義網頁上元素的位置，進而達到排版的目的。從內到外，環繞它身邊有三個語法，`padding`、`border`、`margin`。其中前兩者預設會影響到元素，因此在`box-sizing`會採用另一個模式`border-box`，來避免不必要的計算。

## 2. 請解釋 * { box-sizing: border-box; }，並且說明使用它的好處？
`box-sizing` => 意指，當元素計算寬度和高度時，`border`、`padding`會內含還是外加。
`content-box` => 預設的屬性，會使`border`、`padding`添加額外的寬高(外加)。

但前述設計，會使前端開發時被迫需要一直計算寬高，為了改善這個開發體驗，所以改用以下模式：
`border-box` => 將`border`、`padding`塞進元素本身(內含)。因此我們建議在初始化樣式時，加入到 `*`。

```
* {
  box-sizing: border-box;
}
```
- [圖片詳解](https://zh-tw.learnlayout.com/box-sizing.html)

## 3. 如何處理水平垂直置中？
水平垂直置中的解法有多種，這邊僅列出較常用
- example 1，使用`flexbox`的語法來解：

```
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- 水平置中方法：

```
div {
  margin: 0 auto;
}

div {
  text-align: center;
}
```

- example 2，使用絕對定位+`translate`：

```
.content {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- example 3，先使用上面的方法達到水平置中，再使用`line-height`來達到文字垂直置中：

- example 4，使用絕對定位+`calc`來計算：

```
.content {
  position: relative;
  height: 50px;
  margin: auto; // 水平置中
  top: calc((100% - 50px) / 2); // 垂直置中
}
```

## 4. 倘若有不同的樣式表 (stylesheets)，該如何整併到網站？ 
以`Vue`專案結構為例：
```
- assets
  - scss
    - style.scss
    - share.scss
    - color.scss
    - mixin.scss
```
將共用顏色`(color)`和共用函式`(breakpoint、position)`進行拆分，兩者都引入到`share.scss`，各`component`視需求調用共用樣式。

再將 `share.scss`引入到`style.scss`，此時`assets/scss/style.scss`被視為權重最高的樣式表，除了進行樣式初始化，也是用來處理特定需求(譬如覆蓋套件的樣式)，並將其註冊到`main.js`。

## 5. 如何處理專案 RWD
- 共用參數：

假設 UI/UX 為首次合作，因此會先討論網站的色系與主要的共用間距(當然如果是經驗豐富的 UI/UX，這一步可以忽略)，因為斷點、三輔一主的色系、常用間距，需先準備在`scss`作為共用參數。至於斷點，現在市面上，320px 尺寸的手機(iPhone5)，雖然市佔率已經相當低，但目前開發上仍會考慮保留，因此預期斷點會設計：
```
360 => 兼容小尺寸 android & iPhone5
480 => 主流手機
768 => pad
pc => 這個沒有固定，視討論而定，通常1024 or 1200
```

- UI Framework
主要分為兩種狀況，手刻或者用框架：
  - 手刻：目前主流是用`flexbox`(兼容性足夠高)，至於`grid`目前來說，則要根據客戶需求而定，如果面向的客戶使用裝置廣泛，可能舊型機種居多，基本不建議使用，反之則不受影響。
  - 框架：這就看團隊的技術選型，根據團隊採用不同的前端框架，相應的框架也會有差異，以`Vue`來說，目前海外社群投票最大宗是`Vuetify`，其次是`element-ui`(但不支援 RWD，主要用於後台 CMS)，至於更細節的開發，就視實際的設計稿而定，這邊不再贅述了。

## 6. 比較 CSS1、CSS2、CSS3 的區別？
- 規範：
  - CSS1：年代比較偏向是為了更好維護`HTML`結構，將樣式抽離標籤本身，並賦予一些基礎屬性可以改變，譬如文字、文章內容、字體、顏色等等。

  - CSS2：改變了樣式表的概念，不再單純使用`table`、`td`等元素，開始使用`div`或是`ul`、`li`之類的標籤來建立結構後，再透過`CSS`改變樣式。

  - CSS3：除了導入新的特性，也開始要求模組化的機制。

- 選擇器方面：
  - CSS1：屬於簡單選擇器，也就是`id`、`class`之類的。

  - CSS2：開始添加偽元素`(before、after)`。
  
  - CSS3：開始組合選擇器，後代與子選擇器，可以指定某個元素下的所有元素，或是同層級所有元素(使用 +)，又或者是通用兄弟選擇器(使用 ~)，另外新增屬性選擇器。

- 字體：
  在 1、2 的時候，多半只能使用安全字體，也就是通用型字體，但到了 3 開始可以引用一些特殊字體。

- 文章內容：
  到了 3 開始提供自動斷行功能，讓文章中的文字可以自行換行。

- 網頁設計：
  `border-radius`之類圓角設計，開始在 3 的時代出現，另外也開始加入動畫特效。

## 7. 若不使用 flexbox，float 如何置中？
將父元素從左往右推50%，再將子元素用負值推回來50%
- pug：

```
.wrap
  .main
    ul
      li.box.blue
      li.box.green
```

- css：

```
.wrap {
  float: left;
  position: relative;
  left: 50%;
}

.main {
  float: left;
  position: relative;
  left: -50%;
}
```

## 8. 元素設定 flex 屬性後，float 會發生什麼情況？
在`CSS`規範中，父元素設定`flex`屬性後，子元素的`float`即會失效，另一方面，兩者也不應該共用。