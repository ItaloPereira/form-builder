import { useState, useEffect, useCallback } from 'react';

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

import EditorDndWrapper from './EditorDndWrapper';
import EditorFieldItem from './EditorFieldItem';

import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { useForm } from 'react-hook-form';
import { useAppContext } from '@/context/useAppContext';
import { generateUniqueId, sortFormDataByOrder } from '@/utils/functions';

import type { FormData } from '@/types/form';

interface FormValues {
  [key: string]: string;
}

const Editor = () => {
  const { state, saveFormData } = useAppContext();
  const [items, setItems] = useState(sortFormDataByOrder(state.formData));

  const { handleSubmit, control, watch, formState: { errors, isDirty } } = useForm<FormValues>();

  const onSubmit = useCallback((data: FormValues) => {
    const formData = Object.entries(data).map(([key, value]) => {
      const id = key.split('-')[0];
      const selectedItem = items.find((item) => item.id === id) as FormData;
      const order = selectedItem.order || 0;

      return {
        id,
        title: value,
        order
      }
    });

    saveFormData(formData);
  }, [items, saveFormData]);

  useEffect(() => {
    if (!isDirty) return;

    const interval = setInterval(() => {
      console.log('save');
      handleSubmit(onSubmit)();
    }, 5000);

    return () => {
      clearInterval(interval);
    }
  }, [isDirty, handleSubmit, onSubmit]);

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
        title: ''
      }
    ]);
  }

  return (
    <Stack 
      spacing={5} 
      component="form" 
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {items.length > 0 && (
        <EditorDndWrapper handleDragEnd={handleDragEnd} items={items}>
          <Stack spacing={2}>
            {items.map((item) => (
              <EditorFieldItem
                key={item.id}
                data={item}
                watch={watch}
                errors={errors}
                control={control}
              />
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
          disabled={!isDirty || state.saving}
          type="submit"
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}

export default Editor;
