import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import type { TodoList } from "../types";
function GetData(){
    const [data,setData] = useState<TodoList[]>([]); 
    async function getData(){
        try {
            const res = await axios.get("http://localhost:5001/api/todo/get", {
                withCredentials: true,
              });
            if(res.status===200){
                //a litle confusing but ok
                setData(res.data.data);
            }
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
            <button onClick={getData}>Get data</button>
            <div className="data-container">
                {data.map(list=>(
                    <div key={list._id}>{list.name}</div>
                ))}
            </div>
        </>
    );
}
export default GetData;