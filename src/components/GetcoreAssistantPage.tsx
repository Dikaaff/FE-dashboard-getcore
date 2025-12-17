import { useState } from 'react';
import { Bot, Headphones, Sparkles, Clock, ChevronRight, MessageCircle, Zap, Shield, Star } from 'lucide-react';
import { Button } from './ui/button';
import { ChatWindow } from './ChatWindow';
import { cn } from './ui/utils';

export function GetcoreAssistantPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatType, setChatType] = useState<'ai' | 'live'>('ai');

  const handleOpenAIChat = () => {
    setChatType('ai');
    setIsChatOpen(true);
  };

  const handleOpenLiveChat = () => {
    setChatType('live');
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f7f7] via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#8a25ed]/10 to-purple-100/50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#8a25ed]" strokeWidth={2.5} />
            <span className="text-sm font-medium text-[#8a25ed]">Bantuan 24/7</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Getcore Assistant
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Pilih jenis bantuan yang Anda butuhkan. Kami siap membantu Anda dengan cepat dan profesional.
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {/* AI Assistant Card */}
          <div className="group animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="relative bg-white border-2 border-[#8a25ed]/20 hover:border-[#8a25ed] rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-[#8a25ed]/10 hover:-translate-y-1">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1.5 bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] text-white text-xs font-semibold rounded-full shadow-lg">
                  Instant Response
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-[#8a25ed] to-[#6a1fb3] rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl shadow-[#8a25ed]/20 group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Chat with AI Assistant
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  Dapatkan jawaban cepat 24/7 untuk pertanyaan seputar fitur, cara penggunaan, dan solusi otomatis dari AI yang cerdas.
                </p>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Online - Siap membantu</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-[#8a25ed]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-[#8a25ed]" strokeWidth={2.5} />
                  </div>
                  <span>Respon instan tanpa antrian</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-[#8a25ed]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#8a25ed]" strokeWidth={2.5} />
                  </div>
                  <span>Tersedia 24/7 tanpa henti</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-[#8a25ed]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-[#8a25ed]" strokeWidth={2.5} />
                  </div>
                  <span>Jawaban akurat dan terpercaya</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleOpenAIChat}
                className="w-full bg-gradient-to-r from-[#8a25ed] to-[#6a1fb3] hover:from-[#7a1fd9] hover:to-[#5a18a0] text-white py-6 text-base sm:text-lg font-semibold rounded-2xl shadow-lg shadow-[#8a25ed]/20 group-hover:shadow-xl group-hover:shadow-[#8a25ed]/30 transition-all"
              >
                <span>Start Chat</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Button>
            </div>
          </div>

          {/* Live Customer Service Card */}
          <div className="group animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <div className="relative bg-white border-2 border-emerald-200/60 hover:border-emerald-400 rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-400/10 hover:-translate-y-1">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  Human Support
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-6 sm:mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-xl shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Headphones className="w-10 h-10 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
                </div>
              </div>

              {/* Content */}
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Chat with Live CS
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  Terhubung langsung dengan tim customer service kami untuk bantuan yang lebih personal dan penanganan masalah kompleks.
                </p>
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                  <Clock className="w-4 h-4" strokeWidth={2} />
                  <span>Avg. response: 2-5 minutes</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <span>Bantuan personal dari manusia</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <span>Solusi untuk masalah kompleks</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
                  </div>
                  <span>Tim support berpengalaman</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleOpenLiveChat}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-6 text-base sm:text-lg font-semibold rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:shadow-xl group-hover:shadow-emerald-500/30 transition-all"
              >
                <span>Connect Now</span>
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white border border-gray-200/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              💡 Tips Memilih Layanan Bantuan
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              Pilih layanan yang paling sesuai dengan kebutuhan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-[#8a25ed]/10">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Gunakan AI Assistant untuk:</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#8a25ed] flex-shrink-0">•</span>
                  <span>Pertanyaan umum tentang fitur</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a25ed] flex-shrink-0">•</span>
                  <span>Panduan cara penggunaan</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a25ed] flex-shrink-0">•</span>
                  <span>FAQ dan troubleshooting cepat</span>
                </li>
              </ul>
            </div>

            <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-200/60">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Gunakan Live CS untuk:</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 flex-shrink-0">•</span>
                  <span>Masalah teknis yang kompleks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 flex-shrink-0">•</span>
                  <span>Permintaan custom atau khusus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 flex-shrink-0">•</span>
                  <span>Konsultasi bisnis mendalam</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <div className="text-center p-4 sm:p-6 bg-white rounded-2xl border border-gray-200/60 shadow-sm">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8a25ed] mb-2">24/7</div>
            <p className="text-xs sm:text-sm text-gray-600">Availability</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-2xl border border-gray-200/60 shadow-sm">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8a25ed] mb-2">{'<30s'}</div>
            <p className="text-xs sm:text-sm text-gray-600">AI Response</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-2xl border border-gray-200/60 shadow-sm">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">2-5m</div>
            <p className="text-xs sm:text-sm text-gray-600">Live CS</p>
          </div>
          <div className="text-center p-4 sm:p-6 bg-white rounded-2xl border border-gray-200/60 shadow-sm">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">98%</div>
            <p className="text-xs sm:text-sm text-gray-600">Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <ChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        chatType={chatType}
      />
    </div>
  );
}