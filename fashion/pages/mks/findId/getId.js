import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Wrapper, ConsentWrapper, Title, TitleWrapper,
    SubTitleWrapper, SubTitle, EmailAuthentication,
    ButtonWrapper, Bar, FindPw, GoLogin,
    IdWrapper, LetID
} from '../../../styles/styles/BoardsfindId';

export default function BoardsFoundIdPage() {

    const [userId, setUserId] = useState("");

    useEffect(() => {
        // localStorage에서 foundUserId 불러와 설정
        const foundUserId = localStorage.getItem("foundUserId");
        setUserId(foundUserId || ""); // 없을 경우 빈 문자열 설정
    }, []);

    const onClickHome = () => {
        window.location.href = "http://localhost:3000/mainPage";
    }

    const refreshPage = () => {
        window.location.href = "http://localhost:3000/mks/findId";
    }

    const goLogin = () => {
        window.location.href = "http://localhost:3000/mks/login";
    }

    const goFindPw = () => {
        window.location.href = "http://localhost:3000/mks/findPw";
    }

    return (
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
                            {userId}
                        </LetID>
                    </IdWrapper>
                </ConsentWrapper>
                <ButtonWrapper>
                    <GoLogin type="button" onClick={goLogin}>
                        로그인하기
                    </GoLogin>
                    <Bar>|</Bar>
                    <FindPw type="button" onClick={goFindPw}>
                        비밀번호 찾기
                    </FindPw>
                </ButtonWrapper>
            </Wrapper>
        </>
    );
}
