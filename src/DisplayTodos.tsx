import { useState } from "react";
import type {TodoList,Todo} from "./types.ts";
//i can't just make {todoList}:TodoList
//so i need to make this type name = {todoList:TodoList}
//to use TodoList type on DisplayTodos props  
type DisplayTodosProps = {
    todoList:TodoList,
}
type TodoComponentProps = {
    todo:Todo,
}
function DisplayTodos({todoList}:DisplayTodosProps){

    return(
        <div className="todos-display">
            {todoList.data.map(todo=>(
                <TodoComponent key={todo.id} todo={todo}/>
            ))}
        </div>
    )
}
function TodoComponent({todo}:TodoComponentProps){
    return(
        <div className="todo">
            <div className="todo-text">{todo.text}</div>
        </div>
    )
}
export default DisplayTodos;