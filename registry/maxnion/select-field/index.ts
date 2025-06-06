/**
 * FieldConfig definition — our system will use this config to load and register your field component.
 *
 * 📌 Naming: Please keep the export named (not default), e.g., `SelectFieldConfig`.
 *
 * - `meta`: Used in the "add field" dropdown menu. 
 *    - `typeLabel`: Display name for this field.
 *    - `icon`: Optional icon component (e.g., from lucide-react).
 *
 * - `createInitialSchema`: Returns a valid JSON Schema (draft-07). This will be the initial schema when the field is added.
 *
 * - `createInitialUiSchema`: Optional. Returns a plain object used for custom UI configs. For example, `{ "ui:placeholder": "..." }`.
 *   You can define anything here as long as it's a valid object — this will be passed to your component as `uiSchema`.
 *
 * - `component`: Your actual field component that renders the UI.
 */


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
