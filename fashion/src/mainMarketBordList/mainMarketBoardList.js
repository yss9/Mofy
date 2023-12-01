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
                const response = await axios.get("http://127.0.0.1:8000/boardType/3/", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setReqData([...response.data]);
                console.log(response.data);
                setDataLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };

        if (accessToken && !dataLoaded) {
            fetchData();
        }
    }, [accessToken, dataLoaded]);



    const onClickMoveToBoardDetail = (event) => {
        router.push(`/community/${event.currentTarget.id}`);
        console.log(event.currentTarget.id);
    };

    return (
        <S.Wrapper>
            <S.TableTop />
            <S.Row>
                <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
                <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
                <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
                {/*<S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>*/}
                <S.ColumnHeaderBasic>가격</S.ColumnHeaderBasic>
                <S.ColumnHeaderBasic>판매상태</S.ColumnHeaderBasic>
            </S.Row>


            {reqData.map((el) => (
                <S.Row key={el.boardID}>
                    <S.ColumnTitle
                        id={el.boardID}
                        props={el}
                        onClick={onClickMoveToBoardDetail}
                    >
                        {el.title}
                    </S.ColumnTitle>
                    <S.ColumnBasic>{el.price}원</S.ColumnBasic>
                    <S.ColumnBasic>{el.state ? "판매중" : "판매완료"}</S.ColumnBasic>
                </S.Row>
            ))}

            <S.TableBottom/>

        </S.Wrapper>
    );
}
