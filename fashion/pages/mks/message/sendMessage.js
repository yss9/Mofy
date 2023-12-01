import React, { useState } from "react";
import {
    Wrapper,
    ConsentWrapper,
    Title,
    TitleWrapper,
    NoteList,
    NoteItem,
    AddNoteButton, AddNoteButtonWrapper,
    Line,
} from '../../../styles/styles/BoardsMessage'

//권한추가, 메세지&내가쪽지보낸사람 백엔드에 올리는코드 추가해야뎀

export default function BoardsNotePage() {
    const [notes, setNotes] = useState([]);

    const addNote = () => {
        const newNote = {
            id: notes.length + 1,
            //userName: `사용자${notes.length + 1}`, // 사용자 이름 예시
            content: `쪽지 제목 ${notes.length + 1}`,
        };

        setNotes([...notes, newNote]);
    };

    return (
        <>
            <Wrapper>
                <ConsentWrapper>
                    <TitleWrapper>
                        <Title>보낸 쪽지함</Title>
                        <AddNoteButtonWrapper>
                            <AddNoteButton onClick={addNote}>새로고침</AddNoteButton>
                        </AddNoteButtonWrapper>
                    </TitleWrapper>
                    <NoteList>
                        {notes.map((note, index) => (
                            <React.Fragment key={note.id}>
                                <NoteItem>
                                    {note.content}
                                </NoteItem>
                                {index !== notes.length - 1 && <Line />}
                            </React.Fragment>
                        ))}
                    </NoteList>
                </ConsentWrapper>
            </Wrapper>
        </>
    );
}
