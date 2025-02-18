import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

const FormSkeleton = () => {
  return (
    <Stack>
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
      <Skeleton animation="wave" height={100} />
    </Stack>
  )
}

export default FormSkeleton;
