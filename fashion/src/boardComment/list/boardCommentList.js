import axios from "axios";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
//import CommentItem from "@/src/boardComment/list/CommentItem";
import React from 'react';
import { Card, Space } from 'antd';
import Cookies from "js-cookie";

export default function BoardCommentList(){
    const router = useRouter();

    const [reqData, setReqData] = useState([])


    const {boardID} = router.query

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')
    const [username, setUsername] = useState("");

    const [dataLoaded, setDataLoaded] = useState(false)
    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);


    const fetchData = async () => {
            console.log("마운트가 완료되었디!")
            axios
                .get(`http://127.0.0.1:8000/board/${boardID}/comment/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
                .then((response) => {
                    setReqData([...response.data])

                    console.log(response.data);

                    setDataLoaded(true)

                })
                .catch(function (error) {
                    console.log(error);
                });

            try{
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
        if(accessToken && !dataLoaded && !isUserDataLoaded){
            fetchData()
        }
    }, [accessToken, dataLoaded, isUserDataLoaded]);



  /*  const onClickCommentDelete = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/board/comment/${commentID}`, {
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
    };*/





    return(
        <div>
            {reqData?.map((el)=>(
                <div style={{marginTop:"50px",width:"800px", height:"100px", marginLeft:"300px"}}>
                    <Card title={username.username} size="small">
                        <p style={{margin:"10px"}}>{el.comment}</p>
                    </Card>
                   {/* <button>삭제하기</button>*/}
                </div>
            ))}
        </div>



   )
}