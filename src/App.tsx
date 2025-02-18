import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useQueryParam } from '@/hooks/useQueryParam';

import type { View } from '@/types/view';

import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import ToggleView from '@/components/ToggleView';

import { useAppContext } from '@/context/useAppContext';

const App = () => {
  const [view, setView] = useQueryParam<View>('view', 'editor');

  const { state } = useAppContext();

  console.log(state);

  return (
    <Box py={4}>
      <Container maxWidth="sm">
        <Stack gap={4}>
          <Typography variant="h3" component="h1">Basic Form Builder</Typography>
          <ToggleView view={view} setView={setView} />
          {view === 'editor' && <Editor />}
          {view === 'preview' && <Preview />}
        </Stack>
      </Container>
    </Box>
  )
}

export default App
