// chat.js
import React, { useState, useEffect } from 'react';
import { Wrapper, ConsentWrapper, Messages, Chatting,
    Profile, SendBtn, Edit, UserName, Image,
    InputWrapper, InputChat, ChatBubble }
    from '../../../styles/styles/Boardsmessenger';
import io from 'socket.io-client';
import axios from 'axios';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [socket, setSocket] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // 클라이언트가 마운트되었을 때 소켓 연결 설정
        const newSocket = io('http://localhost:3001'); // 서버의 주소에 맞게 변경

        setSocket(newSocket);

        // 사용자 이름을 불러오기 위한 Axios 요청
        axios.get('http://127.0.0.1:8000/userinfo/', {
            headers: {
                Authorization: `Bearer ${accessToken}`, // 여기에 실제 토큰을 넣어주세요
            },
        })
            .then(response => {
                setUserName(response.data.userName);
            })
            .catch(error => {
                console.error('Error fetching user name:', error);
            });

        return () => {
            // 컴포넌트가 언마운트될 때 소켓 연결 해제
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        // 소켓에서 메시지를 수신할 때마다 메시지를 업데이트
        if (socket) {
            socket.on('message', (message) => {
                setMessages([...messages, { text: message, sender: userName }]);
            });
        }
    }, [socket, messages, userName]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = () => {
        if (input.trim() !== '' && socket) {
            // 서버에 메시지 전송
            socket.emit('sendMessage', { text: input, sender: userName });
            // 보낸 메시지는 클라이언트 화면에도 표시
            setMessages([...messages, { text: input, sender: userName }]);
            setInput('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleEditClick = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <ConsentWrapper>
            {isChatOpen && (
                <Chatting>
                    <Profile>
                        <Image></Image>
                        <UserName>{userName}</UserName>
                        <Edit onClick={handleEditClick}>✕</Edit>
                    </Profile>
                    <Wrapper>
                        <Messages>
                            {messages.map((message, index) => (
                                <ChatBubble key={index}>
                                    <strong>{message.sender}: </strong>{message.text}
                                </ChatBubble>
                            ))}
                        </Messages>
                    </Wrapper>
                    <InputWrapper>
                        <InputChat
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="메시지 입력..."
                        />
                        <SendBtn type="button" onClick={handleSendMessage}>
                            전송
                        </SendBtn>
                    </InputWrapper>
                </Chatting>
            )}
        </ConsentWrapper>
    );
};

export default Chat;
