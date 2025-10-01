import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const DescriptionNode = ({ id, data }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  const handleBlur = () => {
    setEditing(false);
    data.setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, desc: text } } : n
      )
    );
  };

  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #555",
        borderRadius: 5,
        background: "#fff",
        minWidth: 150,
        minHeight: 50,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: "#555" }} />

      {editing ? (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          placeholder="Enter description here..."
          style={{ width: "100%", resize: "none" }}
        />
      ) : (
        <p
          onClick={() => setEditing(true)}
          style={{
            color: text ? "#000" : "#999",
            cursor: "text",
            minHeight: "1.2em",
            margin: 0,
          }}
        >
          {text || "Click to add description..."}
        </p>
      )}

      <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
    </div>
  );
};

export default DescriptionNode;
