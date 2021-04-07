import React, {useState} from 'react';
import api from '../../services/API';
import qs from 'qs';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import './Modal_Add_BTT.css'

export default function Modal_Add_BTT() {
    const [show, setShow] = useState(false);
    const [quantity_dollars, setMoney] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const header = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }

    // Takes the id from the local storage to use it in the api call
    const id = localStorage.getItem("user").replace(/"/g,"");

    async function add_btt (credentials) {
        return api.post(`add_btt/${id}`, qs.stringify(credentials), {headers: header});
    }
    
    const handleSubmit = async(event) => {
        console.log(event);
        event.preventDefault();
        await add_btt({
            quantity_dollars,
        });
        handleClose();
    }

    return (
      <>
        <Button variant="primary" onClick={handleShow} id="button-graph" alt="arrow">
            <img id="icon-arrow" src="up-arrow.svg" ></img>Send
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="quantity_dollars">
                <Form.Label>How much do you want to send?</Form.Label>
                <Form.Control
                    autoFocus
                    type="number"
                    value={quantity_dollars}
                    onChange={(e) => setMoney(e.target.value)}
                />
                </Form.Group>
                <Button variant="primary" type="submit">
                Send Money
                </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }