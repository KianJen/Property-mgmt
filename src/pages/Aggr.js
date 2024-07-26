import { Link } from "react-router-dom";
import React from "react"
import { useState } from "react";
import { Button, Card, Container, Row, Stack, CardBody, CardTitle, Col, Dropdown,DropdownToggle,DropdownItem } from "react-bootstrap";
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
    const { budgets,  getAggExpenses, getAggNegatives} = useBudgets()
    const [propertyStatsModalMonthIndex,setPropertyStatsModalMonthIndex] = useState()
    function openAddExpenseModal(budgetId) {
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetId)
      }
    
    //card with dropdown for top expenses
        return(
            
            <>
            <Container className="my-4" data-bs-theme="dark" gap={3}>
                <Row className="row">
                    <Card bg="dark" border="primary">
                        <CardBody >
                            <Stack direction="horizontal" gap="2">
                                    <Link to='/' className="me-auto">
                                        <Button>Home</Button>
                                    </Link>
                                    <Dropdown className="d-inline mx-2" autoClose={false}>
                                        <Dropdown.Toggle id="dropdown-autoclose-false">
                                        Year(s)
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className="d-inline mx-2" autoClose={false}>
                                        <Dropdown.Toggle id="dropdown-autoclose-false">
                                        Months
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                            <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Button>Search</Button>
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
                                key = {budget.id}
                                amount = {amount} 
                                max = {2}
                                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                                onViewExpensesClick={() => (setViewExpensesModalBudgetId(budget.id), setViewExpensesModalMonthIndex(0))}
                                onViewPropertyStatsClick={() => (setPropertyStatsModalBudgetId(budget.id), setPropertyStatsModalMonthIndex(0))}
                            ></DetCard>
                        </Col>
                        )  
                    })}
                </Row>
                
            </Container>
            </>
        )
    
}

export default Aggr;