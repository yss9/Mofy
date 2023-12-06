import styled from "@emotion/styled";


export const Wrapper = styled.div`
  //text-align: center;
 // background-color: pink;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  //width: 100%;
  //height: 100%;
  
`
export const ConsentWrapper = styled.div`
  text-align: center;
  width: 350px;
  height: 600px;
  //background-color: white;
  border: 2px solid black;
  overflow-y: auto; /* 세로 스크롤이 필요한 경우 자동으로 스크롤바 생성 */
  border-radius: 20px;
  background-color: rgba(255, 192, 203, 0.19);
`;

export const TitleWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid black;
  background-image: linear-gradient(to right, #b987d2, lightcoral);
  overflow: hidden;
`;

export const Title = styled.div`
  flex: 1;
  padding: 10px;
  font-weight: 900;
  font-size: 20px;
`;

export const SubtitleWrapper=styled.div`
  display: flex;
  border-bottom: 1px solid black;
  height: 40px;

  //background-color: red;
`

export const SubTitle=styled.input`
  height: 95%;
  width: 100%;
  border: none;
  background-color: rgba(255, 192, 203, 0.11);


  ::placeholder {
    color: black;
    font-weight: 900;
  }
`
export const BtnWrapper=styled.div`
    //background-color: red;
  position: absolute;
  bottom: 0;
  right: 0;
  //text-align: right;
  //margin-top: 20px;
  //margin-right: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
`
export const SendBtn=styled.button`
  border-radius: 30px;
  width: 60px;
  height: 40px;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
  border: 2px solid black;
  background-color: rgba(218, 112, 214, 0.24);
`
export const NoteList = styled.div`
  //border-bottom: 1px solid black;
  text-align: left;
`;

export const NoteItem = styled.div`
  padding: 10px;
  //border-bottom: 1px solid #4b4b4b; /* 각 쪽지 아래에 선 추가 */
`;
export const AddNoteButtonWrapper=styled.div`
    margin-top: 5px;
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
  cursor: pointer;
`;

export const Line = styled.hr`
  border: none;
  border-top: 1px solid black; /* 수평 라인 스타일 지정 */
  margin: 5px 0; /* 위아래 여백 지정 */
`;

export const TextWrapper=styled.div`
  margin-top: 5px;
  width: 100%;
  height: 75%;
`
export const Text =styled.textarea`
    width: 98%;
  height: 100%;
  background-color: transparent;
  border: none;
`
export  const ViewText=styled.div`
  width: 98%;
  height: 100%;
  background-color: transparent;
  border: none;

`

export const ViewTitle=styled.div`
  height: 95%;
  width: 75%;
  border: none;
  //background-color: red;
`
export const GoOutBtn=styled.button`
  background-color: transparent;
  border: none;
  font-weight: 900;
  cursor: pointer;
`
export const ButtonWrapper=styled.div`
    width: 130px;
  height: 190px;
  border: 2px solid black;
  position: fixed;
  margin-left: 1050px;
margin-top: 200px;
  border-radius: 20px;
  background-color: rgba(255, 192, 203, 0.19);
`
export const MySendMsgBtn=styled.button`
    border-radius: 20px;
  width: 70%;
  height: 45px;
  background-color: rgba(218, 112, 214, 0.24);
border: 2px solid black;
  cursor: pointer;

`
export const MySendMsgBtnWrapper=styled.div`
  margin-top: 25px;
  text-align: center;

`

export const MyGetMsgBtn=styled.button`
  border-radius: 20px;
  width: 70%;
  height: 45px;
  background-color: rgba(218, 112, 214, 0.24);
  border: 2px solid black;
  cursor: pointer;
`
export const MyGetMsgBtnWrapper=styled.div`
    margin-top: 20px;
  text-align: center;

`
export const Imoticon=styled.div`
  text-align: center;
  font-size: 25px;
  font-weight: 550;
  border-bottom: 2px solid black;
  background-image: pink;
  color: #d24e7a;
`
