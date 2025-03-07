
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Play, Trash2 } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';

interface PlaylistItemProps {
  videoItem: {
    id: string;
    title: string;
    videoId: string;
  };
  index: number;
  isPlaying: boolean;
  onPlay: (id: string) => void;
  onRemove: (id: string) => void;
}

const PlaylistItem = ({ videoItem, index, isPlaying, onPlay, onRemove }: PlaylistItemProps) => {
  return (
    <Draggable draggableId={videoItem.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-2 p-2 rounded-md flex items-center gap-2 transition-colors ${
            isPlaying ? 'bg-primary/20 border border-primary/30' : 'bg-white/5 hover:bg-white/10'
          } ${snapshot.isDragging ? 'opacity-70' : ''}`}
        >
          <div className="w-14 h-10 bg-black/40 rounded overflow-hidden flex-shrink-0">
            <img 
              src={`https://i.ytimg.com/vi/${videoItem.videoId}/default.jpg`} 
              alt={videoItem.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm truncate ${isPlaying ? 'text-primary' : 'text-white'}`}>
              {videoItem.title}
            </p>
          </div>
          <div className="flex gap-1">
            <CustomButton
              size="icon"
              variant="ghost"
              onClick={() => onPlay(videoItem.videoId)}
              className="h-7 w-7 text-white hover:bg-white/10"
              title="Play now"
            >
              <Play size={14} className={isPlaying ? 'fill-primary/20' : ''} />
            </CustomButton>
            <CustomButton
              size="icon"
              variant="ghost"
              onClick={() => onRemove(videoItem.id)}
              className="h-7 w-7 text-white hover:bg-white/10 hover:text-red-400"
              title="Remove from playlist"
            >
              <Trash2 size={14} />
            </CustomButton>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default PlaylistItem;
