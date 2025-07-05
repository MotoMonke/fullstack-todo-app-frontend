import { useState } from "react";
import type { TodoList } from "../../types";
import axios from "axios";
import "./SaveData.css"
function SaveData(){
    function getLocalStorageData():TodoList[]{
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
    function selectListToSave(list:TodoList){
        setLocalStorageData(localStorageData.filter(li=>li._id!==list._id));
        setDataToSave([
            ...dataToSave,
            list
        ]);
    }
    function unstage(list:TodoList){
        setDataToSave(dataToSave.filter(li=>li._id!==list._id));
        setLocalStorageData([
            ...localStorageData,
            list
        ])
    }
    async function saveToCloud(){
        if(dataToSave.length===0){
            return;
        }
        try {
          const apiUrl = import.meta.env.VITE_API_URL+"/api/todo/save";
            if (!apiUrl) {
                throw new Error("Missing VITE_API_URL environment variable");
            }
            const res = await axios.post(apiUrl, 
                {todoListsArray:dataToSave},
                {withCredentials: true,});
            if(res.status===200){
                setDataToSave([]);
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
              console.log("Server message:", error.response?.data.message);
            } else {
              console.log("Unexpected error", error);
            }
        }
    }
    const [localStorageData,setLocalStorageData] = useState<TodoList[]>(getLocalStorageData);
    const [dataToSave,setDataToSave] = useState<TodoList[]>([]);
    return(
          <div className="save-data-page">
            <div className="data-manipulation-container">
                <div className="local-data-div"> 
                  <h1>Local data:</h1>
                    {localStorageData.map(list => (
                      <div className="todo-list" key={list._id} onClick={() => selectListToSave(list)}>
                        {list.name}
                      </div>
                    ))}
                </div>
                <div className="data-to-save-div">
                  <h1>Data to save</h1>
                  {dataToSave.map(list => (
                    <div className="todo-list" key={list._id} onClick={() => unstage(list)}>
                      {list.name}
                    </div>
                  ))}
                  <button onClick={saveToCloud} disabled={dataToSave.length === 0}>
                    Save to cloud
                  </button>
                </div>
            </div>
            <a href="/">Go to main page</a>
        </div>
    );
}
export default SaveData;