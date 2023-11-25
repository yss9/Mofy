import {
    InputFootSize,
    InputFootSizeWrapper,
    InputHeight,
    InputHeightWrapper, InputWeight, InputWeightWrapper,
    Line,
    Title,
    TitleWrapper, Wrapper, ConsentWrapper,
    InputWrapper, NextButton, NextButtonWrapper, JumpButton, SubTitle, SubTitleWrapper

} from '../../../styles/styles/BoardsselectYours'

import {useState} from "react";

export default function BoardsLoginPage() {
    const onClickNext = () => {
        window.location.href = "http://localhost:3000/mks/signIn/selectYours";
    }


    return(
        <>
        <Wrapper>
            <SubTitleWrapper>
                <SubTitle>
                    MOFY
                </SubTitle>
            </SubTitleWrapper>
            <ConsentWrapper>
                <TitleWrapper>
                    <Title>
                        회원님의 정보를 알려주세요!
                    </Title>
                    <Line>
                    </Line>
                </TitleWrapper>
                <InputWrapper>
                    <InputHeightWrapper>
                        키 :
                        <InputHeight/>
                        cm
                    </InputHeightWrapper>
                    <InputWeightWrapper>
                        몸무게 :
                        <InputWeight/>
                        kg
                    </InputWeightWrapper>
                    <InputFootSizeWrapper>
                        발사이즈 :
                        <InputFootSize/>
                        mm
                    </InputFootSizeWrapper>
                </InputWrapper>
            </ConsentWrapper>
            <NextButtonWrapper>
                <NextButton type="arrow-button" onClick={onClickNext}>
                    ➜
                </NextButton>
            </NextButtonWrapper>
            <JumpButton onClick={onClickNext}>
                건너뛰기
            </JumpButton>
        </Wrapper>
        </>
    )
}