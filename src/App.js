// App.js (React) updated title
import React, { useState } from 'react';

const foodMenu = [
  { id: 1, name: "Veg Burger", category: "Snacks", price: 50 },
  { id: 2, name: "Paneer Sandwich", category: "Snacks", price: 70 },
  { id: 3, name: "Milkshake", category: "Drinks", price: 40 },
];

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  const login = () => {
    if (userEmail.endsWith("@iisc.ac.in")) {
      setLoggedIn(true);
    } else {
      alert("Please enter a valid college email.");
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const placeOrder = async () => {
  const orderDetails = {
    userEmail,   // your logged-in email
    items: cart, // the items you added to cart
    orderTime: new Date().toISOString() // current time
  };

  try {
    const response = await fetch('http://localhost:5000/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails),
    });

    const data = await response.json();

    if (response.ok) {
      alert(`Order placed! Your order ID: ${data.orderId}`);
      setCart([]);  // cart is emptied
    } else {
      alert('Order failed. Please try again.');
    }
  } catch (error) {
    alert('Network error. Please try again later.');
  }
};


  if (!loggedIn) {
    return (
      <div>
        <h2>Login to Campus Cravings with College Email</h2>
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="name@iisc.ac.in"
        />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Campus Cravings</h1>
      <h3>Menu</h3>
      {foodMenu.map((item) => (
        <div key={item.id}>
          {item.name} - ₹{item.price}{" "}
          <button onClick={() => addToCart(item)}>Add to Cart</button>
        </div>
      ))}

      <h3>Cart ({cart.length} items)</h3>
      {cart.map((item, i) => (
        <div key={i}>{item.name}</div>
      ))}

      <button onClick={placeOrder} disabled={cart.length === 0}>
        Place Order
      </button>
    </div>
  );
}

export default App;
