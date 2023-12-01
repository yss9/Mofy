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
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import axios from "axios";

const onClickLogout = () => {
    window.location.href = "http://localhost:3000/mainPage/notLogin";
}
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
    const tempArray = [];
    const [myArray, setMyArray] = useState([])
    const tempArray2 = [];
    const [myArray2, setMyArray2] = useState([])
    console.log(myArray)

    const [username, setUsername] = useState(null);
    const [weight, setWeight] = useState(null);
    const [height, setHeight] = useState(null);
    const [shoeSize, setShoeSize] = useState(null);
    const [clothType, setClothType] = useState(null);
    const [skinType, setSkinType] = useState(null);
    const [profileImage, setProfileImage] = useState(null);



    const [normal, setnormal] = useState(false);
    const [dry, setdry] = useState(false);
    const [oily, setoily] = useState(false);
    const [combination, setcombination] = useState(false);
    const [sensitive, setsensitive] = useState(false);
    const [acne, setacne] = useState(false);



    const[userID, setUserID] = useState(0)

    const [isPopupOpen, setPopupOpen] = useState(false);
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [isArrayLoaded, setArrayLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/userinfo/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUsername(response.data);

                setIsUserDataLoaded(true); // Set the flag to indicate that data has been loaded
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
            try {
                const response = await axios.get('http://127.0.0.1:8000/userinfo2/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setWeight(response.data);
                setIsUserDataLoaded(true); // Set the flag to indicate that data has been loaded
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
            try { // 키
                const response = await axios.get('http://127.0.0.1:8000/userinfo3/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setHeight(response.data);
                setIsUserDataLoaded(true); // Set the flag to indicate that data has been loaded
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
            try {
                const response = await axios.get('http://127.0.0.1:8000/userinfo4/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setShoeSize(response.data);
                setIsUserDataLoaded(true); // Set the flag to indicate that data has been loaded
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/clothTypeView/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                console.log("true값 확인")
                console.log(response.data.Simple)
                if(response.data.Simple === true){
                    console.log("simple 추가")
                    tempArray.push("#Simple")
                }

                if(response.data.Modern === true){
                    console.log("modern 추가")
                    tempArray.push("#Modern")
                }

                if(response.data.Feminine === true){
                    console.log("feminine 추가")
                    tempArray.push("#Feminine")
                }

                if(response.data.Dandy === true){
                    console.log("dandy 추가")
                    tempArray.push("#Dandy")
                }

                if(response.data.Retro === true){
                    console.log("Retro 추가")
                    tempArray.push("#Retro")
                }

                if(response.data.Minimal === true){
                    console.log("minimal 추가")
                    tempArray.push("#Minimal")
                }

                if(response.data.Casual === true){
                    console.log("casual 추가")
                    tempArray.push("#Casual")
                }

                if(response.data.Street === true){
                    console.log("street 추가")
                    tempArray.push("#Street")
                }

                if(response.data.Sporty === true){
                    console.log("sporty 추가")
                    tempArray.push("#Sporty")
                }

                if(response.data.Urban === true){
                    console.log("urban 추가")
                    tempArray.push("#Urban")
                }

                if(response.data.Classic === true){
                    console.log("classic 추가")
                    tempArray.push("#Classic")
                }


                console.log("tempArray")
                console.log(tempArray)

                setMyArray(tempArray)
                console.log("myArray")
                console.log(myArray)

                setIsArrayLoaded(true); // Set the flag to indicate that data has been loaded
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/skinTypeView/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                console.log("skin true값 확인")
                console.log(response.data.normal)
                if(response.data.normal === true){
                    console.log("normal 추가")
                    tempArray2.push("#normal")
                }

                if(response.data.dry === true){
                    console.log("dry 추가")
                    tempArray2.push("#dry")
                }

                if(response.data.oily === true){
                    console.log("oily 추가")
                    tempArray2.push("#oily")
                }

                if(response.data.combination === true){
                    console.log("combination 추가")
                    tempArray2.push("#combination")
                }

                if(response.data.sensitive === true){
                    console.log("sensitive 추가")
                    tempArray2.push("#sensitive")
                }

                if(response.data.acne === true){
                    console.log("acne 추가")
                    tempArray2.push("#acne")
                }


                console.log("tempArray2")
                console.log(tempArray2)

                setMyArray2(tempArray2)
                console.log("myArray2")
                console.log(myArray2)

                setIsArrayLoaded(true); // Set the flag to indicate that data has been loaded
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/skinTypeView/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setSkinType(response.data);
                setIsUserDataLoaded(true); // Set the flag to indicate that data has been loaded
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/user_image/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setProfileImage(response.data.profile_image_url);
                setIsUserDataLoaded(true);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        if (accessToken && !username && !isUserDataLoaded && !isArrayLoaded) {
            fetchData();
        }
    }, [accessToken, username, isUserDataLoaded, isArrayLoaded]);

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
                                <ProfileImg src={profileImage || "https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202304/07/kinolights/20230407081026931lbzg.jpg"}></ProfileImg>
                                <ProfileName>
                                    {username ? (
                                        <div>{username.username}</div>
                                    ) : (
                                        <div>Loading...</div>
                                    )}
                                </ProfileName>
                                <ProfileTagWrapper>

                                    <ProfileTag>
                                        <div>{myArray}</div>
                                        <div>{myArray2}</div>
                                    </ProfileTag>

                                    <ProfileTag>키
                                        {height ? (
                                            <div>
                                                <h1>{height.height}</h1>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>Loading...</p>
                                            </div>
                                        )}
                                    </ProfileTag>
                                    <ProfileTag>몸무게
                                        {weight ? (
                                            <div>
                                                <h1>{weight.weight}</h1>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>Loading...</p>
                                            </div>
                                        )}
                                    </ProfileTag>
                                    <ProfileTag>발사이즈
                                        {shoeSize ? (
                                            <div>
                                                <h1>{shoeSize.shoeSize}</h1>
                                            </div>
                                        ) : (
                                            <div>
                                                <p>Loading...</p>
                                            </div>
                                        )}
                                    </ProfileTag>

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