import { List } from 'lucide-react';
import { SelectField } from './SelectField';
import type { FieldConfig } from './devTypes';

export const SelectFieldConfig: FieldConfig = {
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
  component: SelectField,
};
