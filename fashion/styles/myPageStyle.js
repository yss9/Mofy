import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;
  height: 1300px;
  font-family: sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
margin-top: 400px;
`
export const ConsentWrapper = styled.div`
`
export const ProfileWrapper = styled.div`
  //background-color: #efe4e4;
  width: 1200px;
  height: 350px;
  margin-top: 30px;
`
export const ProfileUserWrapper = styled.div`
  width: 1000px;
  height: 330px;
  margin-left: 50px;
  padding-top: 1px;
  //border: lightcoral solid 5px;
  border-radius: 10px;
  //background-color: rgba(205, 92, 139, 0.1);
`
export const ProfileText = styled.div`
  width: 320px;
  height: 50px;
  font-size: 30px;
  font-weight: bold;
  color: #986b9d;
  //background-color: darkgray;
  margin-top: 20px;
  margin-left: 40px;
  margin-bottom: 15px;
  //background-color: darkslateblue;
`
export const ProfileImg = styled.img`
    width: 200px;
  height: 200px;
  border-radius: 100px;
  object-fit: cover;
  float: left;
  margin-left: 50px;
`
export const ProfileName = styled.div`
  //float: left;
  margin-left: 300px;
  margin-top: 30px;
  font-size: 40px;
  color: #5e464c;
  //font-weight: bold;
`
export const ProfileTag = styled.button`
  font-size: 25px;
  color: #91526c;
  margin-left: 20px;
  margin-top: 20px;
  float: left;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
export const ProfileTagWrapper = styled.div`
  width: 500px;
  height: 70px;
  background-color: darkgray;
  margin-left: 280px;
  padding-top: 30px;
  
`
export const ProfileEdit = styled.button`
  width: 300px;
  height: 50px;
  margin-left: 100px;
  background-color: #f8ecf1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  float: left;
  &:hover {
    background-color: rgba(232, 202, 239, 0.51);
  }
`
export const ReportButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  background-color: rgba(169, 169, 169, 0);
  float: left;

  &:hover {
    text-decoration: underline;
  }
`
export const ReportImg = styled.img`
  width: 25px;
  height: 25px;
  float: left;
  margin-top: 6px;
  
`
export const ReportButtonWrapper = styled.div`
  width: 130px;
  height: 50px;
  //background-color: darkgray;
  float: right;
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
  height: 400px;
  //background-color: aquamarine;
`
export const Bottom = styled.div`
  width: 1150px;
  height: 1400px;
  //background-color: darkgray;
  margin-left: 50px;
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
export const MyMofyWrapper = styled.div`
    width: 850px;
  height: 850px;
  //background-color: aquamarine;
  float: left;
  padding-left: 30px;
`
export const YourMofyWrapper = styled.div`
  width: 230px;
  height: 1300px;
  //background-color: aqua;
  float: right;
  border-left: 2px dotted #b2a4b5;
  padding-left: 30px;
  //border-top: 2px dotted #b2a4b5;
`
export const MyCommunityListWrapper = styled.div`
  width: 440px;
  height: 500px;
  //background-color: #443acb;
  float: left;
  border-top: 2px dotted #b2a4b5;
`
export const SellListWrapper = styled.div`
  width: 440px;
  height: 500px;
  //background-color: lightcoral;
  float: left;
  border-left: 2px dotted #b2a4b5;
  border-top: 2px dotted #b2a4b5;
`
export const MyMofyText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #c883b5;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
`
export const YourMofyText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #de8095;
  //margin-left: 30px;
  margin-top: 5px;
  margin-bottom: 20px;
`
export const MyCommunityListText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #d182a8;
  margin-left: 100px;
  margin-top: 10px;
  margin-bottom: 30px;
`
export const SellListText = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: #d182a8;
  margin-left: 180px;
  margin-top: 10px;
  margin-bottom: 30px;
`
export const MofyImg = styled.div`
  width: 230px;
  height: 350px;
  //background-color: lightcoral;
  margin-bottom: 50px;
  margin-right: 30px;
  border: 2px solid rgba(220, 127, 148, 0.38);
  border-radius: 10px;
  float: left;
`
export const CommunityList = styled.button`
  width: 350px;
  height: 40px;
  margin-bottom: 10px;
  margin-left: 50px;
  background-color: rgba(232, 202, 239, 0.24);
  border: none;
  color: #572f42;
  border-radius: 10px;
  &:hover {
    background-color: rgba(232, 202, 239, 0.49);
  }
`
export const SellList = styled.button`
  width: 350px;
  height: 40px;
  margin-bottom: 10px;
  margin-left: 50px;
  background-color: rgba(232, 202, 239, 0.24);
  border: none;
  color: #572f42;
  border-radius: 10px;
  &:hover {
    background-color: rgba(232, 202, 239, 0.49);
  }
`
export const ReportWrapper = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //zIndex: 999;
  border: 2px solid rgba(151, 106, 156, 0.52);
  border-radius: 10px;
`
export const ReportText = styled.div`
  width: 200px;
  height: 50px;
  font-size: 30px;
  font-weight: bold;
  //background-color: indianred;
  margin-left: 170px;
  margin-top: 20px;
  float: left;
  color: #966a9b;
`
export const ReportExitButton = styled.button`
  width: 24px;
  height: 24px;
  float: right;
  font-weight: bold;
  color: #966a9b;
  margin: 25px 25px;
  background-color: white;
  border-radius: 30px;
  border: 2px solid rgba(151, 106, 156, 0.52);

  &:hover {
    cursor: pointer;
    background-color: rgba(253, 190, 214, 0.27);

  }
`
export const ReportListWrapper = styled.div`
  width: 450px;
  height: 400px;
  margin: 10px 25px;
  //background-color: pink;
  border-top: 2px dotted #b2a4b5;
`
export const ReportTop = styled.div`
  width: 500px;
  height: 70px;
`