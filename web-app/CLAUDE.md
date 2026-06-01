# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Angular 14 web app for **Referí**, a sports club management system. Targets organization staff (not end members). Built as a final project for Ingeniería en Sistemas de Información.

The app connects to the Referí API (`referi_api`). In production both are served from the same origin — the API serves this app as static files.

---

## Commands

```bash
npm install
npm start          # dev server at localhost:4200
npm run build      # production build → dist/web-app/
npm test           # Karma/Jasmine unit tests
```

To deploy into the API:
```bash
npm run build
cp -r dist/web-app/* ../../referi_api/web/
```

API base URL and version prefix are set in `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod).

---

## Architecture

### Routing & Guards

Routes are defined in `src/app/app-routing.module.ts`. Most authenticated routes are protected by three guards in sequence:

1. **`AuthGuardGuard`** — checks that a JWT token exists in cookies; redirects to `/login` if not
2. **`EmployeeGuard`** — checks that an `org` cookie exists; redirects to `/download` if not (handles the case where a user has no organization)
3. **Feature guard** (`SociosGuard`, `ActividadesGuard`, `PagosGuard`, etc.) — calls `auth.promiseEmployeePermissions()` and checks that the user's role includes a permission matching the module name (e.g. `'SOCIOS'`)

All feature guards follow the same pattern and could be refactored into a single parameterized base guard.

### AuthService — monolithic API layer

`src/app/services/auth/auth.service.ts` is a single service that handles **all** API communication for the entire app (~550 lines). There is no domain separation. This is the main architectural debt.

Key behaviours:
- JWT token, user ID (`uid`) and organization ID (`org`) are stored as cookies via `ngx-cookie-service`
- `getOrgId()` lazy-loads the org ID from the API and caches it in the `org` cookie
- **Mixed HTTP clients**: ~60% of calls use `axios` (async/await), ~40% use Angular's `HttpClient` (Observables). Both are used inconsistently within the same service

### Component structure

Route components live in `src/app/components/routes/`. Each component typically:
- Calls `AuthService` in `ngOnInit` to load data
- Manages its own loading flag and local state
- Opens/closes Bootstrap modals via `document.getElementById`

Shared layout components (header, sidenav) are in `src/app/components/layout/`.

All API request/response shapes are typed in `src/app/interfaces/`.

---

## Known Bugs

- **`logout()`** in `auth.service.ts` deletes cookie `'uuid'` which is never set — should be `'uid'`. The user ID cookie is never cleared on logout.
- **`detalle-socio.component.ts` line ~51** — uses `=` (assignment) instead of `===` (comparison) inside a filter, so the filter always returns the assigned value instead of a boolean.
- **`actividades.component.ts` line ~117** — incomplete promise chain (line ends mid-expression with a dangling `.`).
- **`buscarSocio()`** in `socios.component.ts` — calls `auth.getUser()` but discards the result; the method does nothing.

## Known TODOs

- **`RecuperarContraseniaComponent`** — declared in `app.module.ts` but has no route. Has real logic (calls `auth.recoverPassword()`). Needs a `/recuperar` route wired up in `app-routing.module.ts`.
- **JWT interceptor** (`src/app/interceptors/jwt-interceptor.interceptor.ts`) — exists but only calls `next.handle(request)` with no logic and is not registered in `app.module`. Auth headers are manually added to every Axios call instead. Either implement and register it, or delete it.
- **Unused import** — `axios` is imported in `verificar.component.ts` but never used.
- **`AuthService` split** — the service should eventually be broken into domain-specific services (auth, socios, actividades, pagos, etc.).
- **HTTP client unification** — all API calls should use either `HttpClient` or `axios`, not both.
