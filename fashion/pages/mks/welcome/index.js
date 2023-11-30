import{Wrapper, TitleWrapper, GoLoginBtn,
    GoOptionBtn, ConsentWrapper, BtnWrapper,
    Title1, Title2, Title3, Title12
    
} from '../../../styles/styles/Boardswelcome'

import {useState} from "react";

export default function BoardsWelcomePage(){
    const onClickGoLogin=()=>{
        window.location.href="http://localhost:3000/mks/login";
    }

    const onClickSelectStyle=()=>{
        window.location.href="http://localhost:3000/mks/signIn/selectYourstyle";
    }

    return(
        <>
        <Wrapper>
            <ConsentWrapper>
                <TitleWrapper>
                    <Title1>MOFY</Title1>
                    <Title2>의</Title2>
                    <Title3>가입을 환영합니다.</Title3>
                </TitleWrapper>
                <BtnWrapper>
                    <GoLoginBtn onClick={onClickGoLogin}>
                        로그인하러 가기
                    </GoLoginBtn>
                </BtnWrapper>
            </ConsentWrapper>
        </Wrapper>
        </>
    )
}