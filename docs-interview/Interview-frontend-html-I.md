# HTML - I

> 整理常見 HTML 面試題目 I

## 1. `doctype` 做什麼用的？
用來定義網頁編寫的`HTML`採用什麼版本。

## 2. 有用過 HTML 樣板語言（template languages）嗎？
目前使用`pug`，除了減少閉合標籤，也能讓`template`更為簡潔。

## 3. 簡單說明 HTML5 的特色
- 語意化：諸如`header`、`main`、`section`之類的語意化標籤，善用這些標籤能對網站`SEO`能更加友善。
- 多媒體：隨著`HTML5`開始支援播放影片音樂，成為壓垮`flash`的主因之一。`Canvas`除了讓網頁直接繪出圖形，也讓許多遊戲產業獲得更好的發展。
- API：增加許多`API`方法，諸如支援移動裝置的`touch`事件、地理資訊紀錄`(Geolocation)`以及雙向溝通的`websocket`(但存有安全性疑慮)。

## 4. 可以簡單列舉常用的 HTML5 語意標籤嗎？
1. `header`：網頁的標題，通常放置網站的`logo`或`navbar`
2. `nav`：網站的選單與導覽列
3. `main`：網頁的主要內容
4. `aside`：側邊欄或是一些附加內容
5. `section`：自定義的區塊內容
6. `article`：一篇文章的內容
7. `footer`：網頁的底部，版權宣告或聯絡方式
8. `mark`：特殊強調
9. `time`：顯示日期時間

## 5. 簡單說明一下 HTML5 的 data-attribute
相對於過往的`src`或是`type`，`data-attribute`就是`HTML`的自定義屬性，書寫規範上，不可以使用大寫。建立好的自定義屬性，可以透過`CSS`的偽元素來獲取：
```
// pug
span(data-value="Hello") => 可以透過 API 取得的資料先擺上去

// scss
span {
  &::before{
    content: attr(data-value);
  }
}
```
也可以建立通用樣式，方便全域調用
```
p[data-size="lg"] {
  width: 1024px
}
```
可以透過`dataset`的方法來獲取指定元素的資料
```
// pug
#value(data-value="show")

// js
let dataValue = document.getElementById('value')
console.log(dataValue.dataset.value)  // 印出 show
```
但在瀏覽器的兼容性上，如果面向的客戶為大陸，則多數冷門瀏覽器不兼容。

## 6. input tag 在 HTML 5 中新增的屬性？
- 時間相關：month(月)、week(週)、time(時、分、秒)
  - `date`：可以選擇年、月、日
  - `month`：選擇年、月
  - `week`：選擇週、年
  - `time`：選擇時間(時、分)
  - `datetime`：選擇時間、日期、月、年(UTC 時間)
  - `datetime-local`：選擇時間、日期、月、年(本地時間)

- email、tel、url、search、number(限制只能輸入數字)、color(顏色選擇器)、range(slide bar)