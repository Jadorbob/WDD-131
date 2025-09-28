function themetoggle() {
    const themeSelect = document.getElementById('theme-select');
    const themeImage = document.getElementById('picture');
    const body = document.body;

    const images = {
        light: 'images/light-image.webp',
        dark: 'images/dark-image.webp'
    };


    themeSelect.addEventListener('change', () => {
        if (themeSelect.value === 'dark') {
            body.classList.add('dark');
            themeImage.src = images.dark;
        } else {
            body.classList.remove('dark');
            themeImage.src = images.light;
        }
    });
}

themetoggle();
