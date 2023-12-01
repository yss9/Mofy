import { useRouter } from "next/router";
import * as S from "../../src/community/detail/CommunityDetail-styles";
import axios from "axios";
import {useEffect, useState} from "react";
import React from 'react';
import Cookies from "js-cookie"


export default function ReportDetail() {
    const router = useRouter();

   // const {boardID} = router.query


    const [boardID, setBoardID] = useState(0)
    const [userID, setUserID] = useState(0)

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const[dataLoaded, setDataLoaded] = useState(false)
    const[deleteLoaded, setDeleteLoaded] = useState(false)
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type' : 'application/json'
        },
    }

    const fetchData = async () => {
            // Fetch board data
            const boardResponse = await axios.get("http://127.0.0.1:8000/board/1/report/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const boardData = {
                boardID: boardResponse.data.boardID,
                userID: boardResponse.data.userID
            };

            setBoardID(boardData.boardID)
        console.log(boardData.boardID)
            setUserID(boardData.userID)
        console.log(boardData.userID)
            setDataLoaded(true);


    }

    useEffect(() => {
        if (accessToken && !dataLoaded) {
            fetchData();
        }
    }, [accessToken, dataLoaded]);





  /*  const onClickBoardDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/board/${boardID}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log(response.data.boardID);
            router.push("/community/");
            alert("게시물 삭제가 정상적으로 완료되었습니다!");
            setDeleteLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };
*/











    return (
        <S.Wrapper>
            <S.CardWrapper>
                <S.Body>
                    <S.Title>{boardID}</S.Title>
                    <S.Contents>{userID}</S.Contents>
                </S.Body>
            </S.CardWrapper>
        </S.Wrapper>
    )
}

