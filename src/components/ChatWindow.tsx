import { useState, useRef, useEffect } from 'react';
import { X, Send, Minimize2, Maximize2, Bot, User as UserIcon, Loader2, Paperclip, MoreVertical, Smile } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from './ui/utils';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'agent';
  content: string;
  timestamp: Date;
  senderName?: string;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  chatType: 'ai' | 'live';
}

const aiResponses = [
  "Terima kasih atas pertanyaan Anda! Saya di sini untuk membantu. Apakah Anda ingin tahu tentang fitur dashboard, billing, atau hal lainnya?",
  "Saya dapat membantu Anda dengan berbagai hal seperti manajemen customer, pengaturan AI agents, broadcast messages, dan masih banyak lagi.",
  "Untuk informasi yang lebih detail atau bantuan teknis kompleks, saya merekomendasikan untuk terhubung dengan Live Customer Service kami.",
  "Apakah ada yang lain yang bisa saya bantu?",
  "Saya sudah memahami pertanyaan Anda. Berikut adalah solusinya...",
];

const liveResponses = [
  "Terima kasih telah menghubungi kami! Tim support sedang memprosesnya dan akan segera merespon.",
  "Kami telah menerima pertanyaan Anda. Mohon tunggu sebentar, tim kami akan segera membantu.",
  "Saya akan segera membantu Anda dengan pertanyaan tersebut.",
];

export function ChatWindow({ isOpen, onClose, chatType }: ChatWindowProps) {
  // Separate message histories for AI and Live CS
  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Halo! 👋 Saya GetCore AI Assistant. Saya siap membantu Anda 24/7. Ada yang bisa saya bantu?',
      timestamp: new Date(),
      senderName: 'GetCore AI',
    },
  ]);

  const [liveMessages, setLiveMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: 'Halo! 👋 Saya Sarah dari tim Customer Service GetCore. Senang bisa membantu Anda hari ini! Ada yang bisa saya bantu?',
      timestamp: new Date(),
      senderName: 'Sarah - Customer Service',
    },
  ]);

  // Use the appropriate messages based on chatType
  const messages = chatType === 'ai' ? aiMessages : liveMessages;
  const setMessages = chatType === 'ai' ? setAiMessages : setLiveMessages;

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate AI/Agent response
    const responses = chatType === 'ai' ? aiResponses : liveResponses;
    setIsTyping(true);
    
    setTimeout(() => {
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: chatType === 'ai' ? 'ai' : 'agent',
        content: randomResponse,
        timestamp: new Date(),
        senderName: chatType === 'ai' ? 'GetCore AI' : 'Sarah - Customer Service',
      };
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, chatType === 'ai' ? 1200 : 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        'fixed z-50 flex flex-col bg-white border border-gray-200/60 shadow-2xl transition-all duration-300',
        // Mobile: Full screen
        'inset-0 rounded-none md:inset-auto',
        // Desktop: Bottom right with fixed size and max-height to prevent cutoff
        !isMinimized && 'md:bottom-6 md:right-6 md:w-[440px] md:max-h-[calc(100vh-48px)] md:h-[680px] md:rounded-3xl',
        isMinimized && 'md:bottom-6 md:right-6 md:w-80 md:h-[72px] md:rounded-3xl'
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex-shrink-0 bg-gradient-to-r text-white px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between",
        chatType === 'ai' 
          ? 'from-[#8a25ed] to-[#6a1fb3]' 
          : 'from-emerald-500 to-teal-600',
        'md:rounded-t-3xl'
      )}>
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <div className={cn(
            "w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg",
            chatType === 'ai' ? 'bg-white/20' : 'bg-white/20'
          )}>
            {chatType === 'ai' ? (
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
            ) : (
              <Avatar className="w-10 h-10 sm:w-11 sm:h-11">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                <AvatarFallback className="bg-white/20 text-white text-sm">CS</AvatarFallback>
              </Avatar>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-sm sm:text-base font-semibold truncate">
              {chatType === 'ai' ? 'AI Assistant' : 'Live Customer Service'}
            </h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm" />
              <span className="text-xs text-white/90">Online - Siap membantu</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-white/20 text-white rounded-lg hidden md:flex"
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" strokeWidth={2} />
            ) : (
              <Minimize2 className="w-4 h-4" strokeWidth={2} />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 sm:h-9 sm:w-9 p-0 hover:bg-white/20 text-white rounded-lg"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-2 sm:gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300',
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.type !== 'user' && (
                  <Avatar className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 shadow-sm border-2 border-white">
                    <AvatarFallback className={cn(
                      "text-white text-xs font-semibold",
                      chatType === 'ai' ? 'bg-gradient-to-br from-[#8a25ed] to-[#6a1fb3]' : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                    )}>
                      {chatType === 'ai' ? (
                        <Bot className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                      ) : (
                        'CS'
                      )}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[80%] sm:max-w-[75%] rounded-xl sm:rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm',
                    message.type === 'user'
                      ? chatType === 'ai'
                        ? 'bg-gradient-to-br from-[#8a25ed] to-[#7a1fd9] text-white rounded-br-md'
                        : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-md'
                      : 'bg-white border border-gray-200/60 text-gray-900 rounded-bl-md'
                  )}
                >
                  {message.type !== 'user' && message.senderName && (
                    <p className="text-xs text-gray-500 mb-1.5 font-medium">{message.senderName}</p>
                  )}
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                  <p
                    className={cn(
                      'text-[10px] sm:text-xs mt-1.5 sm:mt-2',
                      message.type === 'user' ? 'text-white/70' : 'text-gray-400'
                    )}
                  >
                    {message.timestamp.toLocaleTimeString('id-ID', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.type === 'user' && (
                  <Avatar className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 shadow-sm border-2 border-white">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                    <AvatarFallback className="bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 text-xs font-semibold">
                      You
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 sm:gap-3 justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Avatar className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 shadow-sm border-2 border-white">
                  <AvatarFallback className={cn(
                    "text-white text-xs font-semibold",
                    chatType === 'ai' ? 'bg-gradient-to-br from-[#8a25ed] to-[#6a1fb3]' : 'bg-gradient-to-br from-emerald-500 to-teal-600'
                  )}>
                    {chatType === 'ai' ? (
                      <Bot className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                    ) : (
                      'CS'
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white border border-gray-200/60 rounded-xl sm:rounded-2xl rounded-bl-md px-4 sm:px-5 py-2 sm:py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 p-3 sm:p-4 bg-white border-t border-gray-200/60 md:rounded-b-3xl">
            <div className="flex gap-2 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  placeholder="Ketik pesan Anda..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 pr-10 border border-gray-200/60 rounded-xl sm:rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all resize-none bg-gray-50/50 hover:bg-white"
                  style={{ maxHeight: '120px' }}
                />
                <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors hidden sm:block">
                  <Smile className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className={cn(
                  "h-10 sm:h-12 w-10 sm:w-12 sm:px-4 p-0 text-white shadow-lg transition-all flex items-center justify-center",
                  chatType === 'ai' 
                    ? 'bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] shadow-[#8a25ed]/20' 
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-emerald-500/20'
                )}
              >
                {isTyping ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" strokeWidth={2.5} />
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                )}
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 sm:mt-3 px-1">
              <p className="text-[10px] sm:text-xs text-gray-400">
                Powered by GetCore AI
              </p>
              <p className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">
                Press <span className="text-gray-600 font-medium">Enter</span> to send
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}