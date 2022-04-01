import { Row, Col, Card } from 'react-bootstrap';

export default function PokemonList({ pokemons }) {
  return (
    <Row>
      {pokemons.map((p) => (
        <Col xs={12} md={4} lg={3} key={p.order}>
          <Card>
            <Card.Img
              variant="top"
              src={p.imgUrl}
              alt={p.name} />
            <Card.Body>
              <Card.Title>{'#' + String(p.order).padStart(3, '0')}</Card.Title>
              <Card.Text>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}