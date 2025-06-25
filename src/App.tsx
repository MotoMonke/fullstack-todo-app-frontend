import { useState } from 'react'

type Todo = {
  id:number,
  text:string,
  done:boolean,
}
type TodoList = {
  id:number,
  name:string,
  data:Todo[]
}

function App() {
  function getData():TodoList[]{
    const data = localStorage.getItem('DATA');
    if(data){
      return JSON.parse(data);
    } else {
      return [
        {
          id:1,
          name:"todo",
          data:[
            {
              id:0,
              text:"Visit museum",
              done:true,
            },
            {
              id:1,
              text:"By groceries",
              done:false,
            }
          ],
        }
      ];
    }
  }
  const [localStorageData,setLocalStorageData] = useState<TodoList[]>(getData);
  return (
    <>
      
    </>
  )
}

export default App
