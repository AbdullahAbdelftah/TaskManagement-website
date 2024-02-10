import { useState ,useEffect } from "react";
import OnGoingCard from "./OnGoingCard";
import { Store } from "../Store";
import { useContext } from "react";
import DoneCard from "./DoneCard";
const Done = () => {
    let store=useContext(Store);
    let [done,setDone]=useState([]);
    useEffect(()=>{
        let userongoing=store.currUser.done;
        console.log(userongoing);
        let temp=userongoing.map((task,index)=>{
            return <DoneCard doneTime={task.doneTime} time={task.time} color={task.color} content={task.content} key={index} id={task.id}/>
        })
        setDone(temp);
    },[store.currUser]);
    return ( 
        <div className="done">
            
            {done}
        </div>
     );
}
 
export default Done;