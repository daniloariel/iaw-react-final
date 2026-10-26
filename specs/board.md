# Configuración del tablero

Elige el adaptador; el resto de las specs no cambia. Ver `.claude/skills/sdd/boards/`.

```yaml
adaptador: local        # local | trello | github

trello:
  board: ""             # ID de la URL: trello.com/b/<ID>/...
  listas:               # los completa /sdd tickets (preparar)
    por-hacer: ""
    en-curso: ""
    hecho: ""

github:
  repo: daniloariel/iaw-react-final
```

Credenciales de Trello: variables de entorno `TRELLO_API_KEY` y `TRELLO_TOKEN`. Nunca van en este archivo.
