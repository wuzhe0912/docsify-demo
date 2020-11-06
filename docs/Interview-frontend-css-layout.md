# CSS Layout 佈局考題

> 記錄手寫`CSS Layout`考題

## 試用 flex 語法寫一個 Layout
- `HTML(Pug)`：

```
<div class="wrap">
  <header class="header__wrap">
    header
  </header>
  <main class="main__wrap">
    <div class="sidebar">1</div>
    <div class="main__content">2</div>
    <div class="right__content">3</div>
  </main>
  <footer class="footer__wrap">
    footer
  </footer>
</div>
```
- `CSS`：

```
.wrap {
  display: flex;
  flex-direction: column;
  width: 400px;
  color: white;
  text-align: center;
}

.header__wrap,
.footer__wrap {
  width: 100%;
  background: rebeccapurple;
}

.main__wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 300px;
}

.sidebar,
.right__content {
  width: 50px;
  background: blue;
}

.main__content {
  width: calc(100% - 100px);
  background: green;
}
```
