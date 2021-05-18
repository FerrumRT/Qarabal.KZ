import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function PhotoModal() {

  const reducers = useSelector(state=>state);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="light"  onClick={handleShow}>Photo</Button>

      <Modal size="sm" show={show} onHide={handleClose}>
        <Modal.Body>
        {reducers.film.details.photo_url && <img className="image-big" src={`/static/${reducers.film.details.photo_url}`} alt="" />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}