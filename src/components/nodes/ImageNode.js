import React, { useState, useRef } from "react";
import { Handle, Position } from "reactflow";

const ImageNode = ({ id, data }) => {
  const [url, setUrl] = useState(data.src || "");
  const fileInputRef = useRef(null);

  // Handle local file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUrl(event.target.result); // update preview
      data.setNodes((nds) =>
        nds.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, src: event.target.result } } : n
        )
      );
    };
    reader.readAsDataURL(file); // convert file to base64
  };

  // Trigger file input when clicking the image
  const handleClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #888",
        borderRadius: 5,
        background: "#fff",
        minWidth: 150,
        textAlign: "center",
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: "#555" }} />

      <img
        src={url || "https://via.placeholder.com/120x80?text=Click+to+Upload"}
        alt="Node"
        style={{ width: 120, height: 80, objectFit: "cover", cursor: "pointer" }}
        onClick={handleClick} // single click opens file picker
      />

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <Handle type="source" position={Position.Right} style={{ background: "#555" }} />
    </div>
  );
};

export default ImageNode;
