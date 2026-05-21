# UI/UX 設計規範文件

本系統基於 Element Plus \+ Tailwind CSS 實作 最後更新：2025-10-07

---

## 📐 全域設計原則

### 佈局系統 (Layout System)

┌─────────────────────────────────────────┐

│  Header (48px)                          │

│  \[麵包屑 | 工具列 | 使用者資訊\]        │

├──────┬──────────────────────────────────┤

│      │                                  │

│ Side │  Main Content Area               │

│ bar  │  (Padding: 24px)                 │

│      │                                  │

│240px │                                  │

│      │                                  │

└──────┴──────────────────────────────────┘

#### 結構規範

- **左側導覽列 (Sidebar)**: `width: 240px`, 可收合  
- **頂部標頭 (Header)**: `height: 48px`, 固定定位  
- **主要內容區 (Main)**: `padding: 24px`, 彈性區域

#### 間距系統

- **基礎單位**: 8px (所有 margin/padding 必須為 8 的倍數)  
- **常用值**: `8px`, `16px`, `24px`, `32px`, `40px`, `48px`  
- **圓角**: `border-radius: 0` (全域不使用圓角)

---

## 🎨 色彩規範 (Color Palette)

### 功能色彩

{

  // 主色系

  primary: '\#303133',      // 深灰 \- 主要操作按鈕

  secondary: '\#409EFF',    // 藍色 \- 次要操作、焦點狀態

  

  // 狀態色

  success: '\#67C23A',      // 綠色 \- 成功提示、啟用狀態

  warning: '\#E6A23C',      // 黃色 \- 警告提示

  danger: '\#F56C6C',       // 紅色 \- 刪除操作、錯誤提示

  

  // 文字色

  textPrimary: '\#303133',  // 主要文字

  textRegular: '\#606266',  // 次要文字

  textSecondary: '\#909399',// 提示/佔位文字

  

  // 邊框與背景

  border: '\#DCDFE6',       // 邊框/分隔線

  bgPrimary: '\#F5F7FA',    // 主背景

  bgContainer: '\#FFFFFF'   // 容器背景

}

### Element Plus 變數覆寫

// 在 styles/variables.scss 中設定

$--color-primary: \#303133;

$--color-success: \#67C23A;

$--color-warning: \#E6A23C;

$--color-danger: \#F56C6C;

$--border-radius-base: 0; // 全域移除圓角

---

## 📝 字體規範 (Typography)

### 字型家族

font-family: 'Noto Sans TC', \-apple-system, BlinkMacSystemFont, sans-serif;

### 字級階層

| 用途 | 大小 | 粗細 | 範例 |
| :---- | :---- | :---- | :---- |
| 頁面標題 (H1) | 20px | Bold (700) | 文章管理 |
| 區塊標題 (H2) | 16px | Bold (700) | 搜尋條件 |
| 內文/表格 | 14px | Regular (400) | 一般文字 |
| 輔助說明 | 12px | Regular (400) | 提示資訊 |

### Tailwind 對應

\<h1 class="text-\[20px\] font-bold"\>頁面標題\</h1\>

\<h2 class="text-base font-bold"\>區塊標題\</h2\>

\<p class="text-sm"\>內文\</p\>

\<span class="text-xs text-\[\#909399\]"\>輔助說明\</span\>

---

## 🔘 按鈕規範 (Button)

### 類型與使用場景

\<\!-- 主要按鈕：最重要的操作 \--\>

\<el-button 

  type="primary" 

  class="\!rounded-none"

\>

  搜尋

\</el-button\>

\<\!-- 次要按鈕：非預設操作 \--\>

\<el-button 

  plain 

  class="\!rounded-none"

\>

  清除

\</el-button\>

\<\!-- 文字按鈕：表格內操作 \--\>

\<el-button 

  type="text" 

  class="text-\[\#409EFF\] hover:text-\[\#66b1ff\]"

\>

  編輯

\</el-button\>

\<\!-- 危險操作 \--\>

\<el-button 

  type="danger" 

  class="\!rounded-none"

\>

  刪除

\</el-button\>

### 狀態規範

- **Default**: 預設樣式  
- **Hover**: 顏色加深/變亮  
- **Active**: 點擊瞬間狀態  
- **Disabled**: `disabled` 屬性，灰色不可點擊

### 關鍵修改

/\* 全域移除按鈕圓角 \*/

.el-button {

  border-radius: 0 \!important;

}

---

## 📥 輸入框規範 (Input Field)

### 基本結構

\<el-form-item label="文章標題"\>

  \<el-input

    v-model="form.title"

    placeholder="請輸入文章標題"

    clearable

    class="\!rounded-none"

  /\>

  \<\!-- 輔助說明文字 \--\>

  \<div class="text-xs text-\[\#909399\] mt-1"\>

    標題將顯示於前台列表，建議長度為 10-30 字

  \</div\>

\</el-form-item\>

### 輔助說明文字 (Helper Text)

**用途**: 解釋規則、預防錯誤

**使用時機**:

1. 有明確輸入限制  
     
   \<div class="text-xs text-\[\#909399\] mt-1"\>  
     
     密碼長度需介於 8-16 字元，且包含英文與數字  
     
   \</div\>  
     
2. 需要額外解釋  
     
   \<div class="text-xs text-\[\#909399\] mt-1"\>  
     
     此內容將顯示在社群分享預覽中，建議長度為 120 字以內  
     
   \</div\>  
     
3. 即時驗證錯誤  
     
   \<el-form-item   
     
     label="電子郵件"   
     
     :error="emailError"  
     
   \>  
     
     \<el-input v-model="email" /\>  
     
   \</el-form-item\>  
     
   \<\!-- emailError \= "電子郵件格式不正確" \--\>

### 狀態規範

- **Default**: 預設邊框 `#DCDFE6`  
- **Focus**: 邊框變藍 `#409EFF`  
- **Disabled**: 背景 `#F5F7FA`, 不可編輯  
- **Error**: 邊框變紅 `#F56C6C`, 顯示錯誤訊息

---

## 📋 下拉選單規範 (Select)

### 單選

\<el-select

  v-model="form.category"

  placeholder="請選擇分類"

  clearable

  class="w-full \!rounded-none"

\>

  \<el-option label="最新消息" value="news" /\>

  \<el-option label="活動公告" value="event" /\>

\</el-select\>

### 多選

\<el-select

  v-model="form.tags"

  multiple

  collapse-tags

  placeholder="請選擇標籤"

  class="w-full \!rounded-none"

\>

  \<el-option label="標籤A" value="a" /\>

  \<el-option label="標籤B" value="b" /\>

\</el-select\>

---

## 📅 日期選擇器規範 (Date Picker)

### 單一日期

\<el-date-picker

  v-model="form.publishDate"

  type="date"

  placeholder="選擇日期"

  :default-value="new Date()"

  class="\!rounded-none"

\>

  \<template \#default="{ date }"\>

    \<\!-- 高亮今日 \--\>

  \</template\>

\</el-date-picker\>

### 日期區間

\<el-date-picker

  v-model="dateRange"

  type="daterange"

  range-separator="至"

  start-placeholder="開始日期"

  end-placeholder="結束日期"

  :default-value="new Date()"

  :shortcuts="dateShortcuts"

  class="\!rounded-none"

/\>

### 快捷選項

const dateShortcuts \= \[

  {

    text: '今日',

    value: () \=\> {

      const today \= new Date()

      return \[today, today\]

    }

  },

  {

    text: '最近 7 天',

    value: () \=\> {

      const end \= new Date()

      const start \= new Date()

      start.setDate(start.getDate() \- 7\)

      return \[start, end\]

    }

  }

\]

### 關鍵特性

- ✅ 預設顯示「今日」所在月份  
- ✅ 高亮標示今日日期  
- ✅ 提供「今日」快捷選項

---

## 📊 資料表格規範 (Data Table)

### 標準結構

\<el-table

  :data="tableData"

  stripe

  @selection-change="handleSelectionChange"

  class="w-full"

\>

  \<\!-- 多選框 \--\>

  \<el-table-column

    type="selection"

    width="55"

  /\>

  

  \<\!-- 資料欄位 \--\>

  \<el-table-column

    prop="title"

    label="標題"

    sortable

    min-width="200"

  /\>

  

  \<el-table-column

    prop="status"

    label="狀態"

    width="100"

  \>

    \<template \#default="{ row }"\>

      \<el-tag

        :type="row.status \=== 'active' ? 'success' : 'info'"

        class="\!rounded-full"

      \>

        {{ row.status \=== 'active' ? '啟用' : '停用' }}

      \</el-tag\>

    \</template\>

  \</el-table-column\>

  

  \<\!-- 操作欄 \--\>

  \<el-table-column

    label="操作"

    width="150"

    fixed="right"

  \>

    \<template \#default="{ row }"\>

      \<el-button type="text" @click="handleEdit(row)"\>

        編輯

      \</el-button\>

      \<el-button type="text" class="text-\[\#F56C6C\]" @click="handleDelete(row)"\>

        刪除

      \</el-button\>

    \</template\>

  \</el-table-column\>

\</el-table\>

### 樣式覆寫

.el-table {

  // 表頭樣式

  .el-table\_\_header-wrapper {

    th {

      background-color: \#F5F7FA;

      font-size: 14px;

      font-weight: 700;

      color: \#303133;

    }

  }

  

  // Hover 效果

  .el-table\_\_body tr:hover \> td {

    background-color: \#F5F7FA \!important;

  }

}

---

## 📄 分頁規範 (Pagination)

### 標準實作

\<el-pagination

  v-model:current-page="currentPage"

  v-model:page-size="pageSize"

  :page-sizes="\[10, 20, 50, 100\]"

  :total="total"

  layout="total, sizes, prev, pager, next, jumper"

  class="mt-4 justify-end"

/\>

### 佈局說明

- `total`: 顯示總項目數  
- `sizes`: 每頁顯示數量選擇器  
- `prev/next`: 上一頁/下一頁按鈕（邊界自動禁用）  
- `pager`: 頁碼列表（當前頁高亮）  
- `jumper`: 前往指定頁面輸入框

---

## 🏷️ 狀態標籤規範 (Tag)

### 狀態對應

\<\!-- 啟用 \--\>

\<el-tag type="success" class="\!rounded-full"\>

  啟用

\</el-tag\>

\<\!-- 停用 \--\>

\<el-tag type="info" class="\!rounded-full"\>

  停用

\</el-tag\>

\<\!-- 草稿 \--\>

\<el-tag type="warning" class="\!rounded-full"\>

  草稿

\</el-tag\>

\<\!-- 已刪除 \--\>

\<el-tag type="danger" class="\!rounded-full"\>

  已刪除

\</el-tag\>

### 自訂顏色

\<el-tag

  :color="customColor"

  effect="plain"

  class="\!rounded-full"

\>

  自訂標籤

\</el-tag\>

---

## 🧭 麵包屑規範 (Breadcrumb)

### 標準結構

\<el-breadcrumb separator="/" class="mb-4"\>

  \<el-breadcrumb-item :to="{ path: '/' }"\>

    首頁

  \</el-breadcrumb-item\>

  \<el-breadcrumb-item :to="{ path: '/article' }"\>

    文章管理

  \</el-breadcrumb-item\>

  \<el-breadcrumb-item class="text-\[\#303133\] cursor-default"\>

    新增文章

  \</el-breadcrumb-item\>

\</el-breadcrumb\>

### 樣式規範

- **分隔符號**: `/`  
- **可點擊項目**: 顯示為連結樣式（藍色）  
- **當前頁面**: 主要文字色（`#303133`），不可點擊

---

## 🛠️ 全域樣式覆寫

### styles/variables.scss

// Element Plus 變數覆寫

$--color-primary: \#303133;

$--color-success: \#67C23A;

$--color-warning: \#E6A23C;

$--color-danger: \#F56C6C;

$--border-radius-base: 0;

$--border-radius-small: 0;

// 字體設定

$--font-family: 'Noto Sans TC', \-apple-system, BlinkMacSystemFont, sans-serif;

### styles/index.scss

// 全域移除圓角

.el-button,

.el-input\_\_inner,

.el-select,

.el-date-editor,

.el-card {

  border-radius: 0 \!important;

}

// Tag 保持圓角（膠囊形狀）

.el-tag {

  border-radius: 9999px \!important;

}

// 間距工具類別

.spacing-base { margin: 8px; }

.spacing-sm { margin: 16px; }

.spacing-md { margin: 24px; }

.spacing-lg { margin: 32px; }

---

## 📦 Tailwind 輔助類別

### 常用組合

\<\!-- 容器 \--\>

\<div class="bg-white p-6 mb-6 border border-\[\#DCDFE6\]"\>

  \<\!-- 內容 \--\>

\</div\>

\<\!-- 表單區塊 \--\>

\<div class="bg-white p-6 mb-4"\>

  \<h2 class="text-base font-bold mb-4"\>搜尋條件\</h2\>

  \<\!-- 表單欄位 \--\>

\</div\>

\<\!-- 按鈕群組 \--\>

\<div class="flex gap-2 justify-end mt-6"\>

  \<el-button plain class="\!rounded-none"\>取消\</el-button\>

  \<el-button type="primary" class="\!rounded-none"\>確定\</el-button\>

\</div\>

---

## ✅ 實作檢查清單

### 開發前確認

- [ ] 所有間距使用 8px 倍數  
- [ ] 按鈕、輸入框移除圓角（Tag 保留）  
- [ ] 色彩符合規範  
- [ ] 字級正確使用  
- [ ] 日期選擇器預設今日

### 元件實作確認

- [ ] 按鈕有正確的 hover/disabled 狀態  
- [ ] 輸入框有 placeholder 和 helper text  
- [ ] 表格有 hover 效果和操作欄  
- [ ] 分頁顯示完整資訊  
- [ ] 麵包屑最後一項不可點擊

### 回饋機制確認

- [ ] 成功操作顯示綠色提示  
- [ ] 錯誤操作顯示紅色提示  
- [ ] 警告操作顯示黃色提示  
- [ ] 刪除操作有二次確認

---

## 📚 範例頁面

### 完整搜尋 \+ 表格頁面

\<template\>

  \<div class="p-6"\>

    \<\!-- 麵包屑 \--\>

    \<el-breadcrumb separator="/" class="mb-6"\>

      \<el-breadcrumb-item :to="{ path: '/' }"\>首頁\</el-breadcrumb-item\>

      \<el-breadcrumb-item\>文章管理\</el-breadcrumb-item\>

    \</el-breadcrumb\>

    

    \<\!-- 搜尋區塊 \--\>

    \<div class="bg-white p-6 mb-6 border border-\[\#DCDFE6\]"\>

      \<h2 class="text-base font-bold mb-4"\>搜尋條件\</h2\>

      \<el-form :model="searchForm" label-width="100px"\>

        \<el-row :gutter="16"\>

          \<el-col :span="8"\>

            \<el-form-item label="文章標題"\>

              \<el-input

                v-model="searchForm.title"

                placeholder="請輸入關鍵字"

                clearable

                class="\!rounded-none"

              /\>

            \</el-form-item\>

          \</el-col\>

          \<el-col :span="8"\>

            \<el-form-item label="狀態"\>

              \<el-select

                v-model="searchForm.status"

                placeholder="請選擇"

                clearable

                class="w-full \!rounded-none"

              \>

                \<el-option label="啟用" value="active" /\>

                \<el-option label="停用" value="inactive" /\>

              \</el-select\>

            \</el-form-item\>

          \</el-col\>

        \</el-row\>

        \<el-row\>

          \<el-col :span="24"\>

            \<div class="flex gap-2 justify-end"\>

              \<el-button plain class="\!rounded-none" @click="handleReset"\>

                清除

              \</el-button\>

              \<el-button type="primary" class="\!rounded-none" @click="handleSearch"\>

                搜尋

              \</el-button\>

            \</div\>

          \</el-col\>

        \</el-row\>

      \</el-form\>

    \</div\>

    

    \<\!-- 工具列 \--\>

    \<div class="mb-4 flex justify-between items-center"\>

      \<el-button type="primary" class="\!rounded-none" @click="handleAdd"\>

        新增文章

      \</el-button\>

      \<el-button plain class="\!rounded-none" @click="handleBatchDelete"\>

        批次刪除

      \</el-button\>

    \</div\>

    

    \<\!-- 表格 \--\>

    \<el-table :data="tableData" stripe class="w-full"\>

      \<el-table-column type="selection" width="55" /\>

      \<el-table-column prop="id" label="ID" width="80" /\>

      \<el-table-column prop="title" label="標題" min-width="200" /\>

      \<el-table-column prop="status" label="狀態" width="100"\>

        \<template \#default="{ row }"\>

          \<el-tag

            :type="row.status \=== 'active' ? 'success' : 'info'"

            class="\!rounded-full"

          \>

            {{ row.status \=== 'active' ? '啟用' : '停用' }}

          \</el-tag\>

        \</template\>

      \</el-table-column\>

      \<el-table-column label="操作" width="150" fixed="right"\>

        \<template \#default="{ row }"\>

          \<el-button type="text" @click="handleEdit(row)"\>編輯\</el-button\>

          \<el-button type="text" class="text-\[\#F56C6C\]" @click="handleDelete(row)"\>

            刪除

          \</el-button\>

        \</template\>

      \</el-table-column\>

    \</el-table\>

    

    \<\!-- 分頁 \--\>

    \<el-pagination

      v-model:current-page="currentPage"

      v-model:page-size="pageSize"

      :page-sizes="\[10, 20, 50, 100\]"

      :total="total"

      layout="total, sizes, prev, pager, next, jumper"

      class="mt-4 justify-end"

    /\>

  \</div\>

\</template\>

---

## 🔧 疑難排解

### Q: Element Plus 預設有圓角，如何移除？

/\* 使用 Tailwind 的 \! 重要性修飾符 \*/

class="\!rounded-none"

/\* 或在全域 CSS 中覆寫 \*/

.el-button { border-radius: 0 \!important; }

### Q: 如何調整 Element Plus 主題色？

// styles/variables.scss

$--color-primary: \#303133;

// 或使用 CSS 變數

:root {

  \--el-color-primary: \#303133;

}

### Q: Tag 需要保留圓角嗎？

是的，Tag 使用膠囊形狀（`rounded-full`），這是例外。

---

## 📖 相關文件

- [Element Plus 官方文件](https://element-plus.org/)  
- [Tailwind CSS 官方文件](https://tailwindcss.com/)  
- 專案內部文件：`/docs/功能模組分析.md`

