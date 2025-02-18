import type { View } from '@/types/view';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import ToggleView from '@/components/ToggleView';
import FetchingError from '@/components/FetchingError';
import FormSkeleton from '@/components/FormSkeleton';

import { useQueryParam } from '@/hooks/useQueryParam';
import { useAppContext } from '@/context/useAppContext';

const App = () => {
  const [view, setView] = useQueryParam<View>('view', 'editor');

  const { state } = useAppContext();

  const renderContent = () => {
    if (state.fetching) {
      return <FormSkeleton />
    }

    if (state.errorFetching) {
      return <FetchingError error={state.errorFetching} />
    }

    if (view === 'editor') {
      return <Editor />
    }

    if (view === 'preview') {
      return <Preview />
    }
  }

  return (
    <Box py={4}>
      <Container maxWidth="sm">
        <Stack gap={4}>
          <Typography variant="h3" component="h1">Basic Form Builder</Typography>
          <ToggleView view={view} setView={setView} />

          {renderContent()}

        </Stack>
      </Container>
    </Box>
  )
}

export default App
