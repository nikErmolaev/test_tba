import React, {useEffect, useState, useContext} from 'react'
import './index.css'

import { AuthContext } from '../../store/context/authContext'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Authentication({children}) {
    const authContext = useContext(AuthContext)
    const [fields, setFields] = useState({
        login: '',
        password: ''
    })

    useEffect(() => {
        if (!!authContext?.roles) setFields({
            login: '',
            password: ''
        })
    }, [authContext?.roles])

   

    const handleChangeField = (e) => {
        const {name, value} = e.target
        const newFields = {...fields}
        newFields[name] = value
        setFields(newFields)
    }

    const handleFinish = () => {
        authContext.getAuth(fields)
    }

    return (
        <>
            {
                !!authContext?.roles && !!authContext.roles.length ? (
                    children
                ) : (
                    <div className="wrapper">
                        <div className="container">
                            <div className="container__titile">
                                <h1>Панель управления</h1>
                            </div>
                            <div className="container__form">
                                <form>
                                    <TextField
                                        label='Логин' 
                                        name='login'
                                        type='text'
                                        value={fields.login}
                                        onChange={handleChangeField}
                                        error={!!authContext?.isError}
                                    />
                                    <TextField
                                        label='Пароль'
                                        name='password'
                                        type='password'
                                        value={fields.password}
                                        onChange={handleChangeField}
                                        error={!!authContext?.isError}
                                    />
                                    <div className='container__button'>
                                        <Button 
                                            variant='contained'
                                            color='primary'
                                            disabled={!fields.login || !fields.password}
                                            onClick={handleFinish}
                                        >Войти</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}
