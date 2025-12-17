import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  Send, 
  MessageSquare, 
  Users, 
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  FileText
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { BroadcastDetailModal } from './BroadcastDetailModal';
import { MessageTemplateManager } from './MessageTemplateManager';
import { toast } from 'sonner';

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

export interface BroadcastHistory {
  id: string;
  name: string;
  receiverGroup: string;
  totalSent: number;
  status: 'Sent' | 'Queued' | 'Failed';
  dateSent: string;
  message: string;
  recipients: {
    name: string;
    email: string;
    status: 'sent' | 'failed';
  }[];
  successCount: number;
  failedCount: number;
}

// Mock data
const mockTemplates: MessageTemplate[] = [
  {
    id: '1',
    name: 'Welcome Message',
    content: 'Halo {name}, selamat bergabung dengan GetCore! Kami senang Anda menjadi bagian dari kami.',
    createdAt: '2025-11-01',
  },
  {
    id: '2',
    name: 'Monthly Newsletter',
    content: 'Update bulan ini: Fitur baru telah diluncurkan! Cek dashboard Anda untuk informasi lebih lanjut.',
    createdAt: '2025-10-15',
  },
  {
    id: '3',
    name: 'Subscription Reminder',
    content: 'Halo {name}, subscription plan {plan} Anda akan berakhir dalam 7 hari. Jangan lupa untuk perpanjang!',
    createdAt: '2025-09-20',
  },
];

const mockBroadcastHistory: BroadcastHistory[] = [
  {
    id: '1',
    name: 'November Newsletter',
    receiverGroup: 'All Plans',
    totalSent: 847,
    status: 'Sent',
    dateSent: '2025-11-10 14:30',
    message: 'Update bulan November: Fitur Activity Log telah diluncurkan!',
    recipients: [
      { name: 'Budi Santoso', email: 'budi@email.com', status: 'sent' },
      { name: 'Siti Aminah', email: 'siti@email.com', status: 'sent' },
    ],
    successCount: 842,
    failedCount: 5,
  },
  {
    id: '2',
    name: 'VIP Customer Appreciation',
    receiverGroup: 'Label: VIP',
    totalSent: 124,
    status: 'Sent',
    dateSent: '2025-11-08 10:00',
    message: 'Terima kasih telah menjadi customer VIP kami! Berikut penawaran eksklusif untuk Anda.',
    recipients: [
      { name: 'Dewi Lestari', email: 'dewi@email.com', status: 'sent' },
    ],
    successCount: 124,
    failedCount: 0,
  },
  {
    id: '3',
    name: 'Enterprise Plan Update',
    receiverGroup: 'Plan: Corporate Enterprise',
    totalSent: 45,
    status: 'Queued',
    dateSent: '2025-11-11 16:00',
    message: 'Update penting untuk pelanggan Enterprise: Kapasitas storage ditingkatkan!',
    recipients: [],
    successCount: 0,
    failedCount: 0,
  },
  {
    id: '4',
    name: 'Payment Reminder',
    receiverGroup: 'Label: Overdue',
    totalSent: 23,
    status: 'Failed',
    dateSent: '2025-11-09 09:15',
    message: 'Reminder pembayaran Anda yang tertunda.',
    recipients: [],
    successCount: 18,
    failedCount: 5,
  },
];

export function BroadcastContent() {
  const [templates, setTemplates] = useState<MessageTemplate[]>(mockTemplates);
  const [broadcastHistory, setBroadcastHistory] = useState<BroadcastHistory[]>(mockBroadcastHistory);
  const [selectedBroadcast, setSelectedBroadcast] = useState<BroadcastHistory | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  
  // Create Broadcast Form States
  const [broadcastName, setBroadcastName] = useState('');
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');

  // History Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlan, setFilterPlan] = useState<string>('all');

  // Calculate statistics
  const totalBroadcasts = broadcastHistory.length;
  const sentBroadcasts = broadcastHistory.filter(b => b.status === 'Sent').length;
  const queuedBroadcasts = broadcastHistory.filter(b => b.status === 'Queued').length;
  const failedBroadcasts = broadcastHistory.filter(b => b.status === 'Failed').length;

  const handlePlanToggle = (plan: string) => {
    if (selectedPlans.includes(plan)) {
      setSelectedPlans(selectedPlans.filter(p => p !== plan));
    } else {
      setSelectedPlans([...selectedPlans, plan]);
    }
  };

  const handleLabelToggle = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter(l => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setMessageContent(template.content);
    }
  };

  const handleSendBroadcast = () => {
    if (!broadcastName || !messageContent || (selectedPlans.length === 0 && selectedLabels.length === 0)) {
      toast.error('Please fill in all required fields');
      return;
    }

    const receiverGroup = selectedPlans.length > 0 
      ? `Plan: ${selectedPlans.join(', ')}` 
      : `Label: ${selectedLabels.join(', ')}`;

    const newBroadcast: BroadcastHistory = {
      id: Date.now().toString(),
      name: broadcastName,
      receiverGroup,
      totalSent: Math.floor(Math.random() * 500) + 100,
      status: 'Queued',
      dateSent: new Date().toLocaleString('id-ID'),
      message: messageContent,
      recipients: [],
      successCount: 0,
      failedCount: 0,
    };

    setBroadcastHistory([newBroadcast, ...broadcastHistory]);
    
    // Reset form
    setBroadcastName('');
    setSelectedPlans([]);
    setSelectedLabels([]);
    setMessageContent('');
    setSelectedTemplate('');

    toast.success('Broadcast queued successfully!');
  };

  const handleViewDetails = (broadcast: BroadcastHistory) => {
    setSelectedBroadcast(broadcast);
    setDetailModalOpen(true);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success('Template deleted successfully');
  };

  const handleSaveTemplate = (template: MessageTemplate) => {
    if (template.id) {
      // Update existing
      setTemplates(templates.map(t => t.id === template.id ? template : t));
      toast.success('Template updated successfully');
    } else {
      // Create new
      const newTemplate = {
        ...template,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
      };
      setTemplates([newTemplate, ...templates]);
      toast.success('Template created successfully');
    }
  };

  // Filter broadcast history
  const filteredHistory = broadcastHistory.filter(broadcast => {
    const matchesSearch = 
      broadcast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      broadcast.receiverGroup.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || broadcast.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || broadcast.receiverGroup.includes(filterPlan);

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Sent':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Queued':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sent':
        return <CheckCircle className="w-3 h-3" strokeWidth={2} />;
      case 'Queued':
        return <Clock className="w-3 h-3" strokeWidth={2} />;
      case 'Failed':
        return <XCircle className="w-3 h-3" strokeWidth={2} />;
      default:
        return null;
    }
  };

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Page Title */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
        <h1 className="text-gray-900">
          Broadcast
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Send messages to your customers based on plans, labels, or custom selection
        </p>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="create" className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100/50 rounded-xl p-1">
          <TabsTrigger value="create" className="text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-[#8a25ed] rounded-lg">
            <Send className="w-4 h-4 mr-1 sm:mr-2" strokeWidth={2} />
            <span className="hidden sm:inline">Create Broadcast</span>
            <span className="sm:hidden">Create</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-[#8a25ed] rounded-lg">
            <FileText className="w-4 h-4 mr-1 sm:mr-2" strokeWidth={2} />
            <span className="hidden sm:inline">Templates ({templates.length})</span>
            <span className="sm:hidden">Templates <span className="text-xs">({templates.length})</span></span>
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm data-[state=active]:bg-white data-[state=active]:text-[#8a25ed] rounded-lg">
            <MessageSquare className="w-4 h-4 mr-1 sm:mr-2" strokeWidth={2} />
            <span className="hidden sm:inline">History ({broadcastHistory.length})</span>
            <span className="sm:hidden">History <span className="text-xs">({broadcastHistory.length})</span></span>
          </TabsTrigger>
        </TabsList>

        {/* Create Broadcast Tab */}
        <TabsContent value="create" className="mt-6">
          <Card className="p-6 border border-gray-200/60 bg-white">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">Create New Broadcast</h3>
            
            <div className="space-y-6">
              {/* Broadcast Name */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Broadcast Name *
                </Label>
                <Input
                  placeholder="e.g., Monthly Newsletter, Promo Alert"
                  value={broadcastName}
                  onChange={(e) => setBroadcastName(e.target.value)}
                  className="bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
                />
              </div>

              {/* Select Recipients */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  Select Recipients *
                </Label>
                
                {/* By Plan */}
                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">By Plan</p>
                  <div className="flex flex-wrap gap-2">
                    {['Standard', 'UMKM Professional', 'Corporate Enterprise'].map(plan => (
                      <div
                        key={plan}
                        onClick={() => handlePlanToggle(plan)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all",
                          selectedPlans.includes(plan)
                            ? "border-[#8a25ed] bg-[#8a25ed]/5"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        )}
                      >
                        <Checkbox 
                          checked={selectedPlans.includes(plan)}
                          onCheckedChange={() => handlePlanToggle(plan)}
                        />
                        <span className="text-sm text-gray-700">{plan}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* By Label */}
                <div>
                  <p className="text-xs text-gray-600 mb-2">By Label/Tag</p>
                  <div className="flex flex-wrap gap-2">
                    {['VIP', 'Active', 'Trial', 'Premium', 'Referral'].map(label => (
                      <div
                        key={label}
                        onClick={() => handleLabelToggle(label)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all",
                          selectedLabels.includes(label)
                            ? "border-[#8a25ed] bg-[#8a25ed]/5"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        )}
                      >
                        <Checkbox 
                          checked={selectedLabels.includes(label)}
                          onCheckedChange={() => handleLabelToggle(label)}
                        />
                        <span className="text-sm text-gray-700">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Template Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Use Template (Optional)
                </Label>
                <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  <SelectTrigger className="bg-white border-gray-200/60">
                    <SelectValue placeholder="Select a template..." />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message Content */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Message Content *
                </Label>
                <Textarea
                  placeholder="Type your message here... Use {name} for customer name, {plan} for plan type."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  rows={6}
                  className="bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Variables: {'{name}'}, {'{plan}'}, {'{email}'}
                </p>
              </div>

              {/* Send Button */}
              <div className="pt-4 border-t border-gray-200">
                <Button
                  onClick={handleSendBroadcast}
                  className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white gap-2"
                >
                  <Send className="w-4 h-4" strokeWidth={2} />
                  Send Broadcast
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="mt-6">
          <MessageTemplateManager
            templates={templates}
            onSave={handleSaveTemplate}
            onDelete={handleDeleteTemplate}
          />
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="mt-6 space-y-4">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full lg:w-[180px] bg-white border-gray-200/60">
                <Filter className="w-4 h-4 mr-2" strokeWidth={2} />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Sent">Sent</SelectItem>
                <SelectItem value="Queued">Queued</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterPlan} onValueChange={setFilterPlan}>
              <SelectTrigger className="w-full lg:w-[200px] bg-white border-gray-200/60">
                <Filter className="w-4 h-4 mr-2" strokeWidth={2} />
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="UMKM Professional">UMKM Professional</SelectItem>
                <SelectItem value="Corporate Enterprise">Corporate Enterprise</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
              <Input
                type="text"
                placeholder="Search broadcasts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
              />
            </div>
          </div>

          {/* History Table */}
          <Card className="rounded-xl border border-gray-200/60 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                  <TableHead>Broadcast Name</TableHead>
                  <TableHead>Receiver Group</TableHead>
                  <TableHead>Total Sent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Sent</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHistory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500 text-sm">
                      No broadcasts found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredHistory.map((broadcast) => (
                    <TableRow 
                      key={broadcast.id}
                      className="group hover:bg-gray-50/50 transition-colors"
                    >
                      <TableCell>
                        <div className="font-medium text-gray-900">{broadcast.name}</div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {broadcast.receiverGroup}
                      </TableCell>
                      <TableCell className="text-sm text-gray-900">
                        {broadcast.totalSent}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "font-medium border transition-all duration-200 flex items-center gap-1 w-fit",
                            getStatusBadgeStyle(broadcast.status)
                          )}
                        >
                          {getStatusIcon(broadcast.status)}
                          {broadcast.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {broadcast.dateSent}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewDetails(broadcast)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye className="w-4 h-4" strokeWidth={2} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Broadcast Detail Modal */}
      {selectedBroadcast && (
        <BroadcastDetailModal
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          broadcast={selectedBroadcast}
        />
      )}
    </div>
  );
}