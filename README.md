# 簡單購物車系統

這是一個使用 Node.js 和 Express 建立的簡單購物車系統，允許用戶瀏覽商品、加入購物車、提交訂單，並提供基本的管理功能，例如新增、刪除及更新商品。

您可以使用這個系統來模擬基本的電子商務流程，包括用戶身份驗證、商品管理、購物車操作及訂單管理。

## 使用方法

### 1. 安裝 Node.js

#### 為什麼需要安裝 Node.js？

Node.js 是一個基於 Chrome V8 引擎的 JavaScript 運行時環境，允許我們使用 JavaScript 在後端執行程式。這個專案使用 Node.js 來建立伺服器並處理 API 請求，因此您需要安裝 Node.js 才能運行。

#### 安裝步驟

前往 Node.js 官方網站 https://nodejs.org/，下載並安裝最新版本的 Node.js。

安裝完成後，您可以在命令行中輸入以下命令檢查 Node.js 和 npm（Node.js 的套件管理工具）的版本：

```bash
node -v
npm -v
```

若顯示版本號，則表示安裝成功。

### 2. 安裝專案依賴

請在您的專案根目錄下運行以下命令來安裝所需的依賴：

```bash
npm install
```

### 3. 啟動伺服器

執行以下命令啟動伺服器：

```bash
npm start
```

預設伺服器運行於 `127.0.0.1:3000`。

### 4. 訪問購物車系統

打開瀏覽器，並訪問：

```
http://127.0.0.1:3000
```

您可以瀏覽商品、加入購物車、提交訂單，並查看購物歷史。

### 5. 預設帳號資訊  

- **用戶帳號**：  
  - 帳號：`user`  
  - 密碼：`user123`  

- **管理員帳號**：  
  - 帳號：`admin`  
  - 密碼：`admin123`  

## 程式碼結構與使用技術

### 程式碼結構

此專案主要由以下幾個部分組成：

- **前端 (HTML, CSS, JavaScript)**：
  - `public/index.html`：包含基本的 HTML 結構，設計購物頁面。
  - `public/style.css`：設計購物介面樣式。
  - `public/script.js`：處理前端與後端之間的互動，例如加入購物車、提交訂單。

- **後端 (Node.js, Express)**：
  - `index.js`：設置 Express 伺服器來處理 API 請求。
  - `data/products.json`：存放商品資料。
  - `data/orders.json`：存放訂單資料。

### 使用技術

- **HTML**：
  用於構建頁面的基本結構，展示商品與購物車內容。

- **CSS**：
  用於設計簡單的頁面樣式，使購物車介面更直覺易用。

- **JavaScript**：
  用於處理用戶互動，例如加入購物車、提交訂單等。

- **Fetch (AJAX)**：
  用於與後端 API 進行非同步通信，發送請求並獲取商品及訂單資料。

- **Node.js**：
  伺服器端運行環境，負責處理 API 請求及管理商品與訂單資料。

- **Express**：
  快速構建 Node.js 伺服器的框架，處理用戶請求並返回 JSON 數據。

- **File System (fs)**：
  用於讀取及寫入 `products.json` 和 `orders.json` 來模擬商品及訂單資料庫。

## API 端點說明

- **用戶登入**
  - `POST /api/login`
  - 參數：`{ username, password }`
  - 回應：`{ success, role }`

- **取得商品列表**
  - `GET /api/products`
  - 回應：商品 JSON 資料

- **管理員新增商品**
  - `POST /api/products`
  - 參數：`{ name, price }`
  - 回應：新增的商品

- **管理員刪除商品**
  - `DELETE /api/products/:id`
  - 回應：刪除狀態

- **管理員更新商品**
  - `PUT /api/products/:id`
  - 參數：`{ name, price }`
  - 回應：更新後的商品

- **加入購物車**
  - `POST /api/cart`
  - 參數：`{ productId, quantity }`
  - 回應：購物車內容

- **提交訂單**
  - `POST /api/orders`
  - 參數：購物車內容
  - 回應：訂單確認資訊

## 未來擴展

- **用戶註冊與管理**
  - 目前系統僅支持簡單登入，可進一步開發完整的用戶註冊、密碼重置等功能。

- **資料庫整合**
  - 目前商品及訂單儲存於 JSON 檔案，未來可改用 MongoDB 或 MySQL 來管理資料。

- **支付整合**
  - 提供線上支付功能，如 PayPal、信用卡付款等，讓用戶能夠完成真實交易。

- **商品分類與篩選**
  - 目前商品列表較為簡單，可加入分類、篩選及搜尋功能來增強用戶體驗。

## 參考資源

1. **Node.js 官方網站**：
   - [https://nodejs.org/](https://nodejs.org/)

2. **Express 官方文檔**：
   - [https://expressjs.com/](https://expressjs.com/)