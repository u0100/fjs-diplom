import { Container } from "react-bootstrap"
import HotelRoomUpdateForm from "./HotelRoomUpdateForm"

const HotelRoomUpdateMain = () => {
  return (
    <Container className="bg-white rounded shadow-sm p-2">
      <Container>
        <p className="fs-2 fw-semibold">Редактировать номер</p>
        <HotelRoomUpdateForm />
      </Container>
    </Container>
  )
}

export default HotelRoomUpdateMain