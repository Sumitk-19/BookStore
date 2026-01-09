import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart, totalAmount } = useCart();

  if (cartItems.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div key={item._id}>
          <p>{item.title}</p>
          <p>Qty: {item.quantity}</p>
          <p>₹{item.price * item.quantity}</p>
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}

      <h3>Total: ₹{totalAmount}</h3>

      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}

export default Cart;
