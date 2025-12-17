import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { MessageTemplate } from './BroadcastContent';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface MessageTemplateManagerProps {
  templates: MessageTemplate[];
  onSave: (template: MessageTemplate) => void;
  onDelete: (id: string) => void;
}

export function MessageTemplateManager({ templates, onSave, onDelete }: MessageTemplateManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [templateName, setTemplateName] = useState('');
  const [templateContent, setTemplateContent] = useState('');

  const handleOpenDialog = (template?: MessageTemplate) => {
    if (template) {
      setEditingTemplate(template);
      setTemplateName(template.name);
      setTemplateContent(template.content);
    } else {
      setEditingTemplate(null);
      setTemplateName('');
      setTemplateContent('');
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTemplate(null);
    setTemplateName('');
    setTemplateContent('');
  };

  const handleSave = () => {
    if (!templateName || !templateContent) return;

    const template: MessageTemplate = {
      id: editingTemplate?.id || '',
      name: templateName,
      content: templateContent,
      createdAt: editingTemplate?.createdAt || new Date().toISOString().split('T')[0],
    };

    onSave(template);
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      onDelete(id);
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Message Templates</h3>
            <p className="text-xs text-gray-500 mt-1">Create and manage reusable message templates</p>
          </div>
          <Button
            onClick={() => handleOpenDialog()}
            className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white gap-2"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            New Template
          </Button>
        </div>

        <Card className="rounded-xl border border-gray-200/60 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead>Template Name</TableHead>
                <TableHead>Content Preview</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500 text-sm">
                    No templates yet. Create your first template!
                  </TableCell>
                </TableRow>
              ) : (
                templates.map((template) => (
                  <TableRow 
                    key={template.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <TableCell>
                      <div className="font-medium text-gray-900">{template.name}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600 truncate max-w-md">
                        {template.content}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(template.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenDialog(template)}
                        >
                          <Edit className="w-4 h-4" strokeWidth={2} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(template.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" strokeWidth={2} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Template Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[580px] bg-white border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {editingTemplate ? 'Edit Template' : 'Create New Template'}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              {editingTemplate 
                ? 'Update your message template' 
                : 'Create a reusable message template for your broadcasts'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Template Name *
              </Label>
              <Input
                placeholder="e.g., Welcome Message, Monthly Newsletter"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
              />
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">
                Content *
              </Label>
              <Textarea
                placeholder="Type your message template here... Use {name} for customer name, {plan} for plan type."
                value={templateContent}
                onChange={(e) => setTemplateContent(e.target.value)}
                rows={8}
                className="bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
              />
              <p className="text-xs text-gray-500 mt-2">
                Available variables: {'{name}'}, {'{plan}'}, {'{email}'}
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={handleCloseDialog}
              className="border-gray-200/60 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!templateName || !templateContent}
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              {editingTemplate ? 'Update Template' : 'Create Template'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
