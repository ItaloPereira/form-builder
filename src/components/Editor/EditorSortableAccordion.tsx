import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
  
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { useSortable } from '@dnd-kit/sortable';

interface EditorSortableAccordionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const EditorSortableAccordion = ({ id, children, title }: EditorSortableAccordionProps) => {
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

  return (
    <div ref={setNodeRef} style={style}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <div {...attributes} {...listeners}>
              <DragIndicatorIcon color="action" sx={{ cursor: 'grab' }} />
            </div>
            <Typography>{title}</Typography>
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