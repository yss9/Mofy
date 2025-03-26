import { useRouter } from "next/router";
import * as S from "../detail/CommunityDetail-styles";
import axios from "axios";
import {useEffect, useState} from "react";
import {getDate} from "../../commons/libraries/utils";
import React from 'react';
import { Button } from 'antd';
import Cookies from "js-cookie"


export default function CommunityDetail() {

    const router = useRouter();

    const {boardID} = router.query

    //보드 타입
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [datetime, setDatetime] = useState(null)

    // 계정 타입
    const [username, setUsername] = useState("");
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
        try {
            // Fetch board data
            const boardResponse = await axios.get(`http://127.0.0.1:8000/board/${boardID}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const boardData = {
                title: boardResponse.data.title,
                content: boardResponse.data.content,
                datetime: boardResponse.data.datetime,
            };

            setTitle(boardData.title);
            setContent(boardData.content);
            setDatetime(boardData.datetime);
            setDataLoaded(true);

            // Fetch user data
            const userResponse = await axios.get('http://127.0.0.1:8000/userinfo/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setUsername(userResponse.data);
            setIsUserDataLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (accessToken && !dataLoaded && !isUserDataLoaded) {
            fetchData();
        }
    }, [accessToken, dataLoaded, isUserDataLoaded]);






    const onClickMoveToBoardEdit = () => {
        router.push(`/community/${boardID}/edit`);

    }


    const onClickBoardDelete = async () => {
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



    const onClickReport = async () => {

        const result = await axios.post(`http://127.0.0.1:8000/board/${boardID}/report/`, {
               boardID: boardID,

           }, axiosConfig)

               .then(function (response) {
                   console.log(response.data);

                   alert("신고접수가 정상적으로 완료되었습니다")


               })
               .catch(function (error) {
                   console.log(error);
               })

    }









    return (
        <S.Wrapper>
            <S.CardWrapper>
                <S.Header>
                    <S.AvatarWrapper>
                        {/*<S.Avatar src="/images/avatar.png" />*/}
                        <S.Info>
                            {/*<S.Writer>{props.data?.fetchBoard?.writer}</S.Writer>*/}
                            <S.Writer>{username.username}</S.Writer>
                            <S.CreatedAt>
                              {getDate(datetime)}
                            </S.CreatedAt>
                        </S.Info>
                    </S.AvatarWrapper>
                    <S.IconWrapper>
                        <Button danger onClick={onClickReport}>신고하기</Button>
                    </S.IconWrapper>
                </S.Header>
                <S.Body>
                    <S.Title>{title}</S.Title>
                    <S.Contents>{content}</S.Contents>
                </S.Body>
            </S.CardWrapper>
            <S.BottomWrapper>
                <S.Button onClick={() => router.push("/community")}>목록으로</S.Button>
                <S.Button onClick={onClickMoveToBoardEdit}>수정하기</S.Button>
                <S.Button onClick={onClickBoardDelete}>삭제하기</S.Button>
            </S.BottomWrapper>
        </S.Wrapper>
    )
}

