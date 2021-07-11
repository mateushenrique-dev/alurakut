import styled from 'styled-components';

const LoadingWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  pointer-events: none;
  transform: translate(-50%, -50%);
  display: ${({ hidden }) => (hidden ? "none" : "block")};

  div {
    width: 100px;
    height: 100px;
    border: 20px solid #d9e6f6;
    border-bottom-color: #5c9ecf;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: spin 0.5s infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

interface ILoading {
  hidden: boolean;
}

export function Loading({ hidden }: ILoading) {
  return (
    <LoadingWrapper hidden={hidden}>
      <div></div>
    </LoadingWrapper>
  );
}