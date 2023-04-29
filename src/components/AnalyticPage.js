import React from 'react';
import { useState, useEffect } from "react";
import {Bar, Line, Pie} from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Sidebar from '../common/SideBar';
import { Button } from '@mui/material';





const AnalyticPage = () => {
  
  const [mark1, setMark1] = useState(0);
  const [mark2, setMark2] = useState(0);
  const [mark3, setMark3] = useState(0);
  const [mark4, setMark4] = useState(0);
  const [mark5, setMark5] = useState(0);

  const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [mark1, mark2, mark3, mark4, mark5]
      }
    ]
  }

 const handle = () =>{
  setMark1(mark1 + 20)
 }

  return (
    <div>
  <Sidebar />
  
  <div  style={{ display: "flex", justifyContent: "center" }}>
  <Button onDoubleClick={handle}>sdd</Button>
    <table>
      <tr>
        <td>
          <div style={{ width: "100%" }}>
            Average Rainfall
            <Line
              data={state}
              options={{
                title: {
                  display: true,
                  text: "Average Rainfall per month",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        </td>
        <td>
          <div>
            Average Rainfall
            <Bar
              data={state}
              options={{
                title: {
                  display: true,
                  text: "Average Rainfall per month",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        </td>
      </tr>
    </table>
  </div>
</div>

  )
}

export default AnalyticPage