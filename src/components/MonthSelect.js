import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useBudgets } from '../contexts/BudgetsContext';
import { Card, CardBody, CarouselCaption, CarouselItem } from 'react-bootstrap';
export default function MonthCarousel() {
  const [index, setIndex] = useState(0);
  const {months} = useBudgets()
 
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} controls wrap variant='dark' interval={null} slide={null}>
      {months.map(month =>
        <CarouselItem>
            <Card border='none'>
                <CardBody>{month}</CardBody>
            </Card>
        </CarouselItem>
        )}
    </Carousel>
  );
}

//export default ControlledCarousel; style={{width: auto, height: auto}}