import {Wrapper,ConsentWrapper,TitleWrapper,Title,
    Line, Vintage, Dandy, Retro, Spoty, Street, Minimal,
    Casual,ClothStyle, InputHeight, InputWeight,
    InputWeightWrapper,InputHeightWrapper, InputFootSizeWrapper,
    InputFootSize, Selected, SelectedList, SelectedWrapper,
    SelectedListWrapper, RefreshButton, Wrapper1,
    NextButton, NextButtonWrapper, JumpButton,
    SubTitle, SubTitleWrapper

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
        window.location.href = "http://localhost:3000/boards/signIn/selectYourSkinType";
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
                    <Line>
                    </Line>
                </TitleWrapper>
                <ClothStyle>
                    선호하는 옷스타일
                </ClothStyle>
                <Vintage onClick={() => handleStyleButtonClick("#빈티지")}>#빈티지</Vintage>
                <Retro onClick={() => handleStyleButtonClick("#레트로")}>#레트로</Retro>
                <Minimal onClick={() => handleStyleButtonClick("#미니멀")}>#미니멀</Minimal>
                <Casual onClick={() => handleStyleButtonClick("#캐주얼")}>#캐주얼</Casual>
                <Street onClick={() => handleStyleButtonClick("#스트릿")}>#스트릿</Street>
                <Dandy onClick={() => handleStyleButtonClick("#댄디")}>#댄디</Dandy>
                <Spoty onClick={() => handleStyleButtonClick("#스포티")}>#스포티</Spoty>
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
                <NextButton type="arrow-button" onClick={onClickNext}>
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
