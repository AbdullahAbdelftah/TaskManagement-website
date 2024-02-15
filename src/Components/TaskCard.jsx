import { useContext } from "react";
import { Store } from "../Store";
const TaskCard = (props) => {
    let store=useContext(Store);
    function sendOngoing(){
        fetch(`https://taskserver-iy1n.onrender.com/sendOngoing/${props.id}/${store.currUser._id}`).then((response)=>{
            if(!response.ok){
                throw new Error(response);
            }
            else{
                return response.json();
            }
        }).then((data)=>{
            console.log(data);
            store.updateCurrUser(data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    function removeTask(){
        fetch(`https://taskserver-iy1n.onrender.com/removeTask/${props.id}/${store.currUser._id}`).then((response)=>{
            if(!response.ok){
                throw new Error(response);
            }
            else{
                return response.json();
            }
        }).then((data)=>{
            console.log(data);
            store.updateCurrUser(data);
        })
    }
    return ( 
        <div style={{backgroundColor:props.color}} className="taskcard">
            <h2>{props.content}</h2>
            <div>
                <button className="start" onClick={sendOngoing}><i className="fa-solid fa-play fa-xl"></i></button>
                <button className="start" onClick={removeTask}><i className="fa-solid fa-ban fa-xl"></i></button>
            </div>
        </div>
     );
}
 
export default TaskCard;