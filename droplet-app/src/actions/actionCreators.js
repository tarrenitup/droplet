const toggleTheme = (currentTheme) => ({
    type: 'TOGGLE_THEME',
    payload: {
        currentTheme: currentTheme
    }
})

export default toggleTheme