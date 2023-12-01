import {
    Wrapper, Top, Mid, Bottom, ProfileEdit, ProfileImg, ProfileName,
    ProfileText, ProfileUserWrapper, ProfileWrapper, Title,
    TitleWrapper, TopButton, Divide, ProfileTag, ProfileTagWrapper,
    MyMofyWrapper, YourMofyWrapper, MyCommunityListWrapper, SellListWrapper,
    MyMofyText, YourMofyText, SellListText, MyCommunityListText, MofyImg,
    CommunityList, SellList, ReportButton, ReportButtonWrapper,
    ReportImg, ReportWrapper, ReportText, ReportListWrapper, ReportExitButton,
    ReportTop, ConsentWrapper, ProfileArrayTag, ProfileTagValue,
    ProfileValueWrapper, MofyImgDiv, MoImg
} from '../../styles/myPageStyle'
import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import axios from "axios";
// import * as S from "@/src/styleBoard/detail/StyleBoardDetail-styles";
// import * as S from "@/src/styleBoard/detail/StyleBoardDetail-styles";

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


    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [datetime, setDatetime] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [tags, setTags] = useState("")

    const[userID, setUserID] = useState(0)

    // const [imageURL, setImageURL] = useState(null);

    const [isPopupOpen, setPopupOpen] = useState(false);
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    const [dataLoaded, setDataLoaded] = useState(false)
    const [isImgDataLoaded, setIsImgDataLoaded] = useState(false);
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            try {
                // 이미지 및 게시물 데이터를 병렬로 불러오기
                const imageResponse= await axios.get(`http://127.0.0.1:8000/board/6/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })



                // 이미지 URL이 상대 경로로 저장되어 있으므로, 기본 URL과 결합하여 전체 URL 생성
                const baseURL = 'http://127.0.0.1:8000';
                const fullURL = baseURL + imageResponse.data.image;

                // 이미지를 불러오기
                const imageBlobResponse = await axios.get(fullURL, {
                    responseType: 'arraybuffer',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (imageBlobResponse.status === 200) {
                    const contentType = imageBlobResponse.headers['content-type'];
                    const blob = new Blob([imageBlobResponse.data], {type: contentType});

                    // Blob 데이터를 URL.createObjectURL을 사용하여 이미지 URL로 변환
                    const objectURL = URL.createObjectURL(blob);
                    setImageURL(objectURL);
                } else {
                    console.error('Failed to fetch image');
                }


                console.log(imageResponse.data)

                // 게시물 데이터 설정
                setTitle(imageResponse.data.title);
                setContent(imageResponse.data.content);
                setDatetime(imageResponse.data.datetime);
                setTags(imageResponse.data.tags)
                setDataLoaded(true);

                // Fetch user data
                const userResponse = await axios.get('http://127.0.0.1:8000/userinfo/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setUsername(userResponse.data);
                setIsUserDataLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }



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
            try {
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

        if (accessToken && !username && !isUserDataLoaded) {
            fetchData();
        }
    }, [accessToken, username, isUserDataLoaded]);

    const onClickButton = () => {
        setPopupOpen(true);
    };

    const onClosePopup = () => {
        setPopupOpen(false);
    };

    const onClickMyMofy = () => {

    }
    return (
        <>
            <Wrapper>



                <ConsentWrapper>
                    <Top>
                        <TitleWrapper>
                            <Title onClick={onClickHome} src="images/mofylogo.png"/>
                        </TitleWrapper>

                        {/*<Title>Title</Title>*/}
                        <TopButton onClick={onClickLogout}>Log Out</TopButton>
                    </Top>
                    <Divide/>
                    <Mid>
                        <ProfileWrapper>
                            {/*<ProfileText>내 정보</ProfileText>*/}
                            <ProfileUserWrapper>
                                <ProfileText>내 정보</ProfileText>
                                <ProfileImg src={profileImage || "images/nothingImg.png"}></ProfileImg>
                                <ProfileName>
                                    {username ? (
                                        <div>{username.username}</div>
                                    ) : (
                                        <div></div>
                                    )}
                                </ProfileName>
                                <ProfileTagWrapper>
                                    <ProfileTag>
                                        <div>{myArray}</div>
                                        <div>{myArray2}</div>
                                    </ProfileTag>
                                    <ProfileValueWrapper>
                                        <ProfileTag>키</ProfileTag>
                                        <ProfileTag>
                                            {height ? (
                                                <ProfileTagValue>
                                                    {height.height}
                                                </ProfileTagValue>
                                            ) : (
                                                <div>
                                                </div>
                                            )}
                                        </ProfileTag>
                                        <ProfileTag>cm</ProfileTag>
                                    </ProfileValueWrapper>
                                    <ProfileValueWrapper>
                                        <ProfileTag>몸무게</ProfileTag>
                                        <ProfileTag>
                                            {weight ? (
                                                <ProfileTagValue>
                                                    {weight.weight}
                                                </ProfileTagValue>
                                            ) : (
                                                <div>
                                                </div>
                                            )}
                                        </ProfileTag>
                                        <ProfileTag>kg</ProfileTag>
                                    </ProfileValueWrapper>
                                    <ProfileValueWrapper>
                                        <ProfileTag>발사이즈</ProfileTag>
                                        <ProfileTag>
                                            {shoeSize ? (
                                                <ProfileTagValue>
                                                    {shoeSize.shoeSize}
                                                </ProfileTagValue>
                                            ) : (
                                                <div>
                                                </div>
                                            )}
                                        </ProfileTag>
                                        <ProfileTag>mm</ProfileTag>
                                    </ProfileValueWrapper>
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
                            <MofyImgDiv>
                                {imageURL && <MoImg src={imageURL} alt="Fetched" />}
                            </MofyImgDiv>
                            {/*<div>{imageURL && <img src={imageURL} alt="Fetched" />}</div>*/}
                            <MofyImgDiv/><MofyImgDiv/>
                            <MofyImgDiv/><MofyImgDiv/><MofyImgDiv/>
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