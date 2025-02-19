export interface FormData {
  id: string;
  order: number;
  title: string;
  required: boolean;
  hidden: boolean;
  helperText?: string;
  type: 'text' | 'number' | 'select';
  isParagraph?: boolean;
  options?: string;
  min?: number;
  max?: number;
}
