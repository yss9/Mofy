
import React, {useEffect} from 'react';
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { Flex, Input } from 'antd';
import Cookies from "js-cookie";
const { TextArea } = Input;
export default function BoardCommentWrite(){
    const router = useRouter()
    const {boardID} = router.query


    const [comment, setComment] = useState("")


    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')


    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type' : 'application/json'
        },
    }

    const onChangeComment = (event) => {
        setComment(event.target.value)

    }



    const onClickSubmit = async () => {
        const result = await axios.post(`http://127.0.0.1:8000/board/${boardID}/`, {
            comment: comment,
            userID: 1,
            boardID: boardID,
        }, axiosConfig)
            .then(function (response) {
                console.log(response.data.boardID);
                alert("댓글 등록이 정상적으로 완료되었습니다!(페이지를 나갔다 다시 들어오세요)")
                setComment("")




            })
            .catch(function (error) {
                console.log(error);
            });
    }








        return(
            <>

                    <TextArea
                        showCount
                        maxLength={100}
                        onChange={onChangeComment}
                        placeholder="댓글을 작성해주세요"
                        style={{
                            height: 200,
                            resize: 'none',
                            width: 800,
                            marginLeft:"300px"
                        }}
                    />
           {/*   내용: <input type="text" id= "comment" onChange={onChangeComment}/>*/}
                <button onClick={onClickSubmit}>작성하기</button>
            </>


        )



}