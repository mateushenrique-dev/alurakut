import styled from 'styled-components';

const Box = styled.div`
  background: #fff;
  border-radius: 8px;

  padding: 16px;

  margin-bottom: 20px;
  .boxLink {
    font-size: 14px;
    color: #2e7bb4;
    text-decoration: none;
    font-weight: 800;
  }

  .title {
    font-size: 2rem;
    font-weight: 400; 
    margin-bottom: 20px;
  }

  .subTitle {
    font-size: 1.125rem;
    font-weight: 400;
    margin-bottom: 20;
  }

  .smallTitle {
    margin-bottom: 20px;
    font-size: 1rem;
    font-weight: 700;
    color: #333;
  }

  hr {
    margin-top: 12px;
    margin-bottom: 8px;
    border-color: transparent;
    border-bottom-color: #ECF2F4; 
  }

  input {
    width: 100%;
    background-color: #f4f4f4;
    color: #333;
    border: 0;
    padding: 14px 16px;
    margin-bottom: 14px;

    ::placeholder {
      color: #333;
      opacity: 1;
    }
  }

  button {
    border: 0;
    padding: 8px 17;
    color: #fff;
    border-radius: 100000000px;
    background-color: #6f92bb;
  }
`;

export default Box;
