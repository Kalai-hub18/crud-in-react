import React, { useState } from "react";
import './App.css';

function Crud() {
  const [items, setItems] = useState([]);
  const [inputData, setInputData] = useState({
    Grocery: "",
    Quantity: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Handle input change for Grocery and Quantity
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Add or update an item
  const handleAddItem = () => {
    if (isEditing) {
      // Update existing item
      const updatedItems = [...items];
      updatedItems[editIndex] = inputData;
      setItems(updatedItems);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new item
      setItems([...items, { ...inputData, id: Date.now() }]);
    }
    setInputData({ Grocery: "", Quantity: "" }); // Reset input fields
  };

  // Edit item - fills input fields with item data
  const handleEdit = (index) => {
    setIsEditing(true); // Set edit mode
    setEditIndex(index); // Store index of the item to edit
    setInputData(items[index]); // Populate input fields with item data
  };

  // Delete item
  const handleDelete = (index) => {
    const tempArray = [...items];
    tempArray.splice(index, 1);
    setItems(tempArray);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
        <input
          type="text"
          className="input mt-3 mb-3 text-center"
          style={{ width: "20%" }}
          placeholder="Enter the grocery name"
          name="Grocery"
          value={inputData.Grocery}
          onChange={handleInputChange}
        />
        <input
          type="text"
          className="text mt-4 mb-4 text-center"
          style={{ width: "20%" }}
          placeholder="How much quantity you need"
          name="Quantity"
          value={inputData.Quantity}
          onChange={handleInputChange}
        />
        <button className="btn btn-success mt-4" onClick={handleAddItem}>
          {isEditing ? "Update Item" : "Add Item"}
        </button>
      </div>

      {/* Table to display items */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Grocery</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.Grocery}</td>
              <td>{item.Quantity}</td>
              <td>
                <button
                  className="btn btn-danger me-3"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Crud;
