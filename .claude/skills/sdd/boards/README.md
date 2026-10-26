# Adaptadores de tablero

El tablero es un **espejo** de `tasks.md`, nunca la fuente de verdad. Cambiar de tablero
(local → Trello → GitHub → Jira…) no debe exigir tocar specs ni tareas: solo se cambia
`adaptador:` en `specs/board.md` y se vuelve a ejecutar `/sdd tickets`.

## Contrato

Todo adaptador implementa estas 4 operaciones. Si una falla, avisa al usuario y sigue
trabajando con `tasks.md`; un tablero caído nunca bloquea el desarrollo.

| Operación | Entrada | Salida |
|---|---|---|
| `preparar` | config de `specs/board.md` | El tablero tiene las 3 columnas: Por hacer / En curso / Hecho |
| `crear` | tarea (ID, título, CA cubiertos, enlace a la spec) | ID externo y URL del ticket |
| `mover` | ID externo, estado (`por-hacer` \| `en-curso` \| `hecho`) | — |
| `leer` | ID externo | estado actual en el tablero |

## Formato del ticket (igual en todos los adaptadores)

- **Título:** `[NNN] TXX — <descripción de la tarea>`
- **Descripción:**
  ```
  Spec: specs/NNN-nombre/spec.md
  Cubre: CA-01, CA-02
  Depende de: T01
  Verificación: <de tasks.md>
  ```

## Vínculo tarea ↔ ticket

Después de `crear`, agrega a la tarea en `tasks.md` la línea `- Ticket: <adaptador>:<id> <url>`.
Si la tarea ya tiene `Ticket:` para el mismo adaptador, no la vuelvas a crear (idempotencia).
Al cambiar de adaptador se crean tickets nuevos y la línea anterior se conserva.

## Adaptadores disponibles

- `local`: sin servicio externo (ver `local.md`). Es el valor por defecto.
- `trello`: ver `trello.md`.
- `github`: GitHub Issues (ver `github.md`).

Para agregar otro (Jira, Linear, Notion, Backlog.md…), crea `<nombre>.md` con las 4
operaciones usando la API o el MCP de ese servicio. Nada más cambia.
