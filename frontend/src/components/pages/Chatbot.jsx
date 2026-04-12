import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! How can I help you with your car rental today?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, { message: text });
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-blue-950 text-white px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-sm">Rental Cars Assistant</span>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-300 text-lg leading-none">&times;</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-60 sm:max-h-72 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap ${msg.role === 'user'
                    ? 'bg-blue-950 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-xl rounded-bl-none px-3 py-2 text-sm text-gray-400">
                  Typing...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t border-gray-200 flex gap-2 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-blue-950 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-800 disabled:opacity-50 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Blinking hint bubble */}
      {!open && showHint && (
        <div className="mb-3 flex items-start gap-2 animate-bounce">
          <div className="relative bg-white text-gray-800 text-sm px-4 py-2 rounded-2xl rounded-br-none shadow-lg border border-gray-200 max-w-67.5">
            🚗 Need help finding a car?
            <button
              onClick={() => setShowHint(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-gray-400 hover:bg-gray-500 text-white rounded-full text-xs flex items-center justify-center leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => { setOpen((prev) => !prev); setShowHint(false); }}
        className="w-14 h-14 bg-blue-950 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-800 transition"
        title="Chat with AI"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;
