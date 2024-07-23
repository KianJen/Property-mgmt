import {  Modal, Stack } from "react-bootstrap"
import {  useBudgets, UNCATEGORIZED_BUDGET_ID, } from "../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"

//ui for adding budget
//mb = margin bottom
export default function ViewStatsModal({ handleClose, show,}) {
    const { expenses, budgets} = useBudgets()
    const { getBudgetExpenses} = useBudgets()
    const amount = expenses.reduce((total, expense ) => total + expense.amount,0) //total spending
    let bl = 0 //uncat
    const c = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense ) => total + expense.amount,
        0
    )
    if (c > 0){
        bl = 1 
    } 
    const max = budgets.reduce((total, budget ) => total + budget.max,0) //total max, max for each month?
    return (
        <Modal show={show} onHide={handleClose}> 
            
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap="2">
                            <div>Stats</div>
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Stack direction="vertical" gap="3">
                    <BudgetCard 
                        amount={amount} //total
                        name = "Total" 
                         
                        max={max/2} 
                        hideButtons/>
                    <BudgetCard  
                        //check for uncat
                        amount={amount/(budgets.length + bl)}  // +1 for uncat
                        name = "Average Amount" 
                        gray 
                        uncat
                        hideButtons/>
                    <BudgetCard 
                        amount={expenses.length} 
                        name = "Expenses" 
                        gray 
                        uncat
                        hideButtons/>
                    <BudgetCard 
                        amount={budgets.length} 
                        name = "Properties" 
                        gray 
                        uncat
                        hideButtons
                        
                        />
                   </Stack>

                </Modal.Body>
            
        </Modal>
    )
}