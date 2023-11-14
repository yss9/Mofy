import {
    Wrapper, Title, TopButton, Top, Divide,
    Left, StylesWrapper, StylesText, Right,
    Styles, CommunityWrapper, ProfileWrapper,
    Bottom, TradeWrapper, Mid, WeatherWrapper,
    StylesImg, SearchInput,
    StylesImgWrapper, StylesUserName, StylesUserImg,
    StylesUserWrapper, StylesTag, StylesTagWrapper,
    ProfileText, ProfileUserWrapper, ProfileName,
    ProfileImg, ProfileEdit, WeatherText,
    WeatherInfo, TradeText, CommunityText,
    WeatherImg, WeatherDetail, TemInfo,
    ModalContent, ModalWrapper, RecentSearchWrapper,
    RecentSearchButton, RecentSearchText,
    Rate, PopularSearchText, PopularSearchItems, TagText,
    TagButton, MoreTagButton, PopularSearchItemsWrapper,
    PopularSearchWrapper, TagButtonWrapper, TagWrapper
} from '../../styles/mainPageStyle'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import {WeatherApp} from './WeatherApp'

const onClickHome = () => {
    window.location.href = "http://localhost:3000/mainPage";
}
const onClickMyPage = () => {
    window.location.href = "http://localhost:3000/myPage";
}
const onClickEdit = () => {
    window.location.href = "http://localhost:3000/editPage";
}
const onTagClickSubmit = (event) => {
    const buttonText = event.target.getAttribute('data-text');
    window.location.href = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=" + encodeURIComponent(buttonText);
}
const API_KEY = '9ca687d0177634a47449391852d5e834';
const city = 'Seoul';
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
export default function BoardNewPage() {
    const [weatherData, setWeatherData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const onChangeSearch = (event) => {
        setSearch(event.target.value);
    }

    const onEnterSubmit = (event) => {
        if (event.key ==="Enter") {
            window.location.href = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=" + search;
        }
    }

    const onTagClickSubmit = (event) => {
        const buttonText = event.target.getAttribute('data-text');
        window.location.href = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=" + encodeURIComponent(buttonText);
    }
    //
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

                <Top>
                    <SearchInput onClick={openModal} type="text" placeholder="검색어를 입력하세요."></SearchInput>
                    {isModalOpen && (
                        <ModalWrapper onClick={closeModal}>
                            <ModalContent onClick={(e) => e.stopPropagation()}>
                                <RecentSearchWrapper>
                                    <RecentSearchText>최근검색어</RecentSearchText>
                                    <RecentSearchButton onClick={onTagClickSubmit} data-text="가을 원피스">가을 원피스</RecentSearchButton>
                                    <RecentSearchButton onClick={onTagClickSubmit} data-text="긴팔">긴팔</RecentSearchButton>
                                    <RecentSearchButton onClick={onTagClickSubmit} data-text="브라운 코디">브라운 코디</RecentSearchButton>
                                    <RecentSearchButton onClick={onTagClickSubmit} data-text="레이어드">레이어드</RecentSearchButton>
                                    <RecentSearchButton onClick={onTagClickSubmit} data-text="틴트">틴트</RecentSearchButton>
                                    <RecentSearchButton onClick={onTagClickSubmit} data-text="최근">최근</RecentSearchButton>
                                    <RecentSearchButton onClick={onTagClickSubmit} data-text="최근">최근</RecentSearchButton>
                                    <RecentSearchButton onClick={onTagClickSubmit} data-text="최근">최근</RecentSearchButton>
                                    <RecentSearchButton onClick={onTagClickSubmit} data-text="최근">최근</RecentSearchButton>
                                    <RecentSearchButton onClick={onTagClickSubmit} data-text="최근">최근</RecentSearchButton>
                                </RecentSearchWrapper>
                                <TagWrapper>
                                    <TagText>태그</TagText>
                                    <TagButtonWrapper>
                                        <TagButton onClick={onTagClickSubmit} data-text="가을">#가을</TagButton>
                                        <TagButton onClick={onTagClickSubmit} data-text="운동화">#운동화</TagButton>
                                        <TagButton onClick={onTagClickSubmit} data-text="후드">#후드</TagButton>
                                        <TagButton onClick={onTagClickSubmit} data-text="섀도우">#섀도우</TagButton>
                                        <TagButton onClick={onTagClickSubmit} data-text="여름쿨톤">#여름쿨톤</TagButton>
                                        <TagButton onClick={onTagClickSubmit} data-text="태그">#태그</TagButton>
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
                                        <PopularSearchItems onClick={onTagClickSubmit}>
                                            가을바지
                                        </PopularSearchItems>
                                    </PopularSearchItemsWrapper>
                                    <PopularSearchItemsWrapper>
                                        <Rate>2.</Rate>
                                        <PopularSearchItems onClick={onTagClickSubmit}>
                                            겨울옷
                                        </PopularSearchItems>
                                    </PopularSearchItemsWrapper>
                                    <PopularSearchItemsWrapper>
                                        <Rate>3.</Rate>
                                        <PopularSearchItems onClick={onTagClickSubmit}>
                                            부츠
                                        </PopularSearchItems>
                                    </PopularSearchItemsWrapper>
                                    <PopularSearchItemsWrapper>
                                        <Rate>4.</Rate>
                                        <PopularSearchItems onClick={onTagClickSubmit}>
                                            목티
                                        </PopularSearchItems>
                                    </PopularSearchItemsWrapper>
                                    <PopularSearchItemsWrapper>
                                        <Rate>5.</Rate>
                                        <PopularSearchItems onClick={onTagClickSubmit}>
                                            후리스
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
                    <TopButton>Log Out</TopButton>
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
                                    <StylesUserName>유저1</StylesUserName>
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
                                <ProfileImg src="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202304/07/kinolights/20230407081026931lbzg.jpg"/>
                                <ProfileName>MyName</ProfileName>
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
                        <CommunityText>Community</CommunityText>
                    </CommunityWrapper>
                    <TradeWrapper>
                        <TradeText>Used Trade</TradeText>
                    </TradeWrapper>
                </Bottom>

            </Wrapper>
        </>

    )
}
