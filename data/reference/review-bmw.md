# Revisión de casos dudosos – BMW (para validar a mano)

Jerarquía acordada: **Serie → Generación → Chasis (F20, carrocería) → Variante (M135i, motor, etc.)**

Fuentes: tabla de Wikipedia `List of BMW vehicles`, árbol de Commons y búsquedas web.
Marcado: ✅ confirmado por varias fuentes · ⚠️ confirmado por una sola fuente / contradictorio · ❓ no verificado.

## 1. Códigos que existen en Wikipedia pero no tienen categoría propia en Commons

| Código | Serie en Wikipedia | Qué es (según búsqueda) | Estado | Propuesta |
|---|---|---|---|---|
| G73 | 7 Series (`G70 G73`) | Variante de la serie G70; una búsqueda sugiere batalla larga/otro mercado, otra lo niega | ⚠️ | Mantener como chasis hijo de G70 (`G73`), sin fotos hasta confirmar |
| U12 | X1 / iX1 (`U11 U12`) | X1 de batalla larga (mercado chino) | ✅ | Chasis `U12`, hijo de la generación U11. Fotos: heredar U11 si no hay |
| G48 | X3 (`G45 G48`) | X3 de batalla larga (mercado chino); la generación base es G45 (esta sí tiene categoría) | ⚠️ | Chasis `G48`, hijo de G45 |
| NA6 | iX3 (`NA5 NA6`) | iX3 Neue Klasse de batalla larga (China); base NA5 | ⚠️ | Chasis `NA6`, hijo de NA5 |
| NA8 | i3 (`NA0 NA8`) | i3 sedán Neue Klasse de batalla larga (China); base NA0 | ⚠️ | Chasis `NA8`, hijo de NA0 |
| I20 | iX | Código correcto del iX. Probablemente la categoría de Commons existe como `BMW iX` sin el código | ✅ código / ❓ categoría | Enlazar a `BMW iX` manualmente |
| 505 | 505 (1955) | Prototipo de limusina con motor V8, solo 2 unidades; sin categoría propia en Commons (las fotos estarían en `BMW 501 / 502`) | ✅ | Incluir como "prototipo"; fotos escasas |
| 3/20 PS | 3/20 PS (1932–34) | Primer BMW diseñado por la marca, 788 cc | ✅ | Existe en Commons con otro nombre (`BMW 3/20`); enlazar manualmente |

## 2. Falsos positivos por prefijo (ya corregidos)
El emparejamiento original usaba subcadenas (`E9` casaba con `E90/E91/E92/E93`; `E3` con `E30/E36/E39`; `I3` con muchos códigos).
Ahora se usa token exacto. Tras corregirlo, **los huecos siguen siendo los mismos 9**, así que no había ninguno oculto.

## 3. Pendiente de decidir contigo
- ¿Las versiones de batalla larga para China (U12, G48, NA6, NA8, G73) deben tener ficha propia o fusionarse con su chasis base como "variante"?
- El 505 es un prototipo con 2 unidades: ¿se incluye en el catálogo principal o en una sección "Prototipos y conceptos"?

> Nota: las búsquedas web se contradicen en algún punto (p. ej. G70/G73). Por eso los marco ⚠️ en lugar de darlos por buenos.
