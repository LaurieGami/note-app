import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import styled from 'styled-components'

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
            <div key={note.id}>
              <h3>{note.createdAt.toString()}</h3>
              <p>{note.value}</p>
              <button onClick={() => onDelete(note.id)}>Delete</button>
            </div>
          )
        })}
      </div>
    </Container>
  );
}

export default App;
