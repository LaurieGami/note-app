import { useState } from "react";
import styled from "styled-components";

const Content = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 2px solid Turquoise;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px 0;
`;

const StyledTextArea = styled.textarea`
  font-family: Arial, Helvetica, sans-serif;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  background: #fafafa;
  color: #323232;
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

const Text = styled.p`
  padding: 12px;
`;

const Button = styled.button`
  padding: 6px 20px;
  border-radius: 20px;
  border: none;
  background-color: Moccasin;
  font-weight: bold;
`;

const DeleteButton = styled(Button)`
  margin-left: 8px;
`;

const DateContainer = styled.p`
  font-size: 12px;
  align-self: flex-end;
`;

function formatDate(createdAt) {
  const date = new Date(createdAt);
  const day = date.getDate();
  const month = date.toLocaleString("en-us", { month: "long" });
  const year = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} ${month} ${year} - ${time}`;
}

function Note({ note, onDelete, onSave }) {
  const [text, setText] = useState(note.value);
  const [edit, setEdit] = useState(false);

  function handleSave() {
    onSave(note.id, text);
    setEdit(!edit);
  }

  return (
    <Content>
      <ButtonContainer>
        {edit ? (
          <Button onClick={() => handleSave()}>Save</Button>
        ) : (
          <Button onClick={() => setEdit(!edit)}>Edit</Button>
        )}
        <DeleteButton onClick={() => onDelete(note.id)}>Delete</DeleteButton>
      </ButtonContainer>
      <NoteContainer>
        {edit ? (
          <StyledTextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        ) : (
          <Text>{text}</Text>
        )}
      </NoteContainer>
      <DateContainer>{formatDate(note.createdAt)}</DateContainer>
    </Content>
  );
}

export default Note;
