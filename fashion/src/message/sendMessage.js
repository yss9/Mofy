import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
    Wrapper,
    ConsentWrapper,
    Title,
    TitleWrapper,
    NoteList,
    NoteItem,
    AddNoteButton,
    AddNoteButtonWrapper,
    Line, GoOutBtn, Imoticon, MySendMsgBtnWrapper, MySendMsgBtn, MyGetMsgBtnWrapper, MyGetMsgBtn, ButtonWrapper,
} from "../../styles/styles/BoardsMessage";

export default function MySendMessage() {
    const [messages, setMessages] = useState([]);
    const accessToken = Cookies.get('access_token');

    const fetchMessages = async () => {
        try {
            const response = await axios.get("http://localhost:8000/message_box/1/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setMessages(response.data);
        } catch (error) {
            console.error("서버 요청 오류:", error);
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchMessages();
        }
    }, [accessToken]);

    const onClickMarket = () => {
        window.location.href = "http://localhost:3000/marketBoard/"
    }
    const onClickWriteMsg = () => {
        window.location.href = "http://localhost:3000/mks/writeMessage"
    }
    const onClickGetMsg = () => {
        window.location.href = "http://localhost:3000/mks/myGetMessage"
    }

    return (
        <>
            <Wrapper>
                <ConsentWrapper>
                    <TitleWrapper>
                        <Title>보낸 메세지함</Title>
                        <AddNoteButtonWrapper>
                            <AddNoteButton onClick={fetchMessages}>새로고침</AddNoteButton>
                            <GoOutBtn onClick={onClickMarket}>✕</GoOutBtn>
                        </AddNoteButtonWrapper>
                    </TitleWrapper>
                    <NoteList>
                        {messages.map((message, index) => (
                            <React.Fragment key={message.id}>
                                <NoteItem>{message.message}</NoteItem>
                                {index !== messages.length - 1 && <Line />}
                            </React.Fragment>
                        ))}
                    </NoteList>
                </ConsentWrapper>
            </Wrapper>
            <ButtonWrapper>
                <Imoticon>✉</Imoticon>
                <MySendMsgBtnWrapper>
                    <MySendMsgBtn onClick={onClickWriteMsg}>메세지 쓰기</MySendMsgBtn>
                </MySendMsgBtnWrapper>
                <MyGetMsgBtnWrapper>
                    <MyGetMsgBtn onClick={onClickGetMsg}>받은 메세지</MyGetMsgBtn>
                </MyGetMsgBtnWrapper>
            </ButtonWrapper>
        </>
    );
}
