
export const modalStyle = {
    backgroundColor: '#252525',
    borderRadius: '5px',
    color: '#888',
    padding: '2em',
    margin: 'auto',
    width: '50%',
    top: '50%',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
}

export const reviewCardStyle = {
    margin: '20px',
    backgroundColor: '#252525',
    borderRadius: '5px',
    color: '#888',
    padding: '2em',
    marginBottom: '2em',
    '&:hover': { boxShadow: '0 0 10px #299bbe' },
}

export const vehicleListPageStyle = {
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
}