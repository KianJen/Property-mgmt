import React, { useContext } from "react"
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from "../hooks/useLocalStorage"


const BudgetsContext = React.createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export function useBudgets(){
 return useContext(BudgetsContext)
}

/*
{
 id:
 name:
 max:
 dict{}
}

{
 id:
 budgetId:
 amount:
 description
 expensetype
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
       
    //const [se,setSe] = useLocalStorage("Schedule_E",[])
    //const [dict, setDict] = useLocalStorage("dict", {})
    /*
    let dict = {
        
        "Advertising": 0,
        "Auto & Travel": 0,
        "Cleaning/Maintenance": 0,
        "Commissions": 0,
        "Insurance": 0,
        "Legal/Professional Fees": 0,
        "Management": 0,
        "Mortgage Interest To Banks": 0,
        "Other Interest": 0,
        "Repairs": 0,
        "Supplies": 0,
        "Taxes": 0,
        "Utilities": 0,
        "Other" : 0
        
    }
    */
    
    function getBudgetExpenseTypes(budgetId,typ){
        let exp = expenses.filter(expense => expense.budgetId === budgetId) //only budget expenses
        return exp.filter(expense => expense.expenseType === typ) //certain expensetype
        

    }
    function getMonthExpenses(monthIndex){
        return expenses.filter(expense => expense.monthId === months[monthIndex])
    }
    function getBudgetNegatives(budgetId,monthIndex){
        let exp = expenses.filter(expense => expense.budgetId === budgetId)
        return exp.filter(expense => (expense.amount < 0 , expense.monthId === months[monthIndex]))
    }
    function getBudgetExpenses(budgetId,monthIndex) {
        return expenses.filter(expense => (expense.budgetId === budgetId , expense.monthId === months[monthIndex])) // => = "where"
    }

    function addExpense ({ description, amount, budgetId, expenseType, monthId }) {
        //let budget = budgets.find(b => b.id === budgetId)
        setExpenses(prevExpenses => {
            //const found = prevExpenses.find(expense => (expense.expenseType === expenseType) && (expense.budgetId === budgetId))
            //if(found !== undefined) { //no dupilcate expensetypes
                
                //found.amount = found.amount + amount
                //return prevExpenses
            //}
            //budget.dict.set(expenseType , amount);
            //let am = budget.dict.get(expenseType)
            //budget.dict.set("Advertising",1)
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId, expenseType, monthId}] // make rand id
        })
    }
    function addBudget ({name, max}) {
        
        setBudgets(prevBudgets => {
            if(prevBudgets.find(budget => budget.name === name)) { //no dupilcate budgets
                return prevBudgets
            } 
            //const dict = new Map()
            
            
                
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