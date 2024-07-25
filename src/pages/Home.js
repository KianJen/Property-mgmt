
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Stack, useAccordionButton } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import BudgetCard from './components/BudgetCard';
import { Carousel, CarouselItem, Card, CardBody } from 'react-bootstrap';
//import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import TotalBudgetCard from './components/TotalBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';
import ViewStatsModal from './components/ViewStatsModal';
import { AddBudgetModal } from './components/addBudgetModal';
import { AddExpenseModal } from './components/AddExpenseModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {  useBudgets } from './contexts/BudgetsContext';
import ViewPropertyStatsModal from './components/PropertyStatsModal';
import "../App.css";


export default function Home() {
  document.body.style.backgroundColor = 'white'
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showViewStatsModal, setShowViewStatsModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [viewExpensesModalMonthIndex, setViewExpensesModalMonthIndex] = useState()
  const [totalMonthIndex, setTotalMonthIndex] = useState()
  const [propertyStatsModalBudgetId, setPropertyStatsModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [addExpenseModalMonthIndex, setAddExpenseModalMonthIndex] = useState()
  const { budgets, getBudgetExpenses, getBudgetNegatives, months} = useBudgets()
  const [index, setIndex] = useState(0)
  let [mon, setMon] = useState(0)
  const [propertyStatsModalMonthIndex,setPropertyStatsModalMonthIndex] = useState()
  
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
    setMon(selectedIndex)
    setTotalMonthIndex(selectedIndex)
    setAddExpenseModalMonthIndex(selectedIndex)
    
  }
  
  return ( //mb4 is bottom margin my4 top margin, me-auto is left side
    <>
      <Container className='my-4'> 
        <Stack direction="horizontal" gap="2" className="mb-4"> 
          <h1 className="me-auto">Properties</h1>
          <Link to="/aggr">
              <Button className='me-auto'>Custom View</Button>
          </Link>
          <Carousel activeIndex={index} onSelect={handleSelect} controls wrap variant='dark' interval={null} slide={null}>
            
            {months.map(month =>
              <CarouselItem>
                  <Card border='light' bg='light'>
                      <CardBody>{month}</CardBody>
                  </Card>
              </CarouselItem>
              )}
          </Carousel>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Add Property</Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>Add Expense</Button>
          <Button variant="success" onClick={() => {setShowViewStatsModal(true)}}>Stats</Button>
        </Stack> 
        
        <div
          style={{ 
            display: "grid", 
            
            gridTemplateColumns: "repeat(auto-fill,minmax(200px, 500px))", 
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map(budget => {
            
            let amount = getBudgetExpenses(budget.id,mon).reduce((total,expense) => total
            + expense.amount, 0) 
            
            let neg = 0
            neg = getBudgetNegatives(budget.id,mon).reduce((tot,exp) => tot
            + exp.amount, 0)
            return (
              
              <BudgetCard
              name = {budget.name}
              key = {budget.id}
              amount = {amount} 
              max = {Math.abs(neg)}
              onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              onViewExpensesClick={() => (setViewExpensesModalBudgetId(budget.id), setViewExpensesModalMonthIndex(mon))}
              onViewPropertyStatsClick={() => (setPropertyStatsModalBudgetId(budget.id), setPropertyStatsModalMonthIndex(mon))}
              
              />
            )
          })}
          
          
          <TotalBudgetCard
            monthIndex={totalMonthIndex}
            />
        </div>
      </Container>
      <AddBudgetModal 
        show={showAddBudgetModal} 
        handleClose={() => setShowAddBudgetModal(false)}
        />
      <AddExpenseModal 
        show={showAddExpenseModal} 
        defaultBudgetId={addExpenseModalBudgetId}
        defaultMonthIndex={addExpenseModalMonthIndex}
        handleClose={() => setShowAddExpenseModal(false)} //what does handleclose do?
      />
      <ViewExpensesModal 
        
        budgetId={viewExpensesModalBudgetId}
        monthIndex={viewExpensesModalMonthIndex}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
      <ViewStatsModal
        show={showViewStatsModal}
        handleClose={() => setShowViewStatsModal(false)}
      />
      <ViewPropertyStatsModal
        
        budgetId={propertyStatsModalBudgetId}
        monthIndex={propertyStatsModalMonthIndex}
        handleClose={() => setPropertyStatsModalBudgetId()}
      />
    </>
  )
}
