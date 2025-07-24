import React from "react";
import { useState } from "react";
import styles from "./AddPlant.module.css";
import { useNavigate } from "react-router-dom";
import AppNav from "../components/AppNav";

import { BASE_URL } from "../../config";

function getStatus(quantity) {
  if (quantity === 0) return "Out of stock";
  if (quantity < 5) return "Low stock";
  return "Available";
}

function AddPlant() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated");
      return;
    }

    if (!name) {
      setError("Empty plant name");
      return;
    }

    if (!description) {
      setError("Empty description");
      return;
    }

    if (!quantity) {
      setQuantity(0);
    }

    const payload = {
      name,
      description,
      category: "plant",
      quantity: parseInt(quantity),
      status: getStatus(quantity),
    };

    try {
      const res = await fetch(`${BASE_URL}/resources/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to add plant");
      }
      // opcjonalnie: wyczyść formularz
      setName("");
      setDescription("");
      setQuantity(0);
      setError("");
      navigate("/app");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className={styles.addPlant}>
      <AppNav className={styles.nav}></AppNav>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Add New Plant</h1>
          <p>
            Enter the details of your new plant to add it to your garden
            inventory.
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Plant Name</label>
            <input
              type="text"
              id="name"
              placeholder="e.g., Tomato, Rose, Basil"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Describe your plant variety, growing conditions, or any special notes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="quantity">Quantity</label>
            <div className={styles.quantityWrapper}>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <span className={styles.unit}>plants</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancel}>
              Cancel
            </button>
            <button type="submit" className={styles.add}>
              + Add Plant
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </form>

        <section className={styles.tips}>
          <h3>💡 Tips for Adding Plants</h3>
          <ul>
            <li>
              Use specific plant names and varieties for better organization
            </li>
            <li>
              Include planting date, care instructions, or location in the
              description
            </li>
            <li>Update quantities as plants grow or are harvested</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AddPlant;
