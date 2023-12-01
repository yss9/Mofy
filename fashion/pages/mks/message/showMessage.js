import React, { useState } from "react";
import {Wrapper, ConsentWrapper, Title, TitleWrapper,
    Text, TextWrapper,SendBtn, BtnWrapper, SubtitleWrapper,
    SubTitle,

} from '../../../styles/styles/BoardsMessage'

export default function BoardsNotePage() {
    const onClickBack = () => {
        window.location.href = "http://localhost:3000/mks/message/sendMessage";
    }
    return(
        <>
            <Wrapper>
                <ConsentWrapper>
                    <SubtitleWrapper>
                        <SubTitle placeholder='제목'/>
                    </SubtitleWrapper>
                    <TextWrapper>
                        <Text placeholder="내용"></Text>
                    </TextWrapper>
                    <BtnWrapper>
                        <SendBtn onClick={onClickBack}>이전</SendBtn>
                    </BtnWrapper>
                </ConsentWrapper>
            </Wrapper>
        </>
    )
}