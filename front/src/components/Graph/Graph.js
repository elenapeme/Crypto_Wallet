import React, { useState, useEffect } from 'react';
import api from '../../services/API';
import './Graph.css';
import { Line } from 'react-chartjs-2';
import Card from 'react-bootstrap/Card';


export default function Graph() {
    // Chart data
    const [dataChart, setDataChart] = useState({ });

    // Hooks to set the crypto coins vs the dollars spent
    const [BTT, setBTTCount] = useState();
    const [dollars, setDollarsCount] = useState();

    useEffect(() => {
        let BTTquantity = [];
        let dollarQuantity = [];
        let timeAssets = [];
        const abortController = new AbortController();
        const signal = abortController.signal;

        // Array to map the months by name
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const getData = async() => {
            let priceToken = [];
            let datePrices = [];
            await api.get('btt-prices', {signal: signal})
            .then ( resp => {
                for (const dataObj of resp.data ) {
                    priceToken.push(dataObj.price);
                    let tempDate = new Date (dataObj.date);
                    datePrices.push(tempDate.getUTCDate() + " "+ monthNames[tempDate.getMonth()]);
                    
                }
            });

            await api.get('user/60678d391e247a7f5019b1fa', {signal: signal})
            .then ( resp => {
                for (const dataObj of resp.data.assets){
                    BTTquantity.push(dataObj.quantity_crypto);
                    dollarQuantity.push(dataObj.quantity_dollars);
                }

                setBTTCount(BTTquantity.reduce((a, b) => a + b, 0));
                setDollarsCount(dollarQuantity.reduce((a, b) => a + b, 0));
            });
            
            setDataChart({ 
                labels: datePrices, 
                datasets: [{ 
                  label: 'BTT Price', 
                  data: priceToken 
                }]
            });
        }

        getData();
        return () => {
            abortController.abort();
        }
    }, []);
    
    return(
        <Card id="card-graph">
            <Card.Body>
                <Card.Title>{BTT} BTT</Card.Title>
                <Card.Text>$ {dollars}</Card.Text>
                <Line data={ dataChart } />               
            </Card.Body>
    </Card> 
    );
}