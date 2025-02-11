let ambientLightSensor = null;
let proximitySensor = null;

function handleMotion(event) {
    const accel = event.accelerationIncludingGravity;
    document.getElementById('accel').innerText = 
        `X: ${accel?.x?.toFixed(2) || 0} m/s²\nY: ${accel?.y?.toFixed(2) || 0} m/s²\nZ: ${accel?.z?.toFixed(2) || 0} m/s²`;
}

function handleOrientation(event) {
    if (event.alpha === null || event.beta === null || event.gamma === null) {
        document.getElementById('gyro').innerText = 'Giroscopio no disponible';
        return;
    }
    document.getElementById('gyro').innerText = 
        `Alpha: ${event.alpha?.toFixed(2)}°\nBeta: ${event.beta?.toFixed(2)}°\nGamma: ${event.gamma?.toFixed(2)}°`;
    // Actualizar el compás
    const arrow = document.querySelector('.arrow');
    const degrees = document.getElementById('compass-degrees');
    const rotation = 360 - event.alpha; // Invertimos para que apunte al norte correctamente
    arrow.style.transform = `translate(-50%, -100%) rotate(${rotation}deg)`;
    degrees.textContent = `${Math.round(event.alpha)}°`;
}

function handleAmbientLight(event) {
    const lightLevel = event ? event.target.illuminance : null;
    const lightElement = document.getElementById('light');
    const lightIndicator = document.querySelector('.light-level');

    if (lightLevel !== null) {
        lightElement.innerText = `Nivel de luz: ${lightLevel.toFixed(1)} lux`;
        const normalizedLevel = Math.min(Math.max((lightLevel / 500) * 100, 0), 100);
        lightIndicator.style.width = `${normalizedLevel}%`;
    } else {
        lightElement.innerText = 'Sensor de luz no disponible';
        lightIndicator.style.width = '0%';
    }
}

function handleProximity(event) {
    const distance = event.value;
    const proximityElement = document.getElementById('proximity');
    const proximityObject = document.querySelector('.proximity-object');

    proximityElement.innerText = distance === 0 ? 
        'Objeto cercano detectado' : 
        'No hay objetos cercanos';

    proximityObject.style.right = distance === 0 ? '10px' : '160px';
}

function startSensors() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    initializeSensors();
                } else {
                    alert("Permiso denegado");
                }
            })
            .catch(console.error);
    } else {
        initializeSensors();
    }
}

function initializeSensors() {
    // Acelerómetro y Giroscopio
    window.addEventListener("devicemotion", handleMotion, true);
    window.addEventListener("deviceorientation", handleOrientation, true);

    // Sensor de Luz
    if ("AmbientLightSensor" in window) {
        try {
            ambientLightSensor = new AmbientLightSensor();
            ambientLightSensor.addEventListener("reading", handleAmbientLight);
            ambientLightSensor.addEventListener("error", (event) => {
                console.error(event.error.name, event.error.message);
                document.getElementById('light').innerText = `Error: ${event.error.name}`;
            });
            ambientLightSensor.start();
        } catch (error) {
            document.getElementById('light').innerText = 'Sensor de luz no disponible';
            console.error('Error al acceder al sensor de luz:', error);
        }
    } else {
        document.getElementById('light').innerText = 'Sensor de luz no soportado';
    }

    // Sensor de Proximidad
    if ('ProximitySensor' in window) {
        try {
            proximitySensor = new ProximitySensor();
            proximitySensor.addEventListener('reading', handleProximity);
            proximitySensor.addEventListener('error', (event) => {
                console.error(event.error.name, event.error.message);
                document.getElementById('proximity').innerText = `Error: ${event.error.name}`;
            });
            proximitySensor.start();
        } catch (error) {
            document.getElementById('proximity').innerText = 'Sensor de proximidad no disponible';
            console.error('Error al acceder al sensor de proximidad:', error);
        }
    } else {
        document.getElementById('proximity').innerText = 'Sensor de proximidad no soportado';
    }
}

// Manejo del tema oscuro
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

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

    // Verificar si los sensores están disponibles
    if (!('DeviceOrientationEvent' in window)) {
        document.getElementById('gyro').innerText = 'Giroscopio no soportado';
    }
    if (!('AmbientLightSensor' in window)) {
        document.getElementById('light').innerText = 'Sensor de luz no soportado';
    }
    if (!('ProximitySensor' in window)) {
        document.getElementById('proximity').innerText = 'Sensor de proximidad no soportado';
    }
});