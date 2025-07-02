import { useState } from "react";
import type {TodoList} from "../types.ts"
type SidebarProps = {
    todosListArrays:TodoList[],
    addList:(listObj:TodoList)=>void,
    deleteList:(_id:string)=>void,
    selectedId:string,
    changeSelectedId:(_id:string)=>void,
}
function Sidebar({todosListArrays,addList,deleteList,selectedId,changeSelectedId}: SidebarProps){
    const [text,setText] = useState("");
    function createList():void{
        const newList = {
            _id:crypto.randomUUID(),
            name:text,
            data:[],
        }
        setText("");
        addList(newList)
    }
    function handleClick(_id:string):void{
        changeSelectedId(_id);
    }
    return(
    <div className="sidebar">
        <div className="list-of-lists">
            {todosListArrays.map(list=>(
                <div className={list._id===selectedId?"list selected":"list"} key={list._id}  >
                    <div onClick={()=>handleClick(list._id)}>{list.name}</div>
                    <button onClick={()=>deleteList(list._id)}>X</button>    
                </div>
            ))}
        </div>
        <div className="add-new-list">
            <input type="text" value={text} onChange={e=>setText(e.target.value)} />
            <button onClick={createList} >+</button>
        </div>
    </div>
    );
}

export default Sidebar;