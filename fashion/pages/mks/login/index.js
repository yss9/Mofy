import {
    Wrapper, ConsentWrapper, Title, InputIdWrapper, InputId,
    InputPwWrapper, InputPw, FindId, FindPw, SignIn, Bar,
    LoginButton, SubTitle, Fordiv, Check, InputWrapper,
    TitleWrapper

} from '../../../styles/styles/Boardslogin'

import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie"
export default function BoardsLoginPage(){

    const[id, setId]= useState("");
    const[pw, setPw] = useState("");

    const[idError, setIdError] = useState("");
    const [pwError, setPwError] = useState("");

    const onChangeId=(event)=>{
        setId(event.target.value)
        if(event.target.value !== ""){
            setIdError("")
        }
    }
    const onChangePw=(event) =>{
        setPw(event.target.value)
        if(event.target.value !== ""){
            setPwError("")
        }
    }
    const onClickLogin = () => {
        if (!id) {
            setIdError("아이디를 입력해주세요.");
        }
        if (!pw) {
            setPwError("비밀번호를 입력해주세요");
        }
        if (id && pw) {
            axios
                .post("http://localhost:8000/login/normal/", { userID:id ,password: pw })
                .then((response) => {
                    if (response.data.success) {
                        // 로그인 성공 시 쿠키에 토큰 저장
                        Cookies.set("access_token", response.data.access_token, { expires: 7 });
                        Cookies.set("refresh_token", response.data.refresh_token, { expires: 7 });// 7일간 유지
                        alert("로그인 성공!");
                        window.location.href = "http://localhost:3000/hwj/mainPage";
                    } else {
                        alert("로그인 실패: " + response.data.error);
                    }
                })
                .catch((error) => {
                    console.error("API 호출 중 오류 발생:", error);
                });
        }
    }

    const onClickSignIn = () => {
        window.location.href = "http://localhost:3000/mks/signIn";
    }

    const onClickHome = () => {
        window.location.href = "https://www.google.com";
    }

    const onClickFindPw = () => {
        window.location.href="http://localhost:3000/mks/findPw";
    }

    const onClickFindId=()=>{
        window.location.href="http://localhost:3000/mks/findId";
    }

    const enterKeyPress = (event) => {
        if (event.key === 'Enter') {
            onClickLogin();
        }
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
                <InputWrapper>
                    <InputIdWrapper>
                        <InputId type="text " maxlength="11" size="44" placeholder="아이디" onChange={onChangeId} onKeyPress={enterKeyPress}/>
                        <Check>{idError}</Check>
                    </InputIdWrapper>
                    <InputPwWrapper>
                        <InputPw type="password" maxlength="11" size="44" placeholder="비밀번호" onChange={onChangePw} onKeyDown={enterKeyPress}/>
                        <Check>{pwError}</Check>
                    </InputPwWrapper>
                </InputWrapper>
                <LoginButton type="button" onClick={onClickLogin}>
                    로그인
                </LoginButton>
            </ConsentWrapper>
        </Wrapper>
            <FindId type="button" onClick={onClickFindId}>아이디 찾기</FindId>
            <Bar>｜</Bar>
            <FindPw type="button" onClick={onClickFindPw}>비밀번호 찾기</FindPw>
            <Bar>｜</Bar>
            <SignIn type="button" onClick={onClickSignIn}>회원가입</SignIn>
        </>
    )
}