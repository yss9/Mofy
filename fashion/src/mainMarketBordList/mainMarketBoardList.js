import { useRouter } from "next/router";
import {useEffect, useState, useCallback} from "react";
import axios from "axios";
import * as S from "./mainMarketBoardList-styles";
import {getDate} from "../../src/commons/libraries/utils";
import Cookies from "js-cookie"


export default function MainMarketBoardList() {
    const router = useRouter();

    const [reqData, setReqData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchData = async () => {
            console.log("마운트가 완료되었디!");
            try {
                const response = await axios.get("http://127.0.0.1:8000/boardType/3/");

                setReqData([...response.data]);
                console.log(response.data);
                setDataLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, []);



    const onClickMoveToBoardDetail = (event) => {
        router.push(`/community/${event.currentTarget.id}`);
        console.log(event.currentTarget.id);
    };

    return (
        <S.Wrapper>
            <S.TableTop />
            <S.Row>
                <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
                <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
                {/*<S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>*/}
                <S.ColumnHeaderBasicm>가격</S.ColumnHeaderBasicm>
                <S.ColumnHeaderBasicp>판매상태</S.ColumnHeaderBasicp>
            </S.Row>


            {reqData.map((el) => (
                <S.Roww key={el.boardID}>
                    <S.ColumnBasic>{getDate(el.datetime)}</S.ColumnBasic>
                    <S.ColumnTitle
                        id={el.boardID}
                        props={el}
                        onClick={onClickMoveToBoardDetail}
                    >
                        {el.title}
                    </S.ColumnTitle>
                    <S.ColumnBasicm>{el.price}원</S.ColumnBasicm>
                    <S.ColumnBasicp>{el.state ? "판매중" : "판매완료"}</S.ColumnBasicp>
                </S.Roww>
            ))}

            <S.TableBottom/>

        </S.Wrapper>
    );
}
