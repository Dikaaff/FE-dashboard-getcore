import { useState } from 'react';
import { ArrowLeft, Edit, Mail, Phone, Calendar, Tag, FileText, Activity as ActivityIcon } from 'lucide-react';
import { Customer, Note } from './CustomerManagementContent';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { AddCustomerDialog } from './AddCustomerDialog';

interface CustomerDetailViewProps {
  customer: Customer;
  onBack: () => void;
  onUpdate: (customer: Customer) => void;
}

export function CustomerDetailView({ customer, onBack, onUpdate }: CustomerDetailViewProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>(customer.notes || []);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      author: 'Admin',
      timestamp: new Date().toLocaleString('id-ID'),
    };
    
    const updatedNotes = [note, ...notes];
    setNotes(updatedNotes);
    onUpdate({ ...customer, notes: updatedNotes });
    setNewNote('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const planColors = {
    'Standard': 'bg-blue-100 text-blue-700 border-blue-200',
    'UMKM Professional': 'bg-purple-100 text-purple-700 border-purple-200',
    'Enterprise': 'bg-orange-100 text-orange-700 border-orange-200',
  };

  return (
    <div className="px-6 py-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="hover:bg-gray-50 transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
              {customer.name}
            </h1>
            <p className="text-sm text-gray-500">Customer Details & Activity</p>
          </div>
        </div>
        <Button
          onClick={() => setIsEditDialogOpen(true)}
          className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white gap-2 hover:scale-105 active:scale-95 transition-all"
        >
          <Edit className="w-4 h-4" strokeWidth={2} />
          Edit Customer
        </Button>
      </div>

      {/* Customer Summary Card */}
      <Card className="p-6 border border-gray-200/60 bg-white hover:shadow-lg transition-all duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#8a25ed]/10 rounded-lg">
              <Phone className="w-4 h-4 text-[#8a25ed]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Phone Number</p>
              <p className="text-sm font-medium text-gray-900">{customer.phone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#8a25ed]/10 rounded-lg">
              <Mail className="w-4 h-4 text-[#8a25ed]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Email Address</p>
              <p className="text-sm font-medium text-gray-900 break-all">{customer.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#8a25ed]/10 rounded-lg">
              <FileText className="w-4 h-4 text-[#8a25ed]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Current Plan</p>
              <Badge variant="outline" className={`text-xs font-medium ${planColors[customer.planType]}`}>
                {customer.planType}
              </Badge>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#8a25ed]/10 rounded-lg">
              <Calendar className="w-4 h-4 text-[#8a25ed]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Created At</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(customer.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Labels */}
        {customer.labels && customer.labels.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-gray-500" strokeWidth={2} />
              <span className="text-xs font-medium text-gray-700">Labels</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {customer.labels.map((label, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-xs font-medium bg-[#8a25ed]/10 text-[#8a25ed] border-[#8a25ed]/20"
                >
                  {label}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="information" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-100/50">
          <TabsTrigger value="information" className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#8a25ed]">
            Information
          </TabsTrigger>
          <TabsTrigger value="notes" className="text-sm data-[state=active]:bg-white data-[state=active]:text-[#8a25ed]">
            Notes ({notes.length})
          </TabsTrigger>
        </TabsList>

        {/* Information Tab */}
        <TabsContent value="information" className="mt-6">
          <Card className="p-6 border border-gray-200/60 bg-white">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer Information</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Full Name</p>
                  <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Plan Type</p>
                  <Badge variant="outline" className={`text-xs ${planColors[customer.planType]}`}>
                    {customer.planType}
                  </Badge>
                </div>
              </div>

              {customer.customFields && Object.keys(customer.customFields).length > 0 && (
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-900 mb-3">Custom Fields</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(customer.customFields).map(([key, value]) => (
                      <div key={key} className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1 capitalize">{key}</p>
                        <p className="text-sm font-medium text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="mt-6">
          <Card className="p-6 border border-gray-200/60 bg-white">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer Notes</h3>
            
            {/* Add Note */}
            <div className="mb-6">
              <Textarea
                placeholder="Add a new note about this customer..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="mb-2 bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
              />
              <Button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white text-sm"
              >
                Add Note
              </Button>
            </div>

            {/* Notes List */}
            <div className="space-y-3">
              {notes.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No notes yet. Add your first note above.
                </div>
              ) : (
                notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200/60 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-medium text-[#8a25ed]">{note.author}</span>
                      <span className="text-xs text-gray-500">{note.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{note.content}</p>
                  </div>
                ))
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <AddCustomerDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={(updated) => {
          onUpdate(updated);
          setIsEditDialogOpen(false);
        }}
        customer={customer}
      />
    </div>
  );
}