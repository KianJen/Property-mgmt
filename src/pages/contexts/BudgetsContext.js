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
 monthid
 monthindex
 year
 day
}
*/

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])
    const [currentExpenses, setCurrentExpenses] = useLocalStorage("current-expenses", [])
    const [currentMonths, setCurrentMonths] = useLocalStorage("current-months", [])
    const [currentYears, setCurrentYears] = useLocalStorage("current-years", [])
    const [years, setYears] = useLocalStorage("years", [])
    const [types, setTypes] = useLocalStorage("types", [
        "Advertising",
        "Auto & Travel",
        "Cleaning/Maintenance",
        "Commissions",
        "Insurance",
        "Labor",
        "Legal/Professional Fees",
        "Management",
        "Materials",
        "Mortgage Interest To Banks",
        "Other Interest",
        "Repairs",
        "Rent Collected",
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
    /*
    [{
        "January": 1,
        "February": 2,
        "March": 3 ,
        "April": 4,
        "May": 5,
        "June": 6,
        "July": 7,
        "August": 8,
        "September": 9,
        "October": 10,
        "November": 11,
        "December" : 12
}])
        */

    function addMonth(cmonth){
        setCurrentMonths(prevCurrentMonths => {
            return [...prevCurrentMonths, cmonth]
        })
    }
    function addYear(cyear){
        setCurrentYears(prevCurrentYears => {
            return [...prevCurrentYears, cyear]
        })
    }
    function Aggregate(){
        let n = expenses.filter(function(item) {
            for (var key in currentMonths) {
              if (item[key].month === undefined || item[key].month != currentMonths[key])
                return false
            }
        })
        n = n.filter(function(item) {
            for (var key in currentYears) {
              if (item[key].year === undefined || item[key].year != currentYears[key])
                return false
            }
        })
        setCurrentExpenses(n)
    }
    function getAggExpenses(budgetId){
        return currentExpenses.filter(expense => expense.budgetId = budgetId)
    }
    function getAggNegatives(budgetId){
        let a = currentExpenses.filter(expense => expense.budgetId = budgetId)
        return a.filter(expense => (expense.amount < 0))
    }
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

    function addExpense ({ description, amount, budgetId, expenseType, monthId, day, year }) {
        if(years.find(item => item === year) === undefined){
            setYears(prevYears => {
                return [...prevYears, year]
            })
        }
        setExpenses(prevExpenses => {
            
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId, expenseType, monthId, day, year}] // make rand id
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
            currentExpenses,
            currentMonths,
            getBudgetNegatives,
            getBudgetExpenseTypes,
            getBudgetExpenses,
            getMonthExpenses,
            Aggregate,
            getAggExpenses,
            getAggNegatives,
            addExpense,
            addMonth,
            addYear,
            addBudget,
            deleteBudget,
            deleteExpense,
        }}>{children}</BudgetsContext.Provider>
    )
}