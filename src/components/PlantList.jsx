import PlantItem from "./PlantItem";
import styles from "./PlantList.module.css";

function PlantList({ filteredPlants, onDelete, onUpdate }) {
  return (
    <ul className={styles.grid}>
      {filteredPlants.map((plant) => (
        <PlantItem
          plant={plant}
          onDelete={onDelete}
          onUpdate={onUpdate}
        ></PlantItem>
      ))}
    </ul>
  );
}

export default PlantList;
