import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialItems = [
  { id: 'item-1', content: 'عنصر 1' },
  { id: 'item-2', content: 'عنصر 2' },
  { id: 'item-3', content: 'عنصر 3' },
  { id: 'item-4', content: 'عنصر 4' },
];

const DragDropManager = () => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h3>إعادة ترتيب العناصر بالسحب والإفلات</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              style={{ background: '#f0f0f0', padding: 10, borderRadius: 5 }}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        userSelect: 'none',
                        padding: '16px',
                        margin: '0 0 8px 0',
                        background: snapshot.isDragging ? '#a0d2ff' : '#ffffff',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        ...provided.draggableProps.style,
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DragDropManager;
