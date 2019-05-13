import React from 'react';
import ReactDOM from 'react-dom';

// 在 React 當中，大寫字母開頭，皆是組件
// 但瀏覽器無法理解組件，因此我們在第一行引入 React，讓瀏覽器可以理解
import TodoList from './TodoList';

// ReactDOM 透過 render 方法，把組件畫到頁面上
// root 根目錄設定在 public/index.html
ReactDOM.render(<TodoList />, document.getElementById('root'));
