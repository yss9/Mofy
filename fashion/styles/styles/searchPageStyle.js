import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  //background-color: #ffffff;
  font-family: sans-serif;
  //background: linear-gradient(to right, transparent 10%, #c7baab 35%, #c7baab 65%, transparent 90%);
  //border: none; /* 테두리 설정 */


`
export const ConsentWrapper = styled.div`
  width: 600px;
  height: 650px;
  border: 2px solid #9d7f61;
  background-color: #eae6e2;
  color: #4b3d36;
  font-weight: bold;
  font-size: 10px;
  margin: 20px;
  border-radius: 25px;
`
export const SearchWrapper = styled.div`
  width: 500px;
  height: 50px;
  margin-left: 60px;
  margin-top: 50px;
  margin-bottom: 10px;
  //background-color: grey;
`
export const SearchInput = styled.input`
  width: 450px;
  height: 30px;
  background-color: white;
  color: #A4A4A4;
  border: 2px solid #b6afa8;
  border-radius: 5px;
  padding: 0 10px;

  &:hover {
    background-color: #f6f5f3;
  }

  &:focus {
    outline-color: #9d7f61;
  }
`
export const RecentSearchWrapper = styled.div`
  margin-left: 50px;
  width: 500px;
  height: 60px;
  overflow: hidden;
  margin-bottom: 10px;
  margin-top: 20px;
  //background-color: red;
`
export const RecentSearchText = styled.div`
  width: 100px;
  height: 20px;
  font-size: 15px;
  margin-bottom: 5px;
`
export const RecentSearchButton = styled.button`
  //width: 115px;
  height: 25px;
  float: left;
  margin-right: 5px;
  margin-bottom: 10px;
  background-color: #c7baab;
  border: none;
  border-radius: 10px;
  color: #2c1f14;
  padding: 0 10px;
  min-width: 50px;
  width: auto;
  cursor: pointer;
  &:hover {
    background-color: #b6afa8;
  }
`
export const TagWrapper = styled.div`
  width: 500px;
  height: 70px;
  //background-color: black;
  margin-left: 50px;
  margin-top: 10px;
`
export const TagButtonWrapper = styled.div`
  width: 430px;
  height: 30px;
  overflow: hidden;
  float: left;
`
export const TagText = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  //float: left;
`
export const TagButton = styled.button`
  float: left;
  //width: 70px;
  height: 22px;
  margin-right: 7px;
  margin-bottom: 10px;
  padding: 0 8px;
  min-width: 30px;
  width: auto;
  color: #4b3d36;
  background-color: #b6afa8;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #c7baab;
  }
`
export const MoreTagButton = styled.button`
  float: right;
  width: 70px;
  height: 20px;
  background-color: #eae6e2;
  color: #564434;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
export const PopularSearchWrapper = styled.div`
  //background-color: gainsboro;
  width: 390px;
  height: 400px;
  margin-left: 50px;
`
export const PopularSearchText = styled.div`
  font-size: 15px;
  margin-bottom: 7px;
`
export const PopularSearchItemsWrapper = styled.div`
  //background-color: aquamarine;
  width: 350px;
  height: 30px;
  margin-left: 5px;
`
export const Rate = styled.div`
  font-size: 15px;
  float: left;
  text-align: center;
  width: 21px;
  margin-top: 5px;
`
export const PopularSearchItems = styled.button`
  //width: 300px;
  height: 30px;
  font-size: 15px;
  float: left;
  text-align: left;
  border: none;
  background-color: #eae6e2;
  color: #4b3d36;
  min-width: 50px;
  width: auto;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`






export const Title = styled.h1`
    text-align: center;
  color: white;
  margin-top: 55px;
`

export const Input = styled.input`
  width: 250px;
  height: 20px;
  background-color: #1C1C1C;
  color: #A4A4A4;
  border: 1px solid #1C1C1C;
  margin-left: 7px;
  float: left;
`
export const NextButton = styled.button`
    margin-top: 30px;
  background-color: #A4A4A4;
  color: white;
  border: none;
  border-radius: 30px;
  width: 355px;
  height: 37px;
`
export const TextWrapper = styled.div`
    margin: 30px 50px;
`
export const NextButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const InfoMessage = styled.h4`
  margin-top: 55px;
  margin-bottom: 30px;
  margin-left: 25px;
`
export const InputWrapper = styled.div`
  margin-bottom: 5px;
  margin-left: 15px;
  width: 330px;
  height: 30px;
  background-color: #261a10;
  color: #A4A4A4;
  border: 1px solid #A4A4A4;
  border-radius: 30px;
  padding-left: 20px;
  padding-top: 5px;
`
export const InfoTitle = styled.div`
  width: 45px;
  height: 10px;
  float: left;
  font-size: 13px;
  margin-top: 4px;
`
export const ErrorMessage = styled.div`
    color: red;
  font-size: 12px;
  margin-bottom: 20px;
  display: flex;
  justify-content: end;
  margin-right: 50px;
`
export const InputPageWrapper = styled.div`
    height: 70px;
`
export const BottomButtonWrapper = styled.div`
    width:200px;
  height: 30px;
  margin-top: 30px;
  margin-left: 125px;
  //justify-content: center;
`
export const BottomButton = styled.button`
    width: 10px;
  height: 10px;
  background-color: #261a10;
  margin-right: 30px;
  border: 1px solid #A4A4A4;
  border-radius: 30px;
`
export const PageBottomButton = styled.button`
    width: 10px;
  height: 10px;
  background-color: white;
  margin-right: 30px;
  border: 1px solid #A4A4A4;
  border-radius: 30px;
`