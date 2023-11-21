import {
    Wrapper, ConsentWrapper, Title, TitleWrapper,
    SubTitleWrapper, SubTitle, EmailAuthentication,
    ButtonWrapper,Bar, FindPw, GoLogin,
    IdWrapper, LetID
} from '../../../Login_mks/fashion/styles/BoardsfindId'

import {useState} from "react";

export default function BoardsLoginPage(){
    const onClickHome = () => {
        window.location.href = "https://www.google.com";
    }

    const refreshPage = () => {
        window.location.href="http://localhost:3000/boards/findId";
    }

    const goLogin=()=>{
        window.location.href="http://localhost:3000/boards/login";
    }

    const goFindPw=()=>{
        window.location.href="http://localhost:3000/boards/findPw";
    }

    return(
        <>
        <Wrapper>
            <TitleWrapper>
                <Title onClick={onClickHome}>
                    MOFY
                </Title>
            </TitleWrapper>
            <SubTitleWrapper>
                <SubTitle onClick={refreshPage}>
                    아이디찾기
                </SubTitle>
            </SubTitleWrapper>
            <ConsentWrapper>
                <EmailAuthentication>
                    고객님의 정보와 일치하는 아이디입니다.
                </EmailAuthentication>
                <IdWrapper>
                    <LetID>
                        아이디블라블라
                    </LetID>
                </IdWrapper>
            </ConsentWrapper>
            <ButtonWrapper>
                <GoLogin type="button" onClick={goLogin}>로그인하기</GoLogin>
                <Bar>|</Bar>
                <FindPw type="button" onClick={goFindPw}>비밀번호 찾기</FindPw>
            </ButtonWrapper>
        </Wrapper>
        </>
    )
}