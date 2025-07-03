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
        <h2>My lists</h2>
        <ul className="list-of-lists">
            {todosListArrays.map(list=>(
                <li className={list._id===selectedId?"list-selected":"list"} key={list._id}  >
                    <div className="list-content">
                        <div onClick={()=>handleClick(list._id)}>{list.name}</div>
                        <button onClick={()=>deleteList(list._id)}>Delete</button>    
                    </div>
                </li>
            ))}
        </ul>
        <div className="add-new-list">
            <button onClick={createList} >+</button>
            <input spellCheck="false" type="text" value={text} onChange={e=>setText(e.target.value)} />
        </div>
    </div>
    );
}

export default Sidebar;