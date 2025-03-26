import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 550px;
  
`;

export const TableTop = styled.div`
  border-top: 2px solid gray;
  margin-top: 50px;
`;

export const TableBottom = styled.div`
  border-bottom: 2px solid gray;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
  
`;
export const Roww = styled.div`
  display: flex;
  flex-direction: row;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid gray;
  :hover {
    color: pink;
  }
`;

export const ColumnHeaderBasic = styled.div`
  width: 25%;
  text-align: center;
  //background-color: red;
  font-size: 15px;

`;
export const ColumnHeaderBasicm = styled.div`
  width: 25%;
  text-align: center;
  //background-color: skyblue;
  font-size: 15px;

`;
export const ColumnHeaderBasicp = styled.div`
  width: 10%;
  text-align: center;
  //background-color: yellow;  
  font-size: 10px;

`;
export const ColumnHeaderTitle = styled.div`
  width: 40%;
  text-align: center;
  //background-color: orchid;
  font-size: 15px;

`;

export const ColumnBasic = styled.div`
  width: 25%;
  text-align: center;
  font-size: 15px;

`;

export const ColumnTitle = styled.div`
  width: 40%;
  text-align: center;
  cursor: pointer;
  font-size: 15px;


  :hover {
    color: pink;
  }
`;

export const ColumnBasicm = styled.div`
  width: 25%;
  text-align: center;
  font-size: 15px;

`;

export const ColumnBasicp = styled.div`
  width: 10%;
  text-align: center;
  font-size: 10px;

`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 50px;
`;

export const PencilIcon = styled.img``;

export const Button = styled.button`
  width: 171px;
  height: 52px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: #f5f2fc;
  }
`;

export const TextToken = styled.span`
  color: ${(props) => (props.isMatched ? "red" : "black")};
`;
