import {
    Wrapper, ConsentWrapper, Title, SubTitle,
     ForPwCheck, PwCheckIn, PwIn, PwErrorMsg,
     InputPw, InputPwCheckWrapper, InputPwCheck,
    Inform, InputPwWrapper,
    NextButton, NextButtonWrapper, TitleWrapper,
    PwCheckErrorMsg, Fix, SubTitleWrapper,

} from '../../../Login_mks/fashion/styles/BoardspwReset'

import {useState} from "react";

export default function BoardsLoginPage(){

    const [pw, setPw] = useState("");
    const [pwCheck, setPwCheck] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwCheckError, setPwCheckError] = useState("");

    const onChangePw = (event) => {
        setPw(event.target.value);
        if (event.target.value !== "") {
            setPwError("");
        }
    };

    const onChangePwCheck = (event) => {
        const newPasswordCheck = event.target.value;
        setPwCheck(newPasswordCheck);

        if (newPasswordCheck !== pw) {
            setPwCheckError("비밀번호가 일치하지 않습니다.");
        } else {
            setPwCheckError("");
        }
    };

    const onClickNextArrow = () => {
        if (!pw) {
            setPwError("비밀번호를 입력해주세요.");
        }
        if (!pwCheck) {
            setPwCheckError("비밀번호를 입력해주세요.");
        }
        if (pw !== pwCheck) {
            setPwCheckError("비밀번호가 일치하지 않습니다.");
        }
        if (pw && pwCheck && pw === pwCheck) {
            alert("비밀번호 재설정 완료");
            window.location.href = "http://localhost:3000/boards/login";
        }
        else{
            alert("모든 정보를 옳바르게 기입해 주세요.");
        }
    };

    const onClickHome = () => {
        window.location.href = "https://www.google.com";
    };

    const enterKeyPress = (event) => {
        if (event.key === 'Enter') {
            onClickNextArrow();
        }
    };

    return(
        <>
            <Wrapper>
                <TitleWrapper>
                    <Title onClick={onClickHome}>
                        MOFY
                    </Title>
                </TitleWrapper>
                <SubTitleWrapper>
                    <SubTitle>
                        비밀번호 재설정
                    </SubTitle>
                </SubTitleWrapper>
                <ConsentWrapper>
                    <Inform>
                        새로운 비밀번호를 입력해주세요.
                    </Inform>
                    <InputPwWrapper>
                        <PwIn>비밀번호</PwIn>
                        <InputPw type="password" maxLength={11} size="50" onChange={onChangePw} onKeyPress={enterKeyPress}/>
                    </InputPwWrapper>
                    <Fix>
                        <PwErrorMsg>{pwError}</PwErrorMsg>
                    </Fix>
                    <Fix>
                        <ForPwCheck>
                            <PwCheckIn>비밀번호 확인</PwCheckIn>
                            <InputPwCheckWrapper>
                                <InputPwCheck type="password" maxLength={50} size="50" onChange={onChangePwCheck} onKeyPress={enterKeyPress}/>
                            </InputPwCheckWrapper>
                        </ForPwCheck>
                        <PwCheckErrorMsg>{pwCheckError}</PwCheckErrorMsg>
                    </Fix>
                </ConsentWrapper>
                <NextButtonWrapper>
                    <NextButton type="arrow-button" onClick={onClickNextArrow}>
                        ➜
                    </NextButton>
                </NextButtonWrapper>
            </Wrapper>
        </>
    )
}