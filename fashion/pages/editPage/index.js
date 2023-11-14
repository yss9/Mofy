import {
    Wrapper,
    Top, Mid,
    Bottom,
    Title,
    TitleWrapper,
    TopButton,
    Divide,
    EditText,
    EditImgWrapper,
    EditNameWrapper,
    EditPWWrapper,
    EditClothTypeWrapper,
    EditSkinTypeWrapper,
    EditUserSizeWrapper,
    DeleteUser,
    UserImg,
    EditNameText,
    EditNameInput,
    EditPWText,
    EditPWInput,
    EditUserSizeInput,
    EditClothTypeInput,
    EditClothTypeText,
    EditSkinTypeInput,
    EditSkinTypeText,
    EditUserSizeText, OverlayImage, EditUser
} from '../../styles/editPageStyle'

const onClickHome = () => {
    window.location.href = "http://localhost:3000/mainPage";
}
const onClickDelete = () => {
    window.location.href = "http://localhost:3000/deletePage";
}
export default function BoardNewPage() {

    return (
        <>
            <Wrapper>
                <Top>
                    <TitleWrapper>
                        <Title onClick={onClickHome} src="images/mofylogo.png"/>
                    </TitleWrapper>
                    <TopButton>Log Out</TopButton>
                </Top>
                <Divide/>
                <Mid>
                    <EditText>프로필 수정</EditText>
                    <EditImgWrapper>
                        <UserImg src="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202304/07/kinolights/20230407081026931lbzg.jpg" />
                        <OverlayImage src="https://cdn-icons-png.flaticon.com/512/5218/5218413.png"/>
                    </EditImgWrapper>
                </Mid>
                <Bottom>
                    <EditNameWrapper>
                        <EditNameText>이름</EditNameText>
                        <EditNameInput/>
                    </EditNameWrapper>
                    <EditPWWrapper>
                        <EditPWText>비밀번호</EditPWText>
                        <EditPWInput/>
                    </EditPWWrapper>
                    <EditClothTypeWrapper>
                        <EditClothTypeText>옷 타입</EditClothTypeText>
                        <EditClothTypeInput/>
                    </EditClothTypeWrapper>
                    <EditSkinTypeWrapper>
                        <EditSkinTypeText>피부 타입</EditSkinTypeText>
                        <EditSkinTypeInput/>
                    </EditSkinTypeWrapper>
                    <EditUserSizeWrapper>
                        <EditUserSizeText>몸무게</EditUserSizeText>
                        <EditUserSizeInput/>
                    </EditUserSizeWrapper>
                    <EditUser>저장하기</EditUser>
                    <DeleteUser onClick={onClickDelete}>탈퇴하기</DeleteUser>
                </Bottom>
            </Wrapper>
        </>
    )
}
