import type { JSONSchema7 } from 'json-schema';
import type { FieldError } from 'react-hook-form';

export interface FieldProps {
  mode: 'build' | 'fill' | 'review';
  schema: JSONSchema7;
  uiSchema?: Record<string, unknown>;
  value?: unknown;
  onChange?: (value: unknown) => void;
  onSchemaChange?: (schema: JSONSchema7) => void;
  onUiSchemaChange?: (uiSchema: Record<string, unknown>) => void;
  error?: FieldError;
}

export interface FieldConfig {
  meta: {
    typeLabel: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
  createInitialSchema: () => JSONSchema7;
  createInitialUiSchema?: () => Record<string, unknown>;
  component: React.ComponentType<FieldProps>;
}
