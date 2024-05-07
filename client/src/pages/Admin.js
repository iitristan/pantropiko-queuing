import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import "./AdminPanel.css"; // Ensure you link to your CSS file

const socket = io.connect("http://localhost:3001");

const Admin = () => {
  const [preparing, setPreparing] = useState("");
  const [queue, setQueue] = useState({ preparing: [], serving: [] });

  useEffect(() => {
    socket.on("update_queue", (data) => {
      setQueue(data);
    });
  }, []);

  const handleAddToPreparing = () => {
    // Check if the current input value already exists in either list
    if (
      !queue.preparing.includes(preparing) &&
      !queue.serving.includes(preparing)
    ) {
      socket.emit("update_preparing", preparing);
      setPreparing("");
    } else {
      // Optionally, you can alert the user or handle the duplicate case more gracefully
      alert("This item is already in the queue!");
    }
  };

  const handleMoveToServing = (index) => {
    socket.emit("move_to_serving", index);
  };

  const handleDeletePreparing = (index) => {
    socket.emit("delete_preparing", index);
  };

  const handleDeleteServing = (index) => {
    socket.emit("delete_serving", index);
  };

  return (
    <div className="admin-panel">
      <h1 className="admin-header">Admin Panel</h1>
      <Link to="/" className="back-link">
        Back to Queue Status
      </Link>
      <div className="input-group">
        <input
          className="input-text"
          value={preparing}
          onChange={(e) => setPreparing(e.target.value)}
          placeholder="Add to Preparing"
        />
        <button className="btn add-btn" onClick={handleAddToPreparing}>
          Add to Preparing
        </button>
      </div>
      <section className="queue-section">
        <h2 className="section-header">Preparing</h2>
        <ul className="item-list">
          {queue.preparing.map((item, index) => (
            <li key={index} className="item">
              {item}
              <button
                className="btn move-btn"
                onClick={() => handleMoveToServing(index)}
              >
                Move to Serving
              </button>
              <button
                className="btn delete-btn"
                onClick={() => handleDeletePreparing(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section className="queue-section">
        <h2 className="section-header">Serving</h2>
        <ul className="item-list">
          {queue.serving.map((item, index) => (
            <li key={index} className="item">
              {item}
              <button
                className="btn delete-btn"
                onClick={() => handleDeleteServing(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Admin;
