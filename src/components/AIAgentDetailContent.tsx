import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  ArrowLeft,
  Save,
  Bot,
  Settings,
  Brain,
  BookOpen,
  MessageSquare,
  Upload,
  FileText,
  Trash2,
  Plus,
  Send,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Edit2,
  X
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';
import { cn } from './ui/utils';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface KnowledgeDoc {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
}

interface AIAgentDetailContentProps {
  agentId: string;
  onBack: () => void;
}

export function AIAgentDetailContent({ agentId, onBack }: AIAgentDetailContentProps) {
  const isNew = agentId === 'new';

  // Basic Settings
  const [agentName, setAgentName] = useState(isNew ? '' : 'Customer Support Bot');
  const [description, setDescription] = useState(isNew ? '' : 'AI agent for handling customer inquiries');
  const [linkedInbox, setLinkedInbox] = useState(isNew ? '' : 'support@getcore.com');
  const [planCompatibility, setPlanCompatibility] = useState(isNew ? 'Standard' : 'Corporate');

  // AI Behavior
  const [toneOfVoice, setToneOfVoice] = useState('Friendly');
  const [replyStyle, setReplyStyle] = useState('Normal');
  const [rules, setRules] = useState(
    isNew 
      ? '' 
      : 'Jangan menjawab di luar topik bisnis\nSelalu gunakan bahasa formal\nJangan sebut bahwa kamu AI'
  );

  // Knowledge Base
  const [faqs, setFaqs] = useState<FAQ[]>(
    isNew
      ? []
      : [
          { id: '1', question: 'Apa itu GetCore?', answer: 'GetCore adalah platform manajemen customer yang membantu bisnis mengelola pelanggan mereka dengan lebih efisien.' },
          { id: '2', question: 'Bagaimana cara upgrade plan?', answer: 'Anda bisa upgrade plan melalui menu Settings > Subscription, lalu pilih plan yang diinginkan.' },
        ]
  );
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [editingFaq, setEditingFaq] = useState<string | null>(null);
  const [editFaqData, setEditFaqData] = useState({ question: '', answer: '' });
  const [showAddFaq, setShowAddFaq] = useState(false);

  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDoc[]>(
    isNew
      ? []
      : [
          { id: '1', name: 'Product Documentation.pdf', type: 'PDF', size: '2.4 MB', uploadedAt: '2025-11-10' },
          { id: '2', name: 'FAQ Database.txt', type: 'TXT', size: '156 KB', uploadedAt: '2025-11-08' },
        ]
  );

  // Testing
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState('');
  const [testing, setTesting] = useState(false);

  // Connectivity
  const [connectionStatus, setConnectionStatus] = useState<'Active' | 'Error'>('Active');
  const [lastSync, setLastSync] = useState('2025-11-11 14:30');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveBasic = () => {
    if (!agentName.trim()) {
      toast.error('Agent name is required!');
      return;
    }
    toast.success('Basic settings saved successfully!');
  };

  const handleSaveBehavior = () => {
    toast.success('AI behavior settings saved successfully!');
  };

  const handleAddFaq = () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      toast.error('Question and answer are required!');
      return;
    }
    setFaqs([...faqs, { id: Date.now().toString(), ...newFaq }]);
    setNewFaq({ question: '', answer: '' });
    setShowAddFaq(false);
    toast.success('FAQ added successfully!');
  };

  const startEditFaq = (faq: FAQ) => {
    setEditingFaq(faq.id);
    setEditFaqData({ question: faq.question, answer: faq.answer });
  };

  const handleSaveEditFaq = (id: string) => {
    if (!editFaqData.question.trim() || !editFaqData.answer.trim()) {
      toast.error('Question and answer are required!');
      return;
    }
    setFaqs(faqs.map(f => f.id === id ? { ...f, ...editFaqData } : f));
    setEditingFaq(null);
    toast.success('FAQ updated successfully!');
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id));
    toast.success('FAQ deleted successfully!');
  };

  const handleFileUpload = () => {
    const mockDoc: KnowledgeDoc = {
      id: Date.now().toString(),
      name: 'New Document.pdf',
      type: 'PDF',
      size: '1.2 MB',
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    setKnowledgeDocs([...knowledgeDocs, mockDoc]);
    toast.success('Document uploaded successfully!');
  };

  const handleDeleteDoc = (id: string) => {
    setKnowledgeDocs(knowledgeDocs.filter(d => d.id !== id));
    toast.success('Document deleted successfully!');
  };

  const handleTestAgent = () => {
    if (!testMessage.trim()) {
      toast.error('Please enter a test message!');
      return;
    }
    setTesting(true);
    setTimeout(() => {
      setTestResponse('Halo! Terima kasih telah menghubungi GetCore. Bagaimana saya bisa membantu Anda hari ini?');
      setTesting(false);
    }, 1500);
  };

  const handleReconnect = () => {
    setConnectionStatus('Active');
    setLastSync(new Date().toISOString().replace('T', ' ').split('.')[0]);
    setErrorMessage('');
    toast.success('Reconnected successfully!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <h1 className="text-gray-900 mb-1">
            {isNew ? 'Create New AI Agent' : 'Manage AI Agent'}
          </h1>
          <p className="text-sm text-gray-500">Configure your AI agent settings and behavior</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Agent Settings */}
          <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#8a25ed]" />
                Basic Agent Settings
              </CardTitle>
              <CardDescription>Configure the basic information for your AI agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agentName" className="text-gray-700">Agent Name *</Label>
                  <Input
                    id="agentName"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="e.g., Customer Support Bot"
                    className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedInbox" className="text-gray-700">Linked Inbox / Platform *</Label>
                  <Select value={linkedInbox} onValueChange={setLinkedInbox}>
                    <SelectTrigger className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support@getcore.com">support@getcore.com (Email)</SelectItem>
                      <SelectItem value="+62 812-3456-7890">+62 812-3456-7890 (WhatsApp)</SelectItem>
                      <SelectItem value="@getcore_support">@getcore_support (Telegram)</SelectItem>
                      <SelectItem value="Web Chat">Web Chat Widget</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the purpose of this agent..."
                  rows={3}
                  className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="planCompatibility" className="text-gray-700">Plan Compatibility</Label>
                <Select value={planCompatibility} onValueChange={setPlanCompatibility}>
                  <SelectTrigger className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="UMKM">UMKM Professional</SelectItem>
                    <SelectItem value="Corporate">Corporate Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSaveBasic}
                  className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Behavior Settings */}
          <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#8a25ed]" />
                AI Behavior Settings
              </CardTitle>
              <CardDescription>Define how your AI agent communicates with customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="toneOfVoice" className="text-gray-700">Tone of Voice</Label>
                  <Select value={toneOfVoice} onValueChange={setToneOfVoice}>
                    <SelectTrigger className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                      <SelectItem value="Formal">Formal</SelectItem>
                      <SelectItem value="Neutral">Neutral</SelectItem>
                      <SelectItem value="Playful">Playful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="replyStyle" className="text-gray-700">Reply Style</Label>
                  <Select value={replyStyle} onValueChange={setReplyStyle}>
                    <SelectTrigger className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Short">Short</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Detailed">Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rules" className="text-gray-700">Rules & Guidelines</Label>
                <Textarea
                  id="rules"
                  value={rules}
                  onChange={(e) => setRules(e.target.value)}
                  placeholder="Enter rules for the AI agent, one per line..."
                  rows={5}
                  className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg resize-none"
                />
                <p className="text-xs text-gray-500">
                  Example: "Don't answer questions outside business topics", "Always use formal language"
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSaveBehavior}
                  className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Behavior
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Base */}
          <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#8a25ed]" />
                Knowledge Base
              </CardTitle>
              <CardDescription>Upload documents and manage FAQs to train your AI agent</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="documents" className="w-full">
                <TabsList className="w-full grid grid-cols-2 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="documents" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-[#8a25ed]">
                    Documents
                  </TabsTrigger>
                  <TabsTrigger value="faq" className="rounded-md data-[state=active]:bg-white data-[state=active]:text-[#8a25ed]">
                    FAQ Management
                  </TabsTrigger>
                </TabsList>

                {/* Documents Tab */}
                <TabsContent value="documents" className="space-y-4 mt-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#8a25ed] transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">PDF, TXT, DOCX (max. 10MB)</p>
                    <Button
                      onClick={handleFileUpload}
                      variant="outline"
                      className="mt-3 border-[#8a25ed] text-[#8a25ed] hover:bg-[#8a25ed]/10 rounded-lg"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                  </div>

                  {knowledgeDocs.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-gray-700">Uploaded Documents</Label>
                      {knowledgeDocs.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#8a25ed]/50 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#8a25ed]/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-[#8a25ed]" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-900">{doc.name}</p>
                              <p className="text-xs text-gray-500">
                                {doc.type} • {doc.size} • {doc.uploadedAt}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDoc(doc.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* FAQ Tab */}
                <TabsContent value="faq" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-700">Frequently Asked Questions</Label>
                    <Button
                      onClick={() => setShowAddFaq(!showAddFaq)}
                      size="sm"
                      className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white rounded-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add FAQ
                    </Button>
                  </div>

                  {showAddFaq && (
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                      <div className="space-y-2">
                        <Label className="text-gray-700 text-xs">Question</Label>
                        <Input
                          value={newFaq.question}
                          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                          placeholder="Enter question..."
                          className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-700 text-xs">Answer</Label>
                        <Textarea
                          value={newFaq.answer}
                          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                          placeholder="Enter answer..."
                          rows={3}
                          className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg resize-none"
                        />
                      </div>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setShowAddFaq(false);
                            setNewFaq({ question: '', answer: '' });
                          }}
                          className="rounded-lg"
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleAddFaq}
                          className="bg-[#8a25ed] hover:bg-[#7a1fd4] text-white rounded-lg"
                        >
                          Add FAQ
                        </Button>
                      </div>
                    </div>
                  )}

                  {faqs.length > 0 ? (
                    <div className="space-y-3">
                      {faqs.map((faq) => (
                        <div
                          key={faq.id}
                          className="p-4 border border-gray-200 rounded-lg hover:border-[#8a25ed]/50 transition-colors"
                        >
                          {editingFaq === faq.id ? (
                            <div className="space-y-3">
                              <Input
                                value={editFaqData.question}
                                onChange={(e) => setEditFaqData({ ...editFaqData, question: e.target.value })}
                                className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
                              />
                              <Textarea
                                value={editFaqData.answer}
                                onChange={(e) => setEditFaqData({ ...editFaqData, answer: e.target.value })}
                                rows={3}
                                className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg resize-none"
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleSaveEditFaq(faq.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white rounded-lg"
                                >
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setEditingFaq(null)}
                                  className="rounded-lg"
                                >
                                  <X className="w-4 h-4 mr-2" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-sm text-gray-900">{faq.question}</p>
                                <div className="flex gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => startEditFaq(faq)}
                                    className="text-[#8a25ed] hover:text-[#7a1fd4] hover:bg-[#8a25ed]/10 h-8 px-2"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteFaq(faq.id)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-2"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600">{faq.answer}</p>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No FAQs added yet</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Testing & Status */}
        <div className="space-y-6">
          {/* Testing Panel */}
          <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl sticky top-6">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#8a25ed]" />
                Testing Panel
              </CardTitle>
              <CardDescription>Test your AI agent responses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="testMessage" className="text-gray-700">Test Message</Label>
                <Textarea
                  id="testMessage"
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder="Type a message to test..."
                  rows={3}
                  className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg resize-none"
                />
              </div>

              <Button
                onClick={handleTestAgent}
                disabled={testing}
                className="w-full bg-[#8a25ed] hover:bg-[#7a1fd4] text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-50"
              >
                {testing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Test Agent
                  </>
                )}
              </Button>

              {testResponse && (
                <div className="p-4 bg-[#8a25ed]/5 border border-[#8a25ed]/20 rounded-lg">
                  <p className="text-xs text-gray-600 mb-2">AI Response:</p>
                  <p className="text-sm text-gray-900">{testResponse}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Status & Connectivity */}
          <Card className="bg-white border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl">
            <CardHeader>
              <CardTitle className="text-gray-900 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#8a25ed]" />
                Status & Connectivity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Connection Status</span>
                {connectionStatus === 'Active' ? (
                  <Badge className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                ) : (
                  <Badge className="bg-red-50 text-red-700 border-red-200">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Error
                  </Badge>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Sync</span>
                  <span className="text-gray-900">{lastSync}</span>
                </div>
              </div>

              {connectionStatus === 'Error' && errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs text-red-700">{errorMessage}</p>
                </div>
              )}

              <Button
                onClick={handleReconnect}
                variant="outline"
                className="w-full border-[#8a25ed] text-[#8a25ed] hover:bg-[#8a25ed]/10 rounded-lg"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reconnect
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
