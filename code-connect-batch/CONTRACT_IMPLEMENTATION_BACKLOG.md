# Contract implementation backlog — compatibility pointer

> **Documento retirado como backlog activo el 2026-08-17.** Sus olas partían de 40 contratos y quedaron obsoletas después de conectar 29 componentes adicionales.

La única cola vigente es [CONTRACT_BACKLOG.md](CONTRACT_BACKLOG.md). El flujo de implementación y los límites de publicación están en [README.md](README.md).

Regla de compatibilidad para automatizaciones antiguas:

- No ejecutar las antiguas Waves 1–4.
- Elegir un solo ID activo de `CONTRACT_BACKLOG.md`.
- Trabajar una familia Figma por ciclo.
- Publicar únicamente después de nodo Bamboo estable + API Angular pública + Storybook + parse.
- Actualizar `INVENTORY.md`, `CONTRACT_BACKLOG.md` y `DECISIONS.md` después de `hasTemplate: true`.
- Usar la rama `code-connect-v1.6.4-b`; `code-connect-test` es histórica.
