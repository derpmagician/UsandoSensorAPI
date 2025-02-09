function handleMotion(event) {
    const accel = event.accelerationIncludingGravity;
    document.getElementById('accel').innerText = 
        `X: ${accel.x?.toFixed(2)} m/s²\nY: ${accel.y?.toFixed(2)} m/s²\nZ: ${accel.z?.toFixed(2)} m/s²`;
}

function handleOrientation(event) {
    document.getElementById('gyro').innerText = 
        `Alpha: ${event.alpha?.toFixed(2)}°\nBeta: ${event.beta?.toFixed(2)}°\nGamma: ${event.gamma?.toFixed(2)}°`;
    
    // Actualizar el compás
    if (event.alpha !== null) {
        const arrow = document.querySelector('.arrow');
        const degrees = document.getElementById('compass-degrees');
        const rotation = 360 - event.alpha; // Invertimos para que apunte al norte correctamente
        arrow.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
        degrees.textContent = `${Math.round(event.alpha)}°`;
    }
}

function startSensors() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener("devicemotion", handleMotion, true);
                    window.addEventListener("deviceorientation", handleOrientation, true);
                } else {
                    alert("Permiso denegado");
                }
            })
            .catch(console.error);
    } else {
        // Para navegadores que no requieren permisos manuales
        window.addEventListener("devicemotion", handleMotion, true);
        window.addEventListener("deviceorientation", handleOrientation, true);
    }
}

// Manejo del tema oscuro
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', startSensors);

    // Configuración del switch de tema
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleSwitch.checked = currentTheme === 'dark';

    toggleSwitch.addEventListener('change', function(e) {
        setTheme(e.target.checked ? 'dark' : 'light');
    });
});
