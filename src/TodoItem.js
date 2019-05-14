// 建立子組件，將原先的每個新增列表抽離出來
import React from 'react';

class TodoItem extends React.Component {

  constructor (props) {
    super(props)
    this.handleItemDelete = this.handleItemDelete.bind(this)
  }

  handleItemDelete () {
    // 子組件如果希望變動父組件的 state 數據庫，意味著必須在父子組件之間，建立通信渠道
    // 而建立通信的方式，在於父組件將方法傳參給子組件，讓兩者之間建立雙向通道
    // 未優化 code 前寫法
    // this.props.delete(this.props.index)
    // 優化後寫法
    const { deleteItem, index } = this.props
    deleteItem(index)
  }

  render () {
    // 優化 code 寫法
    const { content } = this.props
    return (
      // 子組件，透過 props 接受父組件傳參
      // 原先寫於父組件的刪除列表函數，自然因為拆分組件的關係，改到子組件書寫
      <div onClick={this.handleItemDelete}>{content}</div>
    )
  }
}

export default TodoItem
