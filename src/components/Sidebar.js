import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useTheme } from "./context/ThemeContext";

let id = 0;
const getId = () => `node_${id++}`;

const Sidebar = ({ setNodes }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [showModal, setShowModal] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addNode = (type) => {
    
    const newNode = {
      id: getId(),
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: `${type} node`,
        heading: "Heading",
        desc: "Description text...",
        src: "https://via.placeholder.com/150",
        setNodes,
      },
    };
    setNodes((nds) => nds.concat(newNode));
    setShowModal(false); // close modal after adding node
  };

  return (
    <>
      {/* Desktop/Laptop Sidebar */}
      {!isSmallScreen && (
        <Card
          style={{
            width: 220,
            padding: "15px",
            borderRight: `1px solid ${isDark ? "#333" : "#ddd"}`,
            backgroundColor: isDark ? "#1e1e1e" : "#f8f9fa",
            color: isDark ? "#fff" : "#000",
            height: "90vh",
          }}
        >
          <h4
            className="text-center mb-4"
            style={{ fontWeight: "600", color: isDark ? "#f8f9fa" : "#212529" }}
          >
            Add Nodes
          </h4>

          <div className="d-grid gap-3">
            <Button
              variant={isDark ? "outline-info" : "primary"}
              className="w-100"
              onClick={() => addNode("heading")}
            >
              Heading Node
            </Button>
            <Button
              variant={isDark ? "outline-info" : "primary"}
              className="w-100"
              onClick={() => addNode("description")}
            >
              Description Node
            </Button>
            <Button
              variant={isDark ? "outline-info" : "primary"}
              className="w-100"
              onClick={() => addNode("image")}
            >
              Image Node
            </Button>
            <Button
              variant={isDark ? "outline-info" : "primary"}
              className="w-100"
              onClick={() => addNode("headingDesc")}
            >
              Heading + Description Node
            </Button>
          </div>
        </Card>
      )}

      {/* Floating + button for small screens */}
      {isSmallScreen && (
        <>
          <Button
            style={{
              position: "fixed",
              bottom: 10,
              right: 20,
              borderRadius: "50%",
              width: 50,
              height: 50,
              fontSize: 24,
              zIndex: 99999,
              background:'#0d6efd'
            }}
            onClick={() => setShowModal(true)}
            variant={isDark ? "outline-light" : "primary"}
          >
            +
          </Button>

          {/* Modal for adding nodes */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Node</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-grid gap-2">
              <Button
                variant={isDark ? "outline-info" : "primary"}
                onClick={() => addNode("heading")}
              >
                Heading Node
              </Button>
              <Button
                variant={isDark ? "outline-info" : "primary"}
                onClick={() => addNode("description")}
              >
                Description Node
              </Button>
              <Button
                variant={isDark ? "outline-info" : "primary"}
                onClick={() => addNode("image")}
              >
                Image Node
              </Button>
              <Button
                variant={isDark ? "outline-info" : "primary"}
                onClick={() => addNode("headingDesc")}
              >
                Heading + Description Node
              </Button>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default Sidebar;
