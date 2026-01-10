import { useParams, Link } from "react-router-dom";

function OrderSuccess() {
  const { id } = useParams();

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Your order ID is:</p>
      <h3>{id}</h3>

      <p>Thank you for shopping with BookNest.</p>

      <Link to="/orders">
        <button>View My Orders</button>
      </Link>
    </div>
  );
}

export default OrderSuccess;
