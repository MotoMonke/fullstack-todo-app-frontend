import axios from "axios";
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
            const res = await axios.delete("http://localhost:5001/api/todo/delete",{ 
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
        <>
            <div className="get-data">
                <button disabled={fetchedData.length>0||dataToSave.length>0} onClick={getData}>Get data</button>
                <div className="fetched-data-container">
                    {fetchedData.map(list=>(
                        <div key={list._id} className="fetched-todo-list">
                            <div onClick={()=>selectToSave(list)}>{list.name}</div>
                            <button onClick={()=>deleteData(list._id)}>Delete from cloud</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="save-data">
                <h1>Data to save locally</h1>
                {dataToSave.map(list=>(
                    <div key={list._id} onClick={()=>unstage(list)}>{list.name}</div>
                ))}
                <button disabled={dataToSave.length===0} onClick={saveData}>Save data locally</button>
            </div>
            <a href="/">Go to main page</a>
        </>
    );
}
export default GetData;