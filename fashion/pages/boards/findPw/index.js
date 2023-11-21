import {Wrapper, ConsentWrapper, Title, SubTitle,
    Inform, InputId, InputIdWrapper, NextButton,
    AskId, IfDontRemember, FindId, NextButtonWrapper,
    Check, InputWrapper
} from '../../../Login_mks/fashion/styles/BoardsfindPw'

import {useState} from "react";

export default function BoardsLoginPage(){

    const[id, setId]= useState("");

    const[idError, setIdError] = useState("");

    const onChangeId=(event)=>{
        setId(event.target.value)
        if(event.target.value !== ""){
            setIdError("")
        }
    }
    const onClickNext = () => {
        if (!id) {
            setIdError("아이디를 입력해주세요.");
        }
        if (id) {
            window.location.href = "http://localhost:3000/boards/findPw/confirmation";
        }
    }
    const onClickHome = () => {
        window.location.href = "https://www.google.com";
    }

    const onClickFindId=()=>{
        window.location.href="http://localhost:3000/boards/findId";
    }

    return(
        <>
        <Wrapper>
            <ConsentWrapper>
                <Title onClick={onClickHome}>
                    MOFY
                </Title>
                <SubTitle>
                    My outfit of Yours
                </SubTitle>
                <Inform>
                    비밀번호를 찾고자하는 아이디를 입력해주세요.
                </Inform>
                <InputWrapper>
                    <InputIdWrapper>
                        <InputId type="text " maxlength="11" size="44" placeholder="아이디" onChange={onChangeId}/>
                    </InputIdWrapper>
                    <Check>
                        {idError}
                    </Check>
                </InputWrapper>
                <NextButtonWrapper>
                    <NextButton type="button" onClick={onClickNext}>
                        다음
                    </NextButton>
                </NextButtonWrapper>
                <AskId>
                    <IfDontRemember>
                        아이디가 기억나지 않는다면?
                    </IfDontRemember>
                    <FindId onClick={onClickFindId}>
                        아이디 찾기
                    </FindId>
                </AskId>
            </ConsentWrapper>
        </Wrapper>
        </>
    )

}