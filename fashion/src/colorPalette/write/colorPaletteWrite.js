import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import * as S from "./colorPaletteStyles";
import {ImageBox} from "./colorPaletteStyles";
import { PlusOutlined } from '@ant-design/icons';
import { Input, Space, Tag, theme, Tooltip } from 'antd';
import Cookies from "js-cookie";

export default function ColorPaletteWrite(props){
    const router = useRouter()
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [reqData, setReqData] = useState([])

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')



    const [image, setImage] = useState(null)



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }



    const onClickSubmit = async () => {

        if (!image) {
            alert("사진을 업로드 하셔야 합니다!")
        }

        if (image) {

            const formData = new FormData();


            formData.append('before_image', image);


            const result = await axios.post("http://127.0.0.1:8000/Test/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${accessToken}`,
                },

            })
                .then(function (response) {
                    console.log(response.data);
                    alert("팔레트를 보여드릴게요!");
                    router.push(`/colorPalette/detail/`);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }



    return (
        <>
            <S.Wrapper>
                <S.Title>Color Palette</S.Title>

                

                <S.ImageWrapper>
                    <S.Label>사진첨부</S.Label>
               {/*     <S.ImageBox>
                        {fileUrls.map((el, index) => (
                            <Uploads01
                                key={uuidv4()}
                                index={index}
                                fileUrl={el}
                                onChangeFileUrls={onChangeFileUrls}
                            />
                        ))}
                    </S.ImageBox>*/}
                    <input type="file" onChange={handleImageChange} />

                </S.ImageWrapper>



                <S.ButtonWrapper>
                    <S.SubmitButton onClick={onClickSubmit}>팔레트</S.SubmitButton>
                </S.ButtonWrapper>
            </S.Wrapper>
        </>

    )



}
