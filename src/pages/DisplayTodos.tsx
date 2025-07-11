import { useState } from "react";
import type {TodoList,Todo} from "../types.ts";
//i can't just make {todoList}:TodoList
//so i need to make this type name = {todoList:TodoList}
//to use TodoList type on DisplayTodos props  
type DisplayTodosProps = {
    todoList:TodoList,
    addNewTodo:(newTodoObj:Todo)=>void,
    deleteTodo:(todoId:string)=>void,
    editTodo:(editedTodo:Todo)=>void,
}
type TodoComponentProps = {
    todo:Todo,
    deleteTodo:(todoId:string)=>void,
    editTodo:(editedTodo:Todo)=>void,
}
type EditTodoTextProps = {
    todo:Todo,
    editTodo:(editedTodo:Todo)=>void,
    changeIsEditing:()=>void,
}
function DisplayTodos({todoList,addNewTodo,deleteTodo,editTodo}:DisplayTodosProps){
    const [text,setText] = useState("");
    function createTodo(){
        if(text.length>=1){
            addNewTodo({
                _id:crypto.randomUUID(),
                text:text,
                done:false,
            });
            setText("");
        }
    }
    return(
        <div className="display-todos">
            <div className="todo-list-name">
                <h1>{todoList.name}</h1>
            </div>
            <div className="create-and-see-todos">
                <div className="todo-list">
                    {todoList.data.map(todo=>(
                        <TodoComponent key={todo._id} todo={todo} deleteTodo={deleteTodo} editTodo={editTodo}/>
                    ))}
                </div>
                <div className="create-todo">
                    <input type="text" value={text} onChange={e=>setText(e.target.value)} placeholder="new task name"/>
                    <button onClick={createTodo}>+</button>
                </div>
            </div>
        </div>
    )
}
function TodoComponent({todo,deleteTodo,editTodo}:TodoComponentProps){
    function handleDoneChange(){
        editTodo({
            ...todo,
            done:!todo.done
        });
    }
    function handleDelete(){
        deleteTodo(todo._id);
    }
    const [isEditing,setIsEditing] = useState(false);
    function changeIsEditing(){
        setIsEditing(!isEditing)
    }
    return(
        <div className="todo">
            <input className="checkbox" type="checkbox" checked={todo.done} onChange={handleDoneChange}/>
            {!isEditing&&<div onClick={changeIsEditing} className={todo.done?"completed-todo-text":"todo-text"}>{todo.text}</div>}
            {isEditing&&<EditTodoText todo={todo} editTodo={editTodo} changeIsEditing={changeIsEditing} />}
            <button onClick={handleDelete}>X</button>
        </div>
    )
}
function EditTodoText({todo,editTodo,changeIsEditing}:EditTodoTextProps){
    const [text,setText] = useState(todo.text);
    function handleSave(){
        editTodo({
            ...todo,
            text:text
        });
        changeIsEditing();
    }
    return(
        <>
            <input type="text" value={text} onChange={e=>setText(e.target.value)} />
            <button onClick={handleSave}>Save</button>
        </>
    );
}
export default DisplayTodos;