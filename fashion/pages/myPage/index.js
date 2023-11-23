import {
    Wrapper, Top, Mid, Bottom, ProfileEdit, ProfileImg, ProfileName,
    ProfileText, ProfileUserWrapper, ProfileWrapper, Title,
    TitleWrapper, TopButton, Divide, ProfileTag, ProfileTagWrapper,
    MyMofyWrapper, YourMofyWrapper, MyCommunityListWrapper, SellListWrapper,
    MyMofyText, YourMofyText, SellListText, MyCommunityListText, MofyImg,
    CommunityList, SellList, ReportButton, ReportButtonWrapper,
    ReportImg, ReportWrapper, ReportText, ReportListWrapper, ReportExitButton,
    ReportTop, ConsentWrapper
} from '../../styles/myPageStyle'
import React, { useState } from 'react';

const onClickHome = () => {
    window.location.href = "http://localhost:3000/mainPage";
}
const onClickEdit = () => {
    window.location.href = "http://localhost:3000/editPage";
}
const Popup = ({ onClose }) => {
    return (
        <ReportWrapper>
            <ReportTop>
                <ReportText>Report List</ReportText>
                <ReportExitButton onClick={onClose}>X</ReportExitButton>
            </ReportTop>

            <ReportListWrapper></ReportListWrapper>

        </ReportWrapper>
    );
};
export default function BoardNewPage() {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const onClickButton = () => {
        setPopupOpen(true);
    };

    const onClosePopup = () => {
        setPopupOpen(false);
    };
    return (
        <>
            <Wrapper>
                <ConsentWrapper>
                    <Top>
                        <TitleWrapper>
                            <Title onClick={onClickHome} src="images/mofylogo.png"/>
                        </TitleWrapper>

                        {/*<Title>Title</Title>*/}
                        <TopButton>Log Out</TopButton>
                    </Top>
                    <Divide/>
                    <Mid>
                        <ProfileWrapper>
                            {/*<ProfileText>내 정보</ProfileText>*/}
                            <ProfileUserWrapper>
                                <ProfileText>내 정보</ProfileText>
                                <ProfileImg src="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202304/07/kinolights/20230407081026931lbzg.jpg"/>
                                <ProfileName>MyName</ProfileName>
                                <ProfileTagWrapper>
                                    <ProfileTag>#모던</ProfileTag>
                                    <ProfileTag>#심플</ProfileTag>
                                    <ProfileTag>#페미닌</ProfileTag>
                                </ProfileTagWrapper>

                            </ProfileUserWrapper>
                            <ProfileEdit onClick={onClickEdit}>프로필 수정</ProfileEdit>
                            <ReportButtonWrapper>
                                <ReportImg src="https://cdn-icons-png.flaticon.com/512/883/883396.png"/>
                                <ReportButton onClick={onClickButton}>신고 내역</ReportButton>
                            </ReportButtonWrapper>
                            {isPopupOpen && <Popup onClose={onClosePopup} />}
                        </ProfileWrapper>
                    </Mid>

                    <Bottom>
                        <MyMofyWrapper>
                            <MyMofyText>My MOFY</MyMofyText>
                            <MofyImg/><MofyImg/><MofyImg/>
                            <MofyImg/><MofyImg/><MofyImg/>
                        </MyMofyWrapper>
                        <YourMofyWrapper>
                            <YourMofyText>Your MOFY</YourMofyText>
                            <MofyImg/><MofyImg/><MofyImg/>
                        </YourMofyWrapper>
                        <MyCommunityListWrapper>
                            <MyCommunityListText>My Community List</MyCommunityListText>
                            <CommunityList>내용</CommunityList>
                            <CommunityList>내용</CommunityList>
                            <CommunityList>내용</CommunityList>
                            <CommunityList>내용</CommunityList>
                            <CommunityList>내용</CommunityList>
                            <CommunityList>내용</CommunityList>
                            <CommunityList>내용</CommunityList>
                            <CommunityList>내용</CommunityList>
                        </MyCommunityListWrapper>
                        <SellListWrapper>
                            <SellListText>Sell List</SellListText>
                            <SellList>내용</SellList>
                            <SellList>내용</SellList>
                            <SellList>내용</SellList>
                            <SellList>내용</SellList>
                            <SellList>내용</SellList>
                            <SellList>내용</SellList>
                            <SellList>내용</SellList>
                            <SellList>내용</SellList>
                        </SellListWrapper>

                    </Bottom>
                </ConsentWrapper>
            </Wrapper>
        </>
    )
}
