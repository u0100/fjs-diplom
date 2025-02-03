import { Container } from "react-bootstrap"

const ErrorMain = () => {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Page not found</p>
      </Container>
    </Container>
  )
}

export default ErrorMain
