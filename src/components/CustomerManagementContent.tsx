import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Plus, Filter, Download } from 'lucide-react';
import { CustomerTable } from './CustomerTable';
import { AddCustomerDialog } from './AddCustomerDialog';
import { CustomerDetailView } from './CustomerDetailView';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  planType: 'Standard' | 'UMKM Professional' | 'Enterprise';
  labels: string[];
  createdAt: string;
  customFields?: { [key: string]: string };
  notes?: Note[];
}

export interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

// Mock data
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    phone: '+62 812-3456-7890',
    email: 'budi.santoso@email.com',
    planType: 'Enterprise',
    labels: ['VIP', 'Active'],
    createdAt: '2025-01-15',
    customFields: { company: 'PT Maju Jaya', industry: 'Technology' },
    notes: [
      { id: '1', content: 'Customer meminta demo produk', author: 'Admin', timestamp: '2025-01-15 10:30' }
    ]
  },
  {
    id: '2',
    name: 'Siti Aminah',
    phone: '+62 813-9876-5432',
    email: 'siti.aminah@email.com',
    planType: 'UMKM Professional',
    labels: ['Active', 'Referral'],
    createdAt: '2025-02-20',
  },
  {
    id: '3',
    name: 'Ahmad Wijaya',
    phone: '+62 821-1111-2222',
    email: 'ahmad.w@email.com',
    planType: 'Standard',
    labels: ['New', 'Trial'],
    createdAt: '2025-03-10',
  },
  {
    id: '4',
    name: 'Dewi Lestari',
    phone: '+62 822-3333-4444',
    email: 'dewi.lestari@email.com',
    planType: 'Enterprise',
    labels: ['VIP', 'Active', 'Premium'],
    createdAt: '2024-12-05',
  },
  {
    id: '5',
    name: 'Rizki Pratama',
    phone: '+62 856-5555-6666',
    email: 'rizki.p@email.com',
    planType: 'Standard',
    labels: ['Active'],
    createdAt: '2025-02-28',
  },
];

export function CustomerManagementContent() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState<string>('all');
  const [filterLabel, setFilterLabel] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [viewingCustomer, setViewingCustomer] = useState<Customer | null>(null);

  // Get unique labels
  const allLabels = Array.from(new Set(customers.flatMap(c => c.labels)));

  // Filter customers
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    
    const matchesPlan = filterPlan === 'all' || customer.planType === filterPlan;
    const matchesLabel = filterLabel === 'all' || customer.labels.includes(filterLabel);

    return matchesSearch && matchesPlan && matchesLabel;
  });

  const handleAddCustomer = (customer: Customer) => {
    setCustomers([...customers, { ...customer, id: Date.now().toString() }]);
    setIsAddDialogOpen(false);
  };

  const handleEditCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    setEditingCustomer(null);
  };

  const handleDeleteCustomer = (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(c => c.id !== id));
    }
  };

  const handleViewCustomer = (customer: Customer) => {
    setViewingCustomer(customer);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(customers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
    setViewingCustomer(updatedCustomer);
  };

  // If viewing customer detail
  if (viewingCustomer) {
    return (
      <CustomerDetailView
        customer={viewingCustomer}
        onBack={() => setViewingCustomer(null)}
        onUpdate={handleUpdateCustomer}
      />
    );
  }

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Page Title */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Customer Management
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your customers, plans, and track their activities
        </p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col lg:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={2} />
          <Input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={filterPlan} onValueChange={setFilterPlan}>
            <SelectTrigger className="w-[180px] bg-white border-gray-200/60">
              <Filter className="w-4 h-4 mr-2" strokeWidth={2} />
              <SelectValue placeholder="Plan Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="UMKM Professional">UMKM Professional</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterLabel} onValueChange={setFilterLabel}>
            <SelectTrigger className="w-[180px] bg-white border-gray-200/60">
              <Filter className="w-4 h-4 mr-2" strokeWidth={2} />
              <SelectValue placeholder="Labels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Labels</SelectItem>
              {allLabels.map(label => (
                <SelectItem key={label} value={label}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="border-gray-200/60 hover:bg-gray-50">
            <Download className="w-4 h-4" strokeWidth={2} />
          </Button>
        </div>

        {/* Add Customer Button */}
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Add Customer
        </Button>
      </div>

      {/* Customer Table */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <CustomerTable
          customers={filteredCustomers}
          onEdit={setEditingCustomer}
          onDelete={handleDeleteCustomer}
          onView={handleViewCustomer}
        />
      </div>

      {/* Add Customer Dialog */}
      <AddCustomerDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSave={handleAddCustomer}
      />

      {/* Edit Customer Dialog */}
      {editingCustomer && (
        <AddCustomerDialog
          open={!!editingCustomer}
          onOpenChange={(open) => !open && setEditingCustomer(null)}
          onSave={handleEditCustomer}
          customer={editingCustomer}
        />
      )}
    </div>
  );
}
