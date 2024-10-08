import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../../utils";
import { useBudgets } from "../contexts/BudgetsContext";
export default function TotalDetCard({
    gray,
}){
    const { months, deleteExpense, currentExpenses} = useBudgets()
    const classNames = []
    const amount = currentExpenses.reduce((total,expense) => total
    + expense.amount, 0) 
    let max = currentExpenses.filter(expense => expense.amount < 0).reduce((total,expense) => total
    + expense.amount, 0) 
    max = Math.abs(max)
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
        <Card className={classNames.join(" ")} bg="dark" border="primary" style={{marginTop: '20px'}}>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between 
                align-items-baseline fw-normal mb-3"> 
                    <div className="me-2">Total</div>
                    <div className="d-flex align-items-baseline">
                        
                        {(currencyFormatter.format(amount))}
                        {max > 0 && (<span className="text-muted fs-6 ms-1"> 
                            / {currencyFormatter.format(max)}
                        </span>
                        )}
                        {max === 0 && (setmax())}
                    </div>
                </Card.Title>
                   
                    <ProgressBar 
                        className="rounded-pill" 
                        variant={getProgressBarVariant(amount,max)}
                        min = {0}
                        max = {max}
                        
                        now = {truamount}
                    />
                
                <Accordion style={{marginTop: '20px'}} defaultActiveKey="0">
                    <AccordionItem>
                        <AccordionHeader>Details</AccordionHeader>
                        <AccordionBody>
                            <Stack direction="vertical" gap="3">
                                {currentExpenses.map(expense => ( //fs = font size
                                    <Stack direction="horizontal" gap="2" key={expense.id}>
                                        <div className="me-auto fs-4">{expense.description} - {months.indexOf(expense.monthId) + 1}/{expense.day}/{expense.year}</div> 
                                        <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
                                        <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">
                                            &times;
                                        </Button>
                                    </Stack>
                                ))}
                            </Stack>
                        </AccordionBody>
                    </AccordionItem>
                </Accordion>
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