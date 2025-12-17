import { useState } from 'react';
import { X, Upload, Paperclip, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import { toast } from 'sonner@2.0.3';

type Priority = 'low' | 'medium' | 'high';
type Category = 'bug' | 'request' | 'billing' | 'technical' | 'general';

interface CreateTicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AttachmentFile {
  id: string;
  name: string;
  size: number;
}

export function CreateTicketDialog({ isOpen, onClose }: CreateTicketDialogProps) {
  const [formData, setFormData] = useState({
    reporterName: '',
    reporterEmail: '',
    category: 'general' as Category,
    priority: 'medium' as Priority,
    subject: '',
    description: '',
  });
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: AttachmentFile[] = Array.from(files).map(file => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.reporterName || !formData.subject || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const ticketNumber = 'TKT-2024-' + String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
      
      toast.success(`Ticket ${ticketNumber} created successfully!`);
      
      // Reset form
      setFormData({
        reporterName: '',
        reporterEmail: '',
        category: 'general',
        priority: 'medium',
        subject: '',
        description: '',
      });
      setAttachments([]);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200/60">
          <div>
            <h2 className="text-xl text-gray-900">Create New Ticket</h2>
            <p className="text-sm text-gray-500 mt-1">Buat tiket baru dari laporan internal</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-5">
            {/* Reporter Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Nama Pelapor <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.reporterName}
                  onChange={(e) => handleInputChange('reporterName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Email (opsional)
                </label>
                <input
                  type="email"
                  value={formData.reporterEmail}
                  onChange={(e) => handleInputChange('reporterEmail', e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all"
                />
              </div>
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all cursor-pointer"
                >
                  <option value="general">General</option>
                  <option value="bug">Bug</option>
                  <option value="request">Feature Request</option>
                  <option value="billing">Billing</option>
                  <option value="technical">Technical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all cursor-pointer"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Brief description of the issue"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Deskripsi Masalah <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Jelaskan detail masalah yang dialami..."
                rows={6}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed] transition-all resize-none"
                required
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Attachments (opsional)
              </label>
              
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#8a25ed] transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6 text-gray-600" />
                  </div>
                  <p className="text-sm text-gray-900 mb-1">Click to upload files</p>
                  <p className="text-xs text-gray-500">PNG, JPG, PDF, TXT up to 10MB</p>
                </label>
              </div>

              {/* Attachment List */}
              {attachments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <Paperclip className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(file.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200/60 flex items-center justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Ticket'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
