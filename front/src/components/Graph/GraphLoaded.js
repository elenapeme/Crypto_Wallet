import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function GraphLoaded(props) {
    const displayData = (props) => {
        const {data} = props;

        if (data.length > 0) {
            return(
                data.map((info, index) => {
                    console.log(info);
                    return (
                        <Card id="card-graph" key="info._id">
                            <Card.Body>
                                <Card.Title>BTT</Card.Title>
                                <Card.Text>
                                    akdsak
                                    {info}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                        
                    )
                })
            )
        } else {
            return (<h3>There is no data yet</h3>)
        }
    }

    return(
        <>
            {displayData(props)}
        </> 
    );
}