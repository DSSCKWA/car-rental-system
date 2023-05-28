
export const modalStyle = {
    backgroundColor: 'var(--content-bg-color)',
    borderRadius: '5px',
    color: 'var(--medium-gray)',
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
    backgroundColor: 'var(--content-bg-color)',
    borderRadius: '5px',
    color: 'var(--medium-gray)',
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
            color: 'var(--content-bg-color)', // Kolor etykiety wartości
        },
    },
    '& .MuiSlider-markLabel': {
        color: 'var(--main-text-color)', // Kolor etykiety znacznika
    },
    '& .MuiSlider-track': {
        height: 8, // Wysokość suwaka
    },
    '& .MuiSlider-rail': {
        height: 8, // Wysokość tła suwaka
        opacity: 0.3, // Przezroczystość tła suwaka
        color: 'var(--medium-gray)', // Kolor tła suwaka
    },
    '& .MuiSlider-mark': {
        backgroundColor: 'var(--content-bg-color)', // Kolor znacznika
    },
    '& .MuiSlider-markActive': {
        backgroundColor: 'var(--content-bg-color)', // Kolor aktywnego znacznika
    },
}
