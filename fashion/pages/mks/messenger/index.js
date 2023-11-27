// index.js

import React, { useState } from 'react';
import Chat from './chat';

const Index = () => {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    return (
        <div>
            <button onClick={toggleChat}>채팅 열기</button>
            {showChat && <Chat />}
        </div>
    );
};

export default Index;
