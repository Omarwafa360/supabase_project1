import React from 'react';
import * as icons from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const iconList = [
  'Rocket', 'Smile', 'Heart', 'Star', 'Zap', 'Sun', 'Moon', 'Cloud', 'Wind', 'Code', 'PenTool', 'Brush',
  'Camera', 'Video', 'Music', 'Mic', 'Book', 'Coffee', 'Cpu', 'Feather', 'Flag', 'Gift', 'Globe', 'Home',
  'Image', 'Key', 'Link', 'Lock', 'Mail', 'MapPin', 'MousePointer', 'Package', 'Phone', 'PieChart', 'Printer',
  'Save', 'Scissors', 'Search', 'Send', 'Settings', 'Shield', 'ShoppingBag', 'Smartphone', 'Speaker', 'Tag',
  'Target', 'ThumbsUp', 'Trash2', 'Umbrella', 'User', 'Watch', 'Wifi', 'Award', 'BarChart2', 'BatteryCharging',
  'Bell', 'Briefcase', 'Calendar', 'CheckCircle', 'ChevronDown', 'Clock', 'Compass', 'Copy', 'CreditCard',
  'Database', 'Disc', 'Edit', 'ExternalLink', 'File', 'Filter', 'Folder', 'GitBranch', 'HardDrive', 'Hash',
  'HelpCircle', 'Inbox', 'Info', 'Layout', 'LifeBuoy', 'LogIn', 'LogOut', 'Menu', 'MessageSquare', 'Monitor',
  'MoreHorizontal', 'Move', 'Paperclip', 'PauseCircle', 'PlayCircle', 'PlusCircle', 'Power', 'RefreshCw',
  'Repeat', 'RotateCw', 'Share2', 'Slash', 'Sliders', 'Terminal', 'ToggleLeft', 'Tool', 'Trello', 'TrendingUp',
  'Truck', 'Twitter', 'Type', 'UploadCloud', 'Voicemail', 'Volume2', 'XCircle', 'Youtube', 'ZoomIn', 'ZoomOut'
];

const IconPicker = ({ value, onChange }) => {
  const LucideIcon = icons[value] || icons.Smile;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <LucideIcon className="ml-2 h-5 w-5" />
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 w-80">
        <div className="grid grid-cols-6 gap-1 max-h-64 overflow-y-auto">
          {iconList.map((iconName) => {
            const IconComponent = icons[iconName];
            return (
              <Button
                key={iconName}
                variant="ghost"
                size="icon"
                className={cn("h-10 w-10", value === iconName && "bg-accent text-accent-foreground")}
                onClick={() => onChange(iconName)}
              >
                <IconComponent className="h-5 w-5" />
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default IconPicker;