// 내 검색

import { useRouter } from "next/router";
import {useEffect, useState, useCallback} from "react";
import axios from "axios";
import * as S from "../community/list/CommunityList-styles";
import {FireFilledIcon, Searchbar, SearchbarInput} from "../community/searchbars/01/Searchbars01-styles";
import _ from "lodash";
import{v4 as uuidv4} from "uuid"
import {getDate} from "../commons/libraries/utils";
import Cookies from "js-cookie"

const SECRET = "!@#$";


export default function CommunityList() {


    const router = useRouter();



    const [reqData, setReqData] = useState([])
    const [keyword, setKeyword] = useState("")

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const[dataLoaded, setDataLoaded] = useState(false)

    const [recentSearch1, setRecentSearch1] = useState([null]);
    const [isRecentSearch1Loaded, setIsRecentSearch1Loaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => { // * 이건 get하면 계속 get 요청해서 컴터 힘들어해서 한번 get 되면 반복 안되도록 하는 코드인데

            try {
                const response = await axios.get('http://127.0.0.1:8000/boardType/1/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setReqData([...response.data])

                console.log(response.data);

                setDataLoaded(true);

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
                setRecentSearch1(response.data.search_history1);
                setRecentSearch2(response.data.search_history2);
                setRecentSearch3(response.data.search_history3);
                setRecentSearch4(response.data.search_history4);
                setRecentSearch5(response.data.search_history5);

                // * 이거도 위에 try문처럼 반복 방지를 위해 추가함미도
                setIsRecentSearch1Loaded(true);
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }
        };

        // * 원하는 get 요청을 다 했다면 그동안 try문마다 true로 바꿔줬던 is~ 변수를 (accessToken && !username && !is어쩌구 && ...) 이렇게 추가합니당
        if (accessToken && !isRecentSearch1Loaded && !setDataLoaded) {
            fetchData();
        }

        // * 여기에도 is~ 추가해주세용 여긴 ! 없움
    }, [accessToken, isRecentSearch1Loaded, dataLoaded]);


    useEffect(()=>{
        const fetchData = async () => {

            console.log("마운트가 완료되었디!")
            const result = await axios.get("http://127.0.0.1:8000/boardType/1/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                .then((response) => {
                    setReqData([...response.data])


                    console.log(response.data);

                    setDataLoaded(true)
                })
                .catch(function (error) {
                    console.log(error);
                });
            // const response = await axios.get('http://127.0.0.1:8000/search/history/', {
            //         headers: {
            //             Authorization: `Bearer ${accessToken}`,
            //         },
            //     })
            //     .then((response) => {
            //         setRecentSearch1(response.data.search_history1);
            //
            //
            //         console.log(response.data);
            //
            //         setDataLoaded(true)
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });

        }

        if(accessToken && !dataLoaded){
            fetchData()
        }


    },[accessToken, dataLoaded])



    const printValue = useCallback(
        _.debounce((value) => console.log(value), 500),
        []
    );

    const handleChange = (event) => {
        printValue(event.target.value);
        setKeyword(event.target.value);
    };


    const onClickMoveToBoardNew = () => {
        router.push("/community/new");
    }

    let eventData ;

    const onClickMoveToBoardDetail = (event) => {
        router.push(`/community/${event.target.id}`);
        console.log(event.target.id)


    };


    const onChangeKeyword = (value) => {
        setKeyword(value);
    };


    return (
        <S.Wrapper>
            <Searchbar>
                <FireFilledIcon />
                <SearchbarInput
                    placeholder="검색어를 입력해 주세요."
                    onChange={handleChange}
                />
            </Searchbar>

            커뮤니티

            <S.TableTop />
            <S.Row>
                <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
                {/*<S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>*/}
                <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
            </S.Row>


            {reqData.filter(el => el.title.includes(keyword)).map(el => (
                <S.Row key={el.boardID}>

                    <S.ColumnTitle id={el.boardID}  props = {eventData} onClick={onClickMoveToBoardDetail} >

                        {el.title
                            .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
                            .split(SECRET)
                            .map((el, index) => (
                                <S.TextToken key={uuidv4()} isMatched={keyword === el}>
                                    {el}
                                </S.TextToken>
                            ))}
                    </S.ColumnTitle>
                    <S.ColumnBasic>{getDate(el.datetime)}</S.ColumnBasic>
                </S.Row>

            ))}


            <S.TableBottom />
            <S.Footer>
                {/*  <Paginations01 refetch={props.refetch} count={props.count} />*/}
                <S.Button onClick={onClickMoveToBoardNew}>
                    {/*<S.PencilIcon src="/images/board/list/write.png" />*/}
                    게시물 등록하기
                </S.Button>
            </S.Footer>
        </S.Wrapper>
    );

}
