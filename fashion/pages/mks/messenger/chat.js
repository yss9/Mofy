// chat.js
import React, { useState, useEffect } from 'react';
import { Wrapper, ConsentWrapper, Messages, Chatting,
    Profile, SendBtn, Edit, UserName, Image,
    InputWrapper, InputChat, ChatBubble }
    from '../../../styles/styles/Boardsmessenger';
import io from 'socket.io-client';
import axios from 'axios';
import Cookies from "js-cookie";

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [socket, setSocket] = useState(null);
    const [userName, setUserName] = useState('');

    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');


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
                setUserName(response.data);
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
                        <UserName>{userName.username}</UserName>
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

import React, { useEffect } from 'react';

const ChatComponent = () => {
    useEffect(() => {
        // 컴포넌트가 마운트될 때 실행되는 로직
        let currentUserEmail = null;
        let currentRoomId = null;
        let socket = null;
        let visitorUserEmail = null;
        let sortedEmails = null;

        const chatMessages = document.getElementById('chat-messages');
        const messageInput = document.getElementById('message-input');
        const sendBtn = document.getElementById('send-btn');

        messageInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
                sendMessage(currentUserEmail);
            }
        });

        window.loginAsUser = async (email) => {
            currentUserEmail = email;
            visitorUserEmail = email === "qw@naver.com" ? "er@naver.com" : "qw@naver.com";
            await openOrCreateRoom();
        };

        async function openOrCreateRoom() {
            if (socket) {
                socket.close();
            }

            sortedEmails = [currentUserEmail, visitorUserEmail].sort();

            const response = await fetch('http://127.0.0.1:8000/chat/rooms/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shop_user_email: sortedEmails[0],
                    visitor_user_email: sortedEmails[1]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const roomData = await response.json();
            currentRoomId = roomData.id;
            displayMessages(roomData.messages);
            setupWebSocket(currentRoomId);

            sendBtn.onclick = () => sendMessage(currentUserEmail);
        }

        function displayMessages(messages) {
            chatMessages.innerHTML = '';
            messages.forEach((message) => {
                if (message.sender_email && message.text) {
                    const messageElem = document.createElement('div');
                    messageElem.classList.add('message-bubble');
                    messageElem.textContent = `${message.sender_email}: ${message.text}`;

                    if (message.sender_email === currentUserEmail) {
                        messageElem.classList.add('sent');
                    } else {
                        messageElem.classList.add('received');
                    }

                    chatMessages.appendChild(messageElem);
                }
            });
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function setupWebSocket(roomId) {
            socket = new WebSocket(`ws://127.0.0.1:8000/ws/room/${roomId}/messages`);

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                const messageElem = document.createElement('div');
                messageElem.classList.add('message-bubble');
                messageElem.textContent = `${data.sender_email}: ${data.message}`;

                if (data.sender_email === currentUserEmail) {
                    messageElem.classList.add('sent');
                } else {
                    messageElem.classList.add('received');
                }

                chatMessages.appendChild(messageElem);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            };
        }

        function sendMessage(userEmail) {
            const message = messageInput.value;
            if (message) {
                const messagePayload = {
                    'sender_email': userEmail,
                    'message': message,
                    'shop_user_email': sortedEmails[0],
                    'visitor_user_email': sortedEmails[1]
                };

                socket.send(JSON.stringify(messagePayload));
                messageInput.value = '';
            }
        }

        // cleanup 함수
        return () => {
            // 컴포넌트가 언마운트될 때 실행되는 로직
            // (클린업 로직, 이벤트 리스너 해제 등)
        };
    }, []); // 빈 배열은 컴포넌트가 마운트될 때만 실행하도록 설정

    // ... 컴포넌트의 나머지 부분 ...
};

export default ChatComponent;

