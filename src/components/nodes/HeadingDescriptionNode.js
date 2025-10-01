import React, { useState } from "react";
import { Handle, Position } from "reactflow";

const HeadingDescriptionNode = ({ id, data }) => {
  const [editingHeading, setEditingHeading] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [heading, setHeading] = useState(data.heading || "");
  const [desc, setDesc] = useState(data.desc || "");

  const saveHeading = () => {
    setEditingHeading(false);
    data.setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, heading } } : n
      )
    );
  };

  const saveDesc = () => {
    setEditingDesc(false);
    data.setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, desc } } : n
      )
    );
  };

  return (
    <div
      style={{
        padding: 10,
        border: "2px solid #333",
        borderRadius: 5,
        background: "#fff",
        minWidth: 180,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: "#555" }} />

      {/* Heading */}
      {editingHeading ? (
        <input
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          onBlur={saveHeading}
          onKeyDown={(e) => e.key === "Enter" && saveHeading()}
          autoFocus
          placeholder="Enter heading..."
          style={{ width: "100%", fontWeight: "bold", textAlign: "center" }}
        />
      ) : (
        <h4
          onClick={() => setEditingHeading(true)}
          style={{ color: heading ? "#000" : "#999", cursor: "text", margin: "5px 0" }}
        >
          {heading || "Click to add heading..."}
        </h4>
      )}

      {/* Description */}
      {editingDesc ? (
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          onBlur={saveDesc}
          autoFocus
          placeholder="Enter description..."
          style={{ width: "100%", resize: "none" }}
        />
      ) : (
        <p
          onClick={() => setEditingDesc(true)}
          style={{ color: desc ? "#000" : "#999", cursor: "text", margin: 0 }}
        >
          {desc || "Click to add description..."}
        </p>
      )}

      <Handle type="source" position={Position.Bottom} style={{ background: "#555" }} />
    </div>
  );
};

export default HeadingDescriptionNode;
