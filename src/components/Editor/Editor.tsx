import { useState, useEffect, useCallback } from 'react';

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

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
  const { state, saveFormData, updateData } = useAppContext();
  const [items, setItems] = useState(sortFormDataByOrder(state.formData));
  const [showSaved, setShowSaved] = useState(false);

  const { handleSubmit, control, watch, formState: { errors, isDirty } } = useForm<FormValues>();
  const allFields = watch(); 

  useEffect(() => {
    if (state.saved) {
      setShowSaved(true);
      const timer = setTimeout(() => {
        setShowSaved(false);
        updateData({ saved: false });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.saved, updateData]);

  const getUpdatedItems = useCallback((data: FormValues) => {
    const fieldIds = new Set(
      Object.keys(data).map(key => key.split('-')[0])
    );

    const formattedData: FormData[] = Array.from(fieldIds).map(fieldId => {
      const type = (data[`${fieldId}-type`] || 'text') as FormData['type'];

      const fieldData: FormData = {
        id: fieldId,
        order: items.find(item => item.id === fieldId)?.order ?? 0,
        title: data[`${fieldId}-title`] || '',
        type,
        hidden: Boolean(data[`${fieldId}-hidden`]),
        helperText: data[`${fieldId}-helper`] || '',
        required: Boolean(data[`${fieldId}-required`]),
        isParagraph: Boolean(data[`${fieldId}-isParagraph`]),
        options: data[`${fieldId}-options`] || '',
      };

      if (type === 'number') {
        fieldData.min = data[`${fieldId}-min`] ? Number(data[`${fieldId}-min`]) : undefined;
        fieldData.max = data[`${fieldId}-max`] ? Number(data[`${fieldId}-max`]) : undefined;
      }

      return fieldData;
    });

    return formattedData;
  }, [items]);

  const onSubmit = useCallback((data: FormValues) => {
    const formattedData = getUpdatedItems(data);
    saveFormData(formattedData);
  }, [saveFormData, getUpdatedItems]);

  useEffect(() => {
    if (!isDirty) return;

    const interval = setInterval(() => {
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
    const updatedItems = getUpdatedItems(allFields);
    const newId = generateUniqueId('field');
    setItems([
      ...updatedItems,
      {
        id: newId,
        order: items.length,
        title: '',
        required: true,
        hidden: false,
        helperText: '',
        type: 'text',
        isParagraph: false,
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

      <Stack gap={2}>
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

        {state.saving && (
          <Stack direction="row" spacing={1} alignItems="center">
            <CircularProgress size={20} />
            <Typography color="text.secondary">Auto saving...</Typography>
          </Stack>
        )}

        {!state.saving && !state.errorSaving && (
          <Fade in={showSaved} timeout={500} unmountOnExit>
            <Stack direction="row" spacing={1} alignItems="center">
              <CheckCircleIcon color="success" />
              <Typography color="success">Saved</Typography>
            </Stack>
          </Fade>
        )}

        {state.errorSaving && (
          <Stack direction="row" spacing={1} alignItems="center">
            <ErrorIcon color="error" />
            <Typography color="error">{state.errorSaving}</Typography>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default Editor;
