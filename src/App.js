import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import styled from 'styled-components'
import Note from './components/Note'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`

const Title = styled.h1`
  color: red;
`

const Button = styled.button`
  color: blue;
`

function App() {
  const [notes, setNotes] = useState([])
  const [draft, setDraft] = useState('')

  function handleChange(e) {
    setDraft(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const note = { id: uuid(), value: draft, createdAt: new Date() }
    setNotes([...notes, note])
    setDraft('')
  }

  function onDelete(id) {
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
  }

  function onSave(id, value) {
    const noteIndex = notes.findIndex(note => note.id === id)
    const newNotes = [...notes]
    newNotes[noteIndex].value = value
    setNotes(newNotes)
  }

  return (
    <Container>
      <Title>Note App</Title>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="comment">Note</label>
            <textarea
              placeholder="Write your note here"
              value={draft}
              onChange={handleChange}
            />
        </div>
        <Button type="submit">Add note</Button>
      </form>
      <div>
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              onDelete={onDelete}
              onSave={onSave}
            />
          )
        })}
      </div>
    </Container>
  );
}

export default App;
