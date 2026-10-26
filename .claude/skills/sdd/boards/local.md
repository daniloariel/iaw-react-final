# Adaptador `local`

No usa ningún servicio externo. El estado vive en los checkboxes de `tasks.md`:
`[ ]` por hacer · `[~]` en curso · `[x]` hecho.

- `preparar`: nada.
- `crear`: nada (el ID es el de la tarea; no hace falta la línea `Ticket:`).
- `mover`: cambia el checkbox de la tarea.
- `leer`: lee el checkbox.

`/sdd estado` arma el tablero a partir de todos los `tasks.md` de `specs/`.
