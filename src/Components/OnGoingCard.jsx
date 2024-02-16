import { useContext } from "react";
import { Store } from "../Store";

const OnGoingCard = (props) => {
    let store=useContext(Store);
    function removeOngoing(){
        fetch(`https://taskserver-iy1n.onrender.com/removeOngoing/${props.id}/${store.currUser._id}`).then((response)=>{
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

    function sendDone(){
        fetch(`https://taskserver-iy1n.onrender.com/sendDone/${props.id}/${store.currUser._id}`).then((response)=>{
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
                <button onClick={sendDone} className="start"><i class="fa-solid fa-check fa-xl"></i></button>
                <button onClick={removeOngoing} className="start"><i className="fa-solid fa-ban fa-xl"></i></button>
            </div>
            <p>{props.time}</p>
        </div>
     );
}
 
export default OnGoingCard;