import { Navbar, Container, Form } from "react-bootstrap";
import { useTheme } from "./components/context/ThemeContext";
import FlowBuilder from "./pages/FlowBuilder";
import './App.css'
function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <Navbar style={{ height: '10vh' }} bg={theme === "dark" ? "dark" : "light"} variant={theme}>
        <Container>
          <Navbar.Brand  to="/" className="animated-brand d-flex align-items-center gap-2 cursor-pointer">
            <img
              src="/quickFlow-logo.png"
              alt="QuickFlow"
              height="28"
              className="d-inline-block align-text-top rounded"
            />
            quickFlow
          </Navbar.Brand>
          <Form className="cursor-pointer">
            <Form.Check
              type="switch"
              id="theme-switch"
              className="cursor-pointer"
              label={theme === "dark" ? "🌙 Dark" : "☀️ Light"}
              checked={theme === "dark"}
              onChange={toggleTheme}
              style={{
                color: theme === "dark" ? "#fff" : "#000",
                fontWeight: "600", cursor: 'pointer'
              }}
            />
          </Form>
        </Container>
      </Navbar>

      <div style={{ display: "flex" }}>

        <div style={{ flex: 1, background: theme === "dark" ? "#121212" : "#fff" }}>
          <FlowBuilder />
        </div>
      </div>
    </div>
  );
}

export default App;
