import{Wrapper, TitleWrapper, GoLoginBtn,
    GoOptionBtn, ConsentWrapper, BtnWrapper,
    Title1, Title2, Title3, GoWriteBtn,
    GoSendMessageBtn, GoGetMessageBtn,
    BackBtn, ButtonWrapper

} from '../../styles/styles/Boardswelcome'

import {useState} from "react";

export default function MessageSelectPage(){
    const onClickGoLogin=()=>{
        window.location.href="http://localhost:3000/mks/login";
    }

    const onClickSelectStyle=()=>{
        window.location.href="http://localhost:3000/mks/signIn/selectYourstyle";
    }
    const onClickGoWirte=()=>{
        window.location.href="http://localhost:3000/mks/writeMessage";
    }
    const onClickGoSend=()=>{
        window.location.href="http://localhost:3000/mks/mySendMessage";
    }
    const onClickGoGet=()=>{
        window.location.href="http://localhost:3000/mks/myGetMessage";
    }

    const onClickMarket=()=>{
        window.location.href="http://localhost:3000/marketBoard/";
    }

    return(
        <>
            <Wrapper>
                <ConsentWrapper>
                    <TitleWrapper>
                        <Title1>MOFY</Title1>
                        <Title2>'s Message</Title2>
                    </TitleWrapper>
                    <BtnWrapper>
                        <GoWriteBtn onClick={onClickGoWirte}>
                            메세지 쓰러 가기
                        </GoWriteBtn>
                        <GoSendMessageBtn onClick={onClickGoSend}>
                            내가 보낸 메세지
                        </GoSendMessageBtn>
                        <GoGetMessageBtn onClick={onClickGoGet}>
                            내가 받은 메세지
                        </GoGetMessageBtn>
                    </BtnWrapper>
                    <BackBtn onClick={onClickMarket}>뒤로가기</BackBtn>
                </ConsentWrapper>
            </Wrapper>
        </>
    )
}