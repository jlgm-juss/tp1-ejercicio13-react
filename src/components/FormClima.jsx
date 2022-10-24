import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import CardClima from "./CardClima";
import Spinner from "./Spinner"

const FormClima = () => {
  const [ubicacion, setUbicacion] = useState("");
  const [nombreUbic, setNombreUbic] = useState("");
  const [clima, setClima] = useState([]);
  const [temperatura, setTemperatura] = useState({})
  const [mostrarSpinner, setMostrarSpinner] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ubicacion.trim() === "") {
      alert("Complete el campo por favor");
    } else {
      consultarAPI();
      setUbicacion('')
    }
  };

  const consultarAPI = async () => {
    try {
      setMostrarSpinner(true)
      const respuesta = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${ubicacion}&appid=2379bde6c1cae4cffefafe1d29717de2`
      );
      const dato = await respuesta.json();
      setNombreUbic(dato[0].name);
      try {
        const respuestaFinal = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${dato[0].lat}&lon=${dato[0].lon}&appid=2379bde6c1cae4cffefafe1d29717de2&units=metric&lang=es`
        );
        const datoFinal = await respuestaFinal.json();
        console.log(datoFinal)
        setClima(datoFinal.weather);
        setTemperatura(datoFinal.main)
      } catch (error) {}
      setMostrarSpinner(false)
    } catch (error) {
      setMostrarSpinner(false)
      alert("ubicacion no encotrada");
    }
  };

  const mostrarComponente = (mostrarSpinner === true)?(<Spinner></Spinner>):(<CardClima nombreUbic={nombreUbic} clima={clima} temperatura={temperatura}></CardClima>)

  return (
    <Card>
      <Card.Header>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Row>
              <Col sm={12} md={5}>
                <Form.Label>Ingrese un pais, ciudad, estado...</Form.Label>
              </Col>
              <Col sm={12} md={5}>
                <Form.Control
                  type="text"
                  placeholder="Ej: San Miguel de Tucuman"
                  onChange={(e) => setUbicacion(e.target.value)}
                  value={ubicacion}
                  required
                />
              </Col>
              <Col sm={12} md={2}>
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card.Header>
      {mostrarComponente}
    </Card>
  );
};

export default FormClima;