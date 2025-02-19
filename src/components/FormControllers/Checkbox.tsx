import { useController, UseControllerProps, FieldValues } from 'react-hook-form';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type CheckBoxProps<TFormValues extends FieldValues> = UseControllerProps<TFormValues> & {
  label?: string;
  defaultChecked?: boolean;
};

const CheckBox = <TFormValues extends FieldValues>(props: CheckBoxProps<TFormValues>) => {
  const { field } = useController(props);

  return (
    <FormControlLabel
      control={<Checkbox {...field} defaultChecked={props.defaultChecked} />}
      label={props.label}
    />
  );
};

export default CheckBox;
