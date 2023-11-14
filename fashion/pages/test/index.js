// index.js

import React, { useState } from 'react';
import {
 TestButton,
 ModalWrapper,
 ModalContent,
 ModalText
} from '../../styles/testStyle';

export default function BoardNewPage() {
 const [isModalOpen, setIsModalOpen] = useState(false);

 const openModal = () => {
  setIsModalOpen(true);
 };

 const closeModal = () => {
  setIsModalOpen(false);
 };

 return (
     <>
      <TestButton onClick={openModal} />
      {isModalOpen && (
          <ModalWrapper onClick={closeModal}>
           <ModalContent onClick={(e) => e.stopPropagation()}>
            {/* 모달 내부에 표시될 내용 */}
            <h2>Modal Content</h2>
            <ModalText>다른 요소들도 보일 수 있습니다.</ModalText>
           </ModalContent>
          </ModalWrapper>
      )}
     </>
 );
}
