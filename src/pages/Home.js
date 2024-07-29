
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Stack, useAccordionButton } from 'react-bootstrap';
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
  const [viewExpensesModalYearIndex, setViewExpenseModalYearIndex] = useState()
  const [totalMonthIndex, setTotalMonthIndex] = useState()
  const [totalYearIndex, setTotalYearIndex] = useState()
  const [propertyStatsModalBudgetId, setPropertyStatsModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [addExpenseModalMonthIndex, setAddExpenseModalMonthIndex] = useState()
  const { budgets, getBudgetExpenses, getBudgetNegatives, months, years} = useBudgets()
  
  let [cindex,setcindex] = useState(0)
  let [yindex,setyindex] = useState(0)
  let [mon, setMon] = useState(0)
  const [propertyStatsModalMonthIndex,setPropertyStatsModalMonthIndex] = useState()
  const [propertyStatsModalYearIndex, setPropertyStatsModalYearIndex] = useState()
  
  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }
  const right = ">"
  const left = "<"
  
  function moveLeft(){
    if(cindex == 0){
      setcindex(11)
      cindex = 11
    } else {
      setcindex(cindex - 1)
      cindex--
    }
    setMon(cindex)
    setTotalMonthIndex(cindex)
    setAddExpenseModalMonthIndex(cindex)
    
  }

  function moveRight(){
    if(cindex == 11){
      setcindex(0)
      cindex = 0
    } else {
      setcindex(cindex + 1)
      cindex++
    }
    setMon(cindex)
    setTotalMonthIndex(cindex)
    setAddExpenseModalMonthIndex(cindex)
    
  }

  function ymoveLeft(){
    if(yindex == 0){
      setyindex(years.length - 1)
      yindex = years.length - 1
    } else {
      setyindex(yindex - 1)
      yindex--
    }
    //setMon(yindex)
    setTotalYearIndex(yindex)
    setViewExpenseModalYearIndex(yindex)
    setPropertyStatsModalYearIndex(yindex)
  }

  function ymoveRight(){
    if(yindex == (years.length - 1)){
      setyindex(0)
      yindex = 0
    } else {
      setyindex(yindex + 1)
      yindex++
    }
    //setMon(yindex)
    setTotalYearIndex(yindex)
    setViewExpenseModalYearIndex(yindex)
    setPropertyStatsModalYearIndex(yindex)
  }
  /*
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
    setMon(selectedIndex)
    setTotalMonthIndex(selectedIndex)
    setAddExpenseModalMonthIndex(selectedIndex)
    <Carousel activeIndex={index} onSelect={handleSelect} controls wrap variant='dark' interval={null} slide={null}>
            
            {months.map(month =>
              <CarouselItem>
                  <Card border='light' bg='light'>
                      <CardBody>{month}</CardBody>
                  </Card>
              </CarouselItem>
              )}
          </Carousel>
    
  }
  */
  return ( //mb4 is bottom margin my4 top margin, me-auto is left side
    <>
      <Container className='my-4'> 
        <Stack direction="horizontal" gap="2" className="mb-4"> 
          <h1 className="me-auto">Quick View</h1>
          <Link to="/aggr" className='me-auto'>
              <Button>Custom View</Button>
          </Link>
          <ButtonGroup>
            <Button onClick={moveLeft}>{left}</Button>
            <Button>{months[cindex]}</Button>
            <Button onClick={moveRight}>{right}</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={ymoveLeft}>{left}</Button>
            <Button>{years[yindex]}</Button>
            <Button onClick={ymoveRight}>{right}</Button>
          </ButtonGroup>
          
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
            
            let amount = getBudgetExpenses(budget.id,mon).filter(expense => expense.year == years[yindex]).reduce((total,expense) => total
            + expense.amount, 0) 
            
            let neg = 0
            neg = getBudgetNegatives(budget.id,mon).filter(expense => expense.year == years[yindex]).reduce((tot,exp) => tot
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
            yearIndex={totalYearIndex}
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
        yearIndex={viewExpensesModalYearIndex}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
      <ViewStatsModal
        show={showViewStatsModal}
        handleClose={() => setShowViewStatsModal(false)}
      />
      <ViewPropertyStatsModal
        
        budgetId={propertyStatsModalBudgetId}
        monthIndex={propertyStatsModalMonthIndex}
        yearIndex={propertyStatsModalYearIndex}
        handleClose={() => setPropertyStatsModalBudgetId()}
      />
    </>
  )
}
