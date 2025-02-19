import { useController, UseControllerProps, FieldValues } from 'react-hook-form';
import MuiTextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

type TextInputProps<TFormValues extends FieldValues> = UseControllerProps<TFormValues> & {
  label?: string;
  variant?: 'outlined' | 'standard';
  fullWidth?: boolean;
  select?: boolean;
  selectOptions?: string[];
  helperText?: string;
  type?: 'text' | 'number';
};

const TextField = <TFormValues extends FieldValues>(props: TextInputProps<TFormValues>) => {
  const { field, fieldState } = useController(props);

  return (
    <MuiTextField
      {...field}
      label={props.label}
      variant={props.variant}
      select={props.select}
      error={!!fieldState.error}
      helperText={fieldState.error?.message || props.helperText}
      required={!!props.rules?.required}
      fullWidth
      type={props.type}
    >
      {props.selectOptions?.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </MuiTextField>
  );
};

export default TextField;
