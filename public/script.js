let cart = [];
let total = 0;

// 用戶登入
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        if (data.role === "admin") {
          document.getElementById("login-section").style.display = "none";
          document.getElementById("admin-section").style.display = "block";
          loadProducts("admin");
        } else {
          document.getElementById("login-section").style.display = "none";
          document.getElementById("shop-section").style.display = "block";
          loadProducts("user");
        }
      } else {
        alert("帳號或密碼錯誤");
      }
    });
}

// 加載商品列表
function loadProducts(role) {
  fetch("/api/products")
    .then((res) => res.json())
    .then((products) => {
      const productList = document.getElementById("product-list");
      productList.innerHTML = "";
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
                    <span>${product.name} - $${product.price}</span>
                    ${
                      role === "user"
                        ? `<button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">添加</button>`
                        : `<button onclick="deleteProduct(${product.id})">移除</button>`
                    }
                `;
        productList.appendChild(productDiv);
      });
    });
}

// 用戶功能 - 添加商品到購物車
function addToCart(id, name, price) {
  cart.push({ id, name, price });
  total += price;
  updateCart();
}

// 用戶功能 - 從購物車移除商品
function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

// 用戶功能 - 更新購物車
function updateCart() {
  const cartList = document.getElementById("cart");
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">移除</button>`;
    cartList.appendChild(li);
  });
  document.getElementById("total").textContent = total;
}

// 用戶功能 - 提交購買請求
function submitOrder() {
  fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart }),
  })
    .then((res) => res.json())
    .then((order) => {
      alert("成功送出訂單!");
      cart = [];
      total = 0;
      updateCart();
    });
}

// 管理員功能 - 添加商品
function addProduct() {
  const name = document.getElementById("new-product-name").value;
  const price = document.getElementById("new-product-price").value;

  fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price }),
  })
    .then((res) => res.json())
    .then((product) => {
      alert(`成功添加商品: ${product.name}!`);
      loadProducts("admin");
    });
}

// 管理員功能 - 刪除商品
function deleteProduct(id) {
  fetch(`/api/products/${id}`, { method: "DELETE" }).then(() => {
    alert("成功移除商品!");
    loadProducts("admin");
  });
}
