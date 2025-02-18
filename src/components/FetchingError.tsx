import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

interface FetchingErrorProps {
  error: string;
}

const FetchingError = ({ error }: FetchingErrorProps) => {
  return (
    <Alert  
      severity="error"
      action={
        <Button
          color="inherit"
          size="small"
          onClick={() => {
            window.location.reload();
          }}>
          Reload
        </Button>
      }
    >{error}</Alert>
  );
};

export default FetchingError;
