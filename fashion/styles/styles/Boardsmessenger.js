import styled from '@emotion/styled';
import {extractContentType} from "next/dist/server/web/spec-compliant/body";

export const ConsentWrapper=styled.div`

`

export const Chatting=styled.div`
  width: 300px;
  height: 510px;
  border: 2px solid black;
  position: fixed;
  bottom: 80px;
  right: 160px;
`

export const Wrapper = styled.div`
  width: 300px;
  height: 400px;
  //position: fixed;
  //bottom: 30px;
  //right: 50px;
  border: none;
  border-bottom: 2px solid black;
  overflow-y: auto;
  /* Add your styles here */
`;

export const Messages = styled.div`
  /* Add your styles here */
`;

export const ChatBubble = styled.div`
  position: relative;
  background-color: #ffdfe9;
  border: none;
  color: black;
  padding: 10px;
  border-radius: 20px;
  margin-top: 5px;
  margin-right: 5px;
  margin-left: auto;
  align-self: flex-start;
  max-width: 70%;
  font-size: 13.5px;
  width: fit-content;
  word-wrap: break-word;
`;


export const InputWrapper = styled.div`
  display: flex;
  width: 300px;
  //position: absolute;
  //bottom: 0;
  //left: 50%;
  //transform: translateX(-50%);
  /* Add your styles here */
`;

export const InputChat = styled.input`
  width: 245px;
  height: 40px;
  border: none;
  
  /* Add your styles here */
`;

export const SendBtn = styled.button`
  width: 53px;
  background-color: pink;
  border: none;
  font-weight: bold;
  background-color: pink;
  cursor: pointer;

  /* Add your styles here */
`;

export const Profile=styled.div`
  width: 300px;
  height: 65px;
  display: flex;
  border-bottom: 2px solid black;
  background-image: linear-gradient(to right, #b987d2, lightcoral);

`
export const Image=styled.div`
    background-color: pink;
  width: 70px;

`
export const UserName=styled.div`
    background-color: ivory;
  width: 150px;
  height: 35px;
  margin-top: 15px;
  margin-left: 10px;

`
export const Edit=styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  margin-left: 40px;
  border: none;
  font-weight: 900;
  cursor: pointer;
`