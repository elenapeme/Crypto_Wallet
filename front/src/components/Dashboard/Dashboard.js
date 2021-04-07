import React from 'react';
import Button from 'react-bootstrap/Button';
import Graph from '../Graph/Graph';
import List from '../List/List';
import Modal_Add_BTT from '../Modal_Add_BTT/Modal_Add_BTT';
import './Dashboard.css'

export default function Dashboard() {
  return(
    <div id="wrapper-dashboard">
        <Graph/>
        <div id="button-div">
          <Modal_Add_BTT/>
        </div>
        <List/>
    </div>
  );
}