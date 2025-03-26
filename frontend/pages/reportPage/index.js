import {
    Wrapper, TestButton, PopupWrapper
} from '../../styles/reportPageStyle'
import React, { useState } from 'react';

const Popup = ({ onClose }) => {
    return (
        <PopupWrapper>
            {/* 팝업 내용을 여기에 추가 */}
            <button onClick={onClose}>닫기</button>
        </PopupWrapper>
    );
};
export default function BoardNewPage() {
    const [isPopupOpen, setPopupOpen] = useState(false);

    const onClickButton = () => {
        setPopupOpen(true);
    };

    const onClosePopup = () => {
        setPopupOpen(false);
    };
    return (
        <>
            <Wrapper>
                <TestButton onClick={onClickButton}/>
            </Wrapper>
            {isPopupOpen && <Popup onClose={onClosePopup} />}
        </>
    )
}
