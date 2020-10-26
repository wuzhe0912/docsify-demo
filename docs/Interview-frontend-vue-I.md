# Vue.js - I

> 整理常見 Vue.js 面試題目 I

## 1. 如何理解 MVC 和 MVVM 差異？
- MVC

```
view => 前端(切版、套入動畫效果)
controller => 後端(控制 router)
model => 後端(database)
```
`MVC`開始流行的原因，是為了解決早期程式碼混在一起的困境(義大利麵code)，前後端的程式碼都混在一起。因此 MVC 開始進行職責分工，`view`負責畫面顯示，控管`router`和網站行為則由`controller`，查詢資料庫的資料，則是`model`，在這個時代前端工程師這個職缺才開始浮現出來(負責`view`)。也因為`router`交由後端控制，因此這時期的網頁仍是多頁面式的網頁，切換頁面時自然是真的在切換不同`HTML`頁面，故有明顯的`loading`時間。

- MVVM

```
Model => 後端控制
View => 依然是前端(控制使用者看到的渲染頁面)
ViewModel => 前端(改由前端控制 router)
```
進入`MVVM`時代，將原生`JS`操作`DOM`這件事交給框架處理，前端負責改變框架中的資料，驅動資料使頁面重新渲染。因此前端處理的是`view`和`viewModel`，而`model`則是後端在處理。這個時候已經轉型為`SPA`(單頁式應用)，網站頁面切換時，看似切換不同頁面，但本質只是切換同一頁的不同區塊，這時網頁的流暢性與使用體驗會更加流暢。

## 2. Vue 的雙向綁定原理是如何實現的？
主要拆解為四個步驟：
1. 首先`vue`會先通過`document.createDocumentFragment()`的方法來建立虛擬`DOM`。
2. 隨著`vue`所監聽的數據出現改變時，會再透過`Object.defineProperty`來進行數據攔截，在`Vue 3.0`版本已改用`ES6`的`proxy`方式。
3. 根據數據的變化，再透過訂閱-發布者模式，來觸發`watch`，進而改變虛擬`DOM`。
4. 最後，再根據已經改變的虛擬`DOM`，重新渲染頁面的`DOM`結構，達到雙向綁定的目的。

## 2.1 請描述 v-model / v-show / v-if / v-html / v-bind 的用途

## 3. 試說明 Vue 的生命週期
1. `beforeCreate`&`created`
  - `beforeCreated`：`initial`整個`vue`的生命週期，目前個人經驗上，還沒有在這個階段處理過資料。
  - `created`：這個階段，會先進行`initial data`，這個時候`data`內的初始化資料已經可以調用了，如果有需要這個階段也可以呼叫`API`。
  - 在進入`mounted`階段前，其實`Vue`會有一個觀察動作，確認`template`上的`el`是否有正確設置好，但因為目前開發都是基於`vue-cli`的基底，所以這部分不太需要擔心。

2. `beforeMount`&`mounted`
  - `beforeMount`：這個階段很少用，我個人也沒使用過，位於資料渲染前。
  - `mounted`：頁面已經渲染完成，同時`$el`已經掛載上去了，呼叫`API`的`function`常見於此處。

3. `beforeUpdate`&`updated`
  簡單說就是更新`data`的資料，促使頁面重新渲染`DOM`，案例如，透過`@click`事件去執行函式來改變`true` 或`false`，進而影響`v-bind`綁定的`class`增加或移除，達到樣式改變的目的。

4. `beforeDestroy`&`destroyed`
  `vue`生命週期的尾聲，準備要銷毀節點，常見於`v-if`。舉例來說，當我們執行`methods`的函式時，可能會將某些資料進行狀態改變，當資料在`true`或`false`間轉換時，同時`template`上的`DOM`也會隨之出現或消失，但和`v-show`不同，`v-show`的消失，僅是元素採用`css`的`display: none`來隱藏，而`v-if`則是將該元素整個移除，所以被稱為銷毀。不過一般來說，我們不會直接使用`destroyed`，官方也不建議我們使用。

## 4. created 和 mounted 的差異？
兩者的最大的差異，還是在於掛載的順序，以及在各階段資料的狀態。
- `beforeCreate`：在這個階段`$el`和`$data`都尚未掛載 => `undefined`
- `created`：`$data`初始資料已載入，`$el`尚未掛載成功 => `undefined`
- `beforeMount`：`$el`依然為空 => `undefined`
- `mounted`：`$el`掛載完成，渲染出現資料

## 5. 為什麼說 vue 是單向數據流？
因為`vue`的父子組件傳值中，父組件可以送資料給子組件，但子組件只能接收不能傳資料給父組件，不過子組件可以透過`@emit`方法，促使父組件執行函式來改變狀態。

舉例來說，彈窗效果`(modal)`我們通常會封裝到`component`內，每個頁面需要顯示彈窗內容都會有差異，譬如 `title`可能就有落差，那`title`的資料就得透過父組件傳過去。但是如果我們想要關閉彈窗，代表我們想改變狀態，這時候`modal`就可以透過`@emit="boxSwitch"`往上傳，父組件拿到後就會執行`methods`內的`function`來改變當前的狀態，達到關閉彈窗的效果。

## 6. vue-router 有幾種模式？
1. `hash`模式：使用網址的`hash`來模擬一個完整的網址，因此看似網頁在切換，但其實不會重新載入網頁。網址預設帶有`#`，同時兼容性最佳。
2. `history`模式：可以理解為優化`hash`模式，去除了網址中`#`，但需要後端配合設置`URL Rewrite`重新將路徑指向`index.html`。
3. `abstract`模式：支持所有`JavaScript`環境，如`node.js`。當發現沒有瀏覽器`API`時，會強制切換至此模式。

## 7. Vue Router 如何達到 SPA 效果？
`SPA`的重點就在於由前端來模擬路由，讓使用者看似在切換頁面，實際上只是切換組件。而`Vue Router`就是透過 `router-view`的方法來包裝顯示組件，再透過`router-link`或是`router.push()`等方法來進出頁面。看起來雖然像是從 A 頁面進入 B 頁面，但實際上卻是將 A 組件改為顯示 B 組件。

## 8. Vue 路由的跳轉方式？
1. `router-link`，本質上就是`a`標籤，在`template`中使用這個方式。
2. `router.push`，主要透過`methods`來執行跳轉到對應頁面，同時也可以在其中的`query`埋下參數，方便跳轉後的頁面直接調用。

## 9. 簡單解釋一下 Vuex 的原理
在`Vuex`當中，`state`會存放初始化的資料，當`component`呼叫`uex`中寫好的函式，首先會到`actions`找對應的函式，這時會去呼叫`api`的資料，當然如果`component`呼叫時有傳入參數，那這個參數就透過`payload`傳入函式。當`api`的資料取得後，除了回傳給`component`，也透過`commit`的方式來改變`mutations`內的函式，而`mutations`這時就會將傳來的資料賦值給`state`，進而改變狀態。

## 9.1 Vuex 有哪些屬性，請分別描述

## 10. 什麼情境下，需使用 Vuex？
`Vue`的專案中，通常會有多個`component`組成，尤其專案越大組成結構就越複雜，有些資料會是多個頁面需要共用，這個時候不可能仰賴父子組件傳值，萬一組件和組件之間隔了好幾層，那效益就太差了，這時通常就會抽離到 `Vuex`進行狀態管理。

舉例來說，常見的使用者帳號資料`userInfo`，在`login`和`logout`兩種狀態下，頁面需要顯示的內容會有所差異，不可能在每一個需要使用`userInfo`的`component`都寫一遍呼叫`api`的函式，所以無論是初始的資料或是呼叫`api`的函式，這時候就會統一寫在`Vuex`，方便直接`commit`更新`state`，需要使用的`component`再透過 `mapState`去載入。
