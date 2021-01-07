import React, { useEffect, useContext } from 'react';

import { CompanyContext } from '../../store/context/companyContext'
import { StocksContext } from '../../store/context/stocksContext'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import TableFooter from '@material-ui/core/TableFooter';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import IconButton from '@material-ui/core/IconButton';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';



const useStyles = makeStyles((theme) => ({
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    footer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontSize: '0.75rem',
        padding: '0 8px',
        overflow: 'hidden'
    }

}));


function stableSort(array) {

    array.sort(function (a, b) {
        if (a.symbol > b.symbol) {
            return 1;
        }
        if (a.symbol < b.symbol) {
            return -1;
        }
        return 0;
    });
    return array;
}

const headCells = [
    { id: 'tiker', label: 'Тикер' },
    { id: 'name', label: 'Полное название' }
];


export default function Company() {
    const companyContext = useContext(CompanyContext)
    const stocksContext = useContext(StocksContext)
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchField, setSearchField] = React.useState('');

    useEffect(() => {
        if (companyContext?.optionTable) {
            setRowsPerPage(companyContext.optionTable?.itemsPerPage)
            setPage(companyContext.optionTable?.page - 1) 
        }
    }, [companyContext?.optionTable])


    const handleClick = (event, companyId, symbol) => {
        event.target.checked ? stocksContext.addMarket(companyId, symbol) : stocksContext.deleteMarket(companyId) 
    };

    const handleChangePage = (event, newPage) => {
        companyContext.getNewPage(newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        companyContext.getNewRows(event.target.value)
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            companyContext.searchData(searchField)
        }
    }

    const handleChangeSearch = (event) => {
        setSearchField(event.target.value)
        companyContext.searchData(event.target.value)
    }

    const handleClearSearch = () => {
        setSearchField('')
        companyContext.updateData()
    }

    return (
        <div>
            <div style={{
                display: 'flex'
            }}>
                <FormControl className={classes.margin}>
                    <Input
                        id="input-with-icon-adornment"
                        placeholder='Поиск'
                        value={searchField}
                        onChange={handleChangeSearch}
                        onKeyDown={handleKeyDown}
                        endAdornment={
                            <InputAdornment position="end">
                                <SearchOutlinedIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {
                    !!searchField && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <IconButton
                                size="small"
                                onClick={handleClearSearch}
                            >
                                <ClearOutlinedIcon fontSize="inherit" />
                            </IconButton>
                        </div>
                    )
                }
            </div>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align='center'
                                        padding='default'
                                    >
                                        {headCell.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companyContext?.items &&
                                stableSort(companyContext.items)
                                    .map((row, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                key={row.companyId}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        onClick={(event) => handleClick(event, row.companyId, row.symbol)}
                                                        checked={row.isMarket}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.symbol}
                                                </TableCell>
                                                <TableCell align="center">{row.name}</TableCell>
                                            </TableRow>
                                        );
                                    })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <TableFooter className={classes.footer}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        count={companyContext?.optionTable && companyContext.optionTable.serverItemsLength}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </TableFooter>
            </Paper>

        </div>
    );
}
