import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { VehicleCard } from './VehicleCard'
import '../styles/VehiclesPage.css'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { useTheme } from '@mui/material/styles'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'



const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(item, items, theme) {
    return {
        fontWeight:
            items.indexOf(item) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }
}

function valuetext(value) {
    return `${value}¥`
}



export function VehiclesListPage() {

    const startDateState = history.state?.startDate
    const startTimeState = history.state?.startTime
    const endDateState = history.state?.endDate
    const endTimeState = history.state?.endTime
    const vehiclesState = history.state?.vehicles

    const theme = useTheme()
    const [vehicles, setVehicles] = useState(vehiclesState ? vehiclesState : [])
    const [sortType, setSortType] = useState('none')
    const [filter, setFilter] = useState('')
    const [startDate, setStartDate] = useState(startDateState ? startDateState : '')
    const [startTime, setStartTime] = useState(startTimeState ? startTimeState : '00:00:00')
    const [endDate, setEndDate] = useState(endDateState ? endDateState : '')
    const [endTime, setEndTime] = useState(endTimeState ? endTimeState : '00:00:00')
    const [brands, setBrands] = useState([])
    const [models, setModels] = useState([])
    const [gearboxes, setGearboxes] = useState([])
    const [colors, setColors] = useState([])
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedModels, setSelectedModels] = useState([])
    const [selectedGearboxes, setSelectedGearboxes] = useState([])
    const [selectedColors, setSelectedColors] = useState([])
    const [priceRange, setPriceRange] = useState([0, 1000])
    const navigate = useNavigate()
    const getMinDate = () => {
        return new Date().toISOString().substring(0, 10)
    }

    const handleBrandChange = event => {
        const {
            target: { value },
        } = event
        setSelectedBrands(
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    const handleModelChange = event => {
        const {
            target: { value },
        } = event
        setSelectedModels(
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    const handleGearboxChange = event => {
        const {
            target: { value },
        } = event
        setSelectedGearboxes(
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    const handleColorChange = event => {
        const {
            target: { value },
        } = event
        setSelectedColors(
            typeof value === 'string' ? value.split(',') : value,
        )
    }

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue)
    }


    const fetchVehicles = async () => {
        try {

            let params = ''
            if (startDate && startTime && endDate && endTime) {
                params = '?' + new URLSearchParams({
                    start_time: `${startDate}T${startTime}`,
                    end_time: `${endDate}T${endTime}`,
                })
            }

            const response = await fetch(
                '/api/vehicles/' + params
                , { method: 'GET' },
            )

            if (!response.ok) {
                throw new Error(`Error fetching vehicles: ${response.statusText}`)
            }
            const data = await response.json()
            setVehicles(data)
            console.log(data)


            setBrands([...new Set(vehicles.map(vehicle => vehicle.brand))])
            setModels([...new Set(vehicles.map(vehicle => vehicle.model))])
            setGearboxes([...new Set(vehicles.map(vehicle => vehicle.gearbox_type))])
            setColors([...new Set(vehicles.map(vehicle => vehicle.color.replace('_', ' ')))])

        } catch (error) {
            console.error('Error fetching vehicles:', error)
        }
    }

    const goToDetailsPage = async vehicle => {
        if (startDate && startTime && endDate && endTime) {
            navigate('/vehicles/details', { state: { vehicle, vehicles, startDate, startTime, endDate, endTime } })
        } else {
            alert('Pick a date range first!')
        }
    }

    useEffect(() => {
        const sortVehicles = (a, b) => {
            if (sortType === 'year_asc') return a.year_of_production - b.year_of_production
            if (sortType === 'year_desc') return b.year_of_production - a.year_of_production
            if (sortType === 'price_asc') return a.price - b.price
            if (sortType === 'price_desc') return b.price - a.price
            if (sortType === 'power_asc') return a.engine_power - b.engine_power
            if (sortType === 'power_desc') return b.engine_power - a.engine_power
            return 0
        }

        setVehicles(vehicles => [...vehicles].sort(sortVehicles))
    }, [sortType])

    useEffect(() => {
        fetchVehicles()
    }, [])


    // const filteredVehicles = vehicles.filter(vehicle =>
    //     `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(filter.toLowerCase()),
    // )

    const filteredVehicles = vehicles.filter(
        vehicle =>
            (selectedBrands.length === 0 || selectedBrands.includes(vehicle.brand)) &&
            (selectedModels.length === 0 || selectedModels.includes(vehicle.model)) &&
            (selectedGearboxes.length === 0 || selectedGearboxes.includes(vehicle.gearbox_type)) &&
            (selectedColors.length === 0 || selectedColors.includes(vehicle.color)) &&
            (vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1]),
    )

    return (
        <div className='Vehicles'>
            <form className='vehicle_time_search_from' onSubmit={e => {
                e.preventDefault()
                if (startDate && startTime && endDate && endTime) {
                    fetchVehicles()
                } else {
                    alert('Pick a date range first!')
                }
            }}>
                <div className='form_group'>
                    <label htmlFor='start_date'>Start date</label>
                    <input type='date' id='start_date' name='start_date' value={startDate} min={getMinDate()} onChange={e => { setStartDate(e.target.value); location.startDate = e.target.value }} />
                </div>
                <div className='form_group'>
                    <label htmlFor='start_time'>Start time</label>
                    <input type='time' id='start_time' name='start_time' step='3600' value={startTime} onChange={e => { setStartTime(`${e.target.value.split(':')[0]}:00:00`) }} />
                </div>
                <div className='form_group'>
                    <label htmlFor='end_date'>End date</label>
                    <input type='date' id='end_date' name='end_date' value={endDate} min={startDate ? startDate : getMinDate()} onChange={e => setEndDate(e.target.value)} />
                </div>
                <div className='form_group'>
                    <label htmlFor='end_time'>End time</label>
                    <input type='time' id='end_time' name='end_time' step='3600' value={endTime} onChange={e => { setEndTime(`${e.target.value.split(':')[0]}:00:00`) }} />
                </div>
                <div className='form_group'>
                    <button type='submit'>Search</button>
                </div>
            </form>
            {vehicles.length != 0 ? <>
                <div className='vehicle-filter-sort'>
                    <FormControl className='form-control' sx={{ m: 1, width: 300 }}>
                        <InputLabel className='input-label' id='filter-by-brand'> Brand </InputLabel>
                        <Select
                            className ='select'
                            labelId='filter-by-brand'
                            id='filter-car-by-brand'
                            multiple
                            value = {selectedBrands}
                            onChange={handleBrandChange}
                            input={<OutlinedInput id='select-multiple-chip' label='Brand' />}
                            renderValue={selected =>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map(value =>
                                        <Chip key={value} label={value} />,
                                    )}
                                </Box>
                            }
                            MenuProps={MenuProps}
                        >
                            {brands.map(brand =>
                                <MenuItem
                                    className ='menu-item'
                                    key={brand}
                                    value={brand}
                                    style={getStyles(brand, brands, theme)}
                                >
                                    <Checkbox checked={selectedBrands.indexOf(brand) > -1} />
                                    <ListItemText primary={brand} />
                                </MenuItem>,
                            )}
                        </Select>
                    </FormControl>
                    <FormControl className='form-control' sx={{ m: 1, width: 300 }}>
                        <InputLabel className='input-label' id='filter-by-model'> Model </InputLabel>
                        <Select
                            className='select'
                            labelId='filter-by-model'
                            id='filter-car-by-model'
                            multiple
                            value = {selectedModels}
                            onChange={handleModelChange}
                            input={<OutlinedInput id='select-multiple-chip' label='Model' />}
                            renderValue={selected =>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map(value =>
                                        <Chip key={value} label={value} />,
                                    )}
                                </Box>
                            }
                            MenuProps={MenuProps}
                        >
                            {models.map(model =>
                                <MenuItem
                                    className='menu-item'
                                    key={model}
                                    value={model}
                                    style={getStyles(model, models, theme)}
                                >
                                    <Checkbox checked={selectedModels.indexOf(model) > -1} />
                                    <ListItemText primary={model} />
                                </MenuItem>,
                            )}
                        </Select>
                    </FormControl>
                    <FormControl className='form-control' sx={{ m: 1, width: 400 }}>
                        <InputLabel className='input-label' id='filter-by-gearbox'> Gearbox type </InputLabel>
                        <Select
                            className='select'
                            labelId='filter-by-gearbox'
                            id='filter-car-by-gearbox'
                            multiple
                            value = {selectedGearboxes}
                            onChange={handleGearboxChange}
                            input={<OutlinedInput id='select-multiple-chip' label='Gearbox' />}
                            renderValue={selected =>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map(value =>
                                        <Chip key={value} label={value} />,
                                    )}
                                </Box>
                            }
                            MenuProps={MenuProps}
                        >
                            {gearboxes.map(gearbox =>
                                <MenuItem
                                    className='menu-item'
                                    key={gearbox}
                                    value={gearbox}
                                    style={getStyles(gearbox, gearboxes, theme)}
                                >
                                    <Checkbox checked={selectedGearboxes.indexOf(gearbox) > -1} />
                                    <ListItemText primary={gearbox} />
                                </MenuItem>,
                            )}
                        </Select>
                    </FormControl>
                    <FormControl className='form-control' sx={{ m: 1, width: 300 }}>
                        <InputLabel className='input-label' id='filter-by-color'> Color </InputLabel>
                        <Select
                            className ='select'
                            labelId='filter-by-color'
                            id='filter-car-by-color'
                            multiple
                            value = {selectedColors}
                            onChange={handleColorChange}
                            input={<OutlinedInput id='select-multiple-chip' label='Color' />}
                            renderValue={selected =>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map(value =>
                                        <Chip key={value} label={value} />,
                                    )}
                                </Box>
                            }
                            MenuProps={MenuProps}
                        >
                            {colors.map(color =>
                                <MenuItem
                                    className ='menu-item'
                                    key={color}
                                    value={color}
                                    style={getStyles(color, colors, theme)}
                                >
                                    <Checkbox checked={selectedColors.indexOf(color) > -1} />
                                    <ListItemText primary={color} />
                                </MenuItem>,
                            )}
                        </Select>
                    </FormControl>
                    <Box sx={{ width: 300 }}>
                        <Typography id='price-slider' gutterBottom>
                            Price range
                        </Typography>
                        <Slider
                            min = {Math.min(...vehicles.map(vehicle => vehicle.price)) - 50}
                            max = {Math.max(...vehicles.map(vehicle => vehicle.price)) + 50}
                            aria-labelledby='price-slider'
                            value={priceRange}
                            onChange={handlePriceChange}
                            valueLabelDisplay='auto'
                            getAriaValueText={valuetext}
                        />
                    </Box>
                    <select className='vehicle-sort' value={sortType} onChange={e => setSortType(e.target.value)}>
                        <option value='none'>Sort by</option>
                        <option value='year_asc'>Oldest</option>
                        <option value='year_desc'>Newest</option>
                        <option value='price_asc'>Lowest price</option>
                        <option value='price_desc'>Highest price</option>
                        <option value='power_asc'>Lowest power</option>
                        <option value='power_desc'>Highest power</option>
                    </select>
                </div>
                <div className='vehicle-list'>
                    {filteredVehicles.map(vehicle =>
                        vehicle.status === 'available' ?
                            <div key={vehicle.vehicle_id} className='vehicle-card' onClick={() => { goToDetailsPage(vehicle) }}>
                                <VehicleCard vehicle={vehicle} extra={false} />
                            </div>
                            : null,
                    )}
                </div>
            </> : null}

        </div>
    )
}
