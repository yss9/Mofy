import React, { useEffect,useState } from "react";
import {
    Wrapper,
    ConsentWrapper,
    Title,
    TitleWrapper,
    NoteList,
    NoteItem,
    AddNoteButton, AddNoteButtonWrapper,
    Line, GoOutBtn,
} from '../../styles/styles/BoardsMessage'
import Cookies from "js-cookie";
import axios from "axios";

export default function BoardsNotePage() {
    const [message, setMessage] = useState([]);
    const accessToken = Cookies.get('access_token');

    const fetchMessage = async () => {
        try {
            const response = await axios.get("http://localhost:8000/message_box/2/", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setMessage(response.data);
        } catch (error) {
            console.error("서버 요청 오류:", error);
        }
    };

    const addNote = () => {
        fetchMessage();
    };

    useEffect(() => {
        if (accessToken) {
            fetchMessage();
        }
    }, [accessToken]);

    const onClickMarket = () => {
        window.location.href = "http://localhost:3000/marketBoard/"
    }

    return (
        <>
            <Wrapper>
                <ConsentWrapper>
                    <TitleWrapper>
                        <Title>받은 쪽지함</Title>
                        <AddNoteButtonWrapper>
                            <AddNoteButton onClick={addNote}>새로고침</AddNoteButton>
                            <GoOutBtn onClick={onClickMarket}>✕</GoOutBtn>
                        </AddNoteButtonWrapper>
                    </TitleWrapper>
                    <NoteList>
                        {message.map((message, index) => (
                            <React.Fragment key={message.id}>
                                <NoteItem>{message.sendID}</NoteItem>
                                <NoteItem>{message.message}</NoteItem>
                                {index !== message.length - 1 && <Line />}
                            </React.Fragment>
                        ))}
                    </NoteList>
                </ConsentWrapper>
            </Wrapper>
        </>
    );
}