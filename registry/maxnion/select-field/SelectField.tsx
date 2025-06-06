import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { FieldProps } from './devTypes';

export const SelectField = (props: FieldProps) => {
  const {
    mode,
    value,
    onChange,
    schema,
    onSchemaChange,
    uiSchema,
    onUiSchemaChange,
  } = props;
  const options = schema?.enum || [];
  const placeholder = uiSchema?.['ui:placeholder'];

  return (
    <div className="flex flex-col gap-4">
      {/* header */}
      <div className="flex flex-col gap-2">
        <h4 className="text-muted-foreground text-sm">欄位名稱</h4>
        <Input
          value={schema.title}
          onChange={e => {
            onSchemaChange?.({
              ...schema,
              title: e.target.value,
            });
          }}
          readOnly={mode === 'fill' || mode === 'review'}
        />
      </div>

      {/* field component */}
      <div className="flex flex-col gap-2">
        <h4 className="text-muted-foreground text-sm">欄位元件</h4>
        <Select
          value={value as string}
          onValueChange={onChange}
          disabled={mode === 'build' || mode === 'review'}>
          <SelectTrigger>
            <SelectValue placeholder={(placeholder as string) || '請選擇'} />
          </SelectTrigger>
          <SelectContent>
            {options.map(option => (
              <SelectItem key={option as string} value={option as string}>
                {option as string}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* schema editor */}
      {mode === 'build' && (
        <div className="flex flex-col gap-4 rounded-lg border p-4">
          <div className="flex flex-col gap-2">
            <h4 className="text-muted-foreground text-sm">選項設定</h4>
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={option as string}
                  onChange={e => {
                    onSchemaChange?.({
                      ...schema,
                      enum: [
                        ...options.slice(0, index),
                        e.target.value,
                        ...options.slice(index + 1),
                      ],
                    });
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    onSchemaChange?.({
                      ...schema,
                      enum: [
                        ...options.slice(0, index),
                        ...options.slice(index + 1),
                      ],
                    });
                  }}>
                  <Trash2 />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  onSchemaChange?.({
                    ...schema,
                    enum: [...options, `選項${options.length + 1}`],
                  });
                }}>
                新增
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-muted-foreground text-sm">placeholder 設定</h4>
            <Input
              value={placeholder as string}
              onChange={e => {
                onUiSchemaChange?.({
                  ...uiSchema,
                  ['ui:placeholder']: e.target.value,
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
