import React, { useState } from "react";
import {Wrapper, ConsentWrapper, Title, TitleWrapper,
    Text, TextWrapper,SendBtn, BtnWrapper, SubtitleWrapper,
    SubTitle,

} from '../../../styles/styles/BoardsMessage'

//권한추가, 메세지&사용자 백엔드에 올리는코드 추가해야뎀
export default function BoardsNotePage() {
    /*const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSend = async () => {
        try {
            // 여기에 사용자 아이디와 게시글 작성자 아이디를 가져오는 로직 추가
            const myUserId = "내 아이디"; // 예시: 실제로 사용할 사용자 아이디로 변경
            const postAuthorUserId = "게시글 작성자 아이디"; // 예시: 실제로 사용할 게시글 작성자 아이디로 변경

            // 서버로 전송할 데이터 구성
            const data = {
                title,
                content,
                myUserId,
                postAuthorUserId,
            };

            // Axios를 사용하여 서버로 데이터 전송
            const response = await axios.post("/api/sendMessage", data);

            // 서버 응답에 따른 작업 수행 (예: 성공 메시지 출력, 리다이렉션 등)
            console.log(response.data);
        } catch (error) {
            console.error("전송 오류:", error);
        }
    };*/

    return(
        <>
            <Wrapper>
                <ConsentWrapper>
                    <TitleWrapper>
                        <Title>쪽지 보내기</Title>
                    </TitleWrapper>
                    <SubtitleWrapper>
                        <SubTitle placeholder='제목'/>
                    </SubtitleWrapper>
                    <TextWrapper>
                        <Text placeholder="내용을 입력하세요."></Text>
                    </TextWrapper>
                    <BtnWrapper>
                        <SendBtn>전송</SendBtn>
                    </BtnWrapper>
                </ConsentWrapper>
            </Wrapper>
        </>
    )
}