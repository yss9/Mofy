import {
    Wrapper, Title, TopButton, Top, Divide, Left, StylesWrapper, StylesText, Right,
    Styles, CommunityWrapper, ProfileWrapper, Bottom, TradeWrapper, Mid, WeatherWrapper,
    StylesImg, SearchInput, ConsentWrapper, StylesImgWrapper, StylesUserName, StylesUserImg,
    StylesUserWrapper, StylesTitle, StylesTagWrapper, ProfileText, ProfileUserWrapper, ProfileName,
    ProfileImg, ProfileEdit, WeatherText, WeatherInfo, TradeText, CommunityText,
    WeatherImg, WeatherDetail, TemInfo, ModalContent, ModalWrapper, RecentSearchWrapper,
    RecentSearchButton, RecentSearchText, Rate, PopularSearchText, PopularSearchItems, TagText,
    TagButton, MoreTagButton, PopularSearchItemsWrapper, PopularSearchWrapper, TagButtonWrapper,
    TagWrapper, RecommendSearchWrapper, RecommendSearchText, RecommendSearchButton
} from '../../styles/mainPageStyle'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import MainCommunityList from "../../src/mainCommunityList/mainCommunityList";
import MainMarketBoardList from "../../src/mainMarketBordList/mainMarketBoardList"; // * 쿠키 import!
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
    const [weatherData, setWeatherData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [username, setUsername] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImage1, setProfileImage1] = useState(null);
    const [rank1image, setRank1image] = useState(null);
    const [profileImage2, setProfileImage2] = useState(null);
    const [profileImage3, setProfileImage3] = useState(null);
    const [profileImage4, setProfileImage4] = useState(null);


    const [imageURL, setImageURL] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);

    const [rank1boardID, setRank1boardID] = useState(0);
    const [rank1title, setRank1title] = useState("");
    const [rank1userID, setRank1userID] = useState(0);
    // const [rank1image, setRank1image] = useState("");


    // const [rankboardID1, setRankboardID1] = useState(0);
    // const [rankboardID2, setRankboardID2] = useState(0);
    // const [rankboardID3, setRankboardID3] = useState(0);
    //
    // const [ranktitle1, setRanktitle1] = useState("");
    // const [ranktitle2, setRanktitle2] = useState("");
    // const [ranktitle3, setRanktitle3] = useState("");
    //
    // const [rankuserID1, setRankuserID1] = useState(0);
    // const [rankuserID2, setRankuserID2] = useState(0);
    // const [rankuserID3, setRankuserID3] = useState(0);

    const [rankimg1, setRankimg1] = useState("");
    const [rankimg2, setRankimg2] = useState("");
    const [rankimg3, setRankimg3] = useState("");

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

    const [styleRank1board, setStyleRank1board] = useState(0);
    const [styleRank1user, setStyleRank1user] = useState(null);
    const [styleRank2board, setStyleRank2board] = useState(null);
    const [styleRank2user, setStyleRank2user] = useState(null);
    const [styleRank3board, setStyleRank3board] = useState(null);
    const [styleRank3user, setStyleRank3user] = useState(null);
    const [styleRank4board, setStyleRank4board] = useState(null);
    const [styleRank4user, setStyleRank4user] = useState(null);
    const [styleRank1username, setStyleRank1username] = useState(null);
    const [styleRank2username, setStyleRank2username] = useState(null);
    const [styleRank3username, setStyleRank3username] = useState(null);
    const [styleRank4username, setStyleRank4username] = useState(null);
    const [styleRankBoards, setStyleRankBoards] = useState([null]);

    const [boardID1, setBoardID1] = useState(0);
    const [boardID2, setBoardID2] = useState(0);
    const [boardID3, setBoardID3] = useState(0);
    const [boardID4, setBoardID4] = useState(0);

    const [titleID1, setTitleID1] = useState(null);
    const [titleID2, setTitleID2] = useState(null);
    const [titleID3, setTitleID3] = useState(null);
    const [titleID4, setTitleID4] = useState(null);

    const [reqData, setReqData] = useState([]);

    // * 쿠키에 저장된 토큰 값(로그인 정보)을 써묵기 위해서 변수에 저장!
    // * 토큰 값은 로그인할때 아래 주석 코드대로 저장됩니당 (pages/mks/login/index.js에 가면 볼 수 있움)
    // * 우리는 로그인할때 저장된 내 id의 토큰값을 가지고 다니면서 이것저것 하기 위해서 토큰을 매 페이지마다 get해서 가져옵니당
    //Cookies.set("access_token", response.data.access_token, { expires: 7 });
    //Cookies.set("refresh_token", response.data.refresh_token, { expires: 7 });// 7일간 유지
    const accessToken = Cookies.get('access_token');

    // * refreshToken은 안쓰는데 머... 그냥 이것도 위에거랑 같이 넣기만 하심 됩니당
    const refreshToken = Cookies.get('refresh_token');


    const onClickImg1 = () => {
        window.location.href = `http://localhost:3000/styleBoard/${rank1boardID}`;
    }

    // * -------------------------------------------- DB에서 get하기 -----------------------------------------------


    // * get 요청이 반복되는걸 피하기 위해서 바로 밑에서 쓰이는 변수양 아래 주석에 설명 있움!
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
    // const [isStyleRankLoaded, setIsStyleRankLoaded] = useState(false);



    const fetchData = async () => {
        try {
            // 이미지 및 게시물 데이터를 병렬로 불러오기
            const imageResponse = await axios.get("http://127.0.0.1:8000/board/stylerank/1/", {
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

            console.log("imageResponse.data")
            console.log(imageResponse.data)


            setDataLoaded(true);

            // Fetch user data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

        useEffect(() => {
            if (accessToken && !dataLoaded) {
                fetchData();
            }
        }, [accessToken, dataLoaded])


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
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        fetchData();
    }, [accessToken]);



    //rank1boardID 가져오는 코드. 아래 두 useEffect가 해당됨
    useEffect(() => {
        console.log("board 값");
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/stylerank/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const temp1 = response.data[0].boardID;

                setRank1boardID(temp1);
                setRank1title(response.data[0].title);
                setRank1userID(response.data[0].userID);
                setIsRankLoaded(true);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        fetchData();
    }, [accessToken]);

// useEffect 내부에서 rank1boardID 값이 변경될 때마다 동작하는 코드 추가
    useEffect(() => {
        console.log('Rank1boardID:', rank1boardID);

        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log("board 값");
                console.log(response.data[0].boardID);
                console.log(rank1boardID);

                if (response.data[0].boardID === rank1boardID) {
                    console.log("5번");
                    console.log(response.data[0].image);

                    setRank1image(response.data[0].image);

                    // setRank1image 이후의 상태를 확인

                }
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };


        fetchData();
    }, [rank1boardID, accessToken]);
    console.log("6번");
    console.log(rank1image);




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/board/stylerank/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log("board 값");
                const temp1 = response.data[0].boardID;
                console.log(temp1);

                setRank1boardID(temp1);
                setRank1title(response.data[0].title);
                setRank1userID(response.data[0].userID);

                console.log(rank1boardID)

                // 여기서 추가: setRank1boardID가 완료된 후에 작업을 수행
                // 이제 rank1boardID 값이 업데이트된 것을 보장
                setIsRankLoaded(true);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }

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
            // try {
            //     const response = await axios.get('http://localhost:8000/board/stylerank', {
            //         headers: {
            //             Authorization: `Bearer ${accessToken}`,
            //         },
            //     });
            //
            //
            //
            //     // 변수 선언과 값 할당
            //     const boardID1 = response.data[0].boardID;
            //     const userID1 = response.data[0].userID;
            //     setBoardID1(boardID1);
            //
            //     const boardID2 = response.data[1].boardID;
            //     const userID2 = response.data[1].userID;
            //     setBoardID2(boardID2);
            //
            //     const boardID3 = response.data[2].boardID;
            //     const userID3 = response.data[2].userID;
            //     setBoardID3(boardID3);
            //
            //     const boardID4 = response.data[3].boardID;
            //     const userID4 = response.data[3].userID;
            //     setBoardID4(boardID4);
            //
            //     // 로그 출력
            //     console.log("스타일랭크 response.data[0].boardID:", boardID1);
            //     console.log("스타일랭크 response.data[0].userID:", userID1);
            //     console.log("스타일랭크 response.data[1].boardID:", boardID2);
            //     console.log("스타일랭크 response.data[1].userID:", userID2);
            //     console.log("스타일랭크 response.data[2].boardID:", boardID3);
            //     console.log("스타일랭크 response.data[2].userID:", userID3);
            //     console.log("스타일랭크 response.data[3].boardID:", boardID4);
            //     console.log("스타일랭크 response.data[3].userID:", userID4);
            // } catch (error) {
            //     console.error('서버 요청 오류:', error);
            // }

            // try {
            //     const response = await axios.get('http://127.0.0.1:8000/board/', {
            //         headers: {
            //             Authorization: `Bearer ${accessToken}`,
            //         },
            //     });
            //     setBoardID1(async prevBoardID1 => {
            //         console.log("boardID1")
            //         console.log(prevBoardID1);
            //         const targetBoard = response.data.find(board => board.boardID === prevBoardID1);
            //
            //         if (targetBoard) {
            //             await setTitleID1(targetBoard.title);
            //         } else {
            //             console.log(`보드 읽어오기 실패: 해당하는 boardID(${prevBoardID1})를 찾을 수 없습니다.`);
            //         }
            //
            //         return prevBoardID1;
            //     });
            //     setBoardID2(async prevBoardID2 => {
            //         console.log("boardID2")
            //         console.log(prevBoardID2);
            //         const targetBoard = response.data.find(board => board.boardID === prevBoardID2);
            //
            //         if (targetBoard) {
            //             await setTitleID2(targetBoard.title);
            //         } else {
            //             console.log(`보드 읽어오기 실패: 해당하는 boardID(${prevBoardID2})를 찾을 수 없습니다.`);
            //         }
            //         return prevBoardID2;
            //     });
            //     setBoardID3(async prevBoardID3 => {
            //         console.log("boardID3")
            //         console.log(prevBoardID3);
            //         const targetBoard = response.data.find(board => board.boardID === prevBoardID3);
            //
            //         if (targetBoard) {
            //             await setTitleID3(targetBoard.title);
            //         } else {
            //             console.log(`보드 읽어오기 실패: 해당하는 boardID(${prevBoardID3})를 찾을 수 없습니다.`);
            //         }
            //         return prevBoardID3;
            //     });
            //     setBoardID4(async prevBoardID4 => {
            //         console.log("boardID4")
            //         console.log(prevBoardID4);
            //         const targetBoard = response.data.find(board => board.boardID === prevBoardID4);
            //
            //         if (targetBoard) {
            //             await setTitleID4(targetBoard.title);
            //         } else {
            //             console.log(`보드 읽어오기 실패: 해당하는 boardID(${prevBoardID4})를 찾을 수 없습니다.`);
            //         }
            //         return prevBoardID4;
            //     });
            // } catch (error) {
            //     console.error('서버 요청 오류:', error);
            // }
            // try {
            //     const response = await axios.get('http://127.0.0.1:8000/board/', {
            //         headers: {
            //             Authorization: `Bearer ${accessToken}`,
            //         },
            //     });
            //     console.log("board 값")
            //     console.log(response.data[0].boardID)
            //     //
            //     // const setBoardTitle = async (prevBoardID, setTitleID) => {
            //     //     console.log(`boardID${prevBoardID}`);
            //     //     console.log(prevBoardID);
            //     //
            //     //     const targetBoard = response.data.find((board) => board.boardID === prevBoardID);
            //     //
            //     //     if (targetBoard) {
            //     //         await setTitleID(targetBoard.title);
            //     //     } else {
            //     //         console.log(`보드 읽어오기 실패: 해당하는 boardID(${prevBoardID})를 찾을 수 없습니다.`);
            //     //     }
            //     //
            //     //     return prevBoardID;
            //     // };
            //     //
            //     // setBoardID1(async (prevBoardID1) => await setBoardTitle(prevBoardID1, setTitleID1));
            //     // setBoardID2(async (prevBoardID2) => await setBoardTitle(prevBoardID2, setTitleID2));
            //     // setBoardID3(async (prevBoardID3) => await setBoardTitle(prevBoardID3, setTitleID3));
            //     // setBoardID4(async (prevBoardID4) => await setBoardTitle(prevBoardID4, setTitleID4));
            //     // console.log("뜨나?")
            //     // console.log(boardID1)
            // } catch (error) {
            //     console.error('서버 요청 오류:', error);
            // }

            try {
                const response = await axios.get('http://127.0.0.1:8000/board/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setBoardID1(async prevBoardID1 => {
                    console.log("boardID1")
                    console.log(prevBoardID1);
                    const targetBoard = response.data.find(board => board.boardID === prevBoardID1);

                    if (targetBoard) {
                        await setTitleID1(targetBoard.title);
                    } else {
                        console.log(`보드 읽어오기 실패: 해당하는 boardID(${prevBoardID1})를 찾을 수 없습니다.`);
                    }

                    return prevBoardID1;
                });
                setBoardID2(async prevBoardID2 => {
                    console.log("boardID2")
                    console.log(prevBoardID2);
                    const targetBoard = response.data.find(board => board.boardID === prevBoardID2);

                    if (targetBoard) {
                        await setTitleID2(targetBoard.title);
                    } else {
                        console.log(`보드 읽어오기 실패: 해당하는 boardID(${prevBoardID2})를 찾을 수 없습니다.`);
                    }
                    return prevBoardID2;
                });
                setBoardID3(async prevBoardID3 => {
                    console.log("boardID3")
                    console.log(prevBoardID3);
                    const targetBoard = response.data.find(board => board.boardID === prevBoardID3);

                    if (targetBoard) {
                        await setTitleID3(targetBoard.title);
                    } else {
                        console.log(`보드 읽어오기 실패: 해당하는 boardID(${prevBoardID3})를 찾을 수 없습니다.`);
                    }
                    return prevBoardID3;
                });
                setBoardID4(async prevBoardID4 => {
                    console.log("boardID4")
                    console.log(prevBoardID4);
                    const targetBoard = response.data.find(board => board.boardID === prevBoardID4);

                    if (targetBoard) {
                        await setTitleID4(targetBoard.title);
                    } else {
                        console.log(`보드 읽어오기 실패: 해당하는 boardID(${prevBoardID4})를 찾을 수 없습니다.`);
                    }
                    return prevBoardID4;
                });
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }






            try {
                const response = await axios.get(`http://127.0.0.1:8000/userinfo/?userID=${styleRank1user}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                // console.log(response.data.username)
                setStyleRank1username(response.data.username);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
            try {
                const response = await axios.get(`http://127.0.0.1:8000/userinfo/?userID=${styleRank2user}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                // console.log(response.data.username)
                setStyleRank2username(response.data.username);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
            try {
                const response = await axios.get(`http://127.0.0.1:8000/userinfo/?userID=${styleRank3user}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                // console.log(response.data.username)
                setStyleRank3username(response.data.username);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
            try {
                const response = await axios.get(`http://127.0.0.1:8000/userinfo/?userID=${styleRank4user}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                // console.log(response.data.username)
                setStyleRank4username(response.data.username);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }


            try {
                const imageResponse = await axios.get('http://127.0.0.1:8000/styleRank/1/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const baseURL = 'http://127.0.0.1:8000';
                const fullURL = baseURL + response.data.image;

                const imageBlobResponse = await axios.get(fullURL, {
                    responseType: 'arraybuffer',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log("사진가져오자");
                console.log(response.data);


                setProfileImage1(response.data.profile_image_url);
                setIsUserDataLoaded1(true);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
            // try {
            //     const response = await axios.get(`http://127.0.0.1:8000/styleBoard/${rank1boardID}`, {
            //         headers: {
            //             Authorization: `Bearer ${accessToken}`,
            //         },
            //     });
            //
            //     console.log("사진가져오자");
            //     console.log(response.data);
            //
            //
            //     // setProfileImage1(response.data.);
            //     setIsUserDataLoaded1(true);
            // } catch (error) {
            //     console.error('서버 요청 오류:', error);
            // }


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
    };

    const onTagClickSubmit = (event) => {
        const buttonText = event.target.getAttribute('data-text');
        console.log("Request URL:", "http://localhost:8000/search/");
        console.log("Request Data:", { query: buttonText });
        console.log("Request Headers:", axiosConfig.headers);

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
                {rankimg1}
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
                    </Top>
                    <Divide/>
                    <Mid>
                        <Left>
                            <StylesWrapper>
                                <StylesText>Today's Mofy</StylesText>

                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src={"https://vitnal.co.kr/web/product/big/202306/8406b7a565956a108ef183f93e8b6fbc.jpg"} />
                                    </StylesImgWrapper>
                                </Styles>
                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src={"https://cdn.imweb.me/upload/S201612025840bcf9c3866/4f56d1796c287.jpeg"}/>
                                    </StylesImgWrapper>
                                </Styles>
                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src="https://img.allurekorea.com/allure/2023/03/style_641ae6d429619-560x700.jpg"/>
                                    </StylesImgWrapper>
                                </Styles>
                                <Styles>
                                    <StylesImgWrapper>
                                        <StylesImg src="https://i0.codibook.net/files/1980071220075/2d55f946cdfb98/1120481683.jpg"/>
                                    </StylesImgWrapper>
                                </Styles>
                            </StylesWrapper>
                        </Left>
                        <Right>
                            <ProfileWrapper>
                                <ProfileText>My Profile</ProfileText>
                                <ProfileUserWrapper>
                                    <ProfileImg src={profileImage || "images/nothingImg.png"}></ProfileImg>
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