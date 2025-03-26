import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 1300px;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`
export const ConsentWrapper = styled.div`
`
export const Top = styled.div`
  width: 1200px;
  height: 130px;
  //background-color: aquamarine;
`
export const Divide = styled.div`
  width: 1200px;
  height: 2px;
  background-color: #b3a5b6;
  margin-top: 30px;
  margin-bottom: 20px;
`
export const Mid = styled.div`
  width: 1150px;
  height: 330px;
  //background-color: darkgray;
  margin-left: 50px;
  margin-top: 50px;
`
export const Bottom = styled.div`
  width: 1150px;
  height: 800px;
  //background-color: darkgray;
  margin-left: 100px;
  margin-top: 50px;
`
export const Title = styled.img`
  width: 220px;
  height: auto;
  margin-left: 520px;
  margin-top: 20px;
  &:hover {
    cursor: pointer;
  }
`
export const TitleWrapper = styled.div`
    float: left;
`
export const TopButton = styled.button`
  width: 80px;
  height: 30px;
  margin-top: 120px;
  margin-right: 15px;
  float: right;
  background-color: rgba(245, 219, 231, 0.63);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(232, 202, 239, 0.49);
  }
`
export const EditText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #c883b5;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
`
export const EditImgWrapper = styled.div`
  width: 300px;
  height: 250px;
  margin-left: 450px;
  margin-top: 50px;
  position: relative;
  //background-color: aqua;
`
export const EditNameWrapper = styled.div`
  width: 1100px;
  height: 100px;
  //background-color: #e8d4c3;
`
export const EditPWWrapper = styled.div`
  width: 1100px;
  height: 100px;
  //background-color: #e8d4c3;
`
export const EditClothTypeWrapper = styled.div`
  width: 1100px;
  height: 150px;
  //background-color: #e8d4c3;
`
export const EditUserSizeWrapper = styled.div`
  width: 1100px;
  height: 100px;
  //background-color: #e8d4c3;
`
export const EditSkinTypeWrapper = styled.div`
  width: 1100px;
  height: 100px;
  //background-color: #e8d4c3;
`
export const EditUser = styled.button`
  width: 150px;
  height: 40px;
  font-size: 20px;
  margin-top: 50px;
  margin-left: 450px;
  background-color: rgba(245, 219, 231, 0.63);
  border: none;
  border-radius: 5px;
  cursor: pointer;
`
export const DeleteUser = styled.button`
  width: 80px;
  height: 30px;
  margin-top: 150px;
  margin-right: 100px;
  float: right;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: underline;
`
export const UserImg = styled.img`
  width: 200px;
  height: 200px;
  border: 2px solid rgba(178, 164, 181, 0.45);
  border-radius: 100px;
  object-fit: cover;
  margin-left: 50px;
  float: left;
  display: block;
`
export const EditNameText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #c883b5;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
`
export const EditNameInput = styled.input`
  width: 1000px;
  height: 30px;
  background: none;
  //border: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom-color: rgba(189, 133, 199, 0.39);
  font-size: 18px;
  padding-left: 10px;
`
export const EditPWText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #c883b5;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
`
export const EditPWInput = styled.input`
  width: 1000px;
  height: 30px;
  background: none;
  //border: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom-color: rgba(189, 133, 199, 0.39);
  font-size: 18px;
  padding-left: 10px;
`
export const EditClothTypeText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #c883b5;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
`
export const EditSkinTypeText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #c883b5;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
`
export const EditSkinTypeInput = styled.input`
  width: 1000px;
  height: 30px;
  background: none;
  text-decoration: underline;
  //border: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom-color: rgba(189, 133, 199, 0.39);
`
export const EditUserSizeTextWrapper = styled.div`
  width: 1100px;
  height: 50px;
`
export const EditUserHeightText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #c883b5;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  margin-right: 160px;
  float: left;
`
export const EditUserWeightText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #c883b5;
  margin-left: 25px;
  margin-top: 5px;
  margin-bottom: 20px;
  margin-right: 150px;
  float: left;
`
export const EditUserFootText = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #c883b5;
  //margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
  margin-right: 160px;
  float: left;
`
export const EditUserSizeInput = styled.input`
  width: 100px;
  height: 30px;
  background: none;
  //border: none;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom-color: rgba(189, 133, 199, 0.39);
  margin-right: 10px;
  float: left;
  font-size: 18px;
`
export const OverlayImage = styled.img`
  position: absolute;
  bottom: 55px;
  right: 50px;
  width: 50px; /* 작은 이미지의 크기를 조절해도 됨 */
  height: auto;
  display: block;
  border-radius: 100px;
  object-fit: cover;
  background-color: white;
  border: 2px solid rgba(178, 164, 181, 0.94);;
  cursor: pointer;
`
export const EditTypeButtonWrapper = styled.div`
  width: 1000px;
  height: 100px;
  //background-color: pink;
`
export const EditTypeButton = styled.button`
  width: 110px;
  height: 40px;
  float: left;
  background-color: white;
  // background-color: ${({ isClicked }) => (isClicked ? 'blue' : 'green')};
  //text-decoration: underline;
  border: 2px solid rgba(189, 133, 199, 0.39);
  font-size: 17px;
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 10px;

  &:hover {
    background-color: pink;
    cursor: pointer;
  }
`
export const EditUserSizeSubText = styled.div`
  width: 50px;
  height: 30px;
  font-size: 20px;
  float: left;
  margin-right: 50px;
`
export const EditUserSizeSubWrapper = styled.div`
  width: 1000px;
  height: 70px;
`
export const OverlayImageInput = styled.input`
  display: none;
`
export const Check =styled.div`
     color:red;
   font-size:13px;
 margin-left: -160px;
 margin-top: 9px;
`