import type { MouseEvent } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import type { View } from '@/types/view';

interface ToggleViewProps {
  view: View;
  setView: (view: View) => void;
}

const ToggleView = ({ view, setView }: ToggleViewProps) => {
  const handleChange = (_: MouseEvent<HTMLElement>, newView: View) => {
    setView(newView);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={view}
      exclusive
      onChange={handleChange}
      aria-label="View Mode"
    >
      <ToggleButton value="editor">Editor</ToggleButton>
      <ToggleButton value="preview">Preview</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ToggleView;