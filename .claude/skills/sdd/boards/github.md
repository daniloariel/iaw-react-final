# Adaptador `github`

Usa GitHub Issues del repositorio que indica `repo:` en `specs/board.md`, a través del MCP de
GitHub (`mcp__github__*`) o de `gh` si está disponible. Solo crea issues en el repo del remoto
`origin`; si `repo:` no coincide, detente y pregunta.

- `preparar`: asegura que existan los labels `sdd`, `spec-NNN`, `en-curso`.
- `crear`: issue con el título y la descripción del contrato, labels `sdd` y `spec-NNN`. ID = número de issue.
- `mover`:
  - `por-hacer`: abierto, sin label `en-curso`
  - `en-curso`: abierto, con label `en-curso`
  - `hecho`: lo cierra el commit o PR con `Closes #N`; si no, ciérralo con `state_reason: completed`
- `leer`: estado y labels del issue.
