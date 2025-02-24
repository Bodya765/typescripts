import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [privateRecipient, setPrivateRecipient] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('user_typing', ({ user, isTyping }) => {
      setIsTyping(isTyping ? `${user} друкує...` : '');
    });

    socket.on('users', (users) => {
      setOnlineUsers(users);
    });

    socket.on('private_message', (msg) => {
      setMessages((prev) => [...prev, { ...msg, private: true }]);
    });

    return () => {
      socket.off('message');
      socket.off('user_typing');
      socket.off('users');
      socket.off('private_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [...prev, { user: 'Я', text: message }]);
      if (isPrivate) {
        socket.emit('private_message', { recipient: privateRecipient, message });
      } else {
        socket.emit('send_message', { message });
      }
      setMessage('');
    }
  };

  const handleTyping = (e) => {
    setMessage(e.target.value);
    socket.emit('typing', e.target.value.length > 0);
  };

  return (
    <div>
      {!nickname ? (
        <div>
          <input placeholder="Введіть нікнейм" onChange={(e) => setNickname(e.target.value)} />
          <button onClick={() => socket.emit('set_nickname', nickname)}>Зберегти</button>
        </div>
      ) : (
        <div>
          <h2>Чат</h2>
          <div>
            <h4>Онлайн: {onlineUsers.length}</h4>
            <ul>
              {onlineUsers.map((user) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
          </div>
          <div>
            {messages.map((msg, index) => (
              <p key={index} style={{ color: msg.private ? 'red' : 'black' }}>
                {msg.user}: {msg.text}
              </p>
            ))}
          </div>
          <p>{isTyping}</p>
          <input type="text" placeholder="Ваше повідомлення..." value={message} onChange={handleTyping} />
          <button onClick={sendMessage}>Надіслати</button>
          <div>
            <label>
              Приватне до:
              <input type="text" value={privateRecipient} onChange={(e) => setPrivateRecipient(e.target.value)} />
            </label>
            <button onClick={() => setIsPrivate(!isPrivate)}>
              {isPrivate ? 'Вимкнути приватний режим' : 'Увімкнути'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
