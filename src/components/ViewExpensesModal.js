import { Button, Modal, Stack } from "react-bootstrap"
import { currencyFormatter } from "../utils"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"

export default function ViewExpensesModal({budgetId, handleClose, monthIndex }) {
    
    const { getBudgetExpenses, budgets, deleteBudget, deleteExpense, months } = useBudgets()
    
    const expenses = getBudgetExpenses(budgetId,monthIndex)
    
    const budget = UNCATEGORIZED_BUDGET_ID === budgetId ? //if uncat
    
    {name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID} //make new
    : budgets.find(b => b.id === budgetId) //find budget
    return (
        <Modal show={budgetId !== undefined} onHide={handleClose}> 
            
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap="2">
                            <div>Expenses - {budget?.name}</div>
                            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                                <Button onClick={() => {
                                    deleteBudget(budget)
                                    handleClose()
                                }} variant="outline-danger">Delete</Button>
                            )}
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Stack direction="vertical" gap="3">
                    {expenses.map(expense => ( //fs = font size
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description} - {months.expense.monthId}/{expense.day}/{expense.year}</div> 
                            <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                            <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">
                                &times;
                            </Button>
                        </Stack>
                    ))}
                   </Stack>
                </Modal.Body>
            
        </Modal>
    )
}