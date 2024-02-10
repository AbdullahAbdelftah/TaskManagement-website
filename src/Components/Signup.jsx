import {useEffect, useRef, useState,useContext} from "react";
import { Store } from "../Store";
const Signup = () => {
    useEffect(()=>{
        localStorage.removeItem("currUser");
    },[]);
    let store=useContext(Store);
    let [dup,setDup]=useState("");
    let [wrong,setWrong]=useState("");
    let logUsername=useRef("");
    let logPass=useRef("");
    let signUsername=useRef("");
    let signPass=useRef("");
    function signUp(){
        setDup("");
        let newUser={
            tasks:[],
            ongoing:[],
            done:[],
            username:signUsername.current.value,
            password:signPass.current.value,
            uniId:0
        };
        fetch("http://localhost:5000/addUser",{
            method: "POST",
            headers:{
                "content-type": "application/json",
            },
            body:JSON.stringify(newUser)
        }).then((response)=>{
            if (!response.ok) {
                throw new Error('Network response was not ok');
              }
            else{
                
                return response.json();
            }
        }).then((data)=>{
            if(data===null){
                setDup("h")
            }
            console.log(data,"hi");
            store.updateCurrUser(newUser);
            localStorage.setItem("currUser",JSON.stringify(newUser));
        })
    }
    function logIn(){
        setWrong("");
        fetch(`http://localhost:5000/login/${logUsername.current.value}/${logPass.current.value}`).then((response)=>{
            return response.json();
        }).then((data)=>{
            if(data!==null){
                localStorage.setItem("currUser",JSON.stringify(data));
                store.updateCurrUser(data);
            }
            else{
                setWrong("h");
            }
        });
    }
    return ( 
        <div>
            {dup!=="" &&<h1 style={{textAlign:"center"}}>Username Already Exists</h1>} 
            {wrong!=="" &&<h1 style={{textAlign:"center"}}>Wrong Username Or Password</h1>}
            <div className="main"> 
                	
		        <input type="checkbox" id="chk" aria-hidden="true"/>
                <div className="login">
                    <div className="form">
                        <label htmlFor="chk" aria-hidden="true">Log in</label>
                        <input ref={logUsername} className="input" type="text" name="txt" placeholder="Username" required=""/>
                        <input ref={logPass} className="input" type="password" name="pswd" placeholder="Password" required=""/>
                        <button onClick={logIn}>Log in</button>
                    </div>
                        
                </div>
                <div className="register">
                    <div className="form">
                        <label htmlFor="chk" aria-hidden="true">Register</label>
                        <input ref={signUsername} className="input" type="text" name="txt" placeholder="Username" required=""/>
                        <input ref={signPass} className="input" type="password" name="pswd" placeholder="Password" required=""/>
                        <button onClick={signUp}>Register</button>
                    </div>
			    </div>
	        </div>
        </div>
     );
}
 
export default Signup;