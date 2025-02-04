import { Container, Spinner } from "react-bootstrap"

const LoaderMain = () => {
  return (
    <Container className="p-2 d-flex justify-content-center mt-2">
      <Spinner animation="grow" variant="primary"/>
    </Container>
  )
}

export default LoaderMain
