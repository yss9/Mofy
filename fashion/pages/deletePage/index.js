import {
    Wrapper, Title, ButtonWrapper,
    Warning, YesButton, NoButton, Ment
} from '../../styles/deletePageStyle'

const onClickBack = () => {
    window.location.href = "http://localhost:3000/myPage";
}
const onClickDeleteUser = () => {
    const confirmDelete = window.confirm('정말 탈퇴하시겠습니까?');

    if (confirmDelete) {
        // 사용자가 '예'를 선택한 경우
        // 서버에 탈퇴 요청 보내기
        alert('탈퇴되었습니다.');
        window.location.href = 'http://localhost:3000/mainPage';

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
