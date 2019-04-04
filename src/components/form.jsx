import React, { Component } from 'react';
import Todos from '../components/todos';
const uuidv1 = require('uuid/v1');

export default class form extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos: [],
            submitted: false,
        }
    }


    // REMOVE ITEM
    removeToDo = (index) => {
        
        //filter through the todos and remove the one passed into the function...
        const updatedtodos = this.state.todos.filter((todo,i)=> {
            return (i !== index);
        })
        //log the newly filtered array without the removed item
        console.log(updatedtodos)
        this.setState({todos: updatedtodos});
    }

    // UPDATE ITEM
    completeToDo = (id) => {
        const todo = this.state.todos.filter((todo)=> {
            if(todo.id === id){
                todo.complete = !todo.complete;
            }
            return todo;
        })
        this.setState({todos: todo});
       
    }
    
    // ADD ITEM
    handleSubmit = (e) => { 
        e.preventDefault()
        this.setState({submitted: true})
        //console.log(this.refs.item.value)

        this.setState({
            // spread operator adds new object to exsitiing array.
            todos: [...this.state.todos, {item: this.refs.item.value, complete: false, edit: false, id: uuidv1() }]
        });
        this.refs.item.value = ""
    }



  render() {
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <div className="formgroup">
                <label>Add todo <i className="fas fa-plus"></i></label>
                <input
                    type="text"
                    placeholder="enter task"
                    ref="item"
                    required
                    />
            </div>
            <input type="submit" className="btn" value="Add Todo"/>
            </form>
            <Todos completeToDo={this.completeToDo} removeToDo={this.removeToDo} todo={this.state}/>
      </div>
    )
  }
}
