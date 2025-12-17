import { useState } from 'react';
import { MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Customer } from './CustomerManagementContent';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (id: string) => void;
  onView: (customer: Customer) => void;
}

const ITEMS_PER_PAGE = 10;

const planColors = {
  'Standard': 'bg-blue-100 text-blue-700 border-blue-200',
  'UMKM Professional': 'bg-purple-100 text-purple-700 border-purple-200',
  'Enterprise': 'bg-orange-100 text-orange-700 border-orange-200',
};

const labelColors = [
  'bg-[#8a25ed]/10 text-[#8a25ed] border-[#8a25ed]/20',
  'bg-green-100 text-green-700 border-green-200',
  'bg-pink-100 text-pink-700 border-pink-200',
  'bg-cyan-100 text-cyan-700 border-cyan-200',
  'bg-amber-100 text-amber-700 border-amber-200',
];

export function CustomerTable({ customers, onEdit, onDelete, onView }: CustomerTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(customers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCustomers = customers.slice(startIndex, endIndex);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block bg-white border border-gray-200/60 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
              <TableHead className="font-semibold text-gray-900 text-xs">Name</TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">Contact</TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">Plan Type</TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">Labels</TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs">Created At</TableHead>
              <TableHead className="font-semibold text-gray-900 text-xs text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentCustomers.map((customer, index) => (
              <TableRow 
                key={customer.id} 
                className="hover:bg-gray-50/50 transition-colors cursor-pointer group"
                onClick={() => onView(customer)}
              >
                <TableCell className="font-medium text-sm text-gray-900">
                  {customer.name}
                </TableCell>
                <TableCell className="text-xs text-gray-600">
                  <div className="space-y-0.5">
                    <div>{customer.phone}</div>
                    <div className="text-gray-500">{customer.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-xs font-medium ${planColors[customer.planType]}`}>
                    {customer.planType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {customer.labels.slice(0, 2).map((label, idx) => (
                      <Badge 
                        key={idx} 
                        variant="outline" 
                        className={`text-[10px] font-medium ${labelColors[idx % labelColors.length]}`}
                      >
                        {label}
                      </Badge>
                    ))}
                    {customer.labels.length > 2 && (
                      <Badge variant="outline" className="text-[10px] font-medium bg-gray-100 text-gray-600 border-gray-200">
                        +{customer.labels.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-xs text-gray-600">
                  {formatDate(customer.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" strokeWidth={2} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView(customer); }} className="text-sm">
                        <Eye className="w-4 h-4 mr-2" strokeWidth={2} />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(customer); }} className="text-sm">
                        <Edit className="w-4 h-4 mr-2" strokeWidth={2} />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={(e) => { e.stopPropagation(); onDelete(customer.id); }} 
                        className="text-sm text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" strokeWidth={2} />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card List */}
      <div className="md:hidden space-y-3">
        {currentCustomers.map((customer) => (
          <div
            key={customer.id}
            onClick={() => onView(customer)}
            className="bg-white border border-gray-200/60 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{customer.name}</h3>
                <p className="text-xs text-gray-500">{customer.phone}</p>
                <p className="text-xs text-gray-500">{customer.email}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" strokeWidth={2} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onView(customer); }}>
                    <Eye className="w-4 h-4 mr-2" strokeWidth={2} />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(customer); }}>
                    <Edit className="w-4 h-4 mr-2" strokeWidth={2} />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => { e.stopPropagation(); onDelete(customer.id); }}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" strokeWidth={2} />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className={`text-xs ${planColors[customer.planType]}`}>
                {customer.planType}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-2">
              {customer.labels.map((label, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className={`text-[10px] ${labelColors[idx % labelColors.length]}`}
                >
                  {label}
                </Badge>
              ))}
            </div>
            
            <p className="text-xs text-gray-500">Created: {formatDate(customer.createdAt)}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
