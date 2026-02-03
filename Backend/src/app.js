const express=require('express')

const Note=require('./models/note.model')
const app=express()
const cors=require('cors')
const path=require('path')
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,"..",'public')))



app.post('/api/Notes',async (req,res)=>{
    const {title,description}=req.body
   const note=await Note.create({title,description})   

   res.status(201).json({
    message:'Note created successfully',
    note
   })
})

app.get('/api/Notes',async (req,res)=>{
   const notes=await Note.find()
    res.status(200).json({
        message:'Notes fetched successfully',
        notes
    })
})
app.delete('/api/Notes/:id',async (req,res)=>{
    const id=req.params.id
    console.log(id);
    await Note.findByIdAndDelete(id)
    res.status(200).json({
        message:'Note deleted successfully'
    })  
    
})

app.patch('/api/Notes/:id',async (req,res)=>{
    const id=req.params.id
    const {title,description}=req.body
    await Note.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:'Note updated successfully'
    }) 
})

app.use('*name', (req, res) => {
  res.sendFile(path.join(__dirname,".." ,'public/index.html'))
})
module.exports=app