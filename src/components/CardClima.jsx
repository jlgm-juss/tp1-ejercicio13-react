import { Card, Col, Row } from "react-bootstrap";

const CardClima = ({ clima, nombreUbic, temperatura }) => {
  return (
    <div>
      {clima.map((clima) => (
        <Card.Body key={clima.id}>
          <Card>
            <Card.Header>{nombreUbic}</Card.Header>
            <Card.Body>
              <Row className="align-items-center">
                <Col sm={12} md={4} className="text-center">
                <Card.Img src={'http://openweathermap.org/img/wn/' + clima.icon + '.png'} className='w-25' />
                </Col>
                <Col sm={12} md={8}>
                  <Card.Title className="display-6">{temperatura.temp}°</Card.Title>
                  <Card.Title>{clima.main}</Card.Title>
                  <Card.Text>{clima.description}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Card.Body>
      ))}
    </div>
  );
};

export default CardClima;