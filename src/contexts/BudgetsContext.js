import React, { useContext } from "react"
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"


const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets(){
 return useContext(BudgetsContext)
}

/*
{ budget
 id:
 name:
 max:
 totalmax
 
}

{ expense
 id:
 budgetId:
 amount:
 description
 expensetype
 monthindex

}
*/

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
    const [types, setTypes] = useLocalStorage("types", [
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
        "Other"])
    const [months,setMonths] = useLocalStorage("months",[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ])
       
    function getBudgetExpenseTypes(budgetId,typ,monthIndex){
        let exp = expenses.filter(expense => expense.budgetId === budgetId) //only budget expenses
        exp = exp.filter(expense => (expense.expenseType === typ )) //certain expensetype
        return exp.filter(expense => (expense.monthId === months[monthIndex]))

    }
    function getMonthExpenses(monthIndex){
        return expenses.filter(expense => expense.monthId === months[monthIndex])
    }
    function getBudgetNegatives(budgetId,monthIndex){
        let exp = expenses.filter(expense => expense.budgetId === budgetId)
        exp = exp.filter(expense => (expense.amount < 0))
        return exp.filter(expense => (expense.monthId === months[monthIndex]))
    }
    function getBudgetExpenses(budgetId,monthIndex) {
        let exp = expenses.filter(expense => (expense.budgetId === budgetId))
        return exp.filter(expense => expense.monthId === months[monthIndex]) // => = "where"
    }

    function addExpense ({ description, amount, budgetId, expenseType, monthId }) {
        
        setExpenses(prevExpenses => {
            
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId, expenseType, monthId}] // make rand id
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
        setExpenses(prevExpenses => { //move expenses to uncat(notanymore)
            return prevExpenses.filter(expense => expense.budgetId !== id)  //wrong id
                //return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID})
        })
        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id) //return budgets without deleted one
        })
    }
    function deleteExpense ({ id }) { //mem leak
        setExpenses(prevExpenses => {
            return prevExpenses.filter(expense => expense.id !== id) //return budgets without deleted one
        })
    }
    return (
        <BudgetsContext.Provider value={{
            //gather info
            budgets,
            expenses,
            types,
            months,
            getBudgetNegatives,
            getBudgetExpenseTypes,
            getBudgetExpenses,
            getMonthExpenses,
            addExpense,
            addBudget,
            deleteBudget,
            deleteExpense,
        }}>{children}</BudgetsContext.Provider>
    )
}