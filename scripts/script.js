document.addEventListener('DOMContentLoaded', () => {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Tu dispositivo no soporta los sensores.';
    errorMessage.style.color = 'red';
    errorMessage.style.display = 'none';
    document.body.appendChild(errorMessage);

    // Función para actualizar la UI
    function updateUI(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = typeof value === 'number' ? value.toFixed(2) : '0';
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 300);
        }
    }

    // Inicializar sensores
    async function initSensors() {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            try {
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission !== 'granted') {
                    errorMessage.style.display = 'block';
                    return;
                }
            } catch (error) {
                console.error('Error al solicitar permisos:', error);
                errorMessage.style.display = 'block';
                return;
            }
        }

        // Acelerómetro
        if ('Accelerometer' in window) {
            try {
                const accelerometer = new Accelerometer({ frequency: 60 });
                accelerometer.addEventListener('reading', () => {
                    updateUI('accel-x', accelerometer.x);
                    updateUI('accel-y', accelerometer.y);
                    updateUI('accel-z', accelerometer.z);
                });
                accelerometer.start();
            } catch (error) {
                console.error('Error al acceder al acelerómetro:', error);
                errorMessage.style.display = 'block';
            }
        }

        // Giroscopio
        if ('Gyroscope' in window) {
            try {
                const gyroscope = new Gyroscope({ frequency: 60 });
                gyroscope.addEventListener('reading', () => {
                    updateUI('gyro-x', gyroscope.x);
                    updateUI('gyro-y', gyroscope.y);
                    updateUI('gyro-z', gyroscope.z);
                });
                gyroscope.start();
            } catch (error) {
                console.error('Error al acceder al giroscopio:', error);
                errorMessage.style.display = 'block';
            }
        }
    }

    // Solicitar permisos y activar sensores
    const button = document.createElement('button');
    button.textContent = 'Activar Sensores';
    button.style.marginBottom = '20px';
    document.body.prepend(button);

    button.addEventListener('click', initSensors);
});