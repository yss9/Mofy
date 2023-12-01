import { useRouter } from "next/router";
import {useEffect, useState, useCallback} from "react";
import axios from "axios";
import * as S from "./mainCommunityList-styles";
import {getDate} from "../../src/commons/libraries/utils";
import Cookies from "js-cookie"


export default function CommunityList() {
    const router = useRouter();

    const [reqData, setReqData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            console.log("마운트가 완료되었디!");
            try {
                const response = await axios.get("http://127.0.0.1:8000/boardType/1/");

                setReqData([...response.data]);
                console.log(response.data);

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
                <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
                <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
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
                    <S.ColumnBasic>{getDate(el.datetime)}</S.ColumnBasic>
                </S.Row>
            ))}

            <S.TableBottom />
        </S.Wrapper>
    );
}
