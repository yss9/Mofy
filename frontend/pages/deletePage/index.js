import {
    Wrapper, Title, ButtonWrapper,
    Warning, YesButton, NoButton, Ment
} from '../../styles/deletePageStyle'
import axios from "axios";
import Cookies from "js-cookie";

const accessToken = Cookies.get('access_token');
const refreshToken = Cookies.get('refresh_token');
const onClickBack = () => {
    window.location.href = "http://localhost:3000/myPage";
}
const onClickDeleteUser = () => {
    const confirmDelete = window.confirm('정말 탈퇴하시겠습니까?');

    if (confirmDelete) {
        try {
            const response = axios.delete('http://127.0.0.1:8000/userdelete/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        } catch (error) {
            console.error('서버 요청 오류:', error);
        }

        alert('탈퇴되었습니다.');
        // window.location.href = 'http://localhost:3000/mainPage';

    }
}
export default function BoardNewPage() {

    return (
        <>
            <Wrapper>
                    <Title src="images/mofylogo.png"/>
                <Warning>
                        <Ment>정말 탈퇴하시겠습니까?</Ment>
                        <Ment>탈퇴 시 회원님의 모든 정보가 삭제되며</Ment>
                        <Ment>계정을 다시 복구할 수 없습니다.</Ment>


                </Warning>
                <ButtonWrapper>
                    <YesButton onClick={onClickDeleteUser}>탈퇴하기</YesButton>
                    <NoButton onClick={onClickBack}>좀 더 생각해볼게요</NoButton>
                </ButtonWrapper>
            </Wrapper>
        </>
    )
}
