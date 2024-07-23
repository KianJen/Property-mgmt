import { Button, DropdownButton, DropdownItem, Form, InputGroup, Modal, Dropdown, FormGroup, FormSelect } from "react-bootstrap"
import { useRef } from "react"
import {  useBudgets } from "../contexts/BudgetsContext"
//ui for adding expense
//mb = margin bottom
export function AddExpenseModal({show, handleClose, defaultBudgetId, defaultMonthIndex}) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const expenseTypeRef = useRef()
    const monthIdRef = useRef()
    //const negativeRef = useRef()
    const dayRef = useRef()
    const yearRef = useRef()
    const { addExpense , budgets, types, months } = useBudgets()
    
    let neg = false
    function handleSubmit(e) {
        e.preventDefault()
        addExpense({
            description: descriptionRef.current.value,

            amount: neg === true ? parseFloat(amountRef.current.value) : parseFloat(amountRef.current.value) * -1,
            budgetId: budgetIdRef.current.value,
            expenseType: expenseTypeRef.current.value,
            monthId: monthIdRef.current.value,
            
            year: yearRef.current.value,
            day: dayRef.current.value
        })
        
        if (amountRef.current.value < 0){ //profit calc
            let budget = budgets.find(b => b.id === budgetIdRef.current.value)
            budget.max += Math.abs(amountRef.current.value)
        }
        handleClose() //close after submit
    }

    return (
        <Modal show={show} onHide={handleClose}> 
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="description"> 
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref = {descriptionRef} type="text" required />
                    </Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <InputGroup className="mb-3" controlId="amount"> 
                        <InputGroup.Checkbox id = "negative-expense" onClick={(e) => {
                            neg = e.target.checked
                        }}/>
                        <Form.Control 
                         ref = { amountRef  }
                         type="number" 
                         required 
                         placeholder="Check the box for positive expenses"
                         step={0.01}/> 
                    
                    </InputGroup>
                    
                    <Form.Group className="mb-3" controlId="budgetid"> 
                        <Form.Label>Budget</Form.Label>
                        <Form.Select 
                         defaultValue={defaultBudgetId}
                         ref = {budgetIdRef}>
                            
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetid"> 
                        <Form.Label>Classification</Form.Label>
                        <Form.Select 
                         defaultValue={"Other"}
                         ref = {expenseTypeRef}>
                            
                            {types.map(type => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Label>Date</Form.Label>
                    <InputGroup className="mb-3" controlId="budgetid">
                        <InputGroup.Text>Day/Month/Year</InputGroup.Text>
                             <Form.Control 
                            //defaultValue={months[defaultMonthIndex]}
                            ref = {dayRef}
                            type = "number"
                            required
                            >
                            </Form.Control>
                            <FormSelect id = "month-dropdown" defaultValue={months[defaultMonthIndex]}  ref={monthIdRef}> 
                                    {months.map(month => (
                                        <option key={month} value = {month}>
                                            {month}
                                        </option>
                                    ))}
                            </FormSelect>
                            <Form.Control 
                            //placeholder = {defaultYear}
                                ref = {yearRef}
                                type = "number"
                                required
                                >
                            </Form.Control>
                        </InputGroup>
                    <div className="d-flex justify-content-end">
                        <Button variant = "primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}