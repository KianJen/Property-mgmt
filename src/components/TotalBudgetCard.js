import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard({monthIndex}) {
    const { expenses, budgets,getMonthExpenses,getBudgetExpenses} = useBudgets()
    const exp = getMonthExpenses(monthIndex)
    
   // let neg = getBudgetNegatives(budget.id).reduce((tot,exp) => tot
    //      + exp.amount, 0)
    const amount = exp.reduce((total, expense ) => total + expense.amount,0)
    const max = exp.filter(expense => expense.amount < 0).reduce((total, expense ) => total + expense.amount,0)
    if (max === 0) return null //show?

    return(
        <BudgetCard 
        amount={amount} 
        name = "Total" 
         
        max={Math.abs(max)} 
        hideButtons/>
    )
}
