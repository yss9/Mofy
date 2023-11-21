import {
    Wrapper, ConsentWrapper, Title, InputIdWrapper, InputId,
    InputPwWrapper, InputPw, FindId, FindPw, SignIn, Bar,
    LoginButton, SubTitle, Fordiv, Check, InputWrapper,
    TitleWrapper

} from '../../../styles/Boardslogin'

import {useState} from "react";

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
            alert("다음페이지로 넘어갑니다.");
            window.location.href = "https://www.google.com";
        }
    }

    const onClickSignIn = () => {
        window.location.href = "http://localhost:3000/boards/signIn";
    }

    const onClickHome = () => {
        window.location.href = "https://www.google.com";
    }

    const onClickFindPw = () => {
        window.location.href="http://localhost:3000/boards/findPw";
    }

    const onClickFindId=()=>{
        window.location.href="http://localhost:3000/boards/findId";
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
                <Title onClick={onClickHome} src="images/mofylogo.png"/>
                <InputWrapper>
                    <InputIdWrapper>
                        <InputId type="text " maxlength="11" size="44" placeholder="아이디" onChange={onChangeId} onKeyPress={enterKeyPress}/>
                        <Check>{idError}</Check>
                    </InputIdWrapper>
                    <InputPwWrapper>
                        <InputPw type="text " maxlength="11" size="44" placeholder="비밀번호" onChange={onChangePw} onKeyPress={enterKeyPress}/>
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