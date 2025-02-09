# Sensor API Demo

Esta es una aplicación web que demuestra el uso de las APIs de sensores del dispositivo móvil, específicamente el acelerómetro y el giroscopio.

## Características

- Lectura en tiempo real del acelerómetro (incluyendo gravedad)
- Lectura en tiempo real de la orientación del dispositivo
- Interfaz simple y responsive
- Manejo de permisos para iOS/Safari

## Requisitos

- Un dispositivo móvil con acelerómetro y giroscopio
- Un navegador web moderno que soporte las APIs de sensores
- Conexión HTTPS (requerido para las APIs de sensores)

## Uso

1. Accede a la aplicación desde un dispositivo móvil
2. Haz clic en el botón "Solicitar Permiso"
3. Acepta los permisos cuando el navegador los solicite
4. Mueve el dispositivo para ver los cambios en tiempo real

## Valores mostrados

### Acelerómetro
- X: Aceleración lateral (izquierda/derecha)
- Y: Aceleración frontal (adelante/atrás)
- Z: Aceleración vertical (arriba/abajo)

### Giroscopio (Orientación)
- Alpha: Rotación alrededor del eje Z (0-360 grados)
- Beta: Rotación frontal (-180 a 180 grados)
- Gamma: Rotación lateral (-90 a 90 grados)

## Compatibilidad

La aplicación funciona en:
- iOS Safari (requiere permiso explícito)
- Chrome para Android
- Firefox para Android
- Otros navegadores móviles modernos

## Estructura del Proyecto

```
├── index.html 