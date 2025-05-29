

  // src/components/Chat.js
import React, { useState } from 'react';

const Chat = () => {
  const [user, setUser] = useState('YourUsername'); // Default username

  const isUserAdmin = (user) => user === 'Admin';

  
  const defaultMessages = [
    { text: 'Hello, how are you?', user: 'OtherUser', image: null, id: '1' },
    { text: 'I am doing well, thank you!', user: 'You', image: null, id: '2' },
    { text: 'Any plans for the weekend?', user: 'OtherUser', image: null, id: '3' },
    { text: 'Not yet, thinking about a movie night.', user: 'You', image: null, id: '4' },
    { text: 'Sounds good! What movie are you planning to watch?', user: 'OtherUser', image: null, id: '5' },
    { text: 'I\'m thinking about watching a comedy. Any recommendations?', user: 'You', image: null, id: '6' },
    { text: 'How about "The Hangover"? It\'s hilarious!', user: 'OtherUser', image: null, id: '7' },
    { text: 'Great suggestion! I\'ll check it out. Thanks!', user: 'You', image: null, id: '8' },
  ];

  const [messages, setMessages] = useState(defaultMessages);
  const [newMessage, setNewMessage] = useState('');
  const [newImage, setNewImage] = useState(null);

  const addMessage = (messageText, user, image) => {
    if (messageText.trim() === '' && !image) {
      return; // Prevent adding empty messages
    }

    const lastMessage = messages[messages.length - 1];
    const updatedMessages = [...messages];

    if (lastMessage && lastMessage.user === user && lastMessage.text && lastMessage.image) {
      // If the last message is from the same user and contains both text and image, create a new message
      const newMessageObj = {
        text: messageText,
        user: user,
        image: image,
        id: new Date().toISOString(), // Use a proper unique identifier
      };
      updatedMessages.push(newMessageObj);
    } else {
      // Otherwise, update the last message with the new text and image
      if (lastMessage) {
        lastMessage.text = messageText;
        lastMessage.image = image;
      } else {
        // Create a new message if there is no last message
        const newMessageObj = {
          text: messageText,
          user: user,
          image: image,
          id: new Date().toISOString(), // Use a proper unique identifier
        };
        updatedMessages.push(newMessageObj);
      }
    }

    setMessages(updatedMessages);
    setNewMessage('');
    setNewImage(null);
  };

  const getInitials = (userName) => {
    const nameArray = userName.split(' ');
    return nameArray
      .map((name) => name.charAt(0).toUpperCase())
      .join('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addMessage(newMessage, 'You', newImage);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="p-4 border-b border-gray-300">
        <div className="font-bold text-lg">{user}</div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`my-4 p-3 rounded-lg max-w-80 ${
              message.user === 'You' ? 'bg-blue-100 self-end' : 'bg-yellow-100'
            }`}
          >
            <div className="flex items-start space-x-4">
              {!isUserAdmin(message.user) && (
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  {getInitials(message.user)}
                </div>
              )}
              <div className="flex-1">
                <div className="font-bold">{message.user}</div>
                {message.image ? (
                  <img src={message.image} alt="Uploaded" className="max-w-full mt-2 rounded-lg" />
                ) : (
                  <div>{message.text}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 border-t border-gray-300">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-2 mr-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setNewImage(URL.createObjectURL(e.target.files[0]))}
          />
          <span className="text-blue-500">
            📷
          </span>
        </label>
        <button
          onClick={() => addMessage(newMessage, 'You', newImage)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
