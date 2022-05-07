import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import Note from "./components/Note";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 100px;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  min-height: calc(100vh - 100px);
  padding-bottom: 50px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 12px;
`;

const StyledTextArea = styled.textarea`
  font-family: Arial, Helvetica, sans-serif;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  background: #fafafa;
  color: #323232;
  height: 100px;
  margin-bottom: 12px;

  ::placeholder {
    color: #323232;
  }
  :focus {
    outline: none;
    border: 1px solid #323232;
  }
  :invalid {
    border: 1px solid #d22d2d;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 12px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 6px 20px;
  border-radius: 20px;
  border: none;
  background-color: Moccasin;
  font-weight: bold;
`;

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(window.localStorage.getItem("notes")) || [
      { id: uuid(), value: "``` Hello World! ```", createdAt: new Date() },
    ]
  );
  const [draft, setDraft] = useState("");

  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleChange(e) {
    setDraft(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (draft === "") {
      alert("Your note is empty");
    } else {
      const note = { id: uuid(), value: draft, createdAt: new Date() };
      setNotes([...notes, note]);
      setDraft("");
    }
  }

  function onDelete(id) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  function onSave(id, value) {
    const noteIndex = notes.findIndex((note) => note.id === id);
    const newNotes = [...notes];
    newNotes[noteIndex].value = value;
    setNotes(newNotes);
  }

  return (
    <Container>
      <Content>
        <HeaderContainer>
          <Title>🗒 Markdown Notes</Title>
        </HeaderContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextArea
            placeholder="Write your note here"
            value={draft}
            onChange={handleChange}
          />
          <ButtonContainer>
            <Button type="submit">Add note</Button>
          </ButtonContainer>
        </StyledForm>
        <div>
          {notes
            .sort((a, b) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            })
            .map((note) => {
              return (
                <Note
                  key={note.id}
                  note={note}
                  onDelete={onDelete}
                  onSave={onSave}
                />
              );
            })}
        </div>
      </Content>
    </Container>
  );
}

export default App;
