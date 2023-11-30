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

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [datetime, setDatetime] = useState(null)

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const[dataLoaded, setDataLoaded] = useState(false)
    const[deleteLoaded, setDeleteLoaded] = useState(false)

    useEffect(()=>{

        const fetchData = async () => {

            const result = axios.get(`http://127.0.0.1:8000/board/${boardID}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                .then((response) => {
                    const data = {
                        title: response.data.title,
                        content: response.data.content,
                        datetime: response.data.datetime,
                    }

                    setTitle(response.data.title)
                    setContent(response.data.content)
                    setDatetime(response.data.datetime)

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





    const onClickMoveToBoardEdit = () => {
        router.push(`/community/${boardID}/edit`);

    }


    const onClickBoardDelete = () => {
        const fetchData = async () => {

            const result = await axios.delete(`http://127.0.0.1:8000/board/${boardID}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            .then(function (response) {
                console.log(response.data.boardID);
                router.push("/community/");

                alert("게시물 삭제가 정상적으로 완료되었습니다!")

                setDeleteLoaded(true)


            })
            .catch(function (error) {
                console.log(error);
            })
        }

        if(accessToken && !deleteLoaded){
            fetchData()
        }

    }


   const onClickReport = async () => {

        const result = await axios.post(`http://127.0.0.1:8000/board/${boardID}/report`, {
               boardID: boardID,
               userID:1,

           })
               .then(function (response) {
                   console.log(response.data);

                   alert("신고접수가 완료되었습니다!")


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
                            <S.Writer>작성자</S.Writer>
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

