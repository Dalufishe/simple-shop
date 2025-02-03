const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const DATA_PATH = path.join(__dirname, "data");
const PRODUCTS_PATH = path.join(DATA_PATH, "products.json");
const ORDERS_PATH = path.join(DATA_PATH, "orders.json");

// 中介軟體
app.use(express.json());
app.use(express.static("public"));

// 模擬用戶驗證
const users = {
  user: { role: "user", password: "user123" },
  admin: { role: "admin", password: "admin123" },
};

// 驗證登入
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
    res.json({ success: true, role: user.role });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// 取得商品列表
app.get("/api/products", (req, res) => {
  fs.readFile(PRODUCTS_PATH, "utf8", (err, data) => {
    if (err) res.status(500).send("Error reading products data");
    else res.json(JSON.parse(data));
  });
});

// 管理員: 新增商品
app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  fs.readFile(PRODUCTS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading products data");

    const products = JSON.parse(data);
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);

    fs.writeFile(PRODUCTS_PATH, JSON.stringify(products), (err) => {
      if (err) res.status(500).send("Error updating products data");
      else res.json(newProduct);
    });
  });
});

// 管理員: 刪除商品
app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(PRODUCTS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading products data");

    let products = JSON.parse(data);
    products = products.filter((product) => product.id !== parseInt(id));

    fs.writeFile(PRODUCTS_PATH, JSON.stringify(products), (err) => {
      if (err) res.status(500).send("Error updating products data");
      else res.sendStatus(200);
    });
  });
});

// 管理員: 更新商品
app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  fs.readFile(PRODUCTS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading products data");

    const products = JSON.parse(data);
    const productIndex = products.findIndex(
      (product) => product.id === parseInt(id)
    );
    if (productIndex === -1) return res.status(404).send("Product not found");

    products[productIndex] = { ...products[productIndex], name, price };

    fs.writeFile(PRODUCTS_PATH, JSON.stringify(products), (err) => {
      if (err) res.status(500).send("Error updating products data");
      else res.json(products[productIndex]);
    });
  });
});

// 用戶: 提交購買請求
app.post("/api/orders", (req, res) => {
  const { cart } = req.body;
  fs.readFile(ORDERS_PATH, "utf8", (err, data) => {
    if (err) return res.status(500).send("Error reading orders data");

    const orders = JSON.parse(data);
    const newOrder = { id: orders.length + 1, cart, timestamp: new Date() };
    orders.push(newOrder);

    fs.writeFile(ORDERS_PATH, JSON.stringify(orders), (err) => {
      if (err) res.status(500).send("Error updating orders data");
      else res.json(newOrder);
    });
  });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
