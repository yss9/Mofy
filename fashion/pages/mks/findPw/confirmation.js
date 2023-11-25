import {
    Wrapper, ConsentWrapper, Title, SubTitle,
    GetNumberButton, ForEmail, EmailIn, NameIn, Check,
    InputEmailWrapper, InputEmail, InputNameWrapper, InputName,
    EmailAuthentication, InputNumberWrapper, InputNumber,
    NextButton, NextButtonWrapper, TitleWrapper,
    CheckEmail, CheckNumber, Fix, SubTitleWrapper,
    Informing
} from '../../../styles/styles/BoardsfindId'

import {useState} from "react";
import axios from "axios";
axios.defaults.headers.post['Content-Type'] = 'application/json';


export default function BoardsLoginPage(){

    const[name, setName]= useState("");
    const[email, setEmail] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");


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

    const onClickNextArrow = () => {
        if (!name) {
            setNameError("이름을 입력해주세요.");
            return;
        }

        if (!email) {
            setEmailError("이메일을 입력해주세요.");
            return;
        }
        const resetUserId = sessionStorage.getItem('reset_user_id');
        axios.post("http://localhost:8000/reset_password/step2/", { reset_user_id: resetUserId, name: name, email: email })
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = "http://localhost:3000/mks/findPw/pwReset";
                    // 서버로부터 받은 데이터에는 reset_user_id가 있을 것으로 가정
                    const { reset_user_id } = response.data;
                    // reset_user_id를 세션에 저장
                    sessionStorage.setItem('reset_user_id', reset_user_id);
                } else {
                    console.error("이메일 및 이름 확인 실패");
                }
            })
            .catch((error) => {
                console.error("이메일 및 이름 확인 중 에러 발생", error);
            });
    };

    const onClickHome = () => {
        window.location.href = "https://www.google.com";
    }

    const refreshPage = () => {
        window.location.reload();
    }

    const enterKeyPress = (event) => {
       if (event.key === 'Enter') {
            onClickNextArrow()
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
                        비밀번호 찾기
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
                        <InputName type="text" maxLength={11} size="50" onChange={onChangeName} onKeyPress={enterKeyPress}/>
                    </InputNameWrapper>
                    <Fix>
                        <Check>{nameError}</Check>
                    </Fix>
                    <Fix>
                        <ForEmail>
                            <EmailIn>이메일</EmailIn>
                            <InputEmailWrapper>
                                <InputEmail type="text" maxLength={50} size="50" onChange={onChangeEmail} onKeyPress={enterKeyPress}/>
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