import {
    Wrapper, Title, TopButton, Top, Divide, Left, StylesWrapper, StylesText, Right,
    Styles, CommunityWrapper, ProfileWrapper, Bottom, TradeWrapper, Mid, WeatherWrapper,
    StylesImg, SearchInput, ConsentWrapper, StylesImgWrapper, StylesUserName, StylesUserImg,
    StylesUserWrapper, StylesTag, StylesTagWrapper, ProfileText, ProfileUserWrapper, ProfileName,
    ProfileImg, ProfileEdit, WeatherText, WeatherInfo, TradeText, CommunityText,
    WeatherImg, WeatherDetail, TemInfo, ModalContent, ModalWrapper, RecentSearchWrapper,
    RecentSearchButton, RecentSearchText, Rate, PopularSearchText, PopularSearchItems, TagText,
    TagButton, MoreTagButton, PopularSearchItemsWrapper, PopularSearchWrapper, TagButtonWrapper,
    TagWrapper, RecommendSearchWrapper, RecommendSearchText, RecommendSearchButton
} from '../../styles/mainPageStyle'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // * 쿠키 import!
import MainCommunityList from "../../src/mainCommunityList/mainCommunityList"
import MainMarketBoardList from "../../src/mainMarketBordList/mainMarketBoardList";
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
const onClickEdit = () => {
    window.location.href = "http://localhost:3000/editPage";
}

const API_KEY = '9ca687d0177634a47449391852d5e834';
const city = 'Seoul';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
export default function MainCotainer() {
    const [weatherData, setWeatherData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState(null);
    const [username, setUsername] = useState(null);
    const [recentSearch, setRecentSearch] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
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
    const [exportSearch, setExportSearch] = useState("");


    console.log(recommendSearch1)
    console.log("recommendSearch2")
    console.log(recommendSearch2)
    console.log("recommendSearch3")
    console.log(recommendSearch3)
    console.log("recommendSearch4")
    console.log(recommendSearch4)
    console.log("recommendSearch5")
    console.log(recommendSearch5)
    console.log("recentSearch1")
    console.log(recentSearch1)
    console.log("recentSearch2")
    console.log(recentSearch2)
    console.log("recentSearch3")
    console.log(recentSearch3)
    console.log("recentSearch4")
    console.log(recentSearch4)
    console.log("recentSearch5")
    console.log(recentSearch5)

    // * 쿠키에 저장된 토큰 값(로그인 정보)을 써묵기 위해서 변수에 저장!
    // * 토큰 값은 로그인할때 아래 주석 코드대로 저장됩니당 (pages/mks/login/index.js에 가면 볼 수 있움)
    // * 우리는 로그인할때 저장된 내 id의 토큰값을 가지고 다니면서 이것저것 하기 위해서 토큰을 매 페이지마다 get해서 가져옵니당
    //Cookies.set("access_token", response.data.access_token, { expires: 7 });
    //Cookies.set("refresh_token", response.data.refresh_token, { expires: 7 });// 7일간 유지
    const accessToken = Cookies.get('access_token');

    // * refreshToken은 안쓰는데 머... 그냥 이것도 위에거랑 같이 넣기만 하심 됩니당
    const refreshToken = Cookies.get('refresh_token');


    // * -------------------------------------------- DB에서 get하기 -----------------------------------------------


    // * get 요청이 반복되는걸 피하기 위해서 바로 밑에서 쓰이는 변수양 아래 주석에 설명 있움!
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [isRecentSearch1Loaded, setIsRecentSearch1Loaded] = useState(false);
    const [isPopularSearchLoaded, setIsPopularSearchLoaded] = useState(false);
    const [isRecommendSearchLoaded, setIsRecommendSearchLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => { // * 이건 get하면 계속 get 요청해서 컴터 힘들어해서 한번 get 되면 반복 안되도록 하는 코드인데
            try {                                     // * 여기 try부터 catch문까지 get 요청의 한 묶음입니당

                // * 원하는 url로 get 요청 보내기
                const response = await axios.get('http://127.0.0.1:8000/userinfo/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // * 요청 보낼 때 내 토큰 값을 헤더에 넣어서 id 권한을 요청합니당!
                    },
                });
                setUsername(response.data); // * response.data가 요청 보내면 받을 수 있는 값이고 나는 이걸 사용자 이름에다가 저장했엉

                // * 이건 위에 말했던 반복 안되도록 하는 방법에 포함되는건데
                // * 이거랑 같은 방식으로 위에 const[is~,setIs~] = useState(false);해서 try문마다 넣어주면 됩니당
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

                // * 여기서는 DB 설계상 받아오는 값이 딱 하나 있는게 아니고 속성이 여러개라서, 받아오는 값 중에 원하는 속성을 지정해줬슴미다 (.search_history1)
                setRecentSearch(response.data);

                const recentSearchQueries = response.data.map(item => item.query);

                // "query" 변수를 각각의 state 변수에 할당
                setRecentSearch1(recentSearchQueries[0] || "");
                setRecentSearch2(recentSearchQueries[1] || "");
                setRecentSearch3(recentSearchQueries[2] || "");
                setRecentSearch4(recentSearchQueries[3] || "");
                setRecentSearch5(recentSearchQueries[4] || "");

                setIsRecentSearch1Loaded(true);
                // * 이거도 위에 try문처럼 반복 방지를 위해 추가함미도
                setIsRecentSearch1Loaded(true);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
            try {
                const response = await axios.get('http://127.0.0.1:8000/search/popular/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
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

        // * 원하는 get 요청을 다 했다면 그동안 try문마다 true로 바꿔줬던 is~ 변수를 (accessToken && !username && !is어쩌구 && ...) 이렇게 추가합니당
        if (accessToken && !username && !isUserDataLoaded && !isRecentSearch1Loaded && !isPopularSearchLoaded && !isRecommendSearchLoaded) {
            fetchData();
        }

        // * 여기에도 is~ 추가해주세용 여긴 ! 없움
    }, [accessToken, username, isUserDataLoaded, isRecentSearch1Loaded, isPopularSearchLoaded, isRecommendSearchLoaded]);

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

    // * -------------------------------------------- DB에 post하기 -----------------------------------------------

    // * 이건 디비에 post할때 쓰는건데 예를들면 유저 정보 테이블이 있으면 모든 유저들이 같은 테이블에 저장되자나?
    // * 이때 유저id를 알려줘야 얘가 다른 정보들을 받아서 디비에다 저장하는데 그 id값이 들어있는 토큰을 헤더에 담고 있는 놈임미다
    // * get할때는 하나하나 헤더 어쩌구하면서 토큰 줬었는데 여기서는 그냥 보기 편하라고 표현방식만 다르게 한겁니당
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

                        // * 나는 받아온 데이터들 중에 search_results 속성에 있는 값을 써먹었숨미다
                        // * 일단 (response.data) 하고 로그에 뭐라고 뜨는지 확인한 다음에 원하는 속성 이름을 .속성이름 해서 추가하면 쇽샥 가져오기 가능!
                        renderSearchResults(response.data); //
                        renderSearchResults(response.data.search_results); //

                        window.location.href = "http://localhost:3000/community";
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
    };

    const onTagClickSubmit = (event) => {
        const buttonText = event.target.getAttribute('data-text');
        console.log("Request URL:", "http://localhost:8000/search/");
        console.log("Request Data:", { query: buttonText });
        console.log("Request Headers:", axiosConfig.headers);

        axios.post("http://localhost:8000/search/", { query: buttonText }, axiosConfig)
            .then((response) => {
                if (response.data) {

                    console.log("검색 결과:");
                    console.log(response.data.search_results);

                    renderSearchResults(response.data.search_results); //
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

    // * ====================================== 권한 설명 끝! ===========================================
    // * 모르겠는거 물어봐주심 열심히 머리 굴려보겠습니당~



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
                                        <RecentSearchButton onClick={onTagClickSubmit} data-text={recentSearch1.query}>
                                            {recentSearch1.query}
                                        </RecentSearchButton>
                                        <RecentSearchButton onClick={onTagClickSubmit} data-text={recentSearch2.query}>
                                            {recentSearch2.query}
                                        </RecentSearchButton>
                                        <RecentSearchButton onClick={onTagClickSubmit} data-text={recentSearch3.query}>
                                            {recentSearch3.query}
                                        </RecentSearchButton>
                                        <RecentSearchButton onClick={onTagClickSubmit} data-text={recentSearch4.query}>
                                            {recentSearch4.query}
                                        </RecentSearchButton>
                                        <RecentSearchButton onClick={onTagClickSubmit} data-text={recentSearch5.query}>
                                            {recentSearch5.query}
                                        </RecentSearchButton>
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
                                            <TagButton onClick={onTagClickSubmit} data-text="은행">#은행</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="태그">#태그</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="태그">#태그</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="태그">#태그</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="태그">#태그</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="태그">#태그</TagButton>
                                            <TagButton onClick={onTagClickSubmit} data-text="태그">#태그</TagButton>

                                        </TagButtonWrapper>
                                        <MoreTagButton onClick={onMoreTagClickSubmit}>더보기</MoreTagButton>
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
                    </Top>
                    <Divide/>
                    <Mid>
                        <Left>
                            <StylesWrapper>
                                <StylesText>Today's Mofy</StylesText>

                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src="https://vitnal.co.kr/web/product/big/202306/8406b7a565956a108ef183f93e8b6fbc.jpg" />
                                    </StylesImgWrapper>
                                    <StylesUserWrapper>
                                        <StylesUserImg src="https://vitnal.co.kr/web/product/big/202306/8406b7a565956a108ef183f93e8b6fbc.jpg"/>
                                        <StylesUserName>유저1
                                        </StylesUserName>
                                    </StylesUserWrapper>
                                    <StylesTagWrapper>
                                        <StylesTag onClick={onTagClickSubmit} data-text="태그">#태그</StylesTag>
                                        <StylesTag onClick={onTagClickSubmit} data-text="태그">#태그</StylesTag>
                                    </StylesTagWrapper>
                                </Styles>
                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src="https://cdn.imweb.me/upload/S201612025840bcf9c3866/4f56d1796c287.jpeg"/>
                                    </StylesImgWrapper>
                                    <StylesUserWrapper>
                                        <StylesUserImg src="https://cdn.imweb.me/upload/S201612025840bcf9c3866/4f56d1796c287.jpeg"/>
                                        <StylesUserName>유저2</StylesUserName>
                                    </StylesUserWrapper>
                                    <StylesTagWrapper>
                                        <StylesTag onClick={onTagClickSubmit} data-text="태그">#태그</StylesTag>
                                        <StylesTag onClick={onTagClickSubmit} data-text="태그">#태그</StylesTag>
                                    </StylesTagWrapper>
                                </Styles>
                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src="https://img.allurekorea.com/allure/2023/03/style_641ae6d429619-560x700.jpg"/>
                                    </StylesImgWrapper>
                                    <StylesUserWrapper>
                                        <StylesUserImg src="https://img.allurekorea.com/allure/2023/03/style_641ae6d429619-560x700.jpg"/>
                                        <StylesUserName>유저3</StylesUserName>
                                    </StylesUserWrapper>
                                    <StylesTagWrapper>
                                        <StylesTag onClick={onTagClickSubmit} data-text="태그">#태그</StylesTag>
                                        <StylesTag onClick={onTagClickSubmit} data-text="태그">#태그</StylesTag>
                                    </StylesTagWrapper>
                                </Styles>
                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src="https://i0.codibook.net/files/1980071220075/2d55f946cdfb98/1120481683.jpg"/>
                                    </StylesImgWrapper>
                                    <StylesUserWrapper>
                                        <StylesUserImg src="https://i0.codibook.net/files/1980071220075/2d55f946cdfb98/1120481683.jpg"/>
                                        <StylesUserName>유저4</StylesUserName>
                                    </StylesUserWrapper>
                                    <StylesTagWrapper>
                                        <StylesTag onClick={onTagClickSubmit} data-text="태그">#태그</StylesTag>
                                        <StylesTag onClick={onTagClickSubmit} data-text="태그">#태그</StylesTag>
                                    </StylesTagWrapper>
                                </Styles>
                            </StylesWrapper>
                        </Left>
                        <Right>
                            <ProfileWrapper>
                                <ProfileText>My Profile</ProfileText>
                                <ProfileUserWrapper>
                                    <ProfileImg src={profileImage || "https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202304/07/kinolights/20230407081026931lbzg.jpg"}></ProfileImg>
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
                            <TradeText>
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