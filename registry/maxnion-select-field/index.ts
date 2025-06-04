import { List } from 'lucide-react';
import { MaxnionSelectField } from './MaxnionSelectField';
import type { FieldConfig } from './devTypes';

export const MaxnionSelectFieldConfig: FieldConfig = {
  meta: {
    typeLabel: 'Maxnion Select',
    icon: List,
  },
  createInitialSchema: () => ({
    title: '欄位1',
    type: 'string',
    enum: ['選項1'],
    default: '選項1',
  }),
  createInitialUiSchema: () => ({
    'ui:placeholder': '請選擇一個選項',
  }),
  component: MaxnionSelectField,
};
