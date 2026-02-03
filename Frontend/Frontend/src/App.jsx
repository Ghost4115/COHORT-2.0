import React, { useEffect, useState } from "react"
import axios from "axios"

const API = import.meta.env.VITE_API_URL || "http://localhost:3000"

const App = () => {
  const [notes, setNotes] = useState([])

  const fetchNotes = () => {
    axios
      .get(`${API}/api/Notes`)
      .then(res => setNotes(res.data.notes))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const { title, description } = e.target

    axios
      .post(`${API}/api/Notes`, {
        title: title.value,
        description: description.value
      })
      .then(() => {
        fetchNotes()
        e.target.reset()
      })
  }

  const handleDelete = (id) => {
    axios.delete(`${API}/api/Notes/${id}`).then(fetchNotes)
  }

  const updateNote = (id) => {
    const newDescription = prompt("Enter new description")
    if (!newDescription) return

    axios
      .patch(`${API}/api/Notes/${id}`, { description: newDescription })
      .then(fetchNotes)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" required />
        <input name="description" placeholder="Description" required />
        <button>Add Note</button>
      </form>

      {notes.map(note => (
        <div key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <button onClick={() => handleDelete(note._id)}>Delete</button>
          <button onClick={() => updateNote(note._id)}>Update</button>
        </div>
      ))}
    </div>
  )
}

export default App
