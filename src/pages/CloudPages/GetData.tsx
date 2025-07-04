import axios from "axios";
import { useState } from "react";
import type { TodoList } from "../../types";
import "./GetData.css"
function GetData(){
    const [fetchedData,setFetchedData] = useState<TodoList[]>([]); 
    const [dataToSave,setDataToSave] = useState<TodoList[]>([]); 
    async function getData(){
        try {
            const apiUrl = import.meta.env.VITE_GET_DATA_URL;
            if (!apiUrl) {
                throw new Error("Missing REACT_APP_GET_DATA_URL environment variable");
            }
            const res = await axios.get(apiUrl, {
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
    function unstage(list:TodoList){
        setDataToSave(dataToSave.filter(li=>li._id!==list._id));
        setFetchedData([
            ...fetchedData,
            list
        ]);
    }
    function saveData(){
        const localStorageData = localStorage.getItem('DATA'); 
        if(localStorageData){
            let parsed:TodoList[] = JSON.parse(localStorageData);
            dataToSave.forEach(list=>{
                //checking if todo list with that _id already exist localy
                const found = parsed.find((element)=>element._id===list._id);
                if(found){
                    //overwriting local todo list by downloaded list if _id mathces
                    const updated = parsed.map(element=>{
                        if(element._id===found._id){
                            return found;
                        } else {
                            return element;
                        }
                    });
                    parsed = updated;
                } else {
                    parsed.push(list);
                }
            });
            localStorage.setItem('DATA',JSON.stringify(parsed));
            setDataToSave([]);
        } else {
            localStorage.setItem('DATA',JSON.stringify(dataToSave));
            setDataToSave([]);
        }
    }
    async function deleteData(_id:String){
        try {
            const deleteURL = import.meta.env.VITE_DELETE_URL;
            if(!deleteURL){
                throw new Error("Missing VITE_DELETE_URL environment variable");
            }
            const res = await axios.delete(deleteURL,{ 
                data:{list_id:_id},
                withCredentials: true});
            if(res.status===200){
                setFetchedData(fetchedData.filter(list => list._id !== _id));
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    return(
        
        <div className="get-data-page">
            <div className="data-manipulation-container">
                <div className="get-data">
                    <h1>Get data from cloud</h1>
                    <button disabled={fetchedData.length>0||dataToSave.length>0} onClick={getData}>Get data</button>
                    <div className="fetched-data-container">
                        {fetchedData.map(list=>(
                            <div key={list._id} className="fetched-todo-list">
                                <div onClick={()=>selectToSave(list)}>{list.name}</div>
                                <button className="delete-btn" onClick={()=>deleteData(list._id)}>Delete from cloud</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="save-data">
                    <h1>Save data locally</h1>
                    {dataToSave.map(list=>(
                        <div className="todo-list-save" key={list._id} onClick={()=>unstage(list)}>{list.name}</div>
                    ))}
                    <button disabled={dataToSave.length===0} onClick={saveData}>Save data locally</button>
                </div>
            </div>
            <a href="/">Go to main page</a>
        </div>
        
    );
}
export default GetData;