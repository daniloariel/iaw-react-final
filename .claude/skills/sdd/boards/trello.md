# Adaptador `trello`

Usa la API REST de Trello con `curl`, sin dependencias ni MCP.

## Credenciales (nunca en el repo)
Variables de entorno `TRELLO_API_KEY` y `TRELLO_TOKEN`. La API key se obtiene en
https://trello.com/power-ups/admin, y el token se genera desde esa misma página.
Si faltan, pídele al usuario que las configure. Nunca las pidas por chat, no las escribas
en archivos y no las muestres en la salida.

## Configuración (`specs/board.md`)
`board:` es el ID corto que aparece en la URL del tablero (`trello.com/b/<ID>/...`).
`listas:` son los IDs de las columnas, que completa `preparar`.

Base de todas las llamadas:
`A="key=$TRELLO_API_KEY&token=$TRELLO_TOKEN"; T=https://api.trello.com/1`

## Operaciones
- `preparar`:
  1. `curl -sS "$T/boards/<board>/lists?fields=name&$A"`
  2. Busca las columnas "Por hacer", "En curso" y "Hecho". Crea las que falten con
     `curl -sS -X POST "$T/boards/<board>/lists?$A" --data-urlencode "name=<nombre>" --data-urlencode "pos=bottom"`
  3. Guarda los tres IDs en `listas:` dentro de `specs/board.md`.
- `crear`:
  `curl -sS -X POST "$T/cards?idList=<listas.por-hacer>&$A" --data-urlencode "name=<título>" --data-urlencode "desc=<descripción>"`
  ID = campo `id`, URL = campo `shortUrl` de la respuesta.
- `mover`: `curl -sS -X PUT "$T/cards/<id>?idList=<listas.estado>&$A"`
- `leer`: `curl -sS "$T/cards/<id>?fields=idList,shortUrl&$A"`. Compara `idList` con `listas:`.

Si una llamada devuelve 401, las credenciales son inválidas. Si devuelve 403 desde el proxy,
la red del entorno no permite `api.trello.com`. En ambos casos avisa al usuario y sigue con `tasks.md`.
