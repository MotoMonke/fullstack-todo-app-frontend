import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import type { TodoList } from "../types";
function GetData(){
    const [fetchedData,setFetchedData] = useState<TodoList[]>([]); 
    const [dataToSave,setDataToSave] = useState<TodoList[]>([]); 
    async function getData(){
        try {
            const res = await axios.get("http://localhost:5001/api/todo/get", {
                withCredentials: true,
              });
            if(res.status===200){
                //a litle confusing but ok
                setFetchedData(res.data.data);
            }
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    function selectToSave(list:TodoList){
        setFetchedData(fetchedData.filter(li=>li._id!==list._id));
        setDataToSave([
            ...dataToSave,
            list
        ]);
    }
    return(
        <>
            <div className="get-data">
                <button onClick={getData}>Get data</button>
                <div className="fetched-data-container">
                    {fetchedData.map(list=>(
                        <div key={list._id} onClick={()=>selectToSave(list)}>{list.name}</div>
                    ))}
                </div>
            </div>
            <div className="save-data">
                <h1>Data to save</h1>
                {dataToSave.map(list=>(
                    <div key={list._id}>{list.name}</div>
                ))}
            </div>
        </>
    );
}
export default GetData;