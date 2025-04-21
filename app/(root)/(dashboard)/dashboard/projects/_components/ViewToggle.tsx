import { List, Kanban } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewToggleProps {
  view: 'list' | 'kanban';
  onViewChange: (view: 'list' | 'kanban') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center space-x-2 mb-6">
      <Button
        variant={view === 'list' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="flex items-center"
      >
        <List className="mr-2 h-4 w-4" />
        List
      </Button>
      <Button
        variant={view === 'kanban' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('kanban')}
        className="flex items-center"
      >
        <Kanban className="mr-2 h-4 w-4" />
        Board
      </Button>
    </div>
  );
};

export default ViewToggle;
