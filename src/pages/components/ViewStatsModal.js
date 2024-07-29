import {  Modal, Stack } from "react-bootstrap"
import {  useBudgets } from "../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"

//ui for adding budget
//mb = margin bottom
export default function ViewStatsModal({ handleClose, show}) {
    const { expenses, budgets} = useBudgets()
    
    const amount = expenses.reduce((total, expense ) => total + expense.amount,0) //total spending
    
    
    const max = expenses.filter(expense => expense.amount < 0).reduce((total, expense ) => total + expense.amount,0) //nagetives
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
                         
                        max={Math.abs(max)} 
                        hidestats
                        hideButtons/>
                    <BudgetCard  
                        //check for uncat
                        amount={amount/budgets.length}  // +1 for uncat
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