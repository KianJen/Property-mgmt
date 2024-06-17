import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard({monthIndex}) {
    const { expenses, budgets,getMonthExpenses} = useBudgets()
    const exp = getMonthExpenses(monthIndex)
   // let neg = getBudgetNegatives(budget.id).reduce((tot,exp) => tot
    //      + exp.amount, 0)
    const amount = exp.reduce((total, expense ) => total + expense.amount,0)
    const max = budgets.reduce((total, budget ) => total + budget.max,0)
    if (max === 0) return null //show?

    return(
        <BudgetCard 
        amount={amount} 
        name = "Total" 
         
        max={max} 
        hideButtons/>
    )
}
