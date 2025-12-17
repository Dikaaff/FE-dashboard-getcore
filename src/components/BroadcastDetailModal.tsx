import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { BroadcastHistory } from './BroadcastContent';
import { Badge } from './ui/badge';
import { cn } from './ui/utils';
import { CheckCircle, XCircle, Clock, Users, MessageSquare, Calendar } from 'lucide-react';
import { Card } from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface BroadcastDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  broadcast: BroadcastHistory;
}

export function BroadcastDetailModal({ open, onOpenChange, broadcast }: BroadcastDetailModalProps) {
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
        return <CheckCircle className="w-4 h-4" strokeWidth={2} />;
      case 'Queued':
        return <Clock className="w-4 h-4" strokeWidth={2} />;
      case 'Failed':
        return <XCircle className="w-4 h-4" strokeWidth={2} />;
      default:
        return null;
    }
  };

  const successRate = broadcast.totalSent > 0 
    ? ((broadcast.successCount / broadcast.totalSent) * 100).toFixed(1)
    : '0';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px] max-h-[90vh] overflow-y-auto bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-xl">{broadcast.name}</DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Broadcast details and delivery status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-gray-50 border border-gray-200/60">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-[#8a25ed]/10 rounded-lg">
                  <Users className="w-4 h-4 text-[#8a25ed]" strokeWidth={2} />
                </div>
                <p className="text-xs text-gray-600">Total Recipients</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900">{broadcast.totalSent}</p>
            </Card>

            <Card className="p-4 bg-green-50 border border-green-200/60">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-200/50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-700" strokeWidth={2} />
                </div>
                <p className="text-xs text-green-700">Successfully Sent</p>
              </div>
              <p className="text-2xl font-semibold text-green-900">{broadcast.successCount}</p>
              <p className="text-xs text-green-600 mt-1">{successRate}% success rate</p>
            </Card>

            <Card className="p-4 bg-red-50 border border-red-200/60">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-200/50 rounded-lg">
                  <XCircle className="w-4 h-4 text-red-700" strokeWidth={2} />
                </div>
                <p className="text-xs text-red-700">Failed</p>
              </div>
              <p className="text-2xl font-semibold text-red-900">{broadcast.failedCount}</p>
            </Card>
          </div>

          {/* Broadcast Information */}
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200/60">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "font-medium border text-xs flex items-center gap-1 w-fit",
                      getStatusBadgeStyle(broadcast.status)
                    )}
                  >
                    {getStatusIcon(broadcast.status)}
                    {broadcast.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Date Sent</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-gray-400" strokeWidth={2} />
                    <p className="text-sm font-medium text-gray-900">{broadcast.dateSent}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200/60">
              <p className="text-xs text-gray-500 mb-1">Receiver Group</p>
              <p className="text-sm font-medium text-gray-900">{broadcast.receiverGroup}</p>
            </div>
          </div>

          {/* Message Content */}
          <div className="p-4 bg-[#8a25ed]/5 rounded-lg border border-[#8a25ed]/20">
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-[#8a25ed]" strokeWidth={2} />
              <p className="text-xs text-[#8a25ed] font-medium">Message Content</p>
            </div>
            <p className="text-sm text-gray-900 whitespace-pre-wrap">{broadcast.message}</p>
          </div>

          {/* Recipients List (if available) */}
          {broadcast.recipients && broadcast.recipients.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Recipients</h4>
              <Card className="rounded-lg border border-gray-200/60 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {broadcast.recipients.map((recipient, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-gray-900">
                          {recipient.name}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {recipient.email}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "font-medium border text-xs",
                              recipient.status === 'sent' 
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            )}
                          >
                            {recipient.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
