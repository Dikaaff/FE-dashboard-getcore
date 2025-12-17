import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Activity, 
  UserPlus, 
  RefreshCw, 
  Tag, 
  FileText,
  Search,
  Filter,
  Eye,
  Send
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ActivityLog {
  id: string;
  timestamp: string;
  customer: string;
  type: 'Customer Updated' | 'Plan Changed' | 'Label Added' | 'Note Added' | 'Broadcast Sent';
  description: string;
  performedBy: string;
  details?: {
    oldValue?: string;
    newValue?: string;
    field?: string;
    content?: string;
  };
}

// Mock data untuk activity logs
const mockActivityLogs: ActivityLog[] = [
  {
    id: '1',
    timestamp: '2025-11-11 14:35',
    customer: 'Budi Santoso',
    type: 'Plan Changed',
    description: 'Plan changed from Standard to Corporate Enterprise',
    performedBy: 'Admin',
    details: {
      oldValue: 'Standard',
      newValue: 'Corporate Enterprise',
      field: 'plan',
    },
  },
  {
    id: '2',
    timestamp: '2025-11-11 13:20',
    customer: 'Siti Aminah',
    type: 'Label Added',
    description: 'Added label "VIP" to customer',
    performedBy: 'Admin',
    details: {
      newValue: 'VIP',
      field: 'label',
    },
  },
  {
    id: '3',
    timestamp: '2025-11-11 12:15',
    customer: 'Ahmad Wijaya',
    type: 'Customer Updated',
    description: 'Email address updated',
    performedBy: 'System',
    details: {
      oldValue: 'ahmad.old@email.com',
      newValue: 'ahmad.w@email.com',
      field: 'email',
    },
  },
  {
    id: '4',
    timestamp: '2025-11-11 11:40',
    customer: 'Dewi Lestari',
    type: 'Note Added',
    description: 'Added note about customer inquiry',
    performedBy: 'Admin',
    details: {
      content: 'Customer requested information about premium features',
    },
  },
  {
    id: '5',
    timestamp: '2025-11-11 10:25',
    customer: 'All Customers',
    type: 'Broadcast Sent',
    description: 'Newsletter sent to 847 customers',
    performedBy: 'Admin',
  },
  {
    id: '6',
    timestamp: '2025-11-11 09:10',
    customer: 'Rizki Pratama',
    type: 'Customer Updated',
    description: 'Phone number updated',
    performedBy: 'Admin',
    details: {
      oldValue: '+62 856-1111-2222',
      newValue: '+62 856-5555-6666',
      field: 'phone',
    },
  },
  {
    id: '7',
    timestamp: '2025-11-10 16:45',
    customer: 'Maya Sari',
    type: 'Plan Changed',
    description: 'Plan changed from Standard to UMKM Professional',
    performedBy: 'Admin',
    details: {
      oldValue: 'Standard',
      newValue: 'UMKM Professional',
      field: 'plan',
    },
  },
  {
    id: '8',
    timestamp: '2025-11-10 15:30',
    customer: 'Budi Santoso',
    type: 'Label Added',
    description: 'Added label "Active"',
    performedBy: 'System',
    details: {
      newValue: 'Active',
      field: 'label',
    },
  },
];

// Mock data untuk activity trend chart
const activityTrendData = [
  { date: '11 Nov', activities: 12 },
  { date: '10 Nov', activities: 19 },
  { date: '09 Nov', activities: 15 },
  { date: '08 Nov', activities: 25 },
  { date: '07 Nov', activities: 22 },
  { date: '06 Nov', activities: 18 },
  { date: '05 Nov', activities: 16 },
];

// Mock data untuk activity type distribution
const activityTypeData = [
  { name: 'Customer Updated', value: 32, color: '#8a25ed' },
  { name: 'Plan Changed', value: 18, color: '#a855f7' },
  { name: 'Label Added', value: 24, color: '#c084fc' },
  { name: 'Note Added', value: 15, color: '#d8b4fe' },
  { name: 'Broadcast Sent', value: 11, color: '#e9d5ff' },
];

export function ActivityLogContent() {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(mockActivityLogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCustomer, setFilterCustomer] = useState<string>('all');
  const [filterPerformedBy, setFilterPerformedBy] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<ActivityLog | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Calculate activity statistics
  const todayActivities = activityLogs.filter(log => {
    const logDate = new Date(log.timestamp);
    const today = new Date();
    return logDate.toDateString() === today.toDateString();
  }).length;

  const customerUpdatedCount = activityLogs.filter(log => log.type === 'Customer Updated').length;
  const planChangesCount = activityLogs.filter(log => log.type === 'Plan Changed').length;
  const labelsUpdatedCount = activityLogs.filter(log => log.type === 'Label Added').length;
  const notesAddedCount = activityLogs.filter(log => log.type === 'Note Added').length;

  // Get unique values for filters
  const uniqueCustomers = Array.from(new Set(activityLogs.map(log => log.customer)));
  const uniquePerformers = Array.from(new Set(activityLogs.map(log => log.performedBy)));

  // Filter activity logs
  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || log.type === filterType;
    const matchesCustomer = filterCustomer === 'all' || log.customer === filterCustomer;
    const matchesPerformer = filterPerformedBy === 'all' || log.performedBy === filterPerformedBy;

    return matchesSearch && matchesType && matchesCustomer && matchesPerformer;
  });

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'Customer Updated':
        return <UserPlus className="w-4 h-4" strokeWidth={2} />;
      case 'Plan Changed':
        return <RefreshCw className="w-4 h-4" strokeWidth={2} />;
      case 'Label Added':
        return <Tag className="w-4 h-4" strokeWidth={2} />;
      case 'Note Added':
        return <FileText className="w-4 h-4" strokeWidth={2} />;
      case 'Broadcast Sent':
        return <Send className="w-4 h-4" strokeWidth={2} />;
      default:
        return <Activity className="w-4 h-4" strokeWidth={2} />;
    }
  };

  const getActivityTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'Customer Updated':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Plan Changed':
        return 'bg-[#8a25ed]/10 text-[#8a25ed] border-[#8a25ed]/20';
      case 'Label Added':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Note Added':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Broadcast Sent':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleViewDetails = (log: ActivityLog) => {
    setSelectedActivity(log);
    setDetailModalOpen(true);
  };

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Page Title */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
        <h1 className="text-gray-900">
          Activity Log
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Monitor all customer activities and system changes in real-time
        </p>
      </div>

      {/* Activity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Activity Trend Chart */}
        <Card className="p-6 border border-gray-200/60 bg-white">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Activity Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={activityTrendData}>
              <defs>
                <linearGradient id="colorActivities" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8a25ed" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8a25ed" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="activities" 
                stroke="#8a25ed" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorActivities)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Activity Type Distribution Chart */}
        <Card className="p-6 border border-gray-200/60 bg-white">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Activity Type Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={activityTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {activityTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend 
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        {/* Activity Type Filter */}
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full lg:w-[200px] bg-white border-gray-200/60">
            <Filter className="w-4 h-4 mr-2" strokeWidth={2} />
            <SelectValue placeholder="Activity Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Customer Updated">Customer Updated</SelectItem>
            <SelectItem value="Plan Changed">Plan Changed</SelectItem>
            <SelectItem value="Label Added">Label Added</SelectItem>
            <SelectItem value="Note Added">Note Added</SelectItem>
            <SelectItem value="Broadcast Sent">Broadcast Sent</SelectItem>
          </SelectContent>
        </Select>

        {/* Customer Filter */}
        <Select value={filterCustomer} onValueChange={setFilterCustomer}>
          <SelectTrigger className="w-full lg:w-[200px] bg-white border-gray-200/60">
            <Filter className="w-4 h-4 mr-2" strokeWidth={2} />
            <SelectValue placeholder="Customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Customers</SelectItem>
            {uniqueCustomers.map(customer => (
              <SelectItem key={customer} value={customer}>{customer}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Performed By Filter */}
        <Select value={filterPerformedBy} onValueChange={setFilterPerformedBy}>
          <SelectTrigger className="w-full lg:w-[200px] bg-white border-gray-200/60">
            <Filter className="w-4 h-4 mr-2" strokeWidth={2} />
            <SelectValue placeholder="Performed By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Performers</SelectItem>
            {uniquePerformers.map(performer => (
              <SelectItem key={performer} value={performer}>{performer}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
          <Input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
          />
        </div>
      </div>

      {/* Activity Log Table */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        <Card className="rounded-xl border border-gray-200/60 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead>Timestamp</TableHead>
                <TableHead>User/Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500 text-sm">
                    No activities found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow 
                    key={log.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell className="text-sm text-gray-600">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">{log.customer}</div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "font-medium border transition-all duration-200 flex items-center gap-1 w-fit",
                          getActivityTypeBadgeStyle(log.type)
                        )}
                      >
                        {getActivityTypeIcon(log.type)}
                        {log.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {log.description}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {log.performedBy}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewDetails(log)}
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
      </div>

      {/* Activity Detail Modal */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-xl">Activity Details</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Detailed information about this activity
            </DialogDescription>
          </DialogHeader>

          {selectedActivity && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200/60">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Activity Type</p>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "font-medium border text-xs flex items-center gap-1 w-fit",
                        getActivityTypeBadgeStyle(selectedActivity.type)
                      )}
                    >
                      {getActivityTypeIcon(selectedActivity.type)}
                      {selectedActivity.type}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Timestamp</p>
                    <p className="text-sm font-medium text-gray-900">{selectedActivity.timestamp}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200/60">
                <p className="text-xs text-gray-500 mb-1">Customer</p>
                <p className="text-sm font-medium text-gray-900">{selectedActivity.customer}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200/60">
                <p className="text-xs text-gray-500 mb-1">Performed By</p>
                <p className="text-sm font-medium text-gray-900">{selectedActivity.performedBy}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200/60">
                <p className="text-xs text-gray-500 mb-1">Description</p>
                <p className="text-sm font-medium text-gray-900">{selectedActivity.description}</p>
              </div>

              {selectedActivity.details && (
                <div className="p-4 bg-[#8a25ed]/5 rounded-lg border border-[#8a25ed]/20">
                  <p className="text-xs text-[#8a25ed] font-medium mb-3">Change Details</p>
                  {selectedActivity.details.field && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500">Field</p>
                      <p className="text-sm font-medium text-gray-900 capitalize">{selectedActivity.details.field}</p>
                    </div>
                  )}
                  {selectedActivity.details.oldValue && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500">Old Value</p>
                      <p className="text-sm font-medium text-gray-900">{selectedActivity.details.oldValue}</p>
                    </div>
                  )}
                  {selectedActivity.details.newValue && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500">New Value</p>
                      <p className="text-sm font-medium text-gray-900">{selectedActivity.details.newValue}</p>
                    </div>
                  )}
                  {selectedActivity.details.content && (
                    <div>
                      <p className="text-xs text-gray-500">Content</p>
                      <p className="text-sm font-medium text-gray-900">{selectedActivity.details.content}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              onClick={() => setDetailModalOpen(false)}
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}