import React, { useState } from "react";
import {Wrapper, ConsentWrapper, Title, TitleWrapper,
    Text, TextWrapper,SendBtn, BtnWrapper

} from '../../../styles/styles/BoardsMessage'

export default function BoardsNotePage() {
    return(
        <>
            <Wrapper>
                <ConsentWrapper>
                    <TitleWrapper>
                        <Title>쪽지 보내기</Title>
                    </TitleWrapper>
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