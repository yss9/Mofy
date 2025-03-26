import {
    Wrapper,
    Divide,
    Left,
    StylesWrapper,
    StylesText,
    Right,
    Styles,
    CommunityWrapper,
    ProfileWrapper,
    Bottom,
    TradeWrapper,
    Mid,
    WeatherWrapper,
    StylesImg,
    ConsentWrapper,
    StylesImgWrapper,
    StylesUserName,
    ProfileText,
    ProfileUserWrapper,
    ProfileName,
    ProfileImg,
    ProfileEdit,
    WeatherText,
    WeatherInfo,
    TradeText,
    CommunityText,
    WeatherImg,
    WeatherDetail,
    TemInfo,
    StylesRankNum,
    LoginWrapper,
    LoginText,
    LoginInput,
    Check,
    LoginButton,
    LoginOption, FindId, Bar, FindPw, SignIn
} from '../../styles/mainPageStyle'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MainCommunityList from "../../src/mainCommunityList/mainCommunityList";
import MainMarketBoardList from "../../src/mainMarketBordList/mainMarketBoardList"; // * 쿠키 import!
import { useRouter } from "next/router";
import TopComponent from "./component/top";
import { Reset } from 'styled-reset';

export default function MainCotainer() {
    const router = useRouter();
    const [weatherData, setWeatherData] = useState(null);

    const [username, setUsername] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const [boardID1, setBoardID1] = useState(0);
    const [boardID2, setBoardID2] = useState(0);
    const [boardID3, setBoardID3] = useState(0);
    const [boardID4, setBoardID4] = useState(0);

    const [reqData, setReqData] = useState([]);

    const [fullURL1, setFullURL1] = useState("");
    const [fullURL2, setFullURL2] = useState("");
    const [fullURL3, setFullURL3] = useState("");
    const [fullURL4, setFullURL4] = useState("");

    const [username1, setUsername1] = useState("");
    const [username2, setUsername2] = useState("");
    const [username3, setUsername3] = useState("");
    const [username4, setUsername4] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const accessToken = Cookies.get('access_token');

    const [id, setId]= useState("");
    const [pw, setPw] = useState("");

    const [idError, setIdError] = useState("");
    const [pwError, setPwError] = useState("");

    const onChangeId=(event)=>{
        setId(event.target.value)
        if(event.target.value !== ""){
            setIdError("")
        }
    }
    const onChangePw=(event) =>{
        setPw(event.target.value)
        if(event.target.value !== ""){
            setPwError("")
        }
    }
    const onClickLogin = () => {
        if (!id) {
            setIdError("아이디를 입력해주세요.");
        }
        if (!pw) {
            setPwError("비밀번호를 입력해주세요");
        }
        if (id && pw) {
            axios
                .post("http://localhost:8000/login/normal/", { userID: id, password: pw })
                .then((response) => {
                    if (response.data.success) {
                        // 로그인 성공 시 쿠키에 토큰 저장
                        Cookies.set("access_token", response.data.access_token, { expires: 7 });
                        Cookies.set("refresh_token", response.data.refresh_token, { expires: 7 });// 7일간 유지
                        alert("로그인 성공!");
                        window.location.href = "http://localhost:3000/mainPage";
                    } else {
                        alert("로그인 실패: " + response.data.error);
                    }
                })
                .catch((error) => {
                    console.error("API 호출 중 오류 발생:", error);
                });
        }
    }

    const onClickSignIn = () => {
        window.location.href = "http://localhost:3000/mks/signIn";
    }

    const onClickFindPw = () => {
        window.location.href="http://localhost:3000/mks/findPw";
    }

    const onClickFindId=()=>{
        window.location.href="http://localhost:3000/mks/findId";
    }

    const enterKeyPress = (event) => {
        if (event.key === 'Enter') {
            onClickLogin();
        }
    }

    useEffect(() => {
        const fetchToken = () => {
            if (!accessToken) {
                setIsLoggedIn(false);
            }
        }
        fetchToken();
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/search/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                console.log("태그")
                console.log(response.data)

            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        fetchData();
    }, [accessToken]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/stylerank/1/');
                console.log("rank1")
                console.log(response.data.image)
                console.log(response.data.boardID)
                console.log(response.data)
                console.log(response.data.usr_name)

                const tempFullURL = 'http://127.0.0.1:8000' + response.data.image;

                setFullURL1(tempFullURL);
                setBoardID1(response.data.boardID);
                setUsername1(response.data.usr_name);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/stylerank/2/');
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
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/stylerank/3/');
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
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/stylerank/4/');
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
    }, []);

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
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        fetchData();

    }, []);


    useEffect(() => {
        const fetchWeather = async () => {
            try {
                if ("geolocation" in navigator) {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });

                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    const apiKey = process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY;
                    console.log('apikey:',apiKey);
                    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

                    const response = await axios.get(apiUrl);
                    setWeatherData(response.data);
                } else {
                    console.error("Geolocation을 지원하지 않습니다.");
                }
            } catch (error) {
                console.error("날씨 정보를 가져오는 중 에러 발생:", error);
            }
        };

        fetchWeather();
    }, []);

    const [temperature, setTemperature] = useState(null);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        const fetchWeatherDetail = () => {
            if (weatherData && weatherData.main && weatherData.weather) {
                setTemperature(weatherData.main.temp.toFixed(2));
                setDescription(weatherData.weather[0].description);
            }
        }
        fetchWeatherDetail();
    }, [weatherData]);

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
    return (
        <>
            <Reset/>
            <Wrapper>
                <ConsentWrapper>
                    <TopComponent
                        setIsLoggedIn={setIsLoggedIn}
                        isLoggedIn={isLoggedIn}
                    />
                    <Divide/>
                    <Mid>
                        <Left>
                            <StylesWrapper>
                                <StylesText>Today's Mofy</StylesText>
                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src={fullURL1} onClick={onClickRank1}/>
                                    </StylesImgWrapper>
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
                            {isLoggedIn ? (
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
                                    <ProfileEdit onClick={()=>window.location.href = "http://localhost:3000/editPage"}>프로필 수정</ProfileEdit>
                                </ProfileWrapper>
                            ):(
                                <ProfileWrapper
                                    style={{height:'230px'}}
                                >
                                    <ProfileText>Login</ProfileText>

                                    <LoginWrapper>
                                        <LoginText>ID</LoginText>
                                        <LoginInput type="text" maxlength="11" size="44" placeholder="아이디" onChange={onChangeId} onKeyPress={enterKeyPress}></LoginInput>
                                        <Check>{idError}</Check>
                                    </LoginWrapper>
                                    <LoginWrapper>
                                        <LoginText>PW</LoginText>
                                        <LoginInput type="text " maxlength="11" size="44" placeholder="비밀번호" onChange={onChangePw} onKeyPress={enterKeyPress}></LoginInput>
                                        <Check>{pwError}</Check>
                                    </LoginWrapper>
                                    <LoginButton type="button" onClick={onClickLogin}>
                                        로그인
                                    </LoginButton>
                                    <LoginOption>
                                        <FindId type="button" onClick={onClickFindId}>아이디 찾기</FindId>
                                        <Bar>｜</Bar>
                                        <FindPw type="button" onClick={onClickFindPw}>비밀번호 찾기</FindPw>
                                        <Bar>｜</Bar>
                                        <SignIn type="button" onClick={onClickSignIn}>회원가입</SignIn>
                                    </LoginOption>
                                </ProfileWrapper>
                            )}

                            <WeatherText>Today's Weather</WeatherText>
                            {(temperature && description) ? (
                                <WeatherWrapper>
                                    <TemInfo>
                                        <WeatherImg src="https://cdn-icons-png.flaticon.com/512/4158/4158502.png"/>
                                        <WeatherDetail>{temperature}°C</WeatherDetail>
                                    </TemInfo>
                                    <WeatherInfo>
                                        <WeatherImg src="https://cdn-icons-png.flaticon.com/512/3942/3942043.png"/>
                                        <WeatherDetail>{description}</WeatherDetail>
                                    </WeatherInfo>
                                </WeatherWrapper>
                            ) : (
                                <WeatherWrapper style={{color:'grey'}}>위치 데이터를 불러오는 중...</WeatherWrapper>
                            )}


                        </Right>
                    </Mid>
                    <Bottom>
                        <CommunityWrapper>
                            <CommunityText onClick={()=>window.location.href = "http://localhost:3000/community"}>
                                Community 👪
                                <MainCommunityList/>
                            </CommunityText>
                        </CommunityWrapper>
                        <TradeWrapper>
                            <TradeText onClick={()=>window.location.href = "http://localhost:3000/marketBoard"}>
                                Market 🛒
                                <MainMarketBoardList/>
                            </TradeText>
                        </TradeWrapper>
                    </Bottom>
                </ConsentWrapper>
            </Wrapper>
        </>

    )
}