import { useState } from "react";
import type {TodoList} from "./types.ts"
type SidebarProps = {
    todosListArrays:TodoList[],
    addList:(listObj:TodoList)=>void,
    deleteList:(id:string)=>void,
    selectedId:string,
    changeSelectedId:(id:string)=>void,
}
function Sidebar({todosListArrays,addList,deleteList,selectedId,changeSelectedId}: SidebarProps){
    const [text,setText] = useState("");
    function createList():void{
        const newList = {
            id:crypto.randomUUID(),
            name:text,
            data:[],
        }
        setText("");
        addList(newList)
    }
    function handleClick(id:string):void{
        changeSelectedId(id);
    }
    return(
    <div className="sidebar">
        <div className="list-of-lists">
            {todosListArrays.map(list=>(
                <div className={list.id===selectedId?"list selected":"list"} key={list.id}  >
                    <div onClick={()=>handleClick(list.id)}>{list.name}</div>
                    <button onClick={()=>deleteList(list.id)}>X</button>    
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