import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1250px;
  height: auto;
  font-family: sans-serif;
  
`
export const ButtonWrapper = styled.div`
  width: 250px;
  height: 100px;
  //background-color: #ef9191;
  margin-left: 50px;
  margin-top: 40px;
  //margin-top: 50px;
  padding: 0 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const Title = styled.img`
  width: 350px;
  height: auto;
  margin-left: 460px;
`
export const Warning = styled.div`
  width: 1250px;
  height: 150px;
  //background-color: darkgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`
export const YesButton = styled.button`
  width: 250px;
  height: 40px;
  float: left;
  margin-bottom: 15px;
  background-color: white;
  border: 2px solid rgba(210, 130, 168, 0.36);
  border-radius: 10px;
  &:hover {
    background-color: rgba(232, 202, 239, 0.49);
    border: none;
  }
`
export const NoButton = styled.button`
  width: 250px;
  height: 40px;
  float: right;
  background-color: rgba(210, 130, 168, 0.36);
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: rgba(232, 202, 239, 0.49);
  }
`
export const Ment = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
  color: #643151;
`