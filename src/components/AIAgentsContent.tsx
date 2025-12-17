import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Bot,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Power,
  AlertCircle,
  CheckCircle,
  XCircle
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
import { toast } from 'sonner@2.0.3';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

export interface AIAgent {
  id: string;
  name: string;
  status: 'Active' | 'Connected' | 'Disconnected' | 'Error';
  linkedInbox: string;
  platform: 'WhatsApp' | 'Email' | 'Telegram' | 'Web Chat';
  planCompatibility: 'Standard' | 'UMKM' | 'Corporate';
  lastUpdated: string;
}

const mockAgents: AIAgent[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    status: 'Active',
    linkedInbox: 'support@getcore.com',
    platform: 'Email',
    planCompatibility: 'Corporate',
    lastUpdated: '2025-11-11 14:30',
  },
  {
    id: '2',
    name: 'WhatsApp Sales Agent',
    status: 'Connected',
    linkedInbox: '+62 812-3456-7890',
    platform: 'WhatsApp',
    planCompatibility: 'UMKM',
    lastUpdated: '2025-11-11 12:15',
  },
  {
    id: '3',
    name: 'Lead Qualification Bot',
    status: 'Active',
    linkedInbox: 'leads@getcore.com',
    platform: 'Web Chat',
    planCompatibility: 'Standard',
    lastUpdated: '2025-11-10 18:45',
  },
  {
    id: '4',
    name: 'Telegram Support',
    status: 'Error',
    linkedInbox: '@getcore_support',
    platform: 'Telegram',
    planCompatibility: 'Corporate',
    lastUpdated: '2025-11-09 09:20',
  },
  {
    id: '5',
    name: 'General Inquiry Bot',
    status: 'Disconnected',
    linkedInbox: 'info@getcore.com',
    platform: 'Email',
    planCompatibility: 'Standard',
    lastUpdated: '2025-11-08 16:00',
  },
];

interface AIAgentsContentProps {
  onManageAgent: (agentId: string) => void;
}

export function AIAgentsContent({ onManageAgent }: AIAgentsContentProps) {
  const [agents, setAgents] = useState<AIAgent[]>(mockAgents);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<string | null>(null);

  // Filter agents
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.linkedInbox.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || agent.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || agent.planCompatibility === filterPlan;
    const matchesPlatform = filterPlatform === 'all' || agent.platform === filterPlatform;

    return matchesSearch && matchesStatus && matchesPlan && matchesPlatform;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'Connected':
        return (
          <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
            <Power className="w-3 h-3 mr-1" />
            Connected
          </Badge>
        );
      case 'Disconnected':
        return (
          <Badge className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50">
            <XCircle className="w-3 h-3 mr-1" />
            Disconnected
          </Badge>
        );
      case 'Error':
        return (
          <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    const colors = {
      'Standard': 'bg-gray-50 text-gray-700 border-gray-200',
      'UMKM': 'bg-blue-50 text-blue-700 border-blue-200',
      'Corporate': 'bg-[#8a25ed]/10 text-[#8a25ed] border-[#8a25ed]/20',
    };
    return (
      <Badge className={cn('hover:bg-opacity-100', colors[plan as keyof typeof colors])}>
        {plan}
      </Badge>
    );
  };

  const getPlatformBadge = (platform: string) => {
    const colors = {
      'WhatsApp': 'bg-green-50 text-green-700',
      'Email': 'bg-blue-50 text-blue-700',
      'Telegram': 'bg-cyan-50 text-cyan-700',
      'Web Chat': 'bg-purple-50 text-purple-700',
    };
    return (
      <span className={cn('px-2 py-1 rounded-md text-xs', colors[platform as keyof typeof colors])}>
        {platform}
      </span>
    );
  };

  const confirmDeleteAgent = (id: string) => {
    setAgentToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteAgent = () => {
    if (agentToDelete) {
      setAgents(agents.filter(a => a.id !== agentToDelete));
      toast.success('AI Agent deleted successfully!');
      setDeleteDialogOpen(false);
      setAgentToDelete(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-gray-900 mb-1">AI Agents</h1>
          <p className="text-sm text-gray-500">Manage your AI-powered customer service agents</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white border-gray-200/60 shadow-sm rounded-2xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents..."
              className="pl-10 border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg"
            />
          </div>

          {/* Status Filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg">
              <Filter className="w-4 h-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Connected">Connected</SelectItem>
              <SelectItem value="Disconnected">Disconnected</SelectItem>
              <SelectItem value="Error">Error</SelectItem>
            </SelectContent>
          </Select>

          {/* Plan Filter */}
          <Select value={filterPlan} onValueChange={setFilterPlan}>
            <SelectTrigger className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg">
              <Filter className="w-4 h-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="UMKM">UMKM</SelectItem>
              <SelectItem value="Corporate">Corporate</SelectItem>
            </SelectContent>
          </Select>

          {/* Platform Filter */}
          <Select value={filterPlatform} onValueChange={setFilterPlatform}>
            <SelectTrigger className="border-gray-200/60 focus:border-[#8a25ed] focus:ring-[#8a25ed]/20 rounded-lg">
              <Filter className="w-4 h-4 mr-2 text-gray-500" />
              <SelectValue placeholder="Filter by platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
              <SelectItem value="Email">Email</SelectItem>
              <SelectItem value="Telegram">Telegram</SelectItem>
              <SelectItem value="Web Chat">Web Chat</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Agents Table */}
      <Card className="bg-white border-gray-200/60 shadow-sm rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="text-gray-700">Agent Name</TableHead>
                <TableHead className="text-gray-700">Status</TableHead>
                <TableHead className="text-gray-700">Linked Inbox / Platform</TableHead>
                <TableHead className="text-gray-700">Plan</TableHead>
                <TableHead className="text-gray-700">Last Updated</TableHead>
                <TableHead className="text-gray-700 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Bot className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No agents found</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredAgents.map((agent) => (
                  <TableRow key={agent.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#8a25ed]/10 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-[#8a25ed]" />
                        </div>
                        <span className="text-sm text-gray-900">{agent.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(agent.status)}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-gray-900">{agent.linkedInbox}</span>
                        {getPlatformBadge(agent.platform)}
                      </div>
                    </TableCell>
                    <TableCell>{getPlanBadge(agent.planCompatibility)}</TableCell>
                    <TableCell className="text-sm text-gray-600">{agent.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onManageAgent(agent.id)}
                          className="text-[#8a25ed] hover:text-[#7a1fd4] hover:bg-[#8a25ed]/10 rounded-lg"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Manage
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => confirmDeleteAgent(agent.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete AI Agent</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this AI agent? This action cannot be undone and will disconnect the agent from all linked platforms.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAgent}
              className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}