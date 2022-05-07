import styled from 'styled-components';

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

function App() {
  return (
    <Container>
      <Title>Hello World!</Title>
    </Container>
  );
}

export default App;
