const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
require('./db/config');
const User=require('./db/user')
app.use(express.json())
app.use(cors());

app.post('/register',async(req,resp)=>{
    console.log(req.body)
    let user = new User(req.body);
    let result =await user.save();
    result = result.toObject();
    resp.send(result);
})

app.get('/data',async(req,resp)=>{
    let result = await User.find();
    resp.send(result);
})

app.delete('/data/:id',async(req,resp)=>{
    let result = await User.deleteOne({_id:req.params.id});
    resp.send(result);
})

app.put('/data/:id',async(req,resp)=>{
    let result = await User.updateOne({_id:req.params.id},{$set:req.body});
    resp.send(result);
})
app.put('/address/:id',async(req,resp)=>{
    // console.log(req.body)
    User.findById(req.params.id).then(data=>{
// console.log(data)
        data.addresses.push(req.body)

        data.save()
        .then(()=>resp.json("address added"))
        .catch(err=>resp.status(400).json("error"+err))
    })

    .catch(err=>resp.status(400).json("error"+err))
    
})

app.listen(PORT,()=>{
    console.log('Server Started at Port = ',PORT)
})