import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AboutPage from './AboutPage/AboutPage';
import LoginPage from './LoginPage/LoginPage';
import { useEffect, useState } from 'react';
import Menu from './Menu/Menu';
import HomePage from './HomePage/HomePage';
import Hero from './Hero/Hero';
import Footer from './Footer/Footer';
import PieChart from './PieChart/PieChart';
import axios from 'axios';
import Chart1 from './Chart1/Chart1';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js/auto';

Chart.register(ArcElement, Tooltip, Legend);

const baseUrl = "http://localhost:4000/budget"

function App() {
  const [dataSource, setDataSource] = useState({
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#abcdef",
          "#acdebf",
          "#aefcda",
          "#a98765",
          "#326875",
          "#896754",
          "#123450"
        ],
      }
    ],

    labels: []
  })

  const [dataSourceNew, setDataSourceNew] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}`)
      .then((res) => {
        setDataSourceNew(res.data.myBudget);
        setDataSource(
          {
            datasets: [
              {
                data: res.data.myBudget.map((v) => v.budget),
                backgroundColor: [
                  "#abcdef",
        "#acdebf",
        "#aefcda",
        "#a98765",
        "#326875",
        "#896754",
        "#123450"
                ],
              }
            ],

            labels: res.data.myBudget.map((v) => v.title)
          }
        )
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <Router>
      <Menu />
      <Hero />
      <div className='mainContainer'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
      <center>
        <PieChart chartData={dataSource} />
        <Chart1 dataSource={dataSourceNew}/>
       </center>
      <Footer />
    </Router>

  );
}

export default App;