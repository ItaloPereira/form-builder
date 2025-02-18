import { useState } from 'react';

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

import EditorDndWrapper from './EditorDndWrapper';
import EditorSortableAccordion from './EditorSortableAccordion';

import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { useAppContext } from '@/context/useAppContext';
import { generateUniqueId } from '@/utils/uid';

const Editor = () => {
  const { state } = useAppContext();

  const [items, setItems] = useState(state.formData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const reorderedItems = arrayMove(items, oldIndex, newIndex);

        return reorderedItems.map((item, index) => ({
          ...item,
          order: index
        }));
      });
    }
  }

  const handleAddField = () => {
    const newId = generateUniqueId('field');
    setItems([
      ...items,
      {
        id: newId,
        order: items.length,
        title: 'New Field'
      }
    ]);
  }

  return (
    <Stack spacing={5}>
      {items.length > 0 && (
        <EditorDndWrapper handleDragEnd={handleDragEnd} items={items}>
          <Stack spacing={2}>
            {items.map((item) => (
              <EditorSortableAccordion key={item.id} id={item.id} title={item.title}>
                <Typography>
                  {item.title}
                </Typography>
              </EditorSortableAccordion>
            ))}
          </Stack>
        </EditorDndWrapper>
      )}

      {items.length === 0 && (
        <Typography>
          You don't have any form fields added yet, click the button to add the first one
        </Typography>
      )}

      <Stack direction="row" gap={2}>
        <Button
          variant="outlined"
          endIcon={<AddIcon />}
          onClick={handleAddField}
        >
          Add Field
        </Button>
        <Button
          variant="contained"
          endIcon={<SaveIcon />}
          // onClick={handleSave}
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}

export default Editor;
