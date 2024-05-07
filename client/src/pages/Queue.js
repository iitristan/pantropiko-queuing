import io from "socket.io-client";
import { useEffect, useState } from "react";
import "./Queue.css"; // Make sure your CSS file is correctly imported

const socket = io.connect("http://localhost:3001");

const Queue = () => {
  const [queue, setQueue] = useState({ preparing: [], serving: [] });

  useEffect(() => {
    socket.on("update_queue", (data) => {
      setQueue(data);
    });
  }, []);

  return (
    <div className="container-fluid text-align-center align-items-center">
      <div className="image-container d-flex justify-content-center align-items-center">
        <img src="/stk.png" style={{ width: "150px", height: "150px" }} />
      </div>
      <div className="row">
        <div
          id="preparing"
          className="col-md-6 queue-container-preparing d-flex flex-column align-items-center"
        >
          <h2>Preparing</h2>
          <div className="queue-grid">
            {queue.preparing.map((item, index) => (
              <div key={index} className="queue-item">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div id="nowServing" className="col-md-6 queue-container">
          <h2>Serving</h2>
          <div className="queue-grid">
            {queue.serving.map((item, index) => (
              <div key={index} className="queue-item">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;
