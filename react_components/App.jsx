/** @jsx React.DOM */

var React   = require('react');
var TodoModel = require('./TodoModel.js');

var TodoItem = React.createClass({

    getInitialState: function(){
        return {
            editing: false
        }
    },
    remove: function(){
        this.props.onRemove();
    },
    render: function(){
        return (
            <li>
                <label className="toggle icon-delete" onClick={this.remove}></label>
                {this.props.todo}
            </li>
        );
    }
});

var AddTodoItem = React.createClass({

    getInitialState: function(){
        return {
            add: false
        }
    },
    edit: function(){
        this.setState({add: true});
    },
    addEvent: function(ev){
        if(ev.keyCode != 13){
            return;
        }
        this.add();
    },
    add: function(){
        this.props.onAdd(this.refs.todo.getDOMNode().value);
        this.refs.todo.getDOMNode().value = '';
        this.setState({add: false});
    },
    componentDidUpdate: function(){
        this.refs.todo.getDOMNode().focus();
    },
    render: function(){
        var showInput = this.state.add ? 'show' : 'hide',
            showAdd = this.state.add ? 'hide' : 'show';

        return (
            <ul className="todo-controls">
                <li className={showInput}>
                    <input type="text" ref="todo" onKeyUp={this.addEvent} placeholder="Enter todo" autoFocus/>
                    <a className="icon-add" onClick={this.add}>Add</a>
                </li>
                <li className={showAdd}>
                    <a className="icon-add" onClick={this.edit}>Add</a>
                </li>
            </ul>
        );
    }
});



var TodoApp = React.createClass({
    getInitialState: function () {
        return {
            editing: false
        };
    },
    onAdd: function(todo){
        this.props.todos.add(todo);
    },
    onRemove: function(todo){
        this.props.todos.remove(todo);
    },
    refresh: function(){
        this.setState({});
    },
    render: function(){

        this.props.todos.subscribe(this.refresh.bind(this));

        var myTodos = [], todo;
        for(var i=0; i< this.props.todos.size(); i++){
            todo = this.props.todos.get(i);
            myTodos.push(<TodoItem todo={todo} onRemove={this.onRemove.bind(this, todo)}/>);
        }

        return (
            <div>
                <section className="todo">
                    <AddTodoItem onAdd={this.onAdd.bind(this)}/>
                    <ul className="todo-list">
                        {myTodos}
                    </ul>
                </section>
            </div>
        );
    }

});


var globalTodo = new TodoModel('todo');
globalTodo.add('My First Todo');
globalTodo.add('My Second Todo');
globalTodo.add('My Third Todo');

React.renderComponent(
    <TodoApp todos={globalTodo}/>,
    document.getElementById('container')
);