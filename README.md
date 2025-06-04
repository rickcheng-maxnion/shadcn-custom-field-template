# shadcn Form Field Registry Template

這是一個使用 shadcn registry 方式打造 field component 的 template。讓你可以建立自己的 form field component 並透過 shadcn CLI 安裝使用。

## 🏗️ 建立自己的 Field Component

### 1. 資料夾結構

```
registry/
  your-field-name/
    index.ts          # 匯出 FieldConfig
    YourField.tsx     # 主要元件
    devTypes.ts       # TypeScript 類型定義
```

### 2. 類型定義 (devTypes.ts)

> **⚠️ 重要**: 以下 types 是從我們專案複製過來方便開發使用，**請勿修改這些定義**。未來會提供 remote repo 讓開發者直接 import。

```typescript
import type { JSONSchema7 } from 'json-schema';
import type { FieldError } from 'react-hook-form';

export interface FieldProps {
  mode: 'builder' | 'edit' | 'readOnly';
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
```

### 3. 實作元件 (YourField.tsx)

你的元件會收到 `FieldProps`，需要根據三種 mode 做對應的 render：

```typescript
export const YourField = (props: FieldProps) => {
  const { mode, schema, uiSchema, value, onChange, onSchemaChange, onUiSchemaChange } = props;

  return (
    <div className="flex flex-col gap-4">
      {/* 欄位名稱 */}
      <Input
        value={schema.title}
        onChange={e => onSchemaChange?.({ ...schema, title: e.target.value })}
        readOnly={mode !== 'builder'}
      />

      {/* 實際的 field 元件 */}
      <YourActualField
        value={value}
        onChange={onChange}
        disabled={mode === 'builder' || mode === 'readOnly'}
        placeholder={uiSchema?.['ui:placeholder']}
      />

      {/* Builder mode: 顯示 schema 設定 UI */}
      {mode === 'builder' && (
        <div className="border rounded p-4">
          {/* 你的 schema 設定 UI */}
        </div>
      )}
    </div>
  );
};
```

### 4. 匯出設定 (index.ts)

```typescript
import { YourIcon } from 'lucide-react';
import { YourField } from './YourField';
import type { FieldConfig } from './devTypes';

export const YourFieldConfig: FieldConfig = {
  meta: {
    typeLabel: 'Your Field Type', // Add field dropdown 顯示的 label
    icon: YourIcon, // Add field dropdown 顯示的 icon
  },
  createInitialSchema: () => ({
    // 新建立 field 的初始 schema
    title: '欄位1',
    type: 'string',
    // 其他 JSONSchema 屬性
  }),
  createInitialUiSchema: () => ({
    // 新建立 field 的初始 uiSchema
    'ui:placeholder': '請輸入...',
    // 其他客製化設定
  }),
  component: YourField,
};
```

### 5. 更新 registry.json

```json
{
  "name": "your-field-name",
  "type": "registry:component",
  "dependencies": ["lucide-react", "react-hook-form", "@types/json-schema"],
  "registryDependencies": ["input", "button"],
  "files": [...]
}
```

### 6. 建置和發布

完成 component 後，執行建置指令：

```bash
npm run registry:build
```

這會產生 JSON 檔案到 `public/r/your-field-name.json`

### 7. 讓其他人安裝

完成開發並建置後，其他人就可以透過以下指令安裝你開發的 component：

```bash
npx shadcn@latest add https://raw.githubusercontent.com/your-username/your-repo/main/public/r/your-field-name.json
```

## 🎯 三種 Mode 說明

### Builder Mode

- 用來設定 `schema` 和 `uiSchema`
- 需要提供 setting UI 讓使用者設定
- 實際 field 元件通常為 disabled 狀態

### Edit Mode

- 真正填寫表單時使用
- `value` 和 `onChange` 才會有作用
- Field 元件為可互動狀態

### ReadOnly Mode

- 檢視模式，所有元件都為 readOnly/disabled

## 📋 Schema 設計

- **schema**: 定義 field 的資料結構(JSON schema)和驗證規則，form validator 會自動產生對應的 error
- **uiSchema**: 定義客製化需求，如 placeholder、樣式等

## 🧪 開發測試

App 會展示以下資訊方便開發測試：

- **schema**: 當前 field 的 schema 設定
- **uiSchema**: 當前 field 的 uiSchema 設定
- **formData**: 當前表單的資料值

## 📖 參考資源

- **範例實作**: 參考 `registry/maxnion-select-field/` 的完整實作
- **Registry 寫法**: 參考 [shadcn/ui Registry 文件](https://ui.shadcn.com/docs/cli#add)
- **JSONSchema**: 詳細 schema 定義請參考 [JSONSchema 官方文件](https://json-schema.org/)

## 🛠️ 開發環境

```bash
npm install
npm run dev
```
