import { useState } from 'react';
import { 
  UserPlus, 
  MoreVertical, 
  Edit, 
  UserX, 
  Trash2, 
  Shield, 
  Users, 
  UserCheck, 
  Clock,
  Mail,
  Send,
  X,
  CheckCircle,
  Crown,
  ShieldCheck,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { ScrollArea } from './ui/scroll-area';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'Owner' | 'Admin' | 'Staff';
  status: 'Active' | 'Suspended';
  lastActive: string;
  joinedAt: string;
}

export interface PendingInvite {
  id: string;
  email: string;
  role: 'Admin' | 'Staff';
  sentAt: string;
  status: 'Waiting';
}

export interface Activity {
  id: string;
  type: 'member_added' | 'role_changed' | 'invite_accepted' | 'member_removed';
  description: string;
  timestamp: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@getcore.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'Owner',
    status: 'Active',
    lastActive: '2 min ago',
    joinedAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@getcore.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'Admin',
    status: 'Active',
    lastActive: '1 hour ago',
    joinedAt: '2024-03-20',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.c@getcore.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'Admin',
    status: 'Active',
    lastActive: '3 hours ago',
    joinedAt: '2024-05-10',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@getcore.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    role: 'Staff',
    status: 'Active',
    lastActive: '5 hours ago',
    joinedAt: '2024-08-22',
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.w@getcore.com',
    role: 'Staff',
    status: 'Suspended',
    lastActive: '2 days ago',
    joinedAt: '2024-09-01',
  },
];

const mockPendingInvites: PendingInvite[] = [
  {
    id: '1',
    email: 'newstaff@getcore.com',
    role: 'Staff',
    sentAt: '1 day ago',
    status: 'Waiting',
  },
  {
    id: '2',
    email: 'admin.new@getcore.com',
    role: 'Admin',
    sentAt: '3 days ago',
    status: 'Waiting',
  },
];

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'member_added',
    description: 'Emily Davis was added to the team',
    timestamp: '2 days ago',
  },
  {
    id: '2',
    type: 'role_changed',
    description: 'Michael Chen role changed from Staff to Admin',
    timestamp: '1 week ago',
  },
  {
    id: '3',
    type: 'invite_accepted',
    description: 'Sarah Johnson accepted the invite',
    timestamp: '2 weeks ago',
  },
  {
    id: '4',
    type: 'member_removed',
    description: 'John Doe was removed from team',
    timestamp: '3 weeks ago',
  },
];

const roleColors = {
  Owner: 'bg-orange-100 text-orange-700 border-orange-200',
  Admin: 'bg-purple-100 text-purple-700 border-purple-200',
  Staff: 'bg-blue-100 text-blue-700 border-blue-200',
};

const roleIcons = {
  Owner: Crown,
  Admin: ShieldCheck,
  Staff: User,
};

const statusColors = {
  Active: 'bg-green-100 text-green-700 border-green-200',
  Suspended: 'bg-gray-100 text-gray-700 border-gray-200',
};

export function TeamMembersContent() {
  const [members, setMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [pendingInvites, setPendingInvites] = useState<PendingInvite[]>(mockPendingInvites);
  const [activities] = useState<Activity[]>(mockActivities);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [editMemberDialogOpen, setEditMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  // Invite form state
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Staff'>('Staff');
  
  // Edit form state
  const [editRole, setEditRole] = useState<'Owner' | 'Admin' | 'Staff'>('Staff');

  // Calculate stats
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === 'Active').length;
  const roleDistribution = {
    Owner: members.filter(m => m.role === 'Owner').length,
    Admin: members.filter(m => m.role === 'Admin').length,
    Staff: members.filter(m => m.role === 'Staff').length,
  };

  const handleInviteMember = () => {
    if (!inviteEmail) {
      toast.error('Please enter an email address');
      return;
    }

    const newInvite: PendingInvite = {
      id: Date.now().toString(),
      email: inviteEmail,
      role: inviteRole,
      sentAt: 'Just now',
      status: 'Waiting',
    };

    setPendingInvites([newInvite, ...pendingInvites]);
    toast.success('Invite sent successfully!');
    setInviteDialogOpen(false);
    setInviteEmail('');
    setInviteRole('Staff');
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setEditRole(member.role);
    setEditMemberDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedMember) return;

    setMembers(members.map(m => 
      m.id === selectedMember.id 
        ? { ...m, role: editRole }
        : m
    ));

    toast.success('Member role updated successfully!');
    setEditMemberDialogOpen(false);
    setSelectedMember(null);
  };

  const handleDeactivateMember = (member: TeamMember) => {
    const newStatus = member.status === 'Active' ? 'Suspended' : 'Active';
    setMembers(members.map(m => 
      m.id === member.id 
        ? { ...m, status: newStatus }
        : m
    ));
    toast.success(`Member ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully!`);
  };

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this member from the team?')) {
      setMembers(members.filter(m => m.id !== memberId));
      toast.success('Member removed from team');
    }
  };

  const handleResendInvite = (inviteId: string) => {
    toast.success('Invite resent successfully!');
  };

  const handleCancelInvite = (inviteId: string) => {
    setPendingInvites(pendingInvites.filter(i => i.id !== inviteId));
    toast.success('Invite cancelled');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="px-6 py-6 space-y-6">
      {/* Page Title */}
      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
        <h1 className="text-gray-900">
          Team Members
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your team members, roles, and access control
        </p>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="bg-white border border-gray-200/60 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#8a25ed]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#8a25ed]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Members</p>
              <p className="text-xl text-gray-900">{totalMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200/60 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Members</p>
              <p className="text-xl text-gray-900">{activeMembers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200/60 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Role Distribution</p>
              <p className="text-sm text-gray-900">
                {roleDistribution.Owner} Owner • {roleDistribution.Admin} Admin • {roleDistribution.Staff} Staff
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200/60 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending Invites</p>
              <p className="text-xl text-gray-900">{pendingInvites.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <h2 className="text-lg text-gray-900">Team Members</h2>
        <Button 
          onClick={() => setInviteDialogOpen(true)}
          className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white gap-2"
        >
          <UserPlus className="w-4 h-4" strokeWidth={2} />
          Invite Member
        </Button>
      </div>

      {/* Team Members Table */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        {/* Desktop Table */}
        <div className="hidden md:block bg-white border border-gray-200/60 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
                <TableHead className="text-xs text-gray-900">Member</TableHead>
                <TableHead className="text-xs text-gray-900">Email</TableHead>
                <TableHead className="text-xs text-gray-900">Role</TableHead>
                <TableHead className="text-xs text-gray-900">Status</TableHead>
                <TableHead className="text-xs text-gray-900">Last Active</TableHead>
                <TableHead className="text-xs text-gray-900 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => {
                const RoleIcon = roleIcons[member.role];
                return (
                  <TableRow 
                    key={member.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9 border border-gray-200">
                          {member.avatar ? (
                            <AvatarImage src={member.avatar} />
                          ) : null}
                          <AvatarFallback className="bg-gradient-to-br from-[#8a25ed] to-[#a855f7] text-white text-xs">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-900">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-gray-600">{member.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${roleColors[member.role]} gap-1`}>
                        <RoleIcon className="w-3 h-3" />
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs ${statusColors[member.status]}`}>
                        {member.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-gray-600">{member.lastActive}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" strokeWidth={2} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem 
                            onClick={() => handleEditMember(member)}
                            className="text-sm"
                          >
                            <Edit className="w-4 h-4 mr-2" strokeWidth={2} />
                            Change Role
                          </DropdownMenuItem>
                          {member.role !== 'Owner' && (
                            <>
                              <DropdownMenuItem 
                                onClick={() => handleDeactivateMember(member)}
                                className="text-sm"
                              >
                                <UserX className="w-4 h-4 mr-2" strokeWidth={2} />
                                {member.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleRemoveMember(member.id)}
                                className="text-sm text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" strokeWidth={2} />
                                Remove
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card List */}
        <div className="md:hidden space-y-3">
          {members.map((member) => {
            const RoleIcon = roleIcons[member.role];
            return (
              <div
                key={member.id}
                className="bg-white border border-gray-200/60 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 border border-gray-200">
                      {member.avatar ? (
                        <AvatarImage src={member.avatar} />
                      ) : null}
                      <AvatarFallback className="bg-gradient-to-br from-[#8a25ed] to-[#a855f7] text-white text-xs">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm text-gray-900">{member.name}</h3>
                      <p className="text-xs text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" strokeWidth={2} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuItem onClick={() => handleEditMember(member)}>
                        <Edit className="w-4 h-4 mr-2" strokeWidth={2} />
                        Change Role
                      </DropdownMenuItem>
                      {member.role !== 'Owner' && (
                        <>
                          <DropdownMenuItem onClick={() => handleDeactivateMember(member)}>
                            <UserX className="w-4 h-4 mr-2" strokeWidth={2} />
                            {member.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" strokeWidth={2} />
                            Remove
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={`text-xs ${roleColors[member.role]} gap-1`}>
                    <RoleIcon className="w-3 h-3" />
                    {member.role}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${statusColors[member.status]}`}>
                    {member.status}
                  </Badge>
                </div>

                <p className="text-xs text-gray-500">Last active: {member.lastActive}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout for Pending Invites & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
        {/* Pending Invites */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm text-gray-900">Pending Invites</h3>
            <Badge className="bg-[#8a25ed]/10 text-[#8a25ed] hover:bg-[#8a25ed]/10">
              {pendingInvites.length}
            </Badge>
          </div>

          {pendingInvites.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No pending invites</p>
            </div>
          ) : (
            <ScrollArea className="h-[280px]">
              <div className="space-y-3">
                {pendingInvites.map((invite) => (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between p-3 border border-gray-200/60 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">{invite.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={`text-xs ${roleColors[invite.role]}`}>
                          {invite.role}
                        </Badge>
                        <span className="text-xs text-gray-500">{invite.sentAt}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleResendInvite(invite.id)}
                        title="Resend invite"
                      >
                        <Send className="w-3.5 h-3.5" strokeWidth={2} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 hover:bg-red-50 hover:text-red-600"
                        onClick={() => handleCancelInvite(invite.id)}
                        title="Cancel invite"
                      >
                        <X className="w-3.5 h-3.5" strokeWidth={2} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Team Activity */}
        <div className="bg-white border border-gray-200/60 rounded-xl p-5 hover:shadow-lg transition-all duration-300">
          <h3 className="text-sm text-gray-900 mb-4">Recent Activity</h3>
          
          <ScrollArea className="h-[280px]">
            <div className="space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex gap-3 p-3 border border-gray-200/60 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'member_added' ? 'bg-green-100' :
                    activity.type === 'role_changed' ? 'bg-blue-100' :
                    activity.type === 'invite_accepted' ? 'bg-purple-100' :
                    'bg-red-100'
                  }`}>
                    {activity.type === 'member_added' && <UserPlus className="w-4 h-4 text-green-600" />}
                    {activity.type === 'role_changed' && <Shield className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'invite_accepted' && <CheckCircle className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'member_removed' && <UserX className="w-4 h-4 text-red-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Invite Member Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your team. They will receive an email with instructions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="border-gray-200/60 focus:ring-[#8a25ed]/20 focus:border-[#8a25ed]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={inviteRole} onValueChange={(value: 'Admin' | 'Staff') => setInviteRole(value)}>
                <SelectTrigger id="role" className="border-gray-200/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <div>
                        <div>Admin</div>
                        <div className="text-xs text-gray-500">Full access except billing</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Staff">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <div>
                        <div>Staff</div>
                        <div className="text-xs text-gray-500">Limited access</div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setInviteDialogOpen(false)}
              className="border-gray-200/60"
            >
              Cancel
            </Button>
            <Button
              onClick={handleInviteMember}
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={editMemberDialogOpen} onOpenChange={setEditMemberDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Member Role</DialogTitle>
            <DialogDescription>
              Update {selectedMember?.name}'s role and permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <Select value={editRole} onValueChange={(value: 'Owner' | 'Admin' | 'Staff') => setEditRole(value)}>
                <SelectTrigger id="edit-role" className="border-gray-200/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Owner">
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-orange-600" />
                      <div>
                        <div>Owner</div>
                        <div className="text-xs text-gray-500">Full access including billing</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Admin">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-purple-600" />
                      <div>
                        <div>Admin</div>
                        <div className="text-xs text-gray-500">Full access except billing</div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="Staff">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600" />
                      <div>
                        <div>Staff</div>
                        <div className="text-xs text-gray-500">Limited access</div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Role Permissions Preview */}
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200/60">
              <p className="text-xs text-gray-700 mb-2">Permissions:</p>
              {editRole === 'Owner' && (
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Full access to all features</li>
                  <li>• Manage billing & subscription</li>
                  <li>• Delete team members</li>
                  <li>• Access all customer data</li>
                </ul>
              )}
              {editRole === 'Admin' && (
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Manage customers & plans</li>
                  <li>• Send broadcasts</li>
                  <li>• Manage AI agents</li>
                  <li>• View activity logs</li>
                  <li>• Cannot manage billing</li>
                </ul>
              )}
              {editRole === 'Staff' && (
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• View customer data</li>
                  <li>• Use AI agents</li>
                  <li>• Cannot edit plans</li>
                  <li>• Cannot send broadcasts</li>
                  <li>• Cannot invite team members</li>
                </ul>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditMemberDialogOpen(false)}
              className="border-gray-200/60"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[#8a25ed] hover:bg-[#7a1fd9] text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}