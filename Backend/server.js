let express=require('express');
let app= express();
const cors = require('cors');
const { log } = require('console');
app.use(cors());
app.use(express.json());
const {config}=require("dotenv");
config()
const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

app.post("/addUser",(req,res)=>{
    let fs=require('fs');
    fs.readFile('data.json','utf-8',(err,data)=>{
        let newData=JSON.parse(data);
        newData.push(req.body);
        let reqUser=newData.filter((user)=>{
            return (user.username===req.body.username);
        })
        if(reqUser.length>0){
            res.json(null);
            return
        }
        let input = JSON.stringify(newData);
        fs.writeFile('data.json', input, 'utf-8', (err) => {
            if (err) {
              console.log("There was an error in writing");
              res.status(500).json({ success: false, message: 'Error writing data' });
            } else {
              console.log("Data written");
              res.status(200).json({ success: true, message: 'Data written successfully' });
            }
          });
    });
});
app.get("/login/:username/:password",(req,res)=>{
    let fs=require('fs');
    let users=[];
    fs.readFile('data.json','utf-8',(err,data)=>{
        users=JSON.parse(data);
        let reqUser=users.filter((user)=>{
            return (user.username===req.params.username)&&(user.password===req.params.password);
        })
        if(reqUser.length>0){
            res.status(200).json(reqUser[0]);
        }
        else{
            console.log("yo");
            res.status(404).json(null);
        }
    });
});
app.post("/addTask",(req,res)=>{
    let fs=require('fs');
    let result;
    fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){
            console.log("Read error");
        }
        else{
            let temp=JSON.parse(data);
            for(let i=0;i<temp.length;i++){
                if(temp[i].username===req.body.username){
                    temp[i]=req.body;
                    result=temp[i];
                    break;
                }
            }
            fs.writeFile('data.json',JSON.stringify(temp),'utf-8',(err)=>{
                if(err){
                    console.log("error in updating ",req.body.username);
                }
            })
            res.status(200).json(result);
        }
    })
})

app.get('/sendOngoing/:id/:username',(req,res)=>{
    let fs=require('fs');
    let index;
    let reqObj;
    let time=require('./time');
    fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){
            console.log("Read error");
        }
        else{
            let temp=JSON.parse(data);
            for(let i=0;i<temp.length;i++){
                if(temp[i].username===req.params.username){
                    console.log("heyyy");
                    index=i
                    break;
                }
            }
            for(let i=0;i<temp[index].tasks.length;i++){
                console.log("heyman");
                console.log(temp[index].tasks[i].id);
                if(temp[index].tasks[i].id==req.params.id){
                    reqObj={...temp[index].tasks[i]}
                    console.log(reqObj);
                    temp[index].tasks.splice(i, 1);
                    console.log(reqObj);
                    break;
                }
            }
            reqObj['time']=time();
            temp[index].ongoing.push(reqObj);
            fs.writeFile('data.json',JSON.stringify(temp),'utf-8',(err)=>{
                if(err){
                    console.log("error in updating ",req.body.username);
                }
            })
            res.status(200).json(temp[index]);
        }
    })
})

app.get('/removeTask/:id/:username',(req,res)=>{
    let fs=require('fs');
    let index;
    fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){
            console.log("Read error");
        }
        else{
            let temp=JSON.parse(data);
            for(let i=0;i<temp.length;i++){
                if(temp[i].username===req.params.username){
                    index=i
                    break;
                }
            }
            for(let i=0;i<temp[index].tasks.length;i++){
                console.log(temp[index].tasks[i].id);
                if(temp[index].tasks[i].id==req.params.id){
                    temp[index].tasks.splice(i, 1);
                    break;
                }
            }
            fs.writeFile('data.json',JSON.stringify(temp),'utf-8',(err)=>{
                if(err){
                    console.log("error in updating ",req.body.username);
                }
            })
            res.status(200).json(temp[index]);
        }
    })
})

app.get('/removeOngoing/:id/:username',(req,res)=>{
    let fs=require('fs');
    let index;
    fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){
            console.log("Read error");
        }
        else{
            let temp=JSON.parse(data);
            for(let i=0;i<temp.length;i++){
                if(temp[i].username===req.params.username){
                    index=i
                    break;
                }
            }
            for(let i=0;i<temp[index].ongoing.length;i++){
                console.log(temp[index].ongoing[i].id);
                if(temp[index].ongoing[i].id==req.params.id){
                    temp[index].ongoing.splice(i, 1);
                    break;
                }
            }
            fs.writeFile('data.json',JSON.stringify(temp),'utf-8',(err)=>{
                if(err){
                    console.log("error in updating ",req.body.username);
                }
            })
            res.status(200).json(temp[index]);
        }
    })
})

app.get('/sendDone/:id/:username',(req,res)=>{
    let fs=require('fs');
    let index;
    let reqObj;
    let time=require('./time');
    fs.readFile('data.json','utf-8',(err,data)=>{
        if(err){
            console.log("Read error");
        }
        else{
            let temp=JSON.parse(data);
            for(let i=0;i<temp.length;i++){
                if(temp[i].username===req.params.username){
                    index=i
                    break;
                }
            }
            for(let i=0;i<temp[index].ongoing.length;i++){
                console.log(temp[index].ongoing[i].id);
                if(temp[index].ongoing[i].id==req.params.id){
                    reqObj={...temp[index].ongoing[i]}
                    temp[index].ongoing.splice(i, 1);
                    break;
                }
            }
            reqObj['doneTime']=time();
            temp[index].done.push(reqObj);
            fs.writeFile('data.json',JSON.stringify(temp),'utf-8',(err)=>{
                if(err){
                    console.log("error in updating ",req.body.username);
                }
            })
            res.status(200).json(temp[index]);
        }
    })
})

app.get('/gpt/:msg', async(req, res)=>{
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": req.params.msg}],
      });
    res.status(200).json({res:chatCompletion.choices[0].message.content});  
})




app.listen(5000)