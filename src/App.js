//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import BudgetCard from './components/BudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';
import ViewStatsModal from './components/ViewStatsModal';
import { AddBudgetModal } from './components/addBudgetModal';
import { AddExpenseModal } from './components/AddExpenseModal';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './contexts/BudgetsContext';




function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showViewExpensesModal, setShowViewExpensesModal] = useState(false)
  const [showViewStatsModal, setShowViewStatsModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(false)
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return ( //mb4 is bottom margin my4 top margin, me-auto is left side
    <> 
    <Container className='my-4'> 
      <Stack direction="horizontal" gap="2" className="mb-4"> 
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Budget</Button>
        <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
        <Button variant="success" onClick={() => setShowViewStatsModal(true)}>Stats</Button>
      </Stack> 
      
      <div
        style={{ 
          display: "grid", 
          //gridTemplateColumns: "repeat(2,auto-fill,minmax(257px ,514px)",
          gridTemplateColumns: "repeat(auto-fill,minmax(200px, 500px))", 
          gap: "1rem",
          alignItems: "flex-start",
        }}
      >
        {budgets.map(budget => {
          //aggregate expenses
          const amount = getBudgetExpenses(budget.id).reduce((total,expense) => total
          + expense.amount, 0) 
          return (
            <BudgetCard
            name = {budget.name}
            key = {budget.id}
            amount = {amount} 
            max = {budget.max}
            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
            onViewExpensesClick={() => setViewExpensesModalBudgetId(budget.id)}
            />
          )
        })}
        <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}
        onViewExpensesClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}/>
        <TotalBudgetCard/>
      </div>
    </Container>
    <AddBudgetModal 
      show={showAddBudgetModal} 
      handleClose={() => setShowAddBudgetModal(false)}
      />
    <AddExpenseModal 
      show={showAddExpenseModal} 
      defaultBudgetId={addExpenseModalBudgetId}
      handleClose={() => setShowAddExpenseModal(false)} //what does handleclose do?
    />
    <ViewExpensesModal 
      show = {showViewExpensesModal}
      budgetId={viewExpensesModalBudgetId}
      handleClose={() => setViewExpensesModalBudgetId()}
    />
    <ViewStatsModal
      show={showViewStatsModal}
      handleClose={() => setShowViewStatsModal(false)}
    />
    </>
  )
}

export default App;
