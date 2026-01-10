import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Checkout() {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

   useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const placeOrder = async () => {
    try {
  const { data } = await api.post("/orders",{orderItems: cartItems.map((item) => ({
            book: item._id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
          totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      alert("Order failed");
    }
  };


  return (
    <div>
      <h2>Checkout</h2>
      <p>Total Amount: ₹{totalAmount}</p>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}

export default Checkout;
