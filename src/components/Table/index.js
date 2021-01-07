import React, { useEffect, useContext } from 'react';
import { StocksContext } from '../../store/context/stocksContext'

import Form from '../Form'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    // maxWidth: 700
  },
});

export default function TableCustom() {
  const classes = useStyles();
  const stocksContext = useContext(StocksContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [edit, setEdit] = React.useState(false)
  const [propsForm, setPropsForm] = React.useState({})

  useEffect(() => {
    if (stocksContext?.optionTable) {
      setRowsPerPage(stocksContext.optionTable?.itemsPerPage)
      setPage(stocksContext.optionTable?.page - 1)
    }
  }, [stocksContext?.optionTable])

  const handleChangePage = (event, newPage) => {
    stocksContext.getNewPage(newPage)
  };

  const handleChangeRowsPerPage = (event) => {
    stocksContext.getNewRows(event.target.value)
  };
  const viewEditForm = (companyId) =>{
    setEdit(!edit)
    const filteredData = stocksContext.items.filter(item => item.companyId === companyId)[0]
    setPropsForm(filteredData)
  }

  const showTable = () => {
    setEdit(!edit)
  }

  return (
    <>
    {!edit ? (
      <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>№</StyledTableCell>
            <StyledTableCell >Название тикера</StyledTableCell>
            <StyledTableCell >Полное название</StyledTableCell>
            <StyledTableCell >Логотип</StyledTableCell>
            <StyledTableCell >Цвет шапки</StyledTableCell>
            <StyledTableCell align="right">Язык</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocksContext?.items && stocksContext.items.map((row) => (
            <StyledTableRow key={row.companyId}>
              <StyledTableCell >{row.marketNumber}</StyledTableCell>
              <StyledTableCell >{row.symbol}</StyledTableCell>
              <StyledTableCell >{row.fullName}</StyledTableCell>
              <StyledTableCell ><img style={{
                width: '30px',
                height: '30px'
              }} src={row.logo} /></StyledTableCell>
              <StyledTableCell><div style={{
                backgroundColor: row.color,
                width: '30px',
                height: '30px'
              }}></div></StyledTableCell>
              <StyledTableCell align="right">{row?.locals && row.locals.map((local, index) => <span key={index}>{index > 0 ? `, ${local}` : local}</span>)}</StyledTableCell>
              <StyledTableCell>
                <div style={{
                  display: 'flex'
                }}>
                  <IconButton 
                  size="small"
                  onClick = {() => viewEditForm(row.stockId)}
                  >
                    <CreateOutlinedIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => stocksContext.deleteMarket(row.companyId)}
                  >
                    <DeleteOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TableFooter className={classes.footer}>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={stocksContext?.optionTable && stocksContext.optionTable.serverItemsLength}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableFooter>

    </TableContainer>
    )
    : <Form data = {propsForm} showTable = {showTable}/>
    }
   
    </>
  );
}
