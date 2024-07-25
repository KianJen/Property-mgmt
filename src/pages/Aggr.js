import { Link } from "react-router-dom";
import React from "react"
import { useState } from "react";
import { Button, Card, Container, Row, Stack, CardBody, CardTitle, Col } from "react-bootstrap";
import {  useBudgets } from './contexts/BudgetsContext';
import DetCard from './components/DetCard'
function Aggr(){
    document.body.style.backgroundColor = 'black'
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
    const [showViewStatsModal, setShowViewStatsModal] = useState(false)
    const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
    const [viewExpensesModalMonthIndex, setViewExpensesModalMonthIndex] = useState()
    const [totalMonthIndex, setTotalMonthIndex] = useState()
    const [propertyStatsModalBudgetId, setPropertyStatsModalBudgetId] = useState()
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
    const [addExpenseModalMonthIndex, setAddExpenseModalMonthIndex] = useState()
    const { budgets, getBudgetExpenses, getBudgetNegatives, months} = useBudgets()
    const [propertyStatsModalMonthIndex,setPropertyStatsModalMonthIndex] = useState()
    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetId)
      }
    let budget = budgets[0]
    //card with dropdown for top expenses
        return(
            
            <>
            <Container className="my-4" data-bs-theme="dark" gap={3}>
                <Row>
                    <Card bg="dark" border="primary">
                        <CardBody >
                            <Stack direction="horizontal" gap="2">
                                    <Link to='/' className="me-auto">
                                        <Button>Home</Button>
                                    </Link>
                                    <Button>Year</Button>
                                    <Button>Month(s)</Button>
                                    <Button>Search</Button>
                            </Stack>
                        </CardBody>
                    </Card>
                </Row>
                <Row style={{marginTop: '20px'}}>
                    <Col>
                        <DetCard 
                            name = {budget.name}
                            key = {budget.id}
                            amount = {0} 
                            max = {2}
                            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                            onViewExpensesClick={() => (setViewExpensesModalBudgetId(budget.id), setViewExpensesModalMonthIndex(0))}
                            onViewPropertyStatsClick={() => (setPropertyStatsModalBudgetId(budget.id), setPropertyStatsModalMonthIndex(0))}
                        ></DetCard>
                    </Col>
                    <Col>
                        <Card></Card>
                    </Col>
                    <Col>
                        <Card></Card>
                    </Col>
                </Row>
                
            </Container>
            </>
        )
    
}

export default Aggr;