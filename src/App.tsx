import { useState,useEffect } from 'react'
import Sidebar from './Sidebar'
import DisplayTodos from './DisplayTodos.tsx';
import type {TodoList,Todo} from "./types.ts"

function App() {
  function getData():TodoList[]{
    const data = localStorage.getItem('DATA');
    if(data){
      return JSON.parse(data);
    } else {
      return [
        {
          id:"1",
          name:"todo",
          data:[
            {
              id:"0",
              text:"Visit museum",
              done:true,
            },
            {
              id:"1",
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

  function changeSelectedId(id:string):void{
    setSelectedId(id);
  }

  function addList(listObj:TodoList):void{
    setLocalStorageData([...localStorageData,listObj]);
  }
  function deleteList(id:string):void{
    if(selectedId===id){
      setSelectedId("0");
    }
    setLocalStorageData(localStorageData.filter(list=>list.id!==id));
  }
  function editList(editedListObj:TodoList):void{
    const newArray:TodoList[] = localStorageData.map((list)=>{
      if(list.id===editedListObj.id){
        return editedListObj;
      } else {
        return list
      }
    });
    setLocalStorageData(newArray);
  }

  function addNewTodo(newTodoObj:Todo):void{
    const selectedList = localStorageData.find(list=>list.id===selectedId);
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
    const selectedList = localStorageData.find(list=>list.id===selectedId);
    if(selectedList){
      const newDataArray = selectedList.data.filter(todo=>{todo.id!==todoId});
      editList({
        ...selectedList,
        data:newDataArray,
      });
    } else {
      alert("Error in addNewTodo");
    }
  }
  function editTodo(editedTodo:Todo):void{
    const selectedList = localStorageData.find(list=>list.id===selectedId);
    if(selectedList){
      const newDataArray = selectedList.data.map(todo=>{
        if(todo.id===editedTodo.id){
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
  const selectedList = localStorageData.find(list=>list.id===selectedId);;
  return (
    <>
      <Sidebar todosListArrays={localStorageData} addList={addList} deleteList={deleteList} selectedId={selectedId} changeSelectedId={changeSelectedId} />
      {selectedList&&<DisplayTodos todoList={selectedList}/>}
    </>
  )
}

export default App
