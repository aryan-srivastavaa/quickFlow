import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const HeadingNode = ({ id, data }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");

  const handleBlur = () => {
    setEditing(false);
    data.setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, heading: text } } : n
      )
    );
  };

  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #000",
        borderRadius: 5,
        background: "#fff",
        minWidth: 150,
        minHeight: 40,
        textAlign: "center",
      }}
    >
      {/* Incoming connection handle */}
      <Handle type="target" position={Position.Top} style={{ background: "#555" }} />

      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
          autoFocus
          placeholder="Enter heading..."
          style={{ width: "100%", textAlign: "center" }}
        />
      ) : (
        <h3
          onClick={() => setEditing(true)}
          style={{ color: text ? "#000" : "#999", cursor: "text", margin: 0 }}
        >
          {text || "Enter heading..."}
        </h3>
      )}

      {/* Outgoing connection handle */}
      <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
    </div>
  );
};

export default HeadingNode;
