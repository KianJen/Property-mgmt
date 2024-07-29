import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function TotalBudgetCard({monthIndex, yearIndex}) {
    const {getMonthExpenses, years} = useBudgets()
    const exp = getMonthExpenses(monthIndex).filter(expense => expense.year === years[yearIndex])
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