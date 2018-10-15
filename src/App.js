import React, { Component } from 'react';
import List from './components/List'
import Button from './components/Button'
import DragSortableList from 'react-drag-sortable'

class App extends Component {
  state = {
    inputName: '',
    toDoList: []
  //   list: [
  //     {content: (<li>test1</li>), classes:['bigger']},
  //     {content: (<li>test2</li>)},
  //     {content: (<li>test3</li>), classes:['bigger']},
  //     {content: (<li>test4</li>)}
  // ]
  }
  handleChange = (e) => {
    this.setState({
      inputName: e.target.value
    })
  }
  removeItemFromList = (mira) => {
    // console.log(el);
      console.log(mira);
    this.setState({
      toDoList: this.state.toDoList.filter(el => el !== mira)
      
      // list: this.state.list.filter(el => el !== mira)

      
    })
  }
  handleAddItem = (event) => {
    event.preventDefault()
    if(this.state.inputName !== ''){
      this.setState({
        toDoList: [...this.state.toDoList, this.state.inputName],
        // list: [...this.state.list, {content: (<li onClick={this.removeItemFromList}><span>-</span><div className="title">Click Here to remove an item</div>>{this.state.inputName}</li>)}],
        inputName: ""
      })
    }
  }
  
  handleDoneAction = (event) => {
    let itemIndex = event.target.getAttribute("key");
    let prevOrders = [...this.state.toDoList];
    var itemToMoveAtLast = prevOrders.splice(itemIndex, 1);
    var updatedOrderList = prevOrders.concat(itemToMoveAtLast);
    this.setState({toDoList: updatedOrderList})

}
  render() {
    const {inputName, toDoList, list} = this.state;
    return (
      <div className="App">
        <div className="container">
        <h1>To do List</h1>
        <label>Please add item:</label><br />
          <input type='text' value={inputName} onChange={this.handleChange} /><br />
          <Button button={this.handleAddItem} buttonText="Add an item" />
          <List toDo={toDoList} list={toDoList} removeItem={this.removeItemFromList}/>
          {/* <DragSortableList items={list} type="horizontal" removeItem={this.removeItemFromList}/> */}
          <Button button={this.handleDoneAction} buttonText='Reorder items' bgColor='#4BB46B' />

        </div>
      </div>
    );
  }
}

export default App;
