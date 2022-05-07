import { useState } from 'react'

function Note({ note, onDelete, onSave }) {
  const [text, setText] = useState(note.value)
  const [edit, setEdit] = useState(false)

  function handleSave() {
    onSave(note.id, text)
    setEdit(!edit)
  }

  return (
    <div>
        {edit ? <button onClick={() => handleSave()}>Save</button> : <button onClick={() => setEdit(!edit)}>Edit</button>}
        <button onClick={() => onDelete(note.id)}>Delete</button>
        {edit ? (
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        ) : (
            <>
                <h2>{new Date(note.createdAt).toString()}</h2>
                <p>{text}</p>
            </>
        )
      }
    </div>
  )
}

export default Note;
