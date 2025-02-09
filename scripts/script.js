function handleMotion(event) {
    const accel = event.accelerationIncludingGravity;
    document.getElementById('accel').innerText = 
        `X: ${accel.x?.toFixed(2)} m/s²\nY: ${accel.y?.toFixed(2)} m/s²\nZ: ${accel.z?.toFixed(2)} m/s²`;
}

function handleOrientation(event) {
    document.getElementById('gyro').innerText = 
        `Alpha: ${event.alpha?.toFixed(2)}°\nBeta: ${event.beta?.toFixed(2)}°\nGamma: ${event.gamma?.toFixed(2)}°`;
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

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    startButton.addEventListener('click', startSensors);
});
