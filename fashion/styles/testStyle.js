// testStyle.js

import styled from "@emotion/styled";

export const TestButton = styled.input`
 width: 100px;
 height: 30px;
 cursor: pointer;
`;

export const ModalWrapper = styled.div`
 //position: fixed;
 //bottom: 30px; /* 수정된 부분 */
 //left: 50%;
 //transform: translateX(-50%); /* 가로 중앙 정렬을 위해 추가된 부분 */
 width: 500px;
 height: 500px;
 background: rgba(255, 146, 146, 0.09);
 display: flex;
 justify-content: center;
 align-items: center;
 //z-index: 1000;
`;

export const ModalContent = styled.div`
 background: white;
 padding: 20px;
 border-radius: 8px;
`;

export const ModalText = styled.p`
 /* Modal 내의 텍스트에 스타일을 추가할 수 있습니다. */
 font-size: 16px;
 color: #333;
`;
