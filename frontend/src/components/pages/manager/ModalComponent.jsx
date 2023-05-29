import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { modalStyle } from '../../../styles.jsx'
import Typography from '@mui/material/Typography'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React, { useState } from 'react'
import dayjs from 'dayjs'





export function ModalComponent(props) {

    const [fromDate, setFromDate] = useState(dayjs())
    const [toDate, setToDate] = useState(dayjs())
    const handleClose = () => props.setOpen(false)

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

    return <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
    >
        <Box sx={modalStyle}>
            <div className='modal_content'>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                    Generate report
                </Typography>
                <DatePicker id='from-date' label='From date'
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'var(--medium-gray)',
                        } }}
                    value={fromDate}
                    onChange={newValue => setFromDate(newValue)}
                    format='DD/MM/YYYY'

                />
                <DatePicker id='to-date' label='To date'
                    sx={{
                        '& .MuiInputBase-input': {
                            color: 'var(--medium-gray)',
                        } }}
                    value={toDate}
                    onChange={newValue => setToDate(newValue)}
                    format='DD/MM/YYYY'
                />
                <button variant='contained' onClick={generateReport}>Generate</button>
            </div>
        </Box>
    </Modal>
}
