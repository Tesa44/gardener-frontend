import { useState } from "react";
import styles from "./PlantItem.module.css";
import { BASE_URL } from "../../config";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
function getStatus(quantity) {
  if (quantity === 0) return "Out of stock";
  if (quantity < 5) return "Low stock";
  return "Available";
}

function PlantItem({ plant, onDelete, onUpdate }) {
  const [quantity, setQuantity] = useState(plant.quantity);
  const [lastUpdated, setLastUpdated] = useState(plant.last_updated);
  const [status, setStatus] = useState(plant.status);

  const token = localStorage.getItem("token");

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this plant?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${BASE_URL}/resources/${plant.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete");
      onDelete?.(plant.id);
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  }

  async function updateQuantity(newQty) {
    try {
      const newStatus = getStatus(newQty);
      const now = new Date().toISOString().slice(0, 19);
      const res = await fetch(`${BASE_URL}/resources/${plant.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: plant.name,
          description: plant.description,
          category: plant.category,
          quantity: newQty,
          status: newStatus,
          last_updated: now,
        }),
      });

      if (!res.ok) throw new Error("Failed to update quantity");

      const { last_updated } = await res.json();
      const newDate = new Date(last_updated);
      setQuantity(newQty);
      setLastUpdated(newDate);
      setStatus(newStatus);
      onUpdate?.(plant.id, {
        ...plant,
        quantity: newQty,
        last_updated: newDate,
        status: newStatus,
      });
    } catch (err) {
      console.error("Quantity update failed:", err.message);
    }
  }

  function handleIncrease() {
    updateQuantity(quantity + 1);
  }

  function handleDecrease() {
    if (quantity > 0) updateQuantity(quantity - 1);
  }

  return (
    <li className={styles.card} key={plant.id}>
      <div className={styles.cardHeader}>
        <h3 className={styles.name}>{plant.name}</h3>
        <span className={styles.status}>{status}</span>
      </div>

      <p className={styles.description}>{plant.description}</p>

      <div className={styles.meta}>
        <div className={styles.row}>
          <p>Quantity</p>
          <div className={styles.quantityControls}>
            <button onClick={handleDecrease}>➖</button>
            <span>{`${quantity} plant${quantity !== 1 ? "s" : ""}`}</span>
            <button onClick={handleIncrease}>➕</button>
          </div>
        </div>
        <div className={styles.row}>
          <p>Date Added:</p> <span>{formatDate(plant.date_added)}</span>
        </div>
        <div className={styles.row}>
          <p>Last Update:</p> <span>{formatDate(lastUpdated)}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.delete} onClick={handleDelete}>
          🗑️ Delete
        </button>
        <button className={styles.view}>👁️ View</button>
      </div>
    </li>
  );
}

export default PlantItem;
