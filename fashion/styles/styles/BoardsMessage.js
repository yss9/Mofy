import styled from "@emotion/styled";

export const Wrapper = styled.div``;

export const ConsentWrapper = styled.div`
  width: 300px;
  height: 500px;
  background-color: white;
  border: 1px solid black;
  overflow-y: auto; /* 세로 스크롤이 필요한 경우 자동으로 스크롤바 생성 */
`;

export const TitleWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid black;
`;

export const Title = styled.div`
  flex: 1;
  padding: 10px;
`;
export const BtnWrapper=styled.div`
    //background-color: red;
  text-align: right;
  margin-top: 20px;
  margin-right: 10px;
`
export const SendBtn=styled.button`
    border-radius: 20px;
  font-size: 15px;
  
  
`
export const NoteList = styled.div`
  border-bottom: 1px solid black;
`;

export const NoteItem = styled.div`
  padding: 10px;
  //border-bottom: 1px solid #4b4b4b; /* 각 쪽지 아래에 선 추가 */
`;
export const AddNoteButtonWrapper=styled.div`
    margin-top: 3px;
  margin-right: 5px;
  
`
export const AddNoteButton = styled.button`
  padding: 10px;
  border-radius: 30px;
  width: 80px;
  height: 35px;
  font-size: 12px;
  border: none;
  background-color: pink;
`;

export const Line = styled.hr`
  border: none;
  border-top: 1px solid black; /* 수평 라인 스타일 지정 */
  margin: 5px 0; /* 위아래 여백 지정 */
`;

export const TextWrapper=styled.div`
  width: 100%;
  height: 80%;
`
export const Text =styled.textarea`
    width: 98%;
  height: 100%;
  background-color: transparent;
  border: none;
`
