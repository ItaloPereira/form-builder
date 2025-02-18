import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import ToggleView from '@/components/ToggleView';
import { useQueryParam } from '@/hooks/useQueryParam';

import type { View } from '@/types/view';

const App = () => {
  const [view, setView] = useQueryParam<View>('view', 'editor');

  return (
    <Box py={4}>
      <Container maxWidth="sm">
        <Stack gap={2}>
          <Typography variant="h3" component="h1">Basic Form Builder</Typography>
          <ToggleView view={view} setView={setView} />
          {/* {view === 'editor' && <Editor />}
          {view === 'preview' && <Preview />} */}
        </Stack>
      </Container>
    </Box>
  )
}

export default App
