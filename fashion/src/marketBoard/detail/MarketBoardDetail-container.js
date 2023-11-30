import { useRouter } from "next/router";
//import BoardDetailUI from "./CommunityDetail-presenter";
import * as S from "./MarketBoardDetail-styles";
import axios from "axios";
import {useEffect, useState} from "react";
import {getDate} from "../../commons/libraries/utils";
import { CommentOutlined } from '@ant-design/icons';
import React from 'react';
import { FloatButton , Button, Popover} from 'antd';
import Chat from '../../../pages/mks/messenger/chat';
import Cookies from "js-cookie";


export default function MarketBoardDetail() {
    const router = useRouter();

    const {boardID} = router.query

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [datetime, setDatetime] = useState(null)
    const [price, setPrice] = useState(0)
    const [state, setState] = useState(false)
    const [imageURL, setImageURL] = useState(null);
    const [address, setAddress] = useState("")

    const [username, setUsername] = useState("");

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const [dataLoaded, setDataLoaded] = useState(false)
    const [deleteLoaded, setDeleteLoaded] = useState(false)
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);


    const [showChat, setShowChat] = useState(false);


    const fetchData = async () => {
        try {
            // 이미지 및 게시물 데이터를 병렬로 불러오기
            const imageResponse = await axios.get(`http://127.0.0.1:8000/board/${boardID}/`, {
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


            console.log(imageResponse.data)

            // 게시물 데이터 설정
            setTitle(imageResponse.data.title);
            setContent(imageResponse.data.content);
            setPrice(imageResponse.data.price);
            setState(imageResponse.data.state);
            setDatetime(imageResponse.data.datetime);
            setAddress(imageResponse.data.address)

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

    }




    useEffect(() => {
        if (accessToken && !dataLoaded && !isUserDataLoaded) {
            fetchData();
        }
    }, [accessToken, dataLoaded, isUserDataLoaded])





    const onClickChatPage = () =>{
        window.location.href = "http://localhost:3000/mks/messenger/chat";
    }


    const onClickBoardDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/board/${boardID}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log(response.data.boardID);
            router.push("/marketBoard/");
            alert("게시물 삭제가 정상적으로 완료되었습니다!");
            setDeleteLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };




    const onClickMoveToBoardEdit = () => {
        router.push(`/marketBoard/${boardID}/edit`);

    }

    const toggleChat = () => {
        setShowChat(!showChat);
    };


    return (
        <S.Wrapper>
            <S.CardWrapper>
                <S.Header>
                    <S.AvatarWrapper>
                        {/*<S.Avatar src="/images/avatar.png" />*/}
                        <S.Info>
                            <S.Writer>{username.username}</S.Writer>
                            <S.CreatedAt>
                              {getDate(datetime)}
                            </S.CreatedAt>
                            <S.Writer>{state? "판매중" : "판매완료"}</S.Writer>
                        </S.Info>
                    </S.AvatarWrapper>
                    <S.IconWrapper>
                        <Popover content={address? address:"사용자가 위치설정을 하지 않았어요"} title="위치">
                            <Button type="primary">여기서 만나요!</Button>
                        </Popover>
                    </S.IconWrapper>
                </S.Header>
                <S.Body>
                    <S.Title>{title}</S.Title>
                    <S.Contents>{price}원</S.Contents>
                    <S.Contents>{content}</S.Contents>
                    <S.ImageWrapper>{imageURL && <S.Image src={imageURL} alt="Fetched" />}</S.ImageWrapper>
                </S.Body>
            </S.CardWrapper>
            <S.BottomWrapper>
                <S.Button onClick={() => router.push("/marketBoard")}>목록으로</S.Button>
                <S.Button onClick={onClickMoveToBoardEdit}>수정하기</S.Button>
                <S.Button onClick={onClickBoardDelete}>삭제하기</S.Button>

                    <FloatButton icon={<CommentOutlined />} onClick={toggleChat} />
                    {showChat && <Chat />}

            </S.BottomWrapper>
        </S.Wrapper>
    )
}

