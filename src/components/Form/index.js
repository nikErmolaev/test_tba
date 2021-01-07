import React, { useState, useEffect, useContext } from 'react';
import { StocksContext } from '../../store/context/stocksContext'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';
import "./index.css"


export default function Form({ data, showTable }) {
    const stocksContext = useContext(StocksContext);
    const [selectFields, setSelectFields] = useState([])
    const [selectedItem, setSelectedItem] = useState()
    const [fields, setFields] = useState({})

    useEffect(() => {
        setSelectFields(stocksContext.numbers)
        const currency = stocksContext.numbers.filter(item => item.id === data.stockId)[0].value
        setSelectedItem(currency)
        setFields({...data})
    }, [stocksContext.numbers])

    const handleSelectChange = (e) => {
        setSelectedItem(e.target.value)
    }

    const handleFieldChange = (e) => {
        const {name, value} = e.target
        const newFields = {...fields}
        newFields[name] = value
        setFields(newFields)
    }

    const onFinishForm = () => {
        
    }

    const onRemoveItem = () => {
        stocksContext.deleteMarket(data.companyId)
        showTable();
    }
    
    return (
        <form name='editForm' className="form__container" noValidate autoComplete="off">
            <div className = "buttonGroup__header">
                <Button onClick={() => showTable()} variant="contained">Назад</Button>
                <Button variant="contained" color="primary" onClick={onFinishForm}>Сохранить</Button>
                <Button variant="contained" color="secondary" onClick={onRemoveItem}>Удалить</Button>
            </div>

            <h2>{data.symbol}</h2>
            <img src={data.logo}></img>
            <TextField
                id="standard-multiline-flexible"
                className='field_margin'
                label="Полное название"
                multiline
                rowsMax={4}
                name='name'
                value={fields.name}
                onChange={handleFieldChange}
            />
            <TextField
                id="standard-multiline-flexible"
                className='field_margin'
                label="Официальный сайт"
                multiline
                rowsMax={4}
                name='website'
                value={fields.website}
                onChange={handleFieldChange}
            />
            <div style={{display: 'flex'}}>
                <TextField
                    id="standard-multiline-flexible"
                    className='field_margin'
                    type="color"
                    label="Цвет шапки"
                    name='color'
                    value={fields.color}
                    onChange={handleFieldChange}
                />
                {
                    selectedItem && (
                        <TextField
                            id="standard-multiline-flexible"
                            className='field_margin'
                            select
                            label="Порядковый номер"
                            value={selectedItem}
                            onChange={handleSelectChange}
                        >
                            {selectFields.map((option) => (
                                <MenuItem key={option.text} value={option.value}>
                                    {option.text}
                                </MenuItem>
                            ))}
                        </TextField>
                    )
                }
            </div>
            <TextField
                id="standard-multiline-flexible"
                className='field_margin'
                label="Описание"
                multiline
                rowsMax={10}
                name='description'
                value={fields.description}
                onChange={handleFieldChange}
            />
        </form>
    );
}