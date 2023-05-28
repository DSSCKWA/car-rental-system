import { Link, Route, Routes } from 'react-router-dom'
import './ManagerStyles.css'
import { MainPage } from '../general/MainPage.jsx'
import { AboutPage } from '../general/AboutPage.jsx'
import { ManagerWorkersPage } from './ManagerWorkersPage.jsx'
import { AddWorkerPage } from './AddWorkerPage.jsx'
import Modal from '@mui/material/Modal'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React from 'react'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { modalStyle } from '../../../styles.jsx'
import dayjs from 'dayjs'


export function ManagerPage() {
    const [open, setOpen] = useState(false)
    const [fromDate, setFromDate] = useState(dayjs())
    const [toDate, setToDate] = useState(dayjs())
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    async function generateReport() {
        try {
            const response = await fetch(`/api/rentals/report?start=${fromDate}&end=${toDate}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'raport.pdf')
            document.body.appendChild(link)
            link.click()
        } catch (e) {
            console.log(e)
        }
        handleClose()
    }

    return (
        <div className='manager_page'>
            <div className='manager_container'>
                <nav className='manager_menu'>
                    <Link to='/manager/workers' className='manager_menu_item'>Workers</Link>
                    <Link to='/manager/add-worker' className='manager_menu_item'>Add worker</Link>
                    <div className='manager_menu_item report_button' onClick={handleOpen}>Report</div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby='modal-modal-title'
                        aria-describedby='modal-modal-description'
                    >
                        <Box sx={modalStyle}>
                            <div className='modal_content'> <Typography id='modal-modal-title' variant='h6' component='h2'>
                                Generate report
                            </Typography>
                            <DatePicker id='from-date' label='From date'
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: '#888',
                                    } }}
                                value={fromDate}
                                onChange={newValue => setFromDate(newValue)}
                                format='DD/MM/YYYY'

                            >
                            </DatePicker>
                            <DatePicker id='to-date' label='To date'
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: '#888',
                                    } }}
                                value={toDate}
                                onChange={newValue => setToDate(newValue)}
                                format='DD/MM/YYYY'
                            >
                            </DatePicker>
                            <button variant='contained' onClick={generateReport}>Generate</button>
                            </div>
                        </Box>
                    </Modal>
                </nav>


                <div className='manager_content'>
                    <Routes>
                        <Route path='workers' element={<ManagerWorkersPage/>}/>
                        <Route path='add-worker' element={<AddWorkerPage/>}/>
                    </Routes>
                </div>
            </div>

        </div>
    )
}
