import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import HeadingNode from "../components/nodes/HeadingNode";
import DescriptionNode from "../components/nodes/DescriptionNode";
import ImageNode from "../components/nodes/ImageNode";
import HeadingDescriptionNode from "../components/nodes/HeadingDescriptionNode";
import Sidebar from "../components/Sidebar";

const nodeTypes = {
  heading: HeadingNode,
  description: DescriptionNode,
  image: ImageNode,
  headingDesc: HeadingDescriptionNode,
};

const FlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
  (params) => setEdges((eds) => addEdge(params, eds)),
  []
);


  return (
    <div style={{ display: "flex", height: "90vh" }}>
  <Sidebar setNodes={setNodes} />
  <div style={{ flex: 1 }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView          // automatically fits all nodes in view
      minZoom={0.5}    // user cannot zoom out beyond this
      maxZoom={2}      // optional: max zoom in
      zoomOnScroll={true} // allow zooming with scroll
      zoomOnPinch={true}  // for touch devices
      panOnScroll={true}  // allow panning
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  </div>
</div>

  );
};

export default FlowBuilder;
