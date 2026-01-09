import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Orders() {
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/my-orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, token, navigate]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Orders</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div key={order._id} style={styles.card}>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

          <div>
            <strong>Items:</strong>
            <ul>
              {order.orderItems.map((item, i) => (
                <li key={i}>
                  {item.title} × {item.quantity} (₹{item.price})
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
};

export default Orders;
