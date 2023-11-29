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
    const [imageURL2, setImageURL2] = useState(null);
    const [imageURL3, setImageURL3] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data for the first image
                const imageResponse = await axios.get(`http://127.0.0.1:8000/Test/`);

                // Fetch data for the second image
                const imageResponse2 = await axios.get(`http://127.0.0.1:8000/Test/`); // Replace 'secondImage' with the actual endpoint for the second image

                // Fetch data for the third image
                const imageResponse3 = await axios.get(`http://127.0.0.1:8000/Test/`); // Replace 'thirdImage' with the actual endpoint for the third image

                // Process data for the first image
                const baseURL = 'http://127.0.0.1:8000';
                const fullURL = baseURL + imageResponse.data.before_image;
                const imageBlobResponse = await axios.get(fullURL, {
                    responseType: 'arraybuffer',
                })

                if (imageBlobResponse.status === 200) {
                    const contentType = imageBlobResponse.headers['content-type'];
                    const blob = new Blob([imageBlobResponse.data], {type: contentType});
                    const objectURL = URL.createObjectURL(blob);
                    setImageURL(objectURL);
                } else {
                    console.error('Failed to fetch first image');
                }

                // Process data for the second image
                const baseURL2 = 'http://127.0.0.1:8000';
                const fullURL2 = baseURL2 + imageResponse2.data.middle_image; // Replace 'secondImage' with the actual field name for the second image
                const imageBlobResponse2 = await axios.get(fullURL2, {
                    responseType: 'arraybuffer',
                })

                if (imageBlobResponse2.status === 200) {
                    const contentType2 = imageBlobResponse2.headers['content-type'];
                    const blob2 = new Blob([imageBlobResponse2.data], {type: contentType2});
                    const objectURL2 = URL.createObjectURL(blob2);
                    setImageURL2(objectURL2);
                } else {
                    console.error('Failed to fetch second image');
                }

                // Process data for the third image
                const baseURL3 = 'http://127.0.0.1:8000';
                const fullURL3 = baseURL3 + imageResponse3.data.result_image; // Replace 'thirdImage' with the actual field name for the third image
                const imageBlobResponse3 = await axios.get(fullURL3, {
                    responseType: 'arraybuffer',
                });

                if (imageBlobResponse3.status === 200) {
                    const contentType3 = imageBlobResponse3.headers['content-type'];
                    const blob3 = new Blob([imageBlobResponse3.data], {type: contentType3});
                    const objectURL3 = URL.createObjectURL(blob3);
                    setImageURL3(objectURL3);
                } else {
                    console.error('Failed to fetch third image');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Don't forget to call the fetchData function

    }, []); // Add dependencies if needed


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
                        <S.ImageWrapper>{imageURL && <S.Image src={imageURL} alt="Fetched"/>}</S.ImageWrapper>
                        <S.ImageWrapper>{imageURL2 && <S.Image src={imageURL2} alt="Fetched"/>}</S.ImageWrapper>
                        <S.ImageWrapper>{imageURL3 && <S.Image src={imageURL3} alt="Fetched"/>}</S.ImageWrapper>
                    </S.Body>
                </S.CardWrapper>

                <S.BottomWrapper>
                    <S.Button onClick={() => router.push("/styleBoard")}>목록으로</S.Button>
                </S.BottomWrapper>
            </S.Wrapper>
        )
    }

