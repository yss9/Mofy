import {
    Wrapper, ConsentWrapper, Title, SubTitle,
    GetNumberButton, ForEmail, EmailIn, NameIn, Check,
    InputEmailWrapper, InputEmail, InputNameWrapper, InputName,
    EmailAuthentication, InputNumberWrapper, InputNumber,
    NextButton, NextButtonWrapper, TitleWrapper,
    CheckEmail, CheckNumber, Fix, SubTitleWrapper,
    Informing
} from '../../../Login_mks/fashion/styles/BoardsfindId'

import {useState} from "react";

export default function BoardsLoginPage(){

    const[name, setName]= useState("");
    const[email, setEmail] = useState("");
    const[number, setNumber] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [numberError, setNumberError] = useState("");


    const onChangeName=(event)=>{
        setName(event.target.value)
        if(event.target.value !== ""){
            setNameError("")
        }
    }
    const onChangeEmail=(event) =>{
        setEmail(event.target.value)
        if(event.target.value !== ""){
            setEmailError("")
        }
    }
    const onChangeNumber=(event)=>{
        setNumber(event.target.value)
        if(event.target.value)
            setNumberError("")
    }
    const onClickNextArrow = () => {
        if (!name) {
            setNameError("이름를 입력해주세요.");
        }
        if (!email) {
            setEmailError("이메일을 입력해주세요.");
        }
        if(!number) {
            setNumberError("인증번호를 입력해주세요.")
        }
        if (name && email && number) {
            alert("다음페이지로 넘어갑니다.");
            window.location.href = "http://localhost:3000/boards/findId/getId";
        }
    }

    const onClickGetNumber = () => {
        if (!email) {
            setEmailError("이메일을 입력해주세요.");
        } else {
            // 이메일이 입력되었을 때 인증번호를 받는 로직을 추가할 수 있습니다.
            // 여기에서 인증번호를 받는 API 호출 또는 다른 로직을 수행할 수 있습니다.
            // 이 예제에서는 임시로 alert를 사용하여 메시지를 표시합니다.
            alert("인증번호를 받습니다."); // 인증번호를 받는 로직을 여기에 추가하세요.
        }
    }
    const onClickHome = () => {
        window.location.href = "https://www.google.com";
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const enterKeyPress = (event) => {
        if (event.key === 'Enter') {
            onClickNextArrow();
        }
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
                    <InputName type="text " maxLength={11} size="50" onChange={onChangeName} onKeyPress={enterKeyPress}/>
                </InputNameWrapper>
                <Fix>
                    <Check>{nameError}</Check>
                </Fix>
                <Fix>
                    <ForEmail>
                        <EmailIn>이메일</EmailIn>
                        <InputEmailWrapper>
                            <InputEmail type="text " maxLength={50} size="50" onChange={onChangeEmail} onKeyPress={enterKeyPress}/>
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
    )
}