# Custom Form Field Template for shadcn/ui Registry Integration

本專案為表單欄位元件（form field component）開發的範本，提供給合作方依照既定規格實作欄位元件，並以 shadcn registry 格式發佈。完成後，我們的系統將可透過 CLI 安裝並整合你的元件至動態表單系統中。

## ⚡ 快速開始

```bash
# 安裝依賴
yarn

# 啟動開發伺服器（預設 port 為 5174）
yarn dev
```

你可以在本地測試元件的開發狀況，並透過預覽畫面查看元件渲染與互動行為是否正確。

## 🧪 範例與開發入口

本專案已預設一個範例欄位元件 `SelectField`，放置於 `registry/maxnion/select-field/` 資料夾內，對應元件展示畫面如圖：

- 上半部為元件預覽（對應三種狀態：建立 Build、填寫 Fill、檢視 Review）
- 下半部為 JSON Schema / UI Schema / Form Data 的即時顯示

開發時你可以在 `App.tsx` 中：

- 引入你自訂的欄位元件設定
- 測試在 build / fill / review 狀態下的表現
- 預覽你設計的 schema / uiSchema / formData 是否正確渲染

你應該仿照此結構建立你自己的欄位元件，例如：

```
registry/
  my-company/
    custom-field/
      index.ts
      devTypes.ts
      CustomField.tsx
```

在 `App.tsx` 中引入 `CustomFieldConfig`，就可以用來測試與驗證。

---

## 🔧 Component 開發規範

這個章節將說明如何建立符合我們規範的欄位元件 component，包含整體結構、註冊設定與元件實作原則。

### 1. 結構總覽：你應該提供哪些檔案

請依照以下範例建立你的欄位元件資料夾，檔案結構如下：

```
registry/
  your-field-name/
    index.ts          # 匯出 FieldConfig（請保留命名）
    CustomField.tsx   # 實際元件實作（檔名可自訂）
    devTypes.ts       # 類型定義（請勿修改）
```

> 📌 **請遵守以下規範：**
>
> - `devTypes.ts` 為我們內部系統所依賴的型別定義，**請勿更動內容**，否則可能導致載入失敗或型別不相容。將來會改為外部套件提供匯入。
> - 元件實作檔案需匯出一個 React Component，接收 `FieldProps` 作為 props。
> - 使用 `index.ts` 匯出一個符合 `FieldConfig` 介面的物件，命名為 `field`。我們的系統會從這裡載入欄位設定與元件。

### 2. 註冊設定（index.ts）

在 `index.ts` 中，你需要匯出一個 `FieldConfig` 物件，內容包含：

- `meta`：欄位在 UI 中的顯示設定（如名稱與 icon），會出現在新增欄位下拉選單中
- `createInitialSchema`：建立欄位時使用的預設 schema（需符合 JSONSchema，目前使用 AJV Validator 預設 Draft-07 版本，可參考[官方文件](https://json-schema.org/)）
- `createInitialUiSchema`：欄位預設的 UI 行為定義，為選填，型別為 object，常用於傳入如 placeholder、widget 等客製化設定
- `component`：實際的欄位元件 component

這個設定檔是我們 CLI 與表單系統整合時的唯一入口。

### 3. Component 元件實作（CustomField.tsx）

你可以自由實作 component，只要符合以下原則：

- 正確處理傳入的 `schema / uiSchema / value`
- 根據 `mode`（build / fill / review）決定元件顯示與互動行為
- 請使用 shadcn/ui 提供的元件進行欄位 UI 實作

我們不會限制你的 UI 實作細節，只要求 props 與行為一致。若要快速參考實作，可複製 `registry/maxnion/select-field/` 資料夾中的內容。

## 📋 shadcn registry 設定檔（registry.json）

這個設定檔定義了元件的註冊資訊，讓我們的 CLI 可以正確載入元件。完整格式與欄位說明請參考官方文件：

👉 [shadcn/ui Registry 說明文件](https://ui.shadcn.com/docs/registry)

以下是我們專案中使用的 `registry.json` 簡化範例：

```jsonc
{
  // ...
  "items": [
    {
      "name": "your-field-name",
      "type": "registry:component",
      "dependencies": ["lucide-react", "react-hook-form"],
      "registryDependencies": ["input", "button"],
      "files": [
        {
          "path": "registry/your-scope/your-field/index.ts",
          "target": "your-scope/form/your-field/index.ts"
        }
        // ...
      ]
    }
  ]
}
```

> 📌 請依照 shadcn/ui registry 的格式填寫 `registry.json`：
>
> - `name`: 元件識別名稱，自訂命名即可（建議與資料夾一致）
> - `type`: 應為 `registry:component`，這是元件的常見使用方式，**建議**符合 registry 語意
> - `dependencies` / `devDependencies`: 實際使用到的 npm 套件，請照實填寫
> - `registryDependencies`: 使用到的 shadcn 元件（如 button, input 等）
> - `files`: 你的元件實作檔案，請確認 `path` 為實際路徑，`target` 請依照 `your-scope/form/your-field-name/xxx` 格式命名。**同一個欄位元件的所有 target 應置於相同資料夾下，以避免產生分散路徑。**

## 🚀 建立、測試與發布 Registry

### 1. 建置 registry JSON

```bash
yarn registry:build
```

這會產出 registry JSON 檔案於 `public/r/your-field-name.json`。

### 2. 本地測試 registry JSON

```bash
yarn dev
```

開啟以下網址（預設 port 為 `5174`）：

```
http://localhost:5174/r/your-field-name.json
```

確認是否可正確讀取與解析 registry 設定，並可自行透過 CLI 測試安裝是否成功：

```bash
npx shadcn@latest add http://localhost:5174/r/your-field-name.json
```

### 3. 部署並提供安裝連結

你可以將 registry 發布到公開網址，讓其他開發者透過 shadcn CLI 安裝使用。

你應將 JSON 檔案部署至公開網址（如 GitHub Pages、Vercel、S3 等）。

我們的團隊會使用這個連結，透過 CLI 安裝你的元件：

```bash
npx shadcn@latest add https://your-cdn.com/public/r/your-field-name.json
```

---
