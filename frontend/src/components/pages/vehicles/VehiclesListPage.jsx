import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {VehicleCard} from './VehicleCard.jsx'
import './VehiclesPage.css'
import { VehicleAdditionPage } from './VehicleAdditionPage.jsx'
import { Link } from 'react-router-dom'
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

const sortOptions = [
    { value: 'year_asc', label: 'Oldest' },
    { value: 'year_desc', label: 'Newest' },
    { value: 'price_asc', label: 'Lowest price' },
    { value: 'price_desc', label: 'Highest price' },
    { value: 'power_asc', label: 'Lowest power' },
    { value: 'power_desc', label: 'Highest power' },
]

export function VehiclesListPage(props) {
    const {user} = props
    const startDateState = history.state?.startDate
    const startTimeState = history.state?.startTime
    const endDateState = history.state?.endDate
    const endTimeState = history.state?.endTime
    const vehiclesState = history.state?.vehicles

    const theme = useTheme()

    const [vehicles, setVehicles] = useState(vehiclesState ? vehiclesState : [])
    const [sortType, setSortType] = useState(null)
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
    const [marks, setMarks] = useState()
    const navigate = useNavigate()
    const getMinDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().substring(0, 10);
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
        setMarks([
            {
                value: newValue[0],
                label: `${newValue[0]}¥`,
            },
            {
                value: newValue[1],
                label: `${newValue[1]}¥`,
            },
        ])
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
                , {method: 'GET'},
            )


            if (!response.ok) {
                throw new Error(`Error fetching vehicles: ${response.statusText}`)
            }
            const data = await response.json()
            setVehicles(data)

            setBrands([...new Set(data.map(vehicle => vehicle.brand))])
            setModels([...new Set(data.map(vehicle => vehicle.model))])
            setGearboxes([...new Set(data.map(vehicle => vehicle.gearbox_type))])
            setColors([...new Set(data.map(vehicle => vehicle.color.replace('_', ' ')))])

        } catch (error) {
            console.error('Error fetching vehicles:', error)
        }
    }

    const goToDetailsPage = async vehicle => {
        if (startDate && startTime && endDate && endTime || user?.permissions == 'worker') {
            navigate('/vehicles/details', {state: {vehicle, vehicles, startDate, startTime, endDate, endTime}})
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

    const filteredVehicles = vehicles.filter(
        vehicle =>
            (selectedBrands.length === 0 || selectedBrands.includes(vehicle.brand)) &&
            (selectedModels.length === 0 || selectedModels.includes(vehicle.model)) &&
            (selectedGearboxes.length === 0 || selectedGearboxes.includes(vehicle.gearbox_type)) &&
            (selectedColors.length === 0 || selectedColors.includes(vehicle.color)) &&
            (vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1]),
    )

    if (user?.permissions == 'worker') {
        return (
            <div className='Vehicles'>
                <div className='vehicle_add'>
                    <Link to={'/vehicles/new'}> Add new </Link>
                </div>

                {vehicles.length != 0 ? <>
                    <div className='vehicle-filter-sort'>
                        <input
                            className='vehicle-filter'
                            type='text'
                            placeholder='Filter by brand or model'
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                        />
                        <select className='vehicle-sort' value={sortType} onChange={e => setSortType(e.target.value)}>
                            <option value='none'>Sort by year of production</option>
                            <option value='year_asc'>Oldest</option>
                            <option value='year_desc'>Newest</option>
                        </select>
                    </div>
                    <div className='vehicle-list'>
                        {filteredVehicles.map(vehicle =>
                            vehicle.status === 'available' ?
                                <div key={vehicle.vehicle_id} className='vehicle-card' onClick={() => {
                                    goToDetailsPage(vehicle)
                                }}>
                                    <VehicleCard vehicle={vehicle} extra={false}/>
                                </div>
                                : null,
                        )}
                    </div>
                </> : null}

            </div>
        )
    } else {
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
                        <input type='date' id='start_date' name='start_date' value={startDate} min={getMinDate()}
                            onChange={e => {
                                setStartDate(e.target.value)
                                location.startDate = e.target.value
                            }}/>
                    </div>
                    <div className='form_group'>
                        <label htmlFor='start_time'>Start time</label>
                        <input type='time' id='start_time' name='start_time' step='3600' value={startTime}
                            onChange={e => {
                                setStartTime(`${e.target.value.split(':')[0]}:00:00`)
                            }}/>
                    </div>
                    <div className='form_group'>
                        <label htmlFor='end_date'>End date</label>
                        <input type='date' id='end_date' name='end_date' value={endDate}
                            min={startDate ? startDate : getMinDate()} onChange={e => setEndDate(e.target.value)}/>
                    </div>
                    <div className='form_group'>
                        <label htmlFor='end_time'>End time</label>
                        <input type='time' id='end_time' name='end_time' step='3600' value={endTime} onChange={e => {
                            setEndTime(`${e.target.value.split(':')[0]}:00:00`)
                        }}/>
                    </div>
                    <div className='form_group'>
                        <button type='submit'>Search</button>
                    </div>
                </form>
                {vehicles.length != 0 ? <>
                    <div className='vehicle-filter-sort'>
                        <FormControl className='form-control' sx={{ m: 1, width: 300, backgroundColor: '#252525', color: '#888' }}>
                            <InputLabel className='input-label' id='filter-by-brand' sx={{ color: '#888' }}> Brand </InputLabel>
                            <Select
                                className='select'
                                labelId='filter-by-brand'
                                id='filter-car-by-brand'
                                multiple
                                value={selectedBrands}
                                onChange={handleBrandChange}
                                input={<OutlinedInput id='select-multiple-chip' label='Brand' sx={{ color: '#888' }}/>}
                                renderValue={selected =>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map(value =>
                                            <Chip key={value} label={value} sx={{ backgroundColor: '#4eaae8', color: '#252525' }}/>,
                                        )}
                                    </Box>
                                }
                                MenuProps={MenuProps}
                                sx={{ color: '#888' }}
                            >
                                {brands.map(brand =>
                                    <MenuItem
                                        className='menu-item'
                                        key={brand}
                                        value={brand}
                                        style={getStyles(brand, brands, theme)}
                                        sx={{ color: '#888' }}
                                    >
                                        <Checkbox checked={selectedBrands.indexOf(brand) > -1} sx={{ color: '#4eaae8' }}/>
                                        <ListItemText primary={brand} sx={{ color: '#888' }}/>
                                    </MenuItem>,
                                )}
                            </Select>
                        </FormControl>
                        <FormControl className='form-control' sx={{ m: 1, width: 300, backgroundColor: '#252525', color: '#888' }}>
                            <InputLabel className='input-label' id='filter-by-model' sx={{ color: '#888' }}> Model </InputLabel>
                            <Select
                                className='select'
                                labelId='filter-by-model'
                                id='filter-car-by-model'
                                multiple
                                value={selectedModels}
                                onChange={handleModelChange}
                                input={<OutlinedInput id='select-multiple-chip' label='Model' sx={{ color: '#888' }}/>}
                                renderValue={selected =>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map(value =>
                                            <Chip key={value} label={value} sx={{ backgroundColor: '#4eaae8', color: '#252525' }}/>,
                                        )}
                                    </Box>
                                }
                                MenuProps={MenuProps}
                                sx={{ color: '#888' }}
                            >
                                {models.map(model =>
                                    <MenuItem
                                        className='menu-item'
                                        key={model}
                                        value={model}
                                        style={getStyles(model, models, theme)}
                                    >
                                        <Checkbox checked={selectedModels.indexOf(model) > -1} sx={{ color: '#4eaae8' }}/>
                                        <ListItemText primary={model} sx={{ color: '#888' }}/>
                                    </MenuItem>,
                                )}
                            </Select>
                        </FormControl>
                        <FormControl className='form-control' sx={{ m: 1, width: 300, backgroundColor: '#252525', color: '#888' }}>
                            <InputLabel className='input-label' id='filter-by-gearbox' sx={{ color: '#888' }}> Gearbox </InputLabel>
                            <Select
                                className='select'
                                labelId='filter-by-gearbox'
                                id='filter-car-by-gearbox'
                                multiple
                                value={selectedGearboxes}
                                onChange={handleGearboxChange}
                                input={<OutlinedInput id='select-multiple-chip' label='Gearbox' sx={{ color: '#888' }}/>}
                                renderValue={selected =>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map(value =>
                                            <Chip key={value} label={value} sx={{ backgroundColor: '#4eaae8', color: '#252525' }}/>,
                                        )}
                                    </Box>
                                }
                                MenuProps={MenuProps}
                                sx={{ color: '#888' }}
                            >
                                {gearboxes.map(gearbox =>
                                    <MenuItem
                                        className='menu-item'
                                        key={gearbox}
                                        value={gearbox}
                                        style={getStyles(gearbox, gearboxes, theme)}
                                        sx={{ color: '#888' }}
                                    >
                                        <Checkbox checked={selectedGearboxes.indexOf(gearbox) > -1} sx={{ color: '#4eaae8' }}/>
                                        <ListItemText primary={gearbox} sx={{ color: '#888' }}/>
                                    </MenuItem>,
                                )}
                            </Select>
                        </FormControl>
                        <FormControl className='form-control' sx={{ m: 1, width: 300, backgroundColor: '#252525', color: '#888' }}>
                            <InputLabel className='input-label' id='filter-by-color' sx={{ color: '#888' }}> Color </InputLabel>
                            <Select
                                className='select'
                                labelId='filter-by-color'
                                id='filter-car-by-color'
                                multiple
                                value={selectedColors}
                                onChange={handleColorChange}
                                input={<OutlinedInput id='select-multiple-chip' label='Color' sx={{ color: '#888' }}/>}
                                renderValue={selected =>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map(value =>
                                            <Chip key={value} label={value} sx={{ backgroundColor: '#4eaae8', color: '#252525' }}/>,
                                        )}
                                    </Box>
                                }
                                MenuProps={MenuProps}
                                sx={{ color: '#888' }}
                            >
                                {colors.map(color =>
                                    <MenuItem
                                        className='menu-item'
                                        key={color}
                                        value={color}
                                        style={getStyles(color, colors, theme)}
                                        sx={{ color: '#888' }}
                                    >
                                        <Checkbox checked={selectedColors.indexOf(color) > -1} sx={{ color: '#4eaae8' }}/>
                                        <ListItemText primary={color} sx={{ color: '#888' }}/>
                                    </MenuItem>,
                                )}
                            </Select>
                        </FormControl>
                        <Box sx={{ width: 300 }}>
                            <Typography id='price-slider' gutterBottom>
                                Price range
                            </Typography>
                            <Slider
                                sx={{
                                    color: '#09195b', // Kolor suwaka
                                    '& .MuiSlider-thumb': {
                                        height: 24,
                                        width: 24,
                                        backgroundColor: '#09195b', // Kolor kropki
                                        border: '2px solid #1d1d1d', // Kolor obramowania kropki
                                        '&:hover': {
                                            boxShadow: '0 0 0 8px rgba(78, 170, 232, 0.16)', // Cień przy najechaniu
                                        },
                                        '& .MuiSlider-valueLabel': {
                                            color: '#252525', // Kolor etykiety wartości
                                        },
                                    },
                                    '& .MuiSlider-markLabel': {
                                        color: '#fff', // Kolor etykiety znacznika
                                    },
                                    '& .MuiSlider-track': {
                                        height: 8, // Wysokość suwaka
                                    },
                                    '& .MuiSlider-rail': {
                                        height: 8, // Wysokość tła suwaka
                                        opacity: 0.3, // Przezroczystość tła suwaka
                                        color: '#888', // Kolor tła suwaka
                                    },
                                    '& .MuiSlider-mark': {
                                        backgroundColor: '#252525', // Kolor znacznika
                                    },
                                    '& .MuiSlider-markActive': {
                                        backgroundColor: '#252525', // Kolor aktywnego znacznika
                                    },
                                }}
                                min={Math.min(...vehicles.map(vehicle => vehicle.price)) - 50}
                                max={Math.max(...vehicles.map(vehicle => vehicle.price)) + 50}
                                aria-labelledby='price-slider'
                                value={priceRange}
                                onChange={handlePriceChange}
                                valueLabelDisplay='off'
                                marks={marks}
                                getAriaValueText={valuetext}
                            />
                        </Box>
                        <FormControl className='vehicle-sort' sx={{ m: 1, width: 300, backgroundColor: '#252525', color: '#888' }}>
                            <InputLabel className='input-label' id='sort-by-type' sx={{ color: '#888' }}>Sort by</InputLabel>
                            <Select
                                labelId='sort-by-type'
                                id='sort-by-type'
                                value={sortType}
                                onChange={e => setSortType(e.target.value)}
                                sx={{ color: '#888' }}
                            >
                                {sortOptions.map(option =>
                                    <MenuItem
                                        key={option.value}
                                        value={option.value}
                                        sx={{ color: '#888' }}
                                    >
                                        {option.label}
                                    </MenuItem>,
                                )}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='vehicle-list'>
                        {filteredVehicles.map(vehicle =>
                            vehicle.status === 'available' ?
                                <div key={vehicle.vehicle_id} className='vehicle-card' onClick={() => {
                                    goToDetailsPage(vehicle)
                                }}>
                                    <VehicleCard vehicle={vehicle} extra={false}/>
                                </div>
                                : null,
                        )}
                    </div>
                </> : null}

            </div>
        )
    }
}
