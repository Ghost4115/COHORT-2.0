import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  function fetchNotes() {
    axios
      .get('http://localhost:3000/api/Notes')
      .then((res) => {
        setNotes(res.data.notes)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const { title, description } = e.target

    const newNote = {
      title: title.value,
      description: description.value
    }

    axios
      .post('http://localhost:3000/api/Notes', newNote)
      .then((res) => {
        console.log(res.data)
        fetchNotes()
        e.target.reset()
      })
      .catch(err => console.log(err))
  }
  function handleDelete(id){
    axios.delete(`http://localhost:3000/api/Notes/${id}`)
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
    function UpdateNote(id){
      
      axios.put(`http://localhost:3000/api/Notes/${id}`)
      .then((res)=>{
        console.log(res.data)
        fetchNotes()
      })
    }
    
  }

  return (
    <div>
      <form className="noteform" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Title" required />
        <input name="description" placeholder="Description" required />
        <button type="submit">Add Note</button>
        
      </form>

      <div className="notes">
        {notes.map((note, index) => (
          <div className="note" key={index}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={() => {
             handleDelete(note._id)
            }}>Delete</button>
            <button onClick={()=>{
        UpdateNote(note._id)
        }}>Update </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
