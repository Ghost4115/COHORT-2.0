const express = require("express")
const cors = require("cors")
const path = require("path")
const Note = require("./models/note.model")

const app = express()

app.use(cors({ origin: "*" }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))

app.post("/api/Notes", async (req, res) => {
  const note = await Note.create(req.body)
  res.status(201).json({ message: "Note created", note })
})

app.get("/api/Notes", async (req, res) => {
  const notes = await Note.find()
  res.json({ notes })
})

app.delete("/api/Notes/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.json({ message: "Note deleted" })
})

app.patch("/api/Notes/:id", async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, req.body)
  res.json({ message: "Note updated" })
})

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
})

module.exports = app
