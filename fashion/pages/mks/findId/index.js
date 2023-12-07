import {
    Wrapper, ConsentWrapper, Title, SubTitle,
    GetNumberButton, ForEmail, EmailIn, NameIn, Check,
    InputEmailWrapper, InputEmail, InputNameWrapper, InputName,
    EmailAuthentication, InputNumberWrapper, InputNumber,
    NextButton, NextButtonWrapper, TitleWrapper,
    CheckEmail, CheckNumber, Fix, SubTitleWrapper,
    Informing
} from '../../../styles/styles/BoardsfindId';

import { useState } from "react";
import axios from "axios";

export default function BoardsFindIdPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const onChangeName = (event) => {
        setName(event.target.value);
        if (event.target.value !== "") {
            setNameError("");
        }
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
        if (event.target.value !== "") {
            setEmailError("");
        }
    }

    const onClickNextArrow = () => {
        if (!name) {
            setNameError("이름을 입력해주세요.");
        }
        if (!email) {
            setEmailError("이메일을 입력해주세요.");
        }
        if (name && email) {
            axios.post("http://127.0.0.1:8000/finduserID/", { name: name, email: email })
                .then((response) => {
                    // 서버에서 확인한 후의 로직
                    if (response.data.user_id) {
                        // 찾은 아이디를 localStorage에 저장
                        localStorage.setItem("foundUserId", response.data.user_id);
                        // getId 페이지로 이동
                        window.location.href = "http://localhost:3000/mks/findId/getId";
                    } else {
                        alert("유저 정보가 일치하지 않습니다.");
                    }
                })
                .catch((error) => {
                    // 에러 처리
                    console.error("에러 발생:", error);
                });
        }
    }

    const onClickHome = () => {
        window.location.href = "http://localhost:3000/mainPage";
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const enterKeyPress = (event) => {
        if (event.key === 'Enter') {
            onClickNextArrow();
        }
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
                        아이디 찾기
                    </SubTitle>
                </SubTitleWrapper>
                <ConsentWrapper>
                    <EmailAuthentication>
                        회원정보에 등록한 이메일로 인증
                    </EmailAuthentication>
                    <Informing>
                        본인확인 이메일 주소와 입력한 이메일 주소가 같아야 합니다.
                    </Informing>
                    <InputNameWrapper>
                        <NameIn>이름</NameIn>
                        <InputName type="text" maxLength={11} size="50" onChange={onChangeName} onKeyPress={enterKeyPress} />
                    </InputNameWrapper>
                    <Fix>
                        <Check>{nameError}</Check>
                    </Fix>
                    <Fix>
                        <ForEmail>
                            <EmailIn>이메일</EmailIn>
                            <InputEmailWrapper>
                                <InputEmail type="text" maxLength={50} size="50" onChange={onChangeEmail} onKeyPress={enterKeyPress} />
                            </InputEmailWrapper>
                        </ForEmail>
                        <CheckEmail>{emailError}</CheckEmail>
                    </Fix>
                </ConsentWrapper>
                <NextButtonWrapper>
                    <NextButton type="arrow-button" onClick={onClickNextArrow}>
                        ➜
                    </NextButton>
                </NextButtonWrapper>
            </Wrapper>
        </>
    );
}
