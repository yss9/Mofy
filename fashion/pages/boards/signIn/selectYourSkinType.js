import {
    ConsentWrapper,
    Line,
    Title,
    TitleWrapper,
    Wrapper,
    Normal,
    Dry,
    Oily,
    Acne,
    Sensitive,
    Combination,
    Wrapper1,
    Selected,
    RefreshButton,
    SelectedWrapper,
    SelectedListWrapper,
    SelectedList,
    ClothStyle, NextButtonWrapper, NextButton, JumpButton, SubTitle, SubTitleWrapper

} from '../../../Login_mks/fashion/styles/BoardsselectYours'

import {useState} from "react";

export default function BoardsLoginPage() {

    const [selectedStyles, setSelectedStyles] = useState([]); // 선택된 스타일을 저장할 상태 변수

    // 스타일 버튼을 클릭할 때 실행되는 함수
    const handleStyleButtonClick = (style) => {
        // 이미 선택된 스타일인지 확인
        if (!selectedStyles.includes(style)) {
            // 선택된 스타일이 아닌 경우에만 추가
            setSelectedStyles([...selectedStyles, style]);
        }
    };

    const handleResetButtonClick = () => {
        // 선택된 스타일을 빈 배열로 초기화
        setSelectedStyles([]);
    };

    const onClickNext = () => {
        window.location.href = "http://localhost:3000/boards/login";
    }

    return(
        <>
        <Wrapper>
            <SubTitleWrapper>
                <SubTitle>
                    MOFY
                </SubTitle>
            </SubTitleWrapper>
            <ConsentWrapper>
                <TitleWrapper>
                    <Title>
                        자신에게 맞는 스타일을 골라주세요!
                    </Title>
                </TitleWrapper>
                <Line></Line>
                <ClothStyle>
                    피부타입
                </ClothStyle>
                <Normal onClick={() => handleStyleButtonClick("#보통")}>#보통</Normal>
                <Dry onClick={() => handleStyleButtonClick("#건성")}>#건성</Dry>
                <Oily onClick={() => handleStyleButtonClick("#지성")}>#지성</Oily>
                <Sensitive onClick={() => handleStyleButtonClick("#민감성")}>#민감성</Sensitive>
                <Combination onClick={() => handleStyleButtonClick("#복합성")}>#복합성</Combination>
                <Acne onClick={() => handleStyleButtonClick("#여드름")}>#여드름</Acne>
                <Line></Line>
                <Wrapper1>
                    <Selected>선택된 스타일</Selected>
                    <RefreshButton onClick={handleResetButtonClick}>
                        ↺ 재설정
                    </RefreshButton>
                </Wrapper1>
                <SelectedWrapper>
                    <SelectedListWrapper>
                        {selectedStyles.map((style, index) => (
                            <SelectedList key={index}>{style}</SelectedList>
                        ))}
                    </SelectedListWrapper>
                </SelectedWrapper>
            </ConsentWrapper>
            <NextButtonWrapper>
                <NextButton type="arrow-button">
                    ➜
                </NextButton>
            </NextButtonWrapper>
            <JumpButton onClick={onClickNext}>
                건너뛰기
            </JumpButton>
        </Wrapper>
        </>
    )

}