from django.http import Http404
from django.shortcuts import render


def product_detail(request, slug: str):
	"""
	Renderiza una página de detalle del producto con metadatos Open Graph
	para que WhatsApp genere el preview al compartir el enlace.
	"""
	catalog = {
		"reserva-oro": {
			"title": "Reserva Oro",
			"description": "Blend premium de origen único, notas de cacao y nuez.",
			"price": "Q 18.00",
			"image": "reserva-oro.jpg",
		},
		"selva-intensa": {
			"title": "Selva Intensa",
			"description": "Tostado medio con acidez brillante y final sedoso.",
			"price": "Q 16.00",
			"image": "selva-intensa.jpg",
		},
		"cumbre-espresso": {
			"title": "Cumbre Espresso",
			"description": "Cuerpo alto, crema generosa y notas de caramelo quemado.",
			"price": "Q 19.00",
			"image": "cumbre-espresso.jpg",
		},
	}

	data = catalog.get(slug)
	if not data:
		raise Http404("Producto no encontrado")

	product_url = request.build_absolute_uri(request.path)
	image_url = request.build_absolute_uri(f"/assets/images/{data['image']}")

	context = {
		"slug": slug,
		"title": data["title"],
		"description": data["description"],
		"price": data["price"],
		"image_url": image_url,
		"product_url": product_url,
	}

	return render(request, "product_detail.html", context)
