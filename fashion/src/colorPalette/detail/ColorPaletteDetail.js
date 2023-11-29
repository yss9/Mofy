import { useRouter } from "next/router";
import * as S from "./ColorPaletteStyles";
import axios from "axios";
import {useEffect, useState} from "react";
import {getDate} from "../../commons/libraries/utils";
import React from 'react';
import { Tag, Button } from 'antd';



export default function ColorPaletteDetail() {
    const router = useRouter();

    const [imageURL, setImageURL] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 이미지 및 게시물 데이터를 병렬로 불러오기
                const imageResponse = await axios.get(`http://127.0.0.1:8000/Test/`)


                // 이미지 URL이 상대 경로로 저장되어 있으므로, 기본 URL과 결합하여 전체 URL 생성
                const baseURL = 'http://127.0.0.1:8000';
                const fullURL = baseURL + imageResponse.data.image;

                // 이미지를 불러오기
                const imageBlobResponse = await axios.get(fullURL, {
                    responseType: 'arraybuffer',
                });

                if (imageBlobResponse.status === 200) {
                    const contentType = imageBlobResponse.headers['content-type'];
                    const blob = new Blob([imageBlobResponse.data], { type: contentType });

                    // Blob 데이터를 URL.createObjectURL을 사용하여 이미지 URL로 변환
                    const objectURL = URL.createObjectURL(blob);
                    setImageURL(objectURL);
                } else {
                    console.error('Failed to fetch image');
                }


                console.log(imageResponse.data)





            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);








    return (
        <S.Wrapper>
            <S.CardWrapper>
                <S.Header>
                    <S.AvatarWrapper>
                        {/*<S.Avatar src="/images/avatar.png" />*/}
                        <S.Info>
                            {/*<S.Writer>{props.data?.fetchBoard?.writer}</S.Writer>*/}
                            <S.Writer>작성자</S.Writer>
                        </S.Info>
                    </S.AvatarWrapper>
                </S.Header>


                <S.Body>
                    <S.ImageWrapper>{imageURL && <S.Image src={imageURL} alt="Fetched" />}</S.ImageWrapper>
                </S.Body>
            </S.CardWrapper>

            <S.BottomWrapper>
                <S.Button onClick={() => router.push("/styleBoard")}>목록으로</S.Button>
            </S.BottomWrapper>
        </S.Wrapper>
    )
}

