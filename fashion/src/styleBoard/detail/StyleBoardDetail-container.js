import { useRouter } from "next/router";
import * as S from "./StyleBoardDetail-styles";
import axios from "axios";
import {useEffect, useState} from "react";
import {getDate} from "../../commons/libraries/utils";
import React from 'react';
import { Tag, Button } from 'antd';
import Cookies from "js-cookie";



export default function StyleBoardDetail() {
    const router = useRouter();

    const {boardID} = router.query



    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);


    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [datetime, setDatetime] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [tags, setTags] = useState("")
    const [username, setUsername] = useState("");

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const [dataLoaded, setDataLoaded] = useState(false)
    const [deleteLoaded, setDeleteLoaded] = useState(false)
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [isImgDataLoaded, setIsImgDataLoaded] = useState(false);




    const fetchData = async () => {
        try {
            // 이미지 및 게시물 데이터를 병렬로 불러오기
            const imageResponse = await axios.get(`http://127.0.0.1:8000/board/6/`, {
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

            console.log("imageResponse.data")
            console.log(imageResponse.data)

            // 게시물 데이터 설정
            setTitle(imageResponse.data.title);
            setContent(imageResponse.data.content);
            setDatetime(imageResponse.data.datetime);
            setTags(imageResponse.data.tags)
            setDataLoaded(true);

            // Fetch user data
            const userResponse = await axios.get('http://127.0.0.1:8000/userinfo/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setUsername(userResponse.data);
            setIsImgDataLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
                setDatetime(imageResponse.data.datetime);
                setTags(imageResponse.data.tags)
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

    }




    useEffect(() => {
    if (accessToken && !dataLoaded && !isUserDataLoaded) {
        fetchData();
    }
}, [accessToken, dataLoaded, isUserDataLoaded])




    const handleLikeClick = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }

        setIsLiked(!isLiked);
    }




    const onClickMoveToBoardEdit = () => {
        router.push(`/styleBoard/${boardID}/edit`);

    }



    const onClickBoardDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/board/${boardID}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log(response.data.boardID);
            router.push("/styleBoard/");
            alert("게시물 삭제가 정상적으로 완료되었습니다!");
            setDeleteLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };




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
                </S.Header>
                        <Tag color="success">{tags? tags:"없음"}</Tag>


               {/*         <Tag color="processing">데이트룩</Tag>
                        <Tag color="error">꽃놀이</Tag>
                        <Tag color="warning">warning</Tag>
                        <Tag color="default">default</Tag>
*/}

                <S.Body>
                    <S.Title>{title}</S.Title>
                    <S.Contents>{content}</S.Contents>
                    <S.Contents>{tags}</S.Contents>
                    <S.ImageWrapper>{imageURL && <S.Image src={imageURL} alt="Fetched" />}</S.ImageWrapper>
                    <p>{likes} 좋아요</p>
                    <Button type="primary" danger onClick={handleLikeClick}>
                        {isLiked ? '좋아요 취소' : '스타일 좋아요!'}
                    </Button>
                </S.Body>
            </S.CardWrapper>

            <S.BottomWrapper>
                <S.Button onClick={() => router.push("/styleBoard")}>목록으로</S.Button>
                <S.Button onClick={onClickMoveToBoardEdit}>수정하기</S.Button>
                <S.Button onClick={onClickBoardDelete}>삭제하기</S.Button>
            </S.BottomWrapper>
        </S.Wrapper>
    )
}

