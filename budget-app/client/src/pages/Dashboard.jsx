import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import {
  CardContent,
  Grid,
  Stack,
  Card,
  Box,
  Typography,
  CardHeader,
  colors, 
} from "@mui/material";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import MoneyOffCsredOutlinedIcon from "@mui/icons-material/MoneyOffCsredOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import {ArcElement, Chart as ChartJs , Legend,Tooltip} from 'chart.js'
import { Pie } from 'react-chartjs-2'
import {DataGrid} from '@mui/x-data-grid'
import moment from 'moment'
const Dashboard = () => {
  const [summaryData, setsummaryData] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await userApi.getSummary();
        console.log(res);
        setsummaryData(res)
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  return (
    <Stack spacing={4}>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card elevation={0}>
              <CardContent>
                {summaryData && (
                  <SummaryInfo
                    title="Total Expense"
                    number={summaryData.totalTransactionExpense.toLocaleString(
                      "de-DE"
                    )}
                    icon={
                      <MoneyOffCsredOutlinedIcon
                        sx={{ fontSize: "3rem" }}
                        color="success"
                      />
                    }
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card elevation={0}>
              <CardContent>
                {summaryData && (
                  <SummaryInfo
                    title="Total Income"
                    number={summaryData.totalTransactionIncome.toLocaleString(
                      "de-DE"
                    )}
                    icon={
                      <AttachMoneyOutlinedIcon
                        sx={{ fontSize: "3rem" }}
                        color="success"
                      />
                    }
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card elevation={0}>
              <CardContent>
                {summaryData && (
                  <SummaryInfo
                    title="Balance"
                    number={summaryData.totalTransaction}
                    icon={
                      <PointOfSaleOutlinedIcon
                        sx={{ fontSize: "3rem" }}
                        color="success"
                      />
                    }
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card elevation={0}>
              <CardHeader
                title={
                  <Typography variant="h6">Transaction Analyst</Typography>
                }
              />
              <CardContent>
                  {
                      summaryData && <TransactionChart
                        chartData={summaryData.transactionAnalyst}
                      />
                  }
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card elevation={0}>
              <CardHeader
                title={
                  <Typography variant="h6">Latest Transaction</Typography>
                }
              />
              <CardContent>
                  {
                    summaryData && <LatestTransactionTable
                    list={summaryData.latestTransaction}
                  />
                  }
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Stack>
  );
};

export default Dashboard;

const SummaryInfo = ({ title, number, icon }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="body2" fontWeight="600">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="600">
          {number}
        </Typography>
      </Stack>
      <div>{icon}</div>
    </Box>
  );
};

const TransactionChart =({chartData}) =>{
    console.log(chartData)
    ChartJs.register(ArcElement,Tooltip,Legend)
    const data={
        labels:[
            `Income ${Math.floor(chartData.totalTransactionIncome)} `,
            `Expense ${Math.floor(chartData.totalTransactionExpense)} `,
            
        ],
        datasets:[
          {
            label:`Transaction Analyst`,
            data:[
              chartData.totalTransactionIncome,
              chartData.totalTransactionExpense,
              
            ],
            backgroundColor:[
              colors.green['700'],
              colors.red['700'],
             
            ],
            borderColor:[
              colors.green['700'],
              colors.red['700'],
             
            ],
            borderWidth:1
          }
         
        ]
    }
    return <Pie data={data} options={{plugins:{legend:{position:'bottom'}}}}/>   
    
}

const LatestTransactionTable = ({list}) =>{
  const tableHead = [
    {
      field: 'type', headerName:'type' ,width:200
    },
    {
      field: 'category', headerName:'category' ,width:200,
     
    },
    {
      field: 'amount', headerName:'amount' ,width:150,
      renderCell: (params) => params.value.toLocaleString('de-DE')
    },
    {
      field: 'createdAt', headerName:'time' ,flex:1,
      renderCell: (params) => moment(params.value).format('DD-MM-YYYY HH:mm:ss')
    },
  ]
  return <DataGrid
    autoHeight
    rows={list}
    columns={tableHead}
    hideFooter
    destiny='comfortable'
    showCellRightBorder
    showColumnRightBorder
    disableSelectionOnClick
  />

}