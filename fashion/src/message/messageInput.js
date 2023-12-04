import React, {useEffect, useState} from "react";
import {Wrapper, ConsentWrapper, Title, TitleWrapper,
    Text, TextWrapper,SendBtn, BtnWrapper, SubtitleWrapper,
    SubTitle, GoOutBtn
} from '../../styles/styles/BoardsMessage'
import axios from "axios";
import Cookies from "js-cookie";

//권한추가, 메세지&사용자 백엔드에 올리는코드 추가해야뎀
export default function MessageInput() {

    const[id, setId]= useState("");
    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");

    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/userinfo/', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setId(response.data);

                console.log("확인")
                console.log(response.data)

                setIsUserDataLoaded(true); // Set the flag to indicate that data has been loaded
            } catch (error) {
                console.error('서버 요청 오류:', error);
            }


        };

        if (accessToken && !id && !isUserDataLoaded) {
            fetchData();
        }
    }, [accessToken, id, isUserDataLoaded]);



    const handleSend = () => {
            // 전송할 데이터를 준비합니다.
        const data = {
            receiveID: recipient,
            message: message,
        };


        // 백엔드 엔드포인트로 POST 요청을 보냅니다.
        axios.post("http://localhost:8000/chat/", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                // 성공적으로 처리되었을 때의 작업, 예를 들어 성공 메시지 표시
                console.log("메시지 전송 성공:", response.data);

                alert("메시지가 성공적으로 전송되었습니다.");

                setRecipient("");
                setMessage("");
            })
            .catch((error) => {
                // 에러 처리, 예를 들어 에러 메시지 표시
                console.error("메시지 전송 중 오류:", error);
            });


    };
    const onClickMarket = () => {
        window.location.href = "http://localhost:3000/marketBoard/"
    }

    return(
        <>
            <Wrapper>
                <ConsentWrapper>
                    <TitleWrapper>
                        <Title>쪽지 보내기</Title>
                        <GoOutBtn onClick={onClickMarket}>✕</GoOutBtn>
                    </TitleWrapper>
                    <SubtitleWrapper>
                        <SubTitle
                            placeholder="받는사람(아이디를 입력해주세요)"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                        />
                    </SubtitleWrapper>
                    <TextWrapper>
                        <Text
                            placeholder="내용을 입력하세요."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </TextWrapper>
                    <BtnWrapper>
                        <SendBtn onClick={handleSend}>전송</SendBtn>
                    </BtnWrapper>
                </ConsentWrapper>
            </Wrapper>
        </>
    )
}