import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const { token, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders");
      }
    };

    fetchOrders();
  }, [token, isAdmin, loading, navigate]);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(
        `/orders/${orderId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status } : o
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Admin – Orders</h2>
      {error && <p>{error}</p>}

      {orders.map((order) => (
        <div key={order._id} style={styles.card}>
          <p><strong>Order:</strong> {order._id}</p>
          <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>

          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>

          <ul>
            {order.orderItems.map((item, i) => (
              <li key={i}>
                {item.title} × {item.quantity}
              </li>
            ))}
          </ul>
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

export default AdminOrders;
