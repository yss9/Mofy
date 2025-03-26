import {
    FashionBtn, MessageButton,
    ModalContent,
    ModalWrapper, PopularSearchItems, PopularSearchItemsWrapper, PopularSearchText, PopularSearchWrapper, Rate,
    RecentSearchButton,
    RecentSearchText,
    RecentSearchWrapper, RecommendSearchButton, RecommendSearchText, RecommendSearchWrapper,
    SearchInput, TagButton, TagButtonWrapper, TagText, TagWrapper, Title, Top, TopButton
} from "../../../styles/mainPageStyle";
import {Popover} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

const TopComponent = ({setIsLoggedIn, isLoggedIn}) => {
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState("");

    const handleLogout = () => {
        Cookies.remove('access_token');
        setIsLoggedIn(false);
        alert('로그아웃되었습니다.');
        window.location.reload();
    };

    useEffect(() => {
        const fetchData = async () => {
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
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
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
            } catch (error) {
                console.error('서버 요청! 오류:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async() => {
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
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        }
        fetchData();
    }, []);


    const renderSearchResults = (results) => {
        console.log("Rendering Search Results:", results);
    };
    const onTagClickSubmit = (event) => {
        const buttonText = event.target.getAttribute('data-text');

        axios.post("http://localhost:8000/search/", { query: buttonText }, axiosConfig)
            .then((response) => {
                if (response.data) { // * 데이터 가져오는거 성공하면

                    console.log("검색 결과:");
                    console.log(response.data);

                    renderSearchResults(response.data);

                    window.location.href = "http://localhost:3000/searchPage";
                } else {
                    console.error("검색 실패: " + response.data.message);
                }
            })
            .catch((error) => {
                console.error("API 호출 중 오류 발생:", error);
            });
    }

    const accessToken = Cookies.get('access_token');

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

            if (search.startsWith('#')) {
                axios.post("http://localhost:8000/search/", { query: search }, axiosConfig)
                    .then((response) => {
                        if (response.data) { // * 데이터 가져오는거 성공하면
                            console.log("검색 결과:");
                            console.log(response.data);
                            renderSearchResults(response.data);
                        } else {
                            console.error("검색 실패: " + response.data.message);
                        }
                    })
                    .catch((error) => {
                        console.error("검색 API 호출 중 오류 발생:", error);
                    });
            }

            else{
                axios.post("http://localhost:8000/search/", { query: search }, axiosConfig)
                    .then((response) => {
                        if (response.data) { // * 데이터 가져오는거 성공하면

                            console.log("검색 결과:");
                            console.log(response.data);

                            renderSearchResults(response.data);

                            navigate('/pageB', {
                                state: {
                                    recentSearch1: '서울 날씨',
                                },
                            });
                            window.location.href = "http://localhost:3000/searchPage";
                        } else {
                            console.error("검색 실패: " + response.data.message);
                        }
                    })
                    .catch((error) => {
                        console.error("검색 API 호출 중 오류 발생:", error);
                    });
            }

        }
    };
    return(
        <>
            <Top>

                <SearchInput
                    onClick={() => setIsModalOpen(true)}
                    onKeyPress={onEnterSubmit}
                    onChange={()=>setSearch(event.target.value)}
                    type="text" placeholder="검색어를 입력하세요."
                >

                </SearchInput>
                {isModalOpen && (
                    <ModalWrapper onClick={()=>setIsModalOpen(false)}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            {isLoggedIn ? (
                                <>
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
                                </>
                            ):(
                                <></>
                            )}
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
                            {isLoggedIn ? (
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
                            ):(
                                <></>
                            )}

                        </ModalContent>
                    </ModalWrapper>
                )}
                <Title onClick={()=>window.location.href = "http://localhost:3000/mainPage"} src="images/mofylogo.png"/>
                {isLoggedIn ? (
                    <>
                        <TopButton onClick={handleLogout}>Log Out</TopButton>
                        <TopButton onClick={()=>window.location.href = "http://localhost:3000/myPage"}>My Page</TopButton>
                    </>
                ) : (
                    <></>
                )}
                <Popover content="✨✨ 궁금해? 들어와보던가 ♡🌷💕" styles={{marginTop:"30px"}}>
                    <FashionBtn onClick={()=>window.location.href = "http://localhost:3000/styleBoard/"}>Fashion👚</FashionBtn>
                </Popover>
                {isLoggedIn ? (
                    <Popover content="🍎쪽지를 보내보세용🥕" styles={{marginTop:"10px"}}>
                        <MessageButton onClick={()=>window.location.href = "http://localhost:3000/mks/welcomeMessage"}>🐰💬🗨️🐱</MessageButton>
                    </Popover>
                ) : (
                    <></>
                )}

            </Top>
        </>
    );
}

export default TopComponent;