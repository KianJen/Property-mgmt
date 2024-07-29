import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../../utils";
import { useState } from "react";
export default function BudgetCard({
    name,
    amount,
    max,
    gray,
    
    uncat,
    hidestats,
    onAddExpenseClick,
    hideButtons,
    onViewExpensesClick,
    onViewPropertyStatsClick
}){
    
    
    const classNames = []
    if(amount > max) {
        classNames.push("bg-success" , "bg-opacity-10")
        
    } else if (gray) {
        classNames.push("bg-light")
    }
    
    function setmax(){
        max = 1
        return(<div></div>)
    }
    let truamount = amount
    if (amount < 0){
        truamount = max
    }
    return( //dflex spaces title and number
        <Card className={classNames.join(" ")} border="primary">
            <Card.Body>
                <Card.Title className="d-flex justify-content-between 
                align-items-baseline fw-normal mb-3"> 
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {gray && amount}
                        {!gray && (currencyFormatter.format(amount))}
                        
                        {max > 0 && (<span className="text-muted fs-6 ms-1"> 
                            / {currencyFormatter.format(max)}
                        </span>
                        )}
                        {max === 0 && (setmax())}
                    </div>
                </Card.Title>
                {!uncat && 
                    <ProgressBar 
                        className="rounded-pill" 
                        variant={getProgressBarVariant(amount,max)}
                        min = {0}
                        max = {max}
                        now = {truamount}
                    />
                }
                {!hideButtons &&
                <Stack direction = "horizontal" gap="2" className="mt-4">
                    <Button 
                        variant = "outline-primary" 
                        className="ms-auto" 
                        onClick={onAddExpenseClick}>
                        Add Expense
                    </Button>
                    <Button onClick={onViewExpensesClick} variant="outline-secondary">View Expenses</Button>
                    {!hidestats &&
                    <Button onClick={onViewPropertyStatsClick} variant="success">Stats</Button>}
                </Stack>
                }
            </Card.Body>
        </Card>
    )
}
function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < .25) return "danger"
    if (ratio < .5) return "warning"
    if (ratio < .75) return "primary"
    if (ratio > 1) return "success"
    
    return 
}