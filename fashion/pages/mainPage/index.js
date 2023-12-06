import {
    Wrapper, Title, TopButton, Top, Divide, Left, StylesWrapper, StylesText, Right,
    Styles, CommunityWrapper, ProfileWrapper, Bottom, TradeWrapper, Mid, WeatherWrapper,
    StylesImg, SearchInput, ConsentWrapper, StylesImgWrapper, StylesUserName, StylesUserImg,
    StylesUserWrapper, StylesTitle, StylesTagWrapper, ProfileText, ProfileUserWrapper, ProfileName,
    ProfileImg, ProfileEdit, WeatherText, WeatherInfo, TradeText, CommunityText,
    WeatherImg, WeatherDetail, TemInfo, ModalContent, ModalWrapper, RecentSearchWrapper,
    RecentSearchButton, RecentSearchText, Rate, PopularSearchText, PopularSearchItems, TagText,
    TagButton, MoreTagButton, PopularSearchItemsWrapper, PopularSearchWrapper, TagButtonWrapper,
    TagWrapper, RecommendSearchWrapper, RecommendSearchText, RecommendSearchButton, FashionBtn, StylesRankNum,
    MessageButton
} from '../../styles/mainPageStyle'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MainCommunityList from "../../src/mainCommunityList/mainCommunityList";
import MainMarketBoardList from "../../src/mainMarketBordList/mainMarketBoardList"; // * 쿠키 import!
import { Button, Popover } from 'antd';
import { useRouter } from "next/router";
// import {WeatherApp} from './WeatherApp'

// window.sharedVariable = 'Hello from file1!';

// module.exports = {
//     myGlobalVariable: 'This is a global variable',
// };
// console.log("myGlobalVariable");
// console.log(myGlobalVariable);

// ================================== 앞에 * 있는 주석은 권한 설명임미다 ======================================

const onClickHome = () => {
    window.location.href = "http://localhost:3000/mainPage";
}
const onClickLogout = () => {
    window.location.href = "http://localhost:3000/mainPage/notLogin";
}
const onClickMyPage = () => {
    window.location.href = "http://localhost:3000/myPage";
}
const onClickCommunity = () => {
    window.location.href = "http://localhost:3000/community";
}
const onClickTrade = () => {
    window.location.href = "http://localhost:3000/marketBoard";
}
const onClickEdit = () => {
    window.location.href = "http://localhost:3000/editPage";
}



const API_KEY = '9ca687d0177634a47449391852d5e834';
const city = 'Seoul';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
export default function MainCotainer() {
    const router = useRouter();
    const [weatherData, setWeatherData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [username, setUsername] = useState(null);
    const [profileImage, setProfileImage] = useState(null);


    const [imageURL, setImageURL] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);


    const [recentSearch1, setRecentSearch1] = useState([null]);
    const [recentSearch2, setRecentSearch2] = useState([null]);
    const [recentSearch3, setRecentSearch3] = useState([null]);
    const [recentSearch4, setRecentSearch4] = useState([null]);
    const [recentSearch5, setRecentSearch5] = useState([null]);
    const [popularSearch, setPopularSearch] = useState([null]);
    const [recommendSearch1, setRecommendSearch1] = useState([null]);
    const [recommendSearch2, setRecommendSearch2] = useState([null]);
    const [recommendSearch3, setRecommendSearch3] = useState([null]);
    const [recommendSearch4, setRecommendSearch4] = useState([null]);
    const [recommendSearch5, setRecommendSearch5] = useState([null]);

    const [boardID1, setBoardID1] = useState(0);
    const [boardID2, setBoardID2] = useState(0);
    const [boardID3, setBoardID3] = useState(0);
    const [boardID4, setBoardID4] = useState(0);

    const [reqData, setReqData] = useState([]);

    const baseURL = 'http://127.0.0.1:8000';
    const [fullURL1, setFullURL1] = useState("");
    const [fullURL2, setFullURL2] = useState("");
    const [fullURL3, setFullURL3] = useState("");
    const [fullURL4, setFullURL4] = useState("");

    const [profileImg1, setProfileImg1] = useState("");
    const [username1, setUsername1] = useState("");
    const [profileImg2, setProfileImg2] = useState("");
    const [username2, setUsername2] = useState("");
    const [profileImg3, setProfileImg3] = useState("");
    const [username3, setUsername3] = useState("");
    const [profileImg4, setProfileImg4] = useState("");
    const [username4, setUsername4] = useState("");


    //Cookies.set("access_token", response.data.access_token, { expires: 7 });
    //Cookies.set("refresh_token", response.data.refresh_token, { expires: 7 });// 7일간 유지
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');


    const onClickImg1 = () => {
        window.location.href = `http://localhost:3000/styleBoard/${rank1boardID}`;
    }

    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [isUserDataLoaded0, setIsUserDataLoaded0] = useState(false);
    const [isUserDataLoaded1, setIsUserDataLoaded1] = useState(false);
    const [isUserDataLoaded2, setIsUserDataLoaded2] = useState(false);
    const [isUserDataLoaded3, setIsUserDataLoaded3] = useState(false);
    const [isUserDataLoaded4, setIsUserDataLoaded4] = useState(false);
    const [isRecentSearch1Loaded, setIsRecentSearch1Loaded] = useState(false);
    const [isPopularSearchLoaded, setIsPopularSearchLoaded] = useState(false);
    const [isRecommendSearchLoaded, setIsRecommendSearchLoaded] = useState(false);
    const [isRankLoaded, setIsRankLoaded] = useState(false);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/stylerank/1/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log("rank1")
                console.log(response.data.image)
                console.log(response.data.boardID)
                console.log(response.data)
                // console.log(response.data.profileImg)
                console.log(response.data.usr_name)

                // console.log("..tempFUllURL")
                const tempFullURL = 'http://127.0.0.1:8000' + response.data.image;

                setFullURL1(tempFullURL);
                setBoardID1(response.data.boardID);
                // setProfileImg1(response.data.profileImg);
                setUsername1(response.data.usr_name);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        fetchData();
    }, [accessToken]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/stylerank/2/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log("rank2")
                console.log(response.data.image)
                console.log(response.data.boardID)

                const tempFullURL = 'http://127.0.0.1:8000' + response.data.image;

                setFullURL2(tempFullURL);
                setBoardID2(response.data.boardID);
                setUsername2(response.data.usr_name);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        fetchData();
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/stylerank/3/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log("rank3")
                console.log(response.data.image)
                console.log(response.data.boardID)

                const tempFullURL = 'http://127.0.0.1:8000' + response.data.image;

                setFullURL3(tempFullURL);
                setBoardID3(response.data.boardID);
                setUsername3(response.data.usr_name);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        fetchData();
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/stylerank/4/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log("rank4")
                console.log(response.data.image)
                console.log(response.data.boardID)

                // console.log("..tempFUllURL")
                const tempFullURL = 'http://127.0.0.1:8000' + response.data.image;

                setFullURL4(tempFullURL);
                setBoardID4(response.data.boardID);
                setUsername4(response.data.usr_name);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        fetchData();
    }, [accessToken]);






    useEffect(() => {
        const fetchData = async () => {


            const result = await axios.get("http://127.0.0.1:8000/boardType/1/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
                .then((response) => {
                    setReqData([...response.data])


                    console.log(response.data);

                    setDataLoaded0(true);
                })
                .catch(function (error) {
                    console.log(error);
                });
            try {

                const response = await axios.get('http://127.0.0.1:8000/userinfo/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setUsername(response.data);
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


            try {
                const response = await axios.get('http://127.0.0.1:8000/search/history/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log("!response.data")
                console.log(response.data)
                setRecentSearch1(response.data[0].query);
                setRecentSearch2(response.data[1].query);
                setRecentSearch3(response.data[2].query);
                setRecentSearch4(response.data[3].query);
                setRecentSearch5(response.data[4].query);

                setIsRecentSearch1Loaded(true);
            } catch (error) {
                console.error('서버 요청! 오류:', error);
            }
            try {
                const response = await axios.get('http://127.0.0.1:8000/search/popular/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log("인기검색어 리스트")
                console.log(response.data)
                setPopularSearch(response.data);

                console.log(setPopularSearch);
                setIsPopularSearchLoaded(true);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
            try {
                const response = await axios.get('http://127.0.0.1:8000/search/suggestions/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setRecommendSearch1(response.data.suggest_results1);
                setRecommendSearch2(response.data.suggest_results2);
                setRecommendSearch3(response.data.suggest_results3);
                setRecommendSearch4(response.data.suggest_results4);
                setRecommendSearch5(response.data.suggest_results5);

                setIsRecommendSearchLoaded(true);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }



        };

        if (accessToken && !username && !isUserDataLoaded0 && !isUserDataLoaded && !isUserDataLoaded1 && !isUserDataLoaded2 && !isUserDataLoaded3 && !isUserDataLoaded4 && !isRecentSearch1Loaded && !isPopularSearchLoaded && !isRecommendSearchLoaded && !isRankLoaded) {
            fetchData();
        }

    }, [accessToken, username, isUserDataLoaded0, isUserDataLoaded, isUserDataLoaded1, isUserDataLoaded2, isUserDataLoaded3, isUserDataLoaded4, isRecentSearch1Loaded, isPopularSearchLoaded, isRecommendSearchLoaded, isRankLoaded]);

    function handleError(error) {
        if (error.response) {
            console.error('서버 응답 오류:', error.response.data);
        } else if (error.request) {
            console.error('서버 요청이 전송되지 않았습니다.');
        } else {
            console.error('오류 발생:', error.message);
        }
    }

    const onChangeSearch = (event) => {
        setSearch(event.target.value);
    }

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    const onEnterSubmit = (event) => {
        if (event.key === "Enter") {
            // Validate the search query
            if (!search) {
                console.error("검색어가 필요합니다.");
                return;
            }
            console.log("Request URL:", "http://localhost:8000/search/");
            console.log("Request Data:", { query: search });
            console.log("Request Headers:", axiosConfig.headers);

            axios.post("http://localhost:8000/search/", { query: search }, axiosConfig)
                .then((response) => {
                    if (response.data) { // * 데이터 가져오는거 성공하면

                        console.log("검색 결과:");
                        console.log(response.data);

                        renderSearchResults(response.data);

                        window.location.href = "http://localhost:3000/searchPage";
                    } else {
                        // Handle API error
                        console.error("검색 실패: " + response.data.message);
                    }
                })
                .catch((error) => {
                    // Handle general API error
                    console.error("검색 API 호출 중 오류 발생:", error);
                });
        }
    };

    const onTagClickSubmit = (event) => {
        const buttonText = event.target.getAttribute('data-text');
        // console.log("Request URL:", "http://localhost:8000/search/");
        // console.log("Request Data:", { query: buttonText });
        // console.log("Request Headers:", axiosConfig.headers);

        axios.post("http://localhost:8000/search/", { query: buttonText }, axiosConfig)
            .then((response) => {
                if (response.data) { // * 데이터 가져오는거 성공하면

                    console.log("검색 결과:");
                    console.log(response.data);

                    renderSearchResults(response.data);

                    window.location.href = "http://localhost:3000/searchPage";
                } else {
                    // Handle API error
                    console.error("검색 실패: " + response.data.message);
                }
            })
            .catch((error) => {
                // Handle general API error
                console.error("API 호출 중 오류 발생:", error);
            });
    }

    const renderSearchResults = (results) => {
        console.log("Rendering Search Results:", results);
    };

    const onMoreTagClickSubmit = (event) => {
        window.location.href = "https://google.com";
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const apiKey = '9ca687d0177634a47449391852d5e834'; // OpenWeatherMap API 키 입력
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

                axios.get(apiUrl)
                    .then((response) => {
                        setWeatherData(response.data);
                    })
                    .catch((error) => {
                        console.error('날씨 정보를 가져오는 중 에러 발생:', error);
                    });
            });
        } else {
            console.error("Geolocation을 지원하지 않습니다.");
        }
    }, []);

    if (!weatherData) {
        return <div>날씨 정보를 불러오는 중...</div>;
    }

    const temperature = (weatherData.main.temp - 273.15).toFixed(2); // 섭씨로 변환
    const description = weatherData.weather[0].description;




    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const onClickFashion = () => {
        window.location.href = "http://localhost:3000/styleBoard/"
    }

    const onClickRank1 = () => {
        router.push(`/styleBoard/${boardID1}`);
    }
    const onClickRank2 = () => {
        router.push(`/styleBoard/${boardID2}`);
    }
    const onClickRank3 = () => {
        router.push(`/styleBoard/${boardID3}`);
    }
    const onClickRank4 = () => {
        router.push(`/styleBoard/${boardID4}`);
    }
    const onClickMessage = () => {
        window.location.href = "http://localhost:3000/mks/welcomeMessage"
    }
    return (

        <>
            <Wrapper>

                <ConsentWrapper>
                    <Top>

                        <SearchInput onClick={openModal} onKeyPress={onEnterSubmit} onChange={onChangeSearch} type="text" placeholder="검색어를 입력하세요.">

                        </SearchInput>
                        {isModalOpen && (
                            <ModalWrapper onClick={closeModal}>
                                <ModalContent onClick={(e) => e.stopPropagation()}>
                                    <RecentSearchWrapper>
                                        <RecentSearchText>최근검색어</RecentSearchText>
                                        {recentSearch1 && recentSearch1[0] !== null && (
                                            <RecentSearchButton onClick={onTagClickSubmit} data-text={recentSearch1}>
                                                {recentSearch1}
                                            </RecentSearchButton>
                                        )}
                                        {recentSearch2 && recentSearch2[0] !== null && (
                                            <RecentSearchButton onClick={onTagClickSubmit} data-text={recentSearch2}>
                                                {recentSearch2}
                                            </RecentSearchButton>
                                        )}
                                        {recentSearch3 && recentSearch3[0] !== null && (
                                            <RecentSearchButton onClick={onTagClickSubmit} data-text={recentSearch3}>
                                                {recentSearch3}
                                            </RecentSearchButton>
                                        )}
                                        {recentSearch4 && recentSearch4[0] !== null && (
                                            <RecentSearchButton onClick={onTagClickSubmit} data-text={recentSearch4}>
                                                {recentSearch4}
                                            </RecentSearchButton>
                                        )}
                                        {recentSearch5 && recentSearch5[0] !== null && (
                                            <RecentSearchButton onClick={onTagClickSubmit} data-text={recentSearch5}>
                                                {recentSearch5}
                                            </RecentSearchButton>
                                        )}
                                    </RecentSearchWrapper>
                                    <RecommendSearchWrapper>
                                        <RecommendSearchText>추천검색어</RecommendSearchText>
                                        <RecommendSearchButton onClick={onTagClickSubmit} data-text={recommendSearch1}>
                                            {recommendSearch1}
                                        </RecommendSearchButton>
                                        <RecommendSearchButton onClick={onTagClickSubmit} data-text={recommendSearch2}>
                                            {recommendSearch2}
                                        </RecommendSearchButton>
                                        <RecommendSearchButton onClick={onTagClickSubmit} data-text={recommendSearch3}>
                                            {recommendSearch3}
                                        </RecommendSearchButton>
                                        <RecommendSearchButton onClick={onTagClickSubmit} data-text={recommendSearch4}>
                                            {recommendSearch4}
                                        </RecommendSearchButton>
                                        <RecommendSearchButton onClick={onTagClickSubmit} data-text={recommendSearch5}>
                                            {recommendSearch5}
                                        </RecommendSearchButton>
                                    </RecommendSearchWrapper>
                                    <TagWrapper>
                                        <TagText>태그</TagText>
                                        <TagButtonWrapper>
                                            <TagButton onClick={onTagClickSubmit} data-text="가을">#가을</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="운동화">#운동화</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="후드">#후드</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="섀도우">#섀도우</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="여름쿨톤">#여름쿨톤</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="ootd">#ootd</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="원피스">#원피스</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="코디추천">#코디추천</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="코트">#코트</TagButton>

                                        </TagButtonWrapper>
                                        {/*<MoreTagButton onClick={onMoreTagClickSubmit}>더보기</MoreTagButton>*/}
                                    </TagWrapper>
                                    <PopularSearchWrapper>
                                        <PopularSearchText>인기검색어</PopularSearchText>
                                        <PopularSearchItemsWrapper>
                                            <Rate>1.</Rate>
                                            <PopularSearchItems onClick={onTagClickSubmit} data-text={popularSearch.popular_results1}>
                                                {popularSearch.popular_results1}
                                            </PopularSearchItems>
                                        </PopularSearchItemsWrapper>
                                        <PopularSearchItemsWrapper>
                                            <Rate>2.</Rate>
                                            <PopularSearchItems onClick={onTagClickSubmit} data-text={popularSearch.popular_results2}>
                                                {popularSearch.popular_results2}
                                            </PopularSearchItems>
                                        </PopularSearchItemsWrapper>
                                        <PopularSearchItemsWrapper>
                                            <Rate>3.</Rate>
                                            <PopularSearchItems onClick={onTagClickSubmit} data-text={popularSearch.popular_results3}>
                                                {popularSearch.popular_results3}
                                            </PopularSearchItems>
                                        </PopularSearchItemsWrapper>
                                        <PopularSearchItemsWrapper>
                                            <Rate>4.</Rate>
                                            <PopularSearchItems onClick={onTagClickSubmit} data-text={popularSearch.popular_results4}>
                                                {popularSearch.popular_results4}
                                            </PopularSearchItems>
                                        </PopularSearchItemsWrapper>
                                        <PopularSearchItemsWrapper>
                                            <Rate>5.</Rate>
                                            <PopularSearchItems onClick={onTagClickSubmit} data-text={popularSearch.popular_results5}>
                                                {popularSearch.popular_results5}
                                            </PopularSearchItems>
                                        </PopularSearchItemsWrapper>
                                        <PopularSearchItemsWrapper>
                                            <Rate>6.</Rate>
                                            <PopularSearchItems onClick={onTagClickSubmit}>
                                                운동화
                                            </PopularSearchItems>
                                        </PopularSearchItemsWrapper>
                                        <PopularSearchItemsWrapper>
                                            <Rate>7.</Rate>
                                            <PopularSearchItems onClick={onTagClickSubmit}>
                                                기모
                                            </PopularSearchItems>
                                        </PopularSearchItemsWrapper>
                                        <PopularSearchItemsWrapper>
                                            <Rate>8.</Rate>
                                            <PopularSearchItems onClick={onTagClickSubmit}>
                                                잠옷
                                            </PopularSearchItems>
                                        </PopularSearchItemsWrapper>
                                        <PopularSearchItemsWrapper>
                                            <Rate>9.</Rate>
                                            <PopularSearchItems onClick={onTagClickSubmit}>
                                                셋업
                                            </PopularSearchItems>
                                        </PopularSearchItemsWrapper>
                                        <PopularSearchItemsWrapper>
                                            <Rate>10.</Rate>
                                            <PopularSearchItems onClick={onTagClickSubmit}>
                                                블록코어
                                            </PopularSearchItems>
                                        </PopularSearchItemsWrapper>
                                    </PopularSearchWrapper>
                                </ModalContent>
                            </ModalWrapper>
                        )}
                        <Title onClick={onClickHome} src="images/mofylogo.png"/>
                        <TopButton onClick={onClickLogout}>Log Out</TopButton>
                        <TopButton onClick={onClickMyPage}>My Page</TopButton>

                        <Popover content="✨✨ 궁금해? 들어와보던가 ♡🌷💕" styles={{marginTop:"30px"}}>
                            <FashionBtn onClick={onClickFashion}>Fashion★</FashionBtn>
                        </Popover>
                        <Popover content="🍎쪽지를 보내보세용🥕" styles={{marginTop:"10px"}}>
                            <MessageButton onClick={onClickMessage}>🐰💬🗨️🐱</MessageButton>
                        </Popover>
                    </Top>
                    <Divide/>
                    <Mid>
                        <Left>
                            <StylesWrapper>
                                <StylesText>Today's Mofy</StylesText>

                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src={fullURL1} onClick={onClickRank1}/>
                                    </StylesImgWrapper>
                                    {/*<StylesUserImg src={profileImg1} onClick={onClickRank1}/>*/}
                                    <StylesRankNum>1.</StylesRankNum>
                                    <StylesUserName onClick={onClickRank1}>{username1}</StylesUserName>
                                </Styles>
                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src={fullURL2} onClick={onClickRank2}/>
                                    </StylesImgWrapper>
                                    <StylesRankNum>2.</StylesRankNum>
                                    <StylesUserName onClick={onClickRank2}>{username2}</StylesUserName>
                                </Styles>
                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src={fullURL3} onClick={onClickRank3}/>
                                    </StylesImgWrapper>
                                    <StylesRankNum>3.</StylesRankNum>
                                    <StylesUserName onClick={onClickRank3}>{username3}</StylesUserName>
                                </Styles>
                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src={fullURL4} onClick={onClickRank4}/>
                                    </StylesImgWrapper>
                                    <StylesRankNum>4.</StylesRankNum>
                                    <StylesUserName onClick={onClickRank4}>{username4}</StylesUserName>
                                </Styles>
                            </StylesWrapper>
                        </Left>
                        <Right>
                            <ProfileWrapper>
                                <ProfileText>My Profile</ProfileText>
                                <ProfileUserWrapper>
                                    <ProfileImg src={profileImage || "images/firstImg.jpg"}></ProfileImg>
                                    <ProfileName>
                                        {username ? (
                                            <div>{username.username}</div>
                                        ) : (
                                            <div>Loading...</div>
                                        )}
                                    </ProfileName>
                                </ProfileUserWrapper>
                                <ProfileEdit onClick={onClickEdit}>프로필 수정</ProfileEdit>
                            </ProfileWrapper>
                            <WeatherText>Today's Weather</WeatherText>
                            <WeatherWrapper>
                                <TemInfo>
                                    <WeatherImg src="https://cdn-icons-png.flaticon.com/512/4158/4158502.png"/>
                                    <WeatherDetail>{temperature}°C</WeatherDetail>
                                </TemInfo>
                                <WeatherInfo>
                                    <WeatherImg src="https://cdn-icons-png.flaticon.com/512/3942/3942043.png"/>
                                    <WeatherDetail>{description}</WeatherDetail>
                                </WeatherInfo>

                                {/*<p>기온 : {temperature}°C</p>*/}
                                {/*<p>날씨 : {description}</p>*/}
                                {/*{weatherData ? (*/}
                                {/*    <>*/}
                                {/*        <h2>Weather in {weatherData.name}</h2>*/}
                                {/*        <p>Temperature: {weatherData.main?.temp}°C</p>*/}
                                {/*        {weatherData.weather && weatherData.weather.length > 0 && (*/}
                                {/*            <p>Weather: {weatherData.weather[0].description}</p>*/}
                                {/*        )}*/}
                                {/*    </>*/}
                                {/*) : (*/}
                                {/*    <p>Loading weather data...</p>*/}
                                {/*)}*/}
                            </WeatherWrapper>

                        </Right>
                    </Mid>
                    <Bottom>
                        <CommunityWrapper>
                            <CommunityText onClick={onClickCommunity}>
                                Community
                                {/*{styleRank1 ? (*/}
                                {/*    <div>{styleRank1.username}!</div>*/}
                                {/*) : (*/}
                                {/*    <div>*/}
                                {/*        Loading...*/}
                                {/*    </div>*/}
                                {/*)}*/}
                                <MainCommunityList/>
                            </CommunityText>
                        </CommunityWrapper>
                        <TradeWrapper>
                            <TradeText onClick={onClickTrade}>
                                Market
                                <MainMarketBoardList/>
                            </TradeText>
                        </TradeWrapper>
                    </Bottom>
                </ConsentWrapper>
            </Wrapper>
        </>

    )
}