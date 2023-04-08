import { useEffect, useState } from "react";
import transactionApi from "../api/transactionApi";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { PageHeader } from "../components/index.js";
import { Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";

const transactionList = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  useEffect(() => {
    const getTransactionTable = async () => {
      try {
        const res = await transactionApi.getAll();
        console.log(res);
        setTransactionList(res);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    };
    getTransactionTable();
  }, []);
  const tableHead = [
    {
      field: "type",
      headerName: "Type",
      width: 400,
    },
    {
      field: "category",
      headerName: "Category",
      width: 400,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 400,
      renderCell: (params) => params.value.toLocaleString("de-DE"),
    },
    {
      field: "createdAt",
      headerName: "Time",
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format("DD-MM-YYYY HH:mm:ss"),
    },
  ];
  return (
    <>
      <PageHeader
        title="Transaction List"
        rightContent={
          <Button
            variant="contained"
            component={Link}
            to="/add"
            startIcon={<PriceCheckOutlinedIcon />}
          >
            Create
          </Button>
        }
      />
      <Paper elevation={0}>
        <DataGrid
          autoHeight
          rows={transactionList}
          columns={tableHead}
          pageSize={pageSize}
          rowsPerPageOptions={[9,50,100]}
          onPageSizeChange={(size) => setPageSize(size)}
          destiny="comfortable"
          showCellRightBorder
          showColumnRightBorder
          disableSelectionOnClick
        />
      </Paper>
    </>
  );
};

export default transactionList;
