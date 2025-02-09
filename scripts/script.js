document.addEventListener('DOMContentLoaded', () => {
    const errorMessage = document.getElementById('error-message');

    // Función para actualizar los valores en la UI
    function updateUI(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            // Actualizar el valor
            element.textContent = value.toFixed(2);
            
            // Añadir efecto visual
            element.classList.add('updated');
            setTimeout(() => {
                element.classList.remove('updated');
            }, 300);

            // Actualizar el indicador visual
            const section = element.closest('.sensor-section');
            if (section) {
                const dot = section.querySelector('.indicator-dot');
                if (dot) {
                    dot.style.transform = `translate(${value * 2}px, ${value * 2}px)`;
                }
            }
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
            errorMessage.classList.remove('hidden');
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
            errorMessage.classList.remove('hidden');
        }
    }

    // Orientación
    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', (event) => {
            updateUI('alpha', event.alpha);
            updateUI('beta', event.beta);
            updateUI('gamma', event.gamma);
        });
    } else {
        errorMessage.classList.remove('hidden');
    }
}); 