import {Wrapper, ConsentWrapper, Title, SubTitle,
    Inform, InputId, InputIdWrapper, NextButton,
    AskId, IfDontRemember, FindId, NextButtonWrapper,
    Check, InputWrapper, TitleWrapper, TitleWrapperWrapper
} from '../../../styles/styles/BoardsfindPw'

import {useState} from "react";
import axios from "axios";


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
            return;
        }

        axios.post("http://localhost:8000/reset_password/step1/", { userID: id })
            .then((response) => {
                console.log('Server response:', response.data);
                // 서버로부터 받은 데이터에는 reset_user_id가 있을 것으로 가정
                const { reset_user_id } = response.data;
                // reset_user_id를 세션에 저장
                sessionStorage.setItem('reset_user_id', reset_user_id);
                if (response.status === 200) {
                    window.location.href = "http://localhost:3000/mks/findPw/confirmation";
                } else {
                    console.error("비밀번호 재설정 요청 실패");
                }
            })
            .catch((error) => {
                console.error("비밀번호 재설정 요청 중 에러 발생", error);
                alert("해당 아이디에 부합하는 계정이 없습니다. 다시 확인해주세요.");
            });
    };

    const onClickHome = () => {
        window.location.href = "https://www.google.com";
    }

    const onClickFindId=()=>{
        window.location.href="http://localhost:3000/mks/findId";
    }

    return(
        <>
        <Wrapper>
            <ConsentWrapper>
                <TitleWrapperWrapper>
                    <TitleWrapper>
                        <Title onClick={onClickHome}>
                            MOFY
                        </Title>
                    </TitleWrapper>
                </TitleWrapperWrapper>
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
