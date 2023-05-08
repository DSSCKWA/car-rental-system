import './VehiclesPage.css'

export function VehicleCardLine({ name, value }) {
    return (
        <div>
            <span className='vehicle_card_line_name'>{name}: </span>
            <span className='vehicle_card_line_value'>{value}</span>
        </div>
    )
}


export function VehicleCard(props) {
    const vehicle = props.vehicle
    const extra = props.extra
    return (
        <div className='vehicle'>
            <img src={`data:image/jpeg;base64,${vehicle?.image}`} alt={`${vehicle?.brand} ${vehicle?.model}`} />
            <div className='vehicle-details'>
                <h3 className='vehicle-title'>{vehicle?.brand} {vehicle?.model}</h3>
                <div className='vehicle-details-two-columns'>
                    <VehicleCardLine name='Year of production' value={vehicle?.year_of_production} />
                    <VehicleCardLine name='Body type' value={vehicle?.body_type.replace(/_/g, ' ')} />
                    <VehicleCardLine name='Vehicle class' value={vehicle?.vehicle_class} />
                    <VehicleCardLine name='Number of seats' value={vehicle?.number_of_seats} />
                    <VehicleCardLine name='Gearbox type' value={vehicle?.gearbox_type} />
                    <VehicleCardLine name='Engine power' value={`${vehicle?.engine_power} HP`} />
                    <VehicleCardLine name='Fuel type' value={vehicle?.fuel_type} />
                    <VehicleCardLine name='Drive type' value={vehicle?.drive_type} />
                    {extra ?
                        <><VehicleCardLine name='Color' value={vehicle?.color.replace(/_/g, ' ')} />
                            <VehicleCardLine name='Number of doors' value={vehicle?.number_of_doors} />
                            <VehicleCardLine name='Engine capacity' value={`${vehicle?.engine_capacity} L`} />
                            <VehicleCardLine name='Tank capacity' value={`${vehicle?.tank_capacity} L`} />
                            <VehicleCardLine name='Registration number' value={vehicle?.registration_number} />
                            {vehicle?.additional_equipment ? <VehicleCardLine name='Additional equipment' value={vehicle?.additional_equipment.join(', ')} /> : null}
                            {vehicle?.description ? <VehicleCardLine name='Description' value={vehicle?.description} /> : null}
                        </> : null}
                </div>
            </div >
        </div >
    )
}
