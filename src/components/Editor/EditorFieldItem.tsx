import Stack from '@mui/material/Stack';

import type { FormData } from '@/types/form';

import TextField from '@/components/FormControllers/TextField';
import CheckBox from '@/components/FormControllers/Checkbox';

import EditorSortableAccordion from './EditorSortableAccordion';

import type { Control, FieldErrors, FieldValues, UseFormWatch } from 'react-hook-form';
import { useAppContext } from '@/context/useAppContext';

interface EditorFieldItemProps {
  data: FormData;
  watch: UseFormWatch<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues>;
}

const EditorFieldItem = ({ data, watch, errors, control }: EditorFieldItemProps) => {
  const { state } = useAppContext();
  const fieldTitle = watch(`${data.id}-title`);
  const fieldType = watch(`${data.id}-type`) || 'text';
  
  const childError = Object.keys(errors).some((key) => key.startsWith(data.id));

  return (
    <EditorSortableAccordion
      id={data.id}
      title={fieldTitle || data.title}
      fieldError={childError}
      serverError={state.errorSaving}
    >
      <Stack gap={{ xs: 1, sm: 2 }}>
        <TextField
          control={control}
          name={`${data.id}-title`}
          label="Field title"
          defaultValue={data.title}
          rules={{
            required: 'Field title is required'
          }}
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          gap={{ xs: 1, sm: 2 }}
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          justifyContent="space-between"
        >
          <TextField
            control={control}
            name={`${data.id}-type`}
            label="Field type"
            select
            selectOptions={['text', 'number', 'select']}
            defaultValue={data.type || 'text'}
            rules={{
              required: 'Field type is required'
            }}
          />

          <CheckBox
            control={control}
            name={`${data.id}-required`}
            defaultChecked={data.required || false}
            label="Required"
          />

          <CheckBox
            control={control}
            name={`${data.id}-hidden`}
            defaultChecked={data.hidden || false}
            label="Hidden"
          />
        </Stack>

        {fieldType === 'select' && (
          <TextField
            control={control}
            name={`${data.id}-options`}
            label="Options"
            defaultValue={data.options || ''}
            helperText='Options should be separated by commas eg. "Option 1,Option 2,Option 3"'
            rules={{
              required: 'Options are required'
            }}
          />
        )}

        <TextField
          control={control}
          name={`${data.id}-helper`}
          label="Helper text"
          defaultValue={data.helperText}
          helperText="Additional instructions (optional)"
        />

        {fieldType === 'text' && (
          <CheckBox
            control={control}
            name={`${data.id}-isParagraph`}
            defaultChecked={data.isParagraph || false}
            label="Is paragraph"
          />
        )}

        {fieldType === 'number' && (
          <Stack direction="row" gap={{ xs: 1, sm: 2 }}>
            <TextField
              control={control}
              name={`${data.id}-min`}
              defaultValue={data.min || ''}
              type="number"
              label="Min"
            />

            <TextField
              control={control}
              name={`${data.id}-max`}
              defaultValue={data.max || ''}
              type="number"
              label="Max"
            />
          </Stack>
        )}

      </Stack>

    </EditorSortableAccordion>
  )
};

export default EditorFieldItem;