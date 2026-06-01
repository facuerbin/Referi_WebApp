# Referí — Web App

Aplicación web para el sistema de gestión de clubes y socios Referí. Desarrollada como proyecto final de la carrera Ingeniería en Sistemas de Información.

Orientada al personal de la organización (no a los socios). Consume la API REST de Referí.

---

## Funcionalidades

- **Socios** — Alta, baja, importación/exportación CSV y reportes.
- **Actividades** — ABM de actividades, turnos y horarios. Inscripción de socios.
- **Tarifas** — Definición de tarifas por actividad y frecuencia de cobro.
- **Pagos** — Registro y consulta de pagos y cuotas.
- **Asistencias** — Planillas diarias. Registro por DNI o código QR.
- **Notificaciones** — Envío de notificaciones a socios, deudores o inscriptos.
- **Organización** — Gestión de espacios, personal y roles.
- **Reportes** — Gráficas de inscriptos, distribución por estado e ingresos.

---

## Requisitos

- Node.js 20+
- La API de Referí corriendo en `http://localhost:3000`

---

## Configuración

La URL de la API se configura en `src/environments/environment.ts` (desarrollo) y `src/environments/environment.prod.ts` (producción).

---

## Instalación y ejecución

```bash
npm install
npm start          # servidor de desarrollo en localhost:4200
npm run build      # build de producción → dist/web-app/
npm test           # unit tests (Karma)
```

Para desplegar en la API (asumiendo ambos repositorios clonados lado a lado):

```bash
npm run build
cp -r dist/web-app/* ../referi_api/web/
```

---

## Tecnologías

- **Angular 16**
- **Angular Material** + **Bootstrap 5**
- **TypeScript 5.1**
