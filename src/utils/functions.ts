import type { FormData } from '@/types/form';

export const generateUniqueId = (prefix?: string) => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}_${timestamp}_${random}`;
};

export const sortFormDataByOrder = (items: FormData[]) => {
  return items.sort((a, b) => a.order - b.order);
}

export const sortFormDataByOrderWithoutHidden = (items: FormData[]) => {
  return items.filter((item) => !item.hidden).sort((a, b) => a.order - b.order);
}