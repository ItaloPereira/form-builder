
import type { FormData } from '@/types/form';

import TextField from '@/components/FormControllers/TextField';
import EditorSortableAccordion from './EditorSortableAccordion';

import { useAppContext } from '@/context/useAppContext';
import type { Control, FieldErrors, FieldValues, UseFormWatch } from 'react-hook-form';

interface EditorFieldItemProps {
  data: FormData;
  watch: UseFormWatch<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues>;
}

const EditorFieldItem = ({ data, watch, errors, control }: EditorFieldItemProps) => {
  const { state } = useAppContext();
  
  const fieldTitle = watch(`${data.id}-title`);
  const childError = Object.keys(errors).some((key) => key.startsWith(data.id));

  return (
    <EditorSortableAccordion
      id={data.id}
      title={fieldTitle || data.title}
      fieldError={childError}
      serverError={state.errorSaving}
      loading={state.saving}
      saved={state.saved}
    >
      <TextField
        control={control}
        name={`${data.id}-title`}
        label="Field title"
        defaultValue={data.title}
        rules={{
          required: 'Field title is required'
        }}
      />
    </EditorSortableAccordion>
  )
};

export default EditorFieldItem;