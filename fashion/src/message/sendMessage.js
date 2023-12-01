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
    Line,
} from "../../styles/styles/BoardsMessage";

export default function MySendMessage() {
    const [messages, setMessages] = useState([]);
    const accessToken = Cookies.get('access_token');

    const fetchMessages = async () => {
        try {
            const response = await axios.get("백엔드에서_메세지_목록을_가져올_엔드포인트_URL", {
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

    return (
        <>
            <Wrapper>
                <ConsentWrapper>
                    <TitleWrapper>
                        <Title>보낸 메세지함</Title>
                        <AddNoteButtonWrapper>
                            <AddNoteButton onClick={fetchMessages}>새로고침</AddNoteButton>
                        </AddNoteButtonWrapper>
                    </TitleWrapper>
                    <NoteList>
                        {messages.map((message, index) => (
                            <React.Fragment key={message.id}>
                                <NoteItem>{message.content}</NoteItem>
                                {index !== messages.length - 1 && <Line />}
                            </React.Fragment>
                        ))}
                    </NoteList>
                </ConsentWrapper>
            </Wrapper>
        </>
    );
}
