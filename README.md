# Landing Café

Proyecto Django para una landing de café.

## Estructura

- `cafe/`: configuración del proyecto Django
- `landingcafe/`: app principal

## Requisitos

- Python 3.10+
- Django (instalado)
- Git

## Desarrollo local

```bash
# Activar entorno si aplica
# python -m venv .venv && .venv\\Scripts\\activate
# ngrog http 8000 tunel de pruebas
# Ejecucion para pruebas python manage.py runserver 8000

# Instalar dependencias
pip install django

# Migraciones y servidor
python manage.py migrate
python manage.py runserver
```

## Publicación en GitHub

El repo se inicializa y se hace push a `main`. Consulta abajo los pasos.
