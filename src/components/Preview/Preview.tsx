import { useState } from "react";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useAppContext } from "@/context/useAppContext";
import { useForm } from "react-hook-form";

import TextField from "@/components/FormControllers/TextField";

import { sortFormDataByOrderWithoutHidden } from "@/utils/functions";

interface FormValues {
  [key: string]: string;
}

const Preview = () => {
  const { state } = useAppContext();

  const [items] = useState(sortFormDataByOrderWithoutHidden(state.formData));

  const { handleSubmit, control } = useForm();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  if (items.length === 0) {
    return (
      <Typography>
        You don't have visible form fields added yet
      </Typography>
    )
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} gap={5}>
      <Stack gap={3}>
        {items.map((item) => {
          return (
            <TextField
              variant="standard"
              control={control}
              key={item.id}
              label={item.title}
              name={item.id}
              defaultValue=""
            />
          )
        })}
      </Stack>

      <Button variant="contained" type="submit">
        Submit form
      </Button>
    </Stack>
  );
};

export default Preview;
