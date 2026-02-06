"""
URL configuration for cafe project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from landingcafe.views import product_detail
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    # Ruta principal: renderiza la landing en index.html
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
    # Detalle de producto con metadatos Open Graph para WhatsApp preview
    path('p/<slug:slug>/', product_detail, name='product_detail'),
]

# Servir assets de la landing directamente en desarrollo
urlpatterns += static('css/', document_root=settings.BASE_DIR / 'landing-cafe' / 'css')
urlpatterns += static('js/', document_root=settings.BASE_DIR / 'landing-cafe' / 'js')
urlpatterns += static('assets/images/', document_root=settings.BASE_DIR / 'landing-cafe' / 'assets' / 'images')
