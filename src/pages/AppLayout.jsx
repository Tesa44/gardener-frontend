import { useState, useEffect } from "react";
import styles from "./AppLayout.module.css";
import PlantList from "../components/PlantList";
import TopBar from "../components/TopBar";
import AppNav from "../components/AppNav";
import { BASE_URL } from "../../config";

function AppLayout() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [sortOption, setSortOption] = useState("name-asc");
  const [searchQuery, setSearchQuery] = useState("");

  function handleDeletePlant(id) {
    setPlants((prev) => prev.filter((p) => p.id !== id));
  }

  function handleUpdateQuantity(id, updatedPlant) {
    setPlants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedPlant } : p))
    );
  }

  useEffect(function () {
    const token = localStorage.getItem("token");

    async function fetchResources() {
      try {
        const res = await fetch(`${BASE_URL}/resources/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch resources");

        const data = await res.json();
        console.log(data);
        setPlants(data);
        setFilteredPlants(data);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchResources();
  }, []);

  useEffect(
    function () {
      const filteredResources = plants
        .filter((r) => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
          switch (sortOption) {
            case "name-asc":
              return a.name.localeCompare(b.name);
            case "name-desc":
              return b.name.localeCompare(a.name);
            case "date-oldest":
              return new Date(a.date_added) - new Date(b.date_added);
            case "date-newest":
              return new Date(b.date_added) - new Date(a.date_added);
            default:
              return 0;
          }
        });
      setFilteredPlants(filteredResources);
    },
    [searchQuery, sortOption, plants]
  );

  return (
    <main className="app-layout">
      <AppNav></AppNav>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>My Plants</h1>
          <p>Manage and track your gardening inventory</p>
        </header>

        <TopBar
          onSearchChange={setSearchQuery}
          searchQuery={searchQuery}
          onSortChange={setSortOption}
          sortOption={sortOption}
        ></TopBar>

        {plants.length === 0 ? (
          <p className={styles.message}>Add your first plant</p>
        ) : (
          <PlantList
            onDelete={handleDeletePlant}
            onUpdate={handleUpdateQuantity}
            filteredPlants={filteredPlants}
          ></PlantList>
        )}
      </div>
    </main>
  );
}

export default AppLayout;
