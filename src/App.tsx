import { useState } from 'react';
import { produce } from 'immer';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SelectFieldConfig } from '../registry/maxnion/select-field';
import type { JSONSchema7 } from 'json-schema';

const FIELD_NAME = 'maxnion-select_zY0w';

const DEFAULT_SCHEMA: JSONSchema7 = {
  title: 'Form Title',
  type: 'object',
  properties: {},
};

export default function Home() {
  const [schema, setSchema] = useState<JSONSchema7>(DEFAULT_SCHEMA);
  const [uiSchema, setUiSchema] = useState<Record<string, unknown>>({});
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const fieldConfig = SelectFieldConfig;
  const SelectField = fieldConfig.component;
  const Icon = fieldConfig.meta.icon;

  const handleAddFormField = () => {
    setSchema(
      produce(schema, draft => {
        if (!draft.properties) {
          draft.properties = {};
        }
        draft.properties[FIELD_NAME] = fieldConfig.createInitialSchema();
      })
    );
    setUiSchema(
      produce(uiSchema, draft => {
        draft[FIELD_NAME] = fieldConfig.createInitialUiSchema?.();
      })
    );
    setFormData(
      produce(formData, draft => {
        draft[FIELD_NAME] = '';
      })
    );
  };

  const handleReset = () => {
    setSchema(DEFAULT_SCHEMA);
    setUiSchema({});
    setFormData({});
  };

  const handleSchemaChange = (schema: JSONSchema7) => {
    setSchema(prev =>
      produce(prev, draft => {
        if (!draft.properties) {
          draft.properties = {};
        }
        draft.properties[FIELD_NAME] = schema;
      })
    );
  };

  const handleUiSchemaChange = (uiSchema: Record<string, unknown>) => {
    setUiSchema(prev =>
      produce(prev, draft => {
        draft[FIELD_NAME] = uiSchema;
      })
    );
  };

  const handleFormDataChange = (value: unknown) => {
    setFormData(prev =>
      produce(prev, draft => {
        draft[FIELD_NAME] = value;
      })
    );
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          shadcn form field registry template
        </h1>
      </header>

      <main className="flex flex-1 flex-col gap-8">
        {/* UI Preview */}
        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div className="flex gap-8">
            <div className="flex flex-1 flex-col gap-2">
              <h2 className="text-lg font-bold">Builder mode</h2>
              {schema.properties?.[FIELD_NAME] && (
                <SelectField
                  mode="builder"
                  schema={schema.properties[FIELD_NAME] as JSONSchema7}
                  uiSchema={uiSchema[FIELD_NAME] as Record<string, unknown>}
                  onSchemaChange={handleSchemaChange}
                  onUiSchemaChange={handleUiSchemaChange}
                />
              )}
              <div className="flex justify-between">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Add Form Field</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleAddFormField}>
                      {Icon && <Icon />}
                      {fieldConfig.meta.typeLabel}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="destructive" onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h2 className="text-lg font-bold">Edit mode</h2>
              {schema.properties?.[FIELD_NAME] && (
                <SelectField
                  mode="edit"
                  value={formData[FIELD_NAME]}
                  onChange={handleFormDataChange}
                  schema={schema.properties[FIELD_NAME] as JSONSchema7}
                  uiSchema={uiSchema[FIELD_NAME] as Record<string, unknown>}
                />
              )}
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <h2 className="text-lg font-bold">Read only mode</h2>
              {schema.properties?.[FIELD_NAME] && (
                <SelectField
                  mode="readOnly"
                  value={formData[FIELD_NAME]}
                  schema={schema.properties[FIELD_NAME] as JSONSchema7}
                  uiSchema={uiSchema[FIELD_NAME] as Record<string, unknown>}
                />
              )}
            </div>
          </div>
        </div>

        {/* Schema, UI Schema, Form Data */}
        <div className="flex gap-4 rounded-lg border p-4">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Schema</h2>
              <pre>{JSON.stringify(schema, null, 2)}</pre>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">UI Schema</h2>
              <pre>{JSON.stringify(uiSchema, null, 2)}</pre>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="text-lg font-bold">Form Data</h2>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}
