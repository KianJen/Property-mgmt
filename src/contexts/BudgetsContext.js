import React, { useContext } from "react"
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"


const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets(){
 return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
    function getBudgetExpenses(budgetId) {
        return expenses.filter(expense => expense.budgetId === budgetId) // => = "where"
    }
    function addExpense ({ description, amount, budgetId }) {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId}] // make rand id
        })
    }
    function addBudget ({name, max}) {
        
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)) { //no dupilcate budgets
                return prevBudgets
            }
            return [...prevBudgets, { id: uuidV4(), name, max}] // make rand id
        })
    }
    function deleteBudget ({ id }) {
        setExpenses(prevExpenses => { //move expenses to uncat
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense //wrong id
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
            })
        })
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id) //return budgets without deleted one
        })
    }
    function deleteExpense ({ id }) {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id) //return budgets without deleted one
        })
    }
    return (
        <BudgetsContext.Provider value={{
            //gather info
            budgets,
            expenses,
            getBudgetExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
        }}>{children}</BudgetsContext.Provider>
    )
}