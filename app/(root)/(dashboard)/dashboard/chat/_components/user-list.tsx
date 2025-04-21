import { AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

interface OrganizationMember {
  user: User;
}

interface UserListProps {
  users: OrganizationMember[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export default function UserList({ users, selectedUser, onSelectUser }: UserListProps) {
  return (
    <div className="w-64 border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Contacts</h2>
        <div className="space-y-2">
          {users.map((member) => (
            <button
              key={member.user.id}
              className={`w-full p-2 text-left rounded ${
                selectedUser?.id === member.user.id ? 'bg-blue-100' : 'hover:bg-gray-100'
              }`}
              onClick={() => onSelectUser(member.user)}
            >
              <div className="flex items-center space-x-3">
                {member.user.image ? (
                  <Avatar>
                    <AvatarImage src={member.user.image} alt={member.user.name || ''} />
                  </Avatar>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    {member.user.name?.[0]}
                  </div>
                )}
                <span className="font-medium">{member.user.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 