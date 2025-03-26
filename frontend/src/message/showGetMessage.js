import React, { useState } from "react";
import {Wrapper, ConsentWrapper, Title, TitleWrapper,
    Text, TextWrapper,SendBtn, BtnWrapper, SubtitleWrapper,
    SubTitle, ViewText, ViewTitle

} from '../../styles/styles/BoardsMessage'

export default function ShowGetMessage() {
    const onClickBack = () => {
        window.location.href = "http://localhost:3000/mks/message/sendMessage";
    }
    return(
        <>
            <Wrapper>
                <ConsentWrapper>
                    <SubtitleWrapper>
                        보낸사람:
                        <ViewTitle>
                        </ViewTitle>
                    </SubtitleWrapper>
                    <TextWrapper>
                        <ViewText></ViewText>
                    </TextWrapper>
                    <BtnWrapper>
                        <SendBtn onClick={onClickBack}>이전</SendBtn>
                    </BtnWrapper>
                </ConsentWrapper>
            </Wrapper>
        </>
    )
}