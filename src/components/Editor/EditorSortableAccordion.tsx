import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { red } from '@mui/material/colors';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { useSortable } from '@dnd-kit/sortable';
import { useState } from 'react';

interface EditorSortableAccordionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  fieldError: boolean;
  serverError?: string;
}

const EditorSortableAccordion = ({
  id,
  children,
  title,
  fieldError,
  serverError,
}: EditorSortableAccordionProps) => {
  const [expanded, setExpanded] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    zIndex: isDragging ? 1 : undefined,
    position: 'relative' as const,
  };

  const handleChange = (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Accordion defaultExpanded onChange={handleChange} sx={{ border: fieldError || serverError ? `1px solid ${red[500]}` : 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
            style={{ width: '100%', paddingInlineEnd: 8 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <div {...attributes} {...listeners}>
                <DragIndicatorIcon color="action" sx={{ cursor: 'grab' }} />
              </div>

              {!expanded && (
                <Typography>{title}</Typography>
              )}
            </Stack>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default EditorSortableAccordion;