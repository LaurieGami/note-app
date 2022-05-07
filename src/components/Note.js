function Note({ note, onDelete }) {

  return (
    <div>
      <h2>{new Date(note.createdAt).toString()}</h2>
      <p>{note.value}</p>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  )
}

export default Note;
