import React, { useState, useEffect, useCallback } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { VehicleDetailsPage } from './VehicleDetailsPage.jsx'
import '../styles/VehiclesPage.css'
import { VehiclesListPage } from './VehiclesListPage.jsx'
import { VehicleAdditionPage } from './VehicleAdditionPage.jsx'

export function VehiclesBasePage(props) {
    const { user } = props
    return (
        <div className='vehicles_page'>
            <Routes>
                <Route path='/' element={<VehiclesListPage user={user} />} />
                <Route path='details' element={<VehicleDetailsPage user={user} />} />
                <Route path='new' element={<VehicleAdditionPage user={user} />} />
            </Routes>
        </div>
    )
}
