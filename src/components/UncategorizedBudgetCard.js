import { UNCATEGORIZED_BUDGET_ID, useBudgets} from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

export default function UncategorizedBudgetCard({props,monthIndex}) {
    const {getBudgetExpenses} = useBudgets()
    //broken, fix buttons
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID,monthIndex).reduce(
        (total, expense ) => total + expense.amount,
        0
    )
    if (amount === 0) return null 

    return(
        <BudgetCard amount={amount} uncat hidestats name = "Uncategorized" {...props} />
    )
}
