import { Link } from "react-router-dom";
import React from "react"
import { useState, useRef } from "react";
import { Button, Card, Container, Row, Stack, CardBody, Col, Dropdown} from "react-bootstrap";
import {  useBudgets } from './contexts/BudgetsContext';
import DetCard from './components/DetCard'
import TotalDetCard from "./components/TotalDetCard";
import { AddExpenseModal } from "./components/AddExpenseModal";
function Aggr(){
    document.body.style.backgroundColor = 'black'
    
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    
    
    
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
    const [addExpenseModalMonthIndex, setAddExpenseModalMonthIndex] = useState()
    const { budgets, Total, getAggExpenses, getAggNegatives,months,years, addMonth, addYear, Aggregate, currentYears, currentMonths} = useBudgets() 
    
    
    const currentYearRef = useRef()
    const currentMonthRef = useRef()
    
    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetId)
      }
    
    //card with dropdown for top expenses
    // add total
        return(
            
            <>
            <Container className="my-4" data-bs-theme="dark" gap={3}>
                <Row className="row">
                    <Card bg="dark" border="primary">
                        <CardBody>
                            <Stack direction="horizontal" gap="2">
                                    <Link to='/' className="me-auto">
                                        <Button>Home</Button>
                                    </Link>
                                    <Card>
                                        <CardBody>
                                            {currentYears.map(year => year + " ")}
                                                
                                        </CardBody>
                                    </Card>
                                    <Card>
                                        <CardBody>
                                            {currentMonths.map(year => year + " ")}
                                        </CardBody>
                                    </Card>
                                    <Button onClick={() => Total()}>
                                        Total
                                    </Button>
                                    <Dropdown className="d-inline mx-2" autoClose={false}>
                                        <Dropdown.Toggle>
                                        Year(s)
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu ref={currentYearRef}>

                                            {years?.map(year => {
                                                return(
                                                <Dropdown.Item onClick={() => addYear(year)}>{year}</Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className="d-inline mx-2" autoClose={false}>
                                        <Dropdown.Toggle >
                                        Month(s)
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu ref={currentMonthRef}>
                                            
                                            {months?.map(month => {
                                                return(
                                                <Dropdown.Item onClick={() => addMonth(month)}>{month}</Dropdown.Item>
                                                )
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button onClick={() => Aggregate()}>Search</Button>
                            </Stack>
                        </CardBody>
                    </Card>
                </Row>
                <Row >
                    {budgets.map(budget => {
                        let amount = getAggExpenses(budget.id).reduce((total,expense) => total
                        + expense.amount, 0) 
                        
                        let neg = 0
                        neg = getAggNegatives(budget.id).reduce((tot,exp) => tot
                        + exp.amount, 0)
                        return (
                        <Col md={4}>
                            <DetCard 
                                name = {budget.name}
                                
                                amount = {amount} 
                                budgetId = {budget.id}
                                max = {Math.abs(neg)}
                                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                
                            ></DetCard>
                        </Col>
                        )  
                    })}
                    <Col md={4}>
                        <TotalDetCard hidebuttons></TotalDetCard>
                    </Col>
                </Row>
                
            </Container>
            
            <AddExpenseModal 
                show={showAddExpenseModal} 
                defaultBudgetId={addExpenseModalBudgetId}
                defaultMonthIndex={addExpenseModalMonthIndex}
                handleClose={() => setShowAddExpenseModal(false)} 
            />
            </>
        )
    
}//add show condistions

export default Aggr;