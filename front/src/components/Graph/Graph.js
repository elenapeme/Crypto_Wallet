import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../services/API';
import './Graph.css';
import GraphLoaded from './GraphLoaded';

export default function Graph() {
    const [dataChart, setDataChart] = useState({ });

    const getData = async() => {
        let confirmedCases = [];
        let dateOfCases = [];
        await api.get('btt-prices')
        .then ( resp => {
            for (const dataObj of resp.data ) {
                console.log( dataObj )
                confirmedCases.push(parseInt(dataObj.Cases));
                let tempDate = new Date (dataObj.Date);
                dateOfCases.push(tempDate.getUTCDate());
            }
        });
        
        setDataChart({ 
            labels: dateOfCases, 
            datasets: [{ 
              label: 'Confirmed cases', 
              data: confirmedCases 
            }]
        });
    }

    useEffect(() => {
        getData();
    }, []);

    return(
        <div className='container'>
            
            hello
        </div>   
    );
}