import { Button, Form, Modal } from "react-bootstrap"
import { useRef } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
//ui for adding expense
//mb = margin bottom
export function AddExpenseModal({show, handleClose, defaultBudgetId, defaultMonthIndex}) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const expenseTypeRef = useRef()
    const monthIdRef = useRef()
    const { addExpense , budgets, types, months } = useBudgets()
    
   
    function handleSubmit(e) {
        e.preventDefault()
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value,
            expenseType: expenseTypeRef.current.value,
            monthId: monthIdRef.current.value
        })
        if (amountRef.current.value < 0){
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
                    <Form.Group className="mb-3" controlId="amount"> 
                        <Form.Label>Amount</Form.Label>
                        <Form.Control 
                         ref = {amountRef}
                         type="number" 
                         required 
                           
                         step={0.01}/> 
                    </Form.Group>
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
                            <option id={"Other"}>Other</option>
                            {types.map(type => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="budgetid"> 
                        <Form.Label>Month</Form.Label>
                        <Form.Select 
                         defaultValue={months[defaultMonthIndex]}
                         ref = {monthIdRef}>
                            
                            {months.map(month => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button variant = "primary" type="submit">Add</Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    )
}