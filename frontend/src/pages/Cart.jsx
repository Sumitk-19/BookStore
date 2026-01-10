import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, totalAmount } = useCart();
  const { isAuthenticated } = useAuth();


  if (cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>

     {cartItems.map((item) => (
     <div key={item._id}>
    <p>{item.title}</p>

    <div>
      <button onClick={() => decreaseQty(item._id)}>-</button>
      <span style={{ margin: "0 10px" }}>{item.quantity}</span>
      <button onClick={() => increaseQty(item._id)}>+</button>
    </div>

    <p>₹{item.price * item.quantity}</p>
    <button onClick={() => removeFromCart(item._id)}>Remove</button>
     </div>
))}


      <h3>Total: ₹{totalAmount}</h3>

      {isAuthenticated ? (
      <Link to="/checkout">Proceed to Checkout</Link>
   ) : (
      <Link to="/login">Login to Checkout</Link>
)}
    </div>
  );
}

export default Cart;
