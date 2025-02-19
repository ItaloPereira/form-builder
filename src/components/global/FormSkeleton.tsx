import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const FormSkeleton = () => {
  return (
    <Stack>
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
      <Skeleton animation="wave" height={50} />
    </Stack>
  )
}

export default FormSkeleton;
