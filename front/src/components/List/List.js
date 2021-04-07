import React, {useEffect, useState} from 'react';
import api from '../../services/API';
import './List.css'

export default function List() {
    const [userAssets, setTime] = useState();

    useEffect(() => {
        let userAssets = [];
        const abortController = new AbortController();
        const signal = abortController.signal;

        // Takes the id from the local storage to use it in the api call
        const id = localStorage.getItem("user").replace(/"/g,"");

        // Array to map the days and months by name
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const getData = async() => {
            await api.get(`user/${id}`, {signal: signal})
            .then ( resp => {
                for (const dataObj of resp.data.assets){
                    let tempDate = new Date (dataObj.date);
                    userAssets.push(
                        {
                            date: monthNames[tempDate.getMonth()] + " " + tempDate.getUTCDate() + ", " + tempDate.getFullYear() + " - " + days[tempDate.getDay()],
                            hour: tempDate.getUTCHours(),
                            minutes: tempDate.getUTCMinutes(),
                            BTT: dataObj.quantity_crypto,
                            dollars: dataObj.quantity_dollars
                        });
                };

                setTime(userAssets);
            });
        }

        getData();
        return () => {
            abortController.abort();
        }
    }, []); 
    return(
        <div id="wrapper-list">         
            {userAssets
            && userAssets.map((user, index) => (
                <div>
                    <div className="date-list">
                        <h6>{user.date}</h6>
                    </div>
                    <div className="info-list">
                        <img src="download-arrow.svg" alt="download arrow" width="40" className="download-arrow"></img>
                        <div className="info-summary">
                            <div className="received-data">
                                <p className="info-received">Received</p>
                                <p>Received at {user.hour > 12 ? user.hour + ":" + user.minutes + " PM" : user.hour + ":" + user.minutes + "AM"}</p>
                            </div>
                            <div className="currency-data">
                                <p className="btt">+ {user.BTT} BTT</p> 
                                <p className="dollars">+ $ {user.dollars}</p>
                            </div>  
                        </div>
                                     
                    </div>
                    
                </div>
            ))}
            
        </div>
    );
}