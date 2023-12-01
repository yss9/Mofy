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
    const [like_num, setLike_num] = useState(0)
    const [imageURL, setImageURL] = useState(null);
    const [tagList, setTagList] = useState([]);

    const [username, setUsername] = useState("");

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const [dataLoaded, setDataLoaded] = useState(false)
    const [deleteLoaded, setDeleteLoaded] = useState(false)
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
    const [isImgDataLoaded, setIsImgDataLoaded] = useState(false);

    const tagColors = ['processing', 'error', 'warning', 'default'];


    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
    }


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

            console.log("imageResponse.data")
            console.log(imageResponse.data)

            // 게시물 데이터 설정
            setTitle(imageResponse.data.title);
            setContent(imageResponse.data.content);
            setDatetime(imageResponse.data.datetime);
            setTagList(imageResponse.data.tags.split(',')); // 쉼표로 분할하여 배열로 설정
            setLike_num(imageResponse.data.like_num)
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

    }


    useEffect(() => {
        if (accessToken && !dataLoaded && !isUserDataLoaded) {
            fetchData();
        }
    }, [accessToken, dataLoaded, isUserDataLoaded])


    const handleLikeClick = async () => {
        try {
            // Update local state
            if (isLiked) {
                setLikes(likes - 1);
            } else {
                setLikes(likes + 1);
            }
            setIsLiked(!isLiked);

            // Make a POST request to the Django backend API endpoint
            const response = await axios.post(`http://127.0.0.1:8000/board/${boardID}/like/`, {
                boardID: boardID,

            }, axiosConfig);

            console.log(response.data);

        } catch (error) {
            console.error('Error updating like status', error);
        }
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
    }


    const onClickReport = async () => {

        const result = await axios.post(`http://127.0.0.1:8000/board/${boardID}/report/`, {
            boardID: boardID,

        }, axiosConfig)

            .then(function (response) {
                console.log(response.data);

                alert("신고접수가 성공적으로 완료되었습니다!")


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
                {tagList.map((tag, index) => (
                    <Tag key={index} color={tagColors[index % tagColors.length]}>
                        {tag}
                    </Tag>
                ))}




                <S.Body>
                    <S.Title>{title}</S.Title>
                    <S.Contents>{content}</S.Contents>
                    <S.ImageWrapper>{imageURL && <S.Image src={imageURL} alt="Fetched" />}</S.ImageWrapper>


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

