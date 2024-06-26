import { Button, Form, Modal } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"
//ui for adding budget
//mb = margin bottom
export function AddBudgetModal({show, handleClose }) {
    const nameRef = useRef()
    const { addBudget } = useBudgets()
    function handleSubmit(e) {
        e.preventDefault()
        addBudget({
        name: nameRef.current.value,
        
        })
        handleClose() //close after submit
    }

    return (
        <Modal show={show} onHide={handleClose}> 
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Property</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="name"> 
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref = {nameRef} type="text" required />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant = "primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}
