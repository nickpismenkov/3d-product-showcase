import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
  top: 0;
  pointer-events: none;
  min-height: 831px;
  background: transparent;

  button {
    padding: 10px;
    margin: 10px;
    border: none;
    margin-top: 20px;
    border-radius: 10px;
    background-color: #fff;
    color: #000;
    cursor: pointer;
  }
`

export const Canvas = styled.canvas`
  width: 60%;
  height: 100%;
  background: transparent;
`