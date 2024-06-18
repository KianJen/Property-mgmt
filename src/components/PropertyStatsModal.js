import {  Modal, Stack } from "react-bootstrap"
import {  useBudgets } from "../contexts/BudgetsContext"
import BudgetCard from "./BudgetCard"
//
//fix shared stats
export default function ViewPropertyStatsModal({ handleClose, budgetId, monthIndex}) {
    const { getBudgetExpenseTypes, types, budgets,getBudgetExpenses, getMonthExpenses, expenses} = useBudgets()
    //const budget = budgets.find(b => b.id === budgetId)
    
   
    //const expenses = getBudgetExpenses(budgetId)
    //const ex = expenses.filter(expense => expense.budgetId === budgetId)
    //const amount = expenses.reduce((total, expense ) => total + expense.amount,0) //total spending
    /*
    const types =
    [
        "Advertising",
        "Auto & Travel",
        "Cleaning/Maintenance",
        "Commissions",
        "Insurance",
        "Legal/Professional Fees",
        "Management",
        "Mortgage Interest To Banks",
        "Other Interest",
        "Repairs",
        "Supplies",
        "Taxes",
        "Utilities",
        "Other"
    ]
        */
    //const max = budgets.reduce((total, budget ) => total + budget.max,0) //total max
    return (
        <Modal show={budgetId != null} onHide={handleClose}> 
                <Modal.Header closeButton>
                    <Modal.Title>
                        <Stack direction="horizontal" gap="2">
                            <div>Stats</div>
                        </Stack>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <Stack direction="vertical" gap="3">
                        {types.map(type => {
                            const amount = getBudgetExpenseTypes(budgetId,type,monthIndex).reduce((total,expense) => total
                            + expense.amount, 0) 
                            return (
                        
                            <BudgetCard
                            name = {type}
                            //key = {budget.id}
                            amount = {amount} 
                            
                            gray
                            hideButtons
                            uncat
                            />
                            )
                        })}
                   </Stack>
                </Modal.Body>
        </Modal>
    )
}