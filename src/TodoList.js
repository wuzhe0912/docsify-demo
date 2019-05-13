// 引入 React 組件，使得下方函數可以透過 render 畫到頁面
import React from 'react';
// 引入子組件 TodoItem
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  // 當 TodoList 這個組件被創建時，自動建立並執行建構式
  constructor (props) {
    super(props)
    // this.state 是一個動態的數據庫
    this.state = {
      list: [],
      // 初始化一個欄位，用於後續 input 所填入的內容
      inputValue: ''
    }
    
    // 代碼優化，將原先綁在 tag 的 this 指向問題，提到建構式統一處理
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }

  // 執行 click 事件
  handleBtnClick () {
    // 而 handleBtnClick 這個函數下的 this 預設會指向 button，造成undefined
    // 在 react 當中，改變數據，必須使用 react 規定的 setState 方法
    this.setState({
      // 當 click 的當下觸發 handleBtnClick 函數，並調用 react 的 setState 方法
      // 透過 ... 展開運算符，第一個參數用於展開的物件，第二個參數則作用於每個物件的值
      list: [...this.state.list, this.state.inputValue],
      // 每次添加完內容時，重新初始化 inputValue
      inputValue: ''
    })
  }

  // 執行 input 輸入內容改變
  handleInputChange (val) {
    this.setState({
      // 將 input 輸入的內容，塞入原先準備的初始化欄位
      inputValue: val.target.value
    })
  }

  // click 事件觸發時，刪除對應點擊的列表
  handleItemDelete (index) {
    // 透過展開運算符，copy 數據庫中的 list
    // 在 react 當中，不建議直接修改數據庫，建議先複製副本，修改為副本後，再賦值回數據庫
    const listCopy = [...this.state.list]
    // 透過 splice 方法刪除
    listCopy.splice(index, 1)
    // 重新將改變的陣列，塞回數據庫
    this.setState({
      list: listCopy
    })
    // 備註：如果副本的命名和原先數據庫內的命名相同，可以使用以下寫法
    // const list = [...this.state.list]
    // list.splice(index, 1)
    // this.setState({list})
  }

  render () {
    return (
    // JSX 當中可以透過 {} 書寫表達式
      <div className="wrap">
        <div>
          {/* 雙向綁定 input 內容，當數據庫 state 發生變化時，input 也隨之變化 */}
          <input value={this.state.inputValue} onChange={this.handleInputChange}/>
          {/* 使用 React 的 onClick 事件，注意 C 為大寫 */}
          {/* this.handleBtnClick 的 this 會指向 TodoList 這個組件下的 handleBtnClick 函數 */}
          {/* 透過 bind 將 handleBtnClick 這個函數下的 this 指向最外層的 TodoList 組件 */}
          <button onClick={this.handleBtnClick}>click</button>
        </div>
        <ul>
          {
            // 將動態數據庫的資料，透過陣列處理，取得資料
            // 將每筆資料，使用 return 畫到對應的標籤上
            this.state.list.map((node, index) => {
              // 在 react 語法當中，每個 return 的標籤，必須有對應的獨立 key 值
              // 我們可以暫時透過陣列迴圈中的 index 賦值給 key，解決這個 error
              // 透過將 index 傳參，handleItemDelete 這個函數可以拿到每個被 click 的 li 的 key
              // return <li key={index} onClick={this.handleItemDelete.bind(this, index)}>{node}</li>
              // --- 上述為組件未拆分前寫法，下述則為拆分後寫法 ---
              return (
                <TodoItem 
                  delete={this.handleItemDelete}
                  key={index}
                  content={node}
                  index={index}
                />
              )
              // 此處接受子組件 TodoItem 來畫出畫面，並將變動的資料作為參數傳給子組件，另需注意父組件是透過屬性的方式向子組件傳遞參數
              // 將 handleItemDelete 這個函數作為方法，傳參給子組件 
            })
          }
        </ul>
      </div>
    )
  }
}

// 導出組件，使 index.js 可以調用這個組件
export default TodoList;
