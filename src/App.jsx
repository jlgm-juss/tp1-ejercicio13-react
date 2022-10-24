import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import FormClima from "./components/FormClima";

function App() {
  return (
    <div>
      <h1 className="text-center p-3 bg-warning">Clima</h1>
      <Container className="my-4">
        <FormClima></FormClima>
      </Container>
    </div>
  );
}

export default App;