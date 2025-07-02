import { useState,useEffect } from 'react'
import Sidebar from './Sidebar'
import DisplayTodos from './DisplayTodos.tsx';
import type {TodoList,Todo} from "../types.ts"

function TodoApp(){
    function getData():TodoList[]{
        const data = localStorage.getItem('DATA');
        if(data){
          return JSON.parse(data);
        } else {
          return [
            {
              _id:"1",
              name:"todo",
              data:[
                {
                  _id:"0",
                  text:"Visit museum",
                  done:true,
                },
                {
                  _id:"1",
                  text:"By groceries",
                  done:false,
                }
              ],
            }
          ];
        }
      }
      const [localStorageData,setLocalStorageData] = useState<TodoList[]>(getData);
      const [selectedId,setSelectedId] = useState("0");
      useEffect(()=>{
        const data = JSON.stringify(localStorageData);
        localStorage.setItem('DATA',data);
        console.log(localStorageData);
      },[localStorageData]);
    
      function changeSelectedId(_id:string):void{
        setSelectedId(_id);
      }
    
      function addList(listObj:TodoList):void{
        setLocalStorageData([...localStorageData,listObj]);
      }
      function deleteList(_id:string):void{
        if(selectedId===_id){
          setSelectedId("0");
        }
        setLocalStorageData(localStorageData.filter(list=>list._id!==_id));
      }
      function editList(editedListObj:TodoList):void{
        const newArray:TodoList[] = localStorageData.map((list)=>{
          if(list._id===editedListObj._id){
            return editedListObj;
          } else {
            return list
          }
        });
        setLocalStorageData(newArray);
      }
    
      function addNewTodo(newTodoObj:Todo):void{
        const selectedList = localStorageData.find(list=>list._id===selectedId);
        if(selectedList){
          const newDataArray = [...selectedList.data,newTodoObj];
          editList({
            ...selectedList,
            data:newDataArray,
          });
        } else {
          alert("Error in addNewTodo");
        }
      }
      function deleteTodo(todoId:string):void{
        const selectedList = localStorageData.find(list=>list._id===selectedId);
        if(selectedList){
          const newDataArray = selectedList.data.filter(todo=>todo._id!==todoId);
          editList({
            ...selectedList,
            data:newDataArray,
          });
        } else {
          alert("Error in addNewTodo");
        }
      }
      function editTodo(editedTodo:Todo):void{
        const selectedList = localStorageData.find(list=>list._id===selectedId);
        if(selectedList){
          const newDataArray = selectedList.data.map(todo=>{
            if(todo._id===editedTodo._id){
              return editedTodo;
            } else {
              return todo;
            }
          });
          editList({
            ...selectedList,
            data:newDataArray,
          });
        } else {
          alert("Error in addNewTodo");
        }
      }
      const selectedList = localStorageData.find(list=>list._id===selectedId);;
      return (
        <>
          <a href="/get-data">Download data from cloud</a>
          <br />
          <a href="/save-data">Save data to cloud</a>
          <Sidebar todosListArrays={localStorageData} addList={addList} deleteList={deleteList} selectedId={selectedId} changeSelectedId={changeSelectedId} />
          {selectedList&&<DisplayTodos todoList={selectedList} addNewTodo={addNewTodo} deleteTodo={deleteTodo} editTodo={editTodo}/>}
        </>
      )
}
export default TodoApp;