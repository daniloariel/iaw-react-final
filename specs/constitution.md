# Constitución del proyecto

- **Estado:** Borrador (pendiente de revisión del autor)
- **Última actualización:** 2026-10-26

## Propósito del sistema
Aplicación web para registrar pacientes y sus mediciones de presión arterial. Solo los usuarios autenticados pueden ver y gestionar los datos.

## Stack
- React 18 con Create React App (`react-scripts` 5)
- Ruteo: `react-router-dom` v6
- UI: Bootstrap 5 + `react-bootstrap`, íconos con `react-icons`
- Notificaciones: `react-toastify`
- Backend: Firebase v9 (API modular) — Firestore para datos y Firebase Auth (email/contraseña) para sesiones; `react-firebase-hooks` para el estado de autenticación
- Pruebas: Jest + React Testing Library (incluidos en CRA)

## Arquitectura
- `src/firebase/config.js`: inicializa Firebase y exporta `db` y `auth`. Nada más.
- `src/firebase/api.js`: **única** capa de acceso a Firestore. Los componentes nunca importan `firebase/firestore` directamente.
- `src/components/`: componentes de UI (funcionales, con hooks). Un componente por archivo.
- `src/components/Home.js`: define las rutas. Las rutas privadas solo se montan si hay usuario autenticado.
- Modelo de datos actual: colección `patients` con subcolección `patients/{id}/pressures`.

## Convenciones
- Componentes funcionales con hooks; exportaciones con nombre (`export const X = …`).
- Archivos de componentes en PascalCase; funciones de la API en camelCase con verbo (`getX`, `saveX`, `updateX`, `deleteX`).
- Feedback al usuario con `toast(...)` (éxito y error); los errores también se registran con `console.error`.
- Textos de la interfaz: <definir idioma: español / inglés>.

## Principios (no negociables)
1. Todo cambio no trivial pasa por SDD: spec → plan → tareas → implementación → verificación.
2. Los datos de pacientes son sensibles: toda ruta y operación de datos requiere usuario autenticado.
3. El acceso a datos solo se hace mediante `src/firebase/api.js`.
4. Las funciones de la API que escriben devuelven la promesa (`return addDoc(...)`) para que la UI pueda esperar el resultado y mostrar errores.
5. Cada criterio de aceptación tiene una forma de verificación (prueba automática o paso manual documentado).
6. No se agregan dependencias nuevas sin justificarlo en el plan.

## Comandos de verificación
- Pruebas: `CI=true npm test`
- Build: `npm run build`

## Deuda técnica conocida
- `src/App.test.js` es la prueba por defecto de CRA ("learn react") y falla: hay que reemplazarla.
- `savePatient`, `updatePatient`, `savePressure` y `updatePressure` no devuelven la promesa (incumplen el principio 4).
- En `Home.js` la ruta `*` está antes que las rutas de presiones.
- `Login.js` tiene `console.log` de depuración y `createUser` ignora los errores.
- La configuración de Firebase está escrita en el código en lugar de variables de entorno (`REACT_APP_*`).
