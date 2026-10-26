---
name: sdd
description: Spec-Driven Development. Úsala cuando el usuario quiera implementar una funcionalidad, módulo o sistema nuevo, o un cambio no trivial, y siempre que diga "spec", "especificación", "SDD", "nueva feature", "/sdd". Guía el trabajo por fases con aprobación del usuario entre cada una (constitución → spec → plan → tareas → implementación → verificación) y deja todo documentado en specs/. No la uses para arreglos triviales de una línea.
argument-hint: "[nueva <nombre> | plan | tareas | tickets | implementar | verificar | estado | constitucion]"
---

# Spec-Driven Development (SDD)

La especificación es la fuente de verdad. El código se deriva de ella, no al revés.
Ninguna línea de código de producción se escribe sin una spec y un plan aprobados.

## Estructura de archivos

```
specs/
  constitution.md              # Principios y stack del proyecto (se lee SIEMPRE primero)
  NNN-nombre-corto/            # Una carpeta por funcionalidad, numeración correlativa (001, 002…)
    spec.md                    # QUÉ y POR QUÉ (sin detalles técnicos)
    plan.md                    # CÓMO (diseño técnico)
    tasks.md                   # Lista ordenada de tareas con checkboxes
  board.md                     # Qué tablero se usa (local, trello, github…)
```

`tasks.md` es la fuente de verdad del estado. El tablero externo es solo un espejo y se
conecta mediante adaptadores (`.claude/skills/sdd/boards/`), así que se puede cambiar sin tocar las specs.

Las plantillas están en `.claude/skills/sdd/templates/`. Cópialas, no las improvises.

## Reglas generales

1. **Lee `specs/constitution.md` antes de cada fase.** Si no existe, empieza por la fase 0.
2. **Puertas de aprobación.** Al terminar cada fase (0–3) muestra un resumen breve, lista las preguntas abiertas y **detente** hasta que el usuario apruebe explícitamente ("ok", "aprobado", "dale"). No encadenes fases por tu cuenta.
3. **Nunca inventes requisitos.** Lo ambiguo se marca como `[NECESITA ACLARACIÓN: …]` en la spec y se pregunta. Una spec con marcas pendientes no puede aprobarse.
4. **Trazabilidad.** Cada criterio de aceptación tiene ID (`CA-01`), cada tarea referencia los CA que cubre, y cada CA está cubierto por al menos una tarea.
5. **La spec manda.** Si durante la implementación descubres que la spec o el plan están mal o incompletos, para, propón el cambio en el documento, pide aprobación y recién después sigue. Nunca dejes que código y spec diverjan.
6. Escribe los documentos en español. Mantén el estado (`Estado:` en el encabezado) actualizado: `Borrador` → `Aprobado` → `Implementado`.

## Fases

### Fase 0 — Constitución (`/sdd constitucion`)
Una sola vez por proyecto (y cuando cambie el stack). Analiza el repositorio y completa `specs/constitution.md` con la plantilla: stack, arquitectura, convenciones, principios de calidad, comandos de verificación y deuda técnica conocida. Pide al usuario que la revise.

### Fase 1 — Especificar (`/sdd nueva <nombre>`)
1. Determina el siguiente número `NNN` mirando `specs/`. Crea `specs/NNN-<nombre-kebab>/spec.md` desde la plantilla.
2. Antes de escribir, haz al usuario las preguntas necesarias (máximo ~5, las más importantes): problema, usuarios, alcance, reglas de negocio, casos borde.
3. Redacta: objetivo, historias de usuario, criterios de aceptación verificables (formato Dado/Cuando/Entonces), reglas de negocio, fuera de alcance, preguntas abiertas.
4. **Nada de tecnología en la spec** (ni componentes, ni colecciones, ni librerías). Solo comportamiento observable.
5. Detente para aprobación.

### Fase 2 — Planificar (`/sdd plan`)
Requiere spec `Aprobado` sin marcas `[NECESITA ACLARACIÓN]`.
1. Explora el código existente relevante.
2. Crea `plan.md`: enfoque, modelo de datos, componentes/módulos afectados (archivos nuevos y modificados), flujo, decisiones con alternativas descartadas, riesgos, estrategia de pruebas.
3. Verifica que el plan respete la constitución; si la viola, justifícalo en "Decisiones".
4. Detente para aprobación.

### Fase 3 — Tareas (`/sdd tareas`)
Requiere plan `Aprobado`.
1. Crea `tasks.md`: tareas pequeñas (cada una revisable en minutos), ordenadas por dependencia, con los CA que cubre y cómo se verifica.
2. Incluye una matriz CA → tareas al final y comprueba que no quede ningún CA sin cubrir.
3. Detente para aprobación.

### Fase 3b — Tickets (`/sdd tickets`)
Opcional. Se ejecuta automáticamente al aprobar las tareas si `specs/board.md` tiene un adaptador distinto de `local`.
1. Lee `specs/board.md` y el adaptador correspondiente en `boards/<adaptador>.md`, junto con el contrato de `boards/README.md`.
2. Ejecuta `preparar` y después `crear` para cada tarea que no tenga ticket. Anota cada `Ticket:` en `tasks.md` y haz commit.
3. Muestra la tabla Tarea | Ticket | URL.

### Fase 4 — Implementar (`/sdd implementar`)
Requiere tasks `Aprobado`.
- Toma la primera tarea sin marcar y márcala `[~]`; si tiene ticket, ejecuta `mover → en-curso`. Implementa **solo esa tarea**.
- Escribe o actualiza las pruebas que indica la tarea y ejecuta los comandos de verificación de la constitución.
- Marca el checkbox `[x]` en `tasks.md` y haz un commit por tarea: `feat(NNN): T03 descripción` (con el adaptador `github`, agrega `Closes #N`). Si tiene ticket, ejecuta `mover → hecho`.
- Si el tablero falla, avisa una vez y sigue: el estado ya quedó en `tasks.md`.
- Continúa con la siguiente tarea. Detente y pregunta solo si: una tarea falla la verificación y no está clara la causa, aparece una divergencia con la spec (regla 5), o el usuario pidió ir tarea por tarea.

### Fase 5 — Verificar (`/sdd verificar`)
1. Recorre cada CA de la spec y confirma con evidencia (prueba que pasa, ejecución de la app o revisión del código) que se cumple.
2. Agrega la sección "Verificación" al final de `spec.md` con una tabla CA | Resultado | Evidencia.
3. Si todo pasa, cambia los tres documentos a `Estado: Implementado`. Si algo falla, crea las tareas faltantes en `tasks.md` y vuelve a la fase 4.

### Estado (`/sdd estado`)
Lista las features de `specs/` con su fase actual, tareas completas/total y lo siguiente que hay que hacer. Si hay tablero, ejecuta `leer` y señala diferencias con `tasks.md` (por ejemplo, alguien movió una tarjeta a mano). Ofrece reconciliar, pero `tasks.md` manda salvo que el usuario diga lo contrario.

## Sin argumentos
Si se invoca `/sdd` sin argumentos, ejecuta `estado` y sugiere el próximo paso. Si el usuario describe una funcionalidad en lenguaje natural, trátalo como `nueva`.

## Cambios a funcionalidades ya implementadas
No edites código directamente. Crea una nueva carpeta `NNN-` para el cambio (referenciando la spec original en "Contexto") o, si es pequeño, actualiza la spec existente marcando los CA nuevos/modificados y vuelve a pasar por plan → tareas → implementación.
