import { useController, UseControllerProps, FieldValues } from 'react-hook-form';
import MuiTextField from '@mui/material/TextField';

type TextInputProps<TFormValues extends FieldValues> = UseControllerProps<TFormValues> & {
  label?: string;
};

const TextField = <TFormValues extends FieldValues>(props: TextInputProps<TFormValues>) => {
  const { field, fieldState } = useController(props);

  return (
    <MuiTextField
      {...field}
      label={props.label}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
      required={!!props.rules?.required}
    />
  );
};

export default TextField;
