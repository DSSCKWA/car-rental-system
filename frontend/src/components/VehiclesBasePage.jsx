import React, { useState, useEffect, useCallback } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { VehicleDetailsPage } from './VehicleDetailsPage.jsx'
import '../styles/VehiclesPage.css'
import { VehiclesListPage } from './VehiclesListPage.jsx'

export function VehiclesBasePage() {

    return (
        <div className='vehicle_page'>
            <Routes>
                <Route path='/' element={<VehiclesListPage />} />
                <Route path='details' element={<VehicleDetailsPage />} />
            </Routes>
        </div>
    )
}
