import { useRouter } from "next/router";
import {useEffect, useState, useCallback} from "react";
import axios from "axios";
import * as S from "../styleBoard/list/StyleBoardList-styles";
import {FireFilledIcon, Searchbar, SearchbarInput} from "../styleBoard/searchbars/01/Searchbars01-styles";
import * as M from "../marketBoard/list/MarketBoardList-styles";
import * as C from "../community/list/CommunityList-styles";
// import {FireFilledIcon, Searchbar, SearchbarInput} from "../marketBoard/searchbars/01/Searchbars01-styles";

import _ from "lodash";
import{v4 as uuidv4} from "uuid"
import {getDate} from "../commons/libraries/utils"
import Cookies from "js-cookie";
import {STitle, Divide} from "../../styles/mainPageStyle";

const SECRET = "!@#$";


export default function StyleBoardList() {


    const router = useRouter();



    const [reqData, setReqData] = useState([])
    const [keyword, setKeyword] = useState("")

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const[dataLoaded, setDataLoaded] = useState(false)

    const [recentSearch1, setRecentSearch1] = useState([null]);
    const [isRecentSearch1Loaded, setIsRecentSearch1Loaded] = useState(false);



    useEffect(()=>{
        const fetchData = async () => {

            console.log("마운트가 완료되었디!")
            const resultS = await axios.get("http://127.0.0.1:8000/boardType/2/", {
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
            const resultM = await axios.get("http://127.0.0.1:8000/boardType/3/", {
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
            const resultC = await axios.get("http://127.0.0.1:8000/boardType/1/", {
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

            const response = await axios.get('http://127.0.0.1:8000/search/history/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {



                    setKeyword(response.data[0].query);
                    setRecentSearch1(response.data[0].query);


                    console.log(response.data[0].query);

                    setDataLoaded(true)
                })
                .catch(function (error) {
                    console.log(error);
                });
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
    router.push("/styleBoard/new");
  }

  let eventData ;

  const onClickMoveToBoardDetail = (event) => {
    router.push(`/styleBoard/${event.target.id}`);
    console.log(event.target.id)


  };


  const onChangeKeyword = (value) => {
    setKeyword(value);
  };

  const onClickHome = () => {
      window.location.href = "http://localhost:3000/mainPage";
  }


    return (
        <>
            <STitle onClick={onClickHome} src="images/mofylogo.png"/>
            <Divide/>
            <S.Wrapper>
                <Searchbar>
                    <FireFilledIcon />
                    <SearchbarInput
                        placeholder={recentSearch1}
                        onChange={handleChange}
                    />
                </Searchbar>
                스타일보드

                <S.TableTop />
                <S.Row>
                    <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
                    <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
                    {/*<S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>*/}
                    <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
                </S.Row>


                {reqData.filter(el => el.title.includes(keyword)).map(el => (
                    <S.Row key={el.boardID}>

                        <S.ColumnBasic>{el.boardID}</S.ColumnBasic>
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
                {/*<S.Footer>*/}
                {/*    /!*  <Paginations01 refetch={props.refetch} count={props.count} />*!/*/}
                {/*    <S.Button onClick={onClickMoveToBoardNew}>*/}
                {/*        /!*<S.PencilIcon src="/images/board/list/write.png" />*!/*/}
                {/*        게시물 등록하기*/}
                {/*    </S.Button>*/}
                {/*</S.Footer>*/}
            </S.Wrapper>

            <C.Wrapper>
                {/*<Searchbar>*/}
                {/*    <FireFilledIcon />*/}
                {/*    <SearchbarInput*/}
                {/*        placeholder={recentSearch1}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*</Searchbar>*/}

                커뮤니티

                <C.TableTop />
                <C.Row>
                    <C.ColumnHeaderTitle>제목</C.ColumnHeaderTitle>
                    {/*<S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>*/}
                    <C.ColumnHeaderBasic>날짜</C.ColumnHeaderBasic>
                </C.Row>


                {reqData.filter(el => el.title.includes(keyword)).map(el => (
                    <C.Row key={el.boardID}>

                        <C.ColumnTitle id={el.boardID}  props = {eventData} onClick={onClickMoveToBoardDetail} >

                            {el.title
                                .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
                                .split(SECRET)
                                .map((el, index) => (
                                    <C.TextToken key={uuidv4()} isMatched={keyword === el}>
                                        {el}
                                    </C.TextToken>
                                ))}
                        </C.ColumnTitle>
                        <C.ColumnBasic>{getDate(el.datetime)}</C.ColumnBasic>
                    </C.Row>

                ))}


                <C.TableBottom />
                {/*<C.Footer>*/}
                {/*    /!*  <Paginations01 refetch={props.refetch} count={props.count} />*!/*/}
                {/*    <C.Button onClick={onClickMoveToBoardNew}>*/}
                {/*        /!*<S.PencilIcon src="/images/board/list/write.png" />*!/*/}
                {/*        게시물 등록하기*/}
                {/*    </C.Button>*/}
                {/*</C.Footer>*/}
            </C.Wrapper>

            <M.Wrapper>
                {/*<Searchbar>*/}
                {/*    <FireFilledIcon />*/}
                {/*    <SearchbarInput*/}
                {/*        placeholder={recentSearch1}*/}
                {/*        onChange={handleChange}*/}
                {/*    />*/}
                {/*</Searchbar>*/}
                중고마켓

                <M.TableTop />
                <M.Row>
                    <M.ColumnHeaderBasic>ID</M.ColumnHeaderBasic>
                    <M.ColumnHeaderBasic>날짜</M.ColumnHeaderBasic>
                    <M.ColumnHeaderTitle>제목</M.ColumnHeaderTitle>
                    {/*<M.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>*/}
                    <M.ColumnHeaderBasic>가격</M.ColumnHeaderBasic>
                    <M.ColumnHeaderBasic>판매상태</M.ColumnHeaderBasic>
                </M.Row>


                {reqData.filter(el => el.title.includes(keyword)).map(el => (
                    <M.Row key={el.boardID}>

                        <M.ColumnBasic>{el.boardID}</M.ColumnBasic>
                        <M.ColumnBasic>{getDate(el.datetime)}</M.ColumnBasic>
                        <M.ColumnTitle id={el.boardID}  props ={eventData} onClick={onClickMoveToBoardDetail} >

                            {el.title
                                .replaceAll(keyword, `${SECRET}${keyword}${SECRET}`)
                                .split(SECRET)
                                .map((el, index) => (
                                    <M.TextToken key={uuidv4()} isMatched={keyword === el}>
                                        {el}
                                    </M.TextToken>
                                ))}
                        </M.ColumnTitle>
                        <M.ColumnBasic>{el.price}원</M.ColumnBasic>
                        <M.ColumnBasic>{el.state ? "판매중" : "판매완료"}</M.ColumnBasic>
                    </M.Row>
                ))}


                <M.TableBottom />
                {/*<M.Footer>*/}
                {/*    /!*  <Paginations01 refetch={props.refetch} count={props.count} />*!/*/}
                {/*    <M.Button onClick={onClickMoveToBoardNew}>*/}
                {/*        /!*<S.PencilIcon src="/images/board/list/write.png" />*!/*/}
                {/*        판매글 올리기*/}
                {/*    </M.Button>*/}
                {/*</M.Footer>*/}
            </M.Wrapper>
        </>
    )

}
