"""produtos_e_servicos URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.conf import settings
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static

from produtos.views import busca_produtos_servicos, detalhe_produto, detalhe_servico, listagem_produtos, listagem_servicos
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='home'),
    path('servicos', listagem_servicos, name='servicos'),
    path('produtos', listagem_produtos, name='produtos'),
    path('busca', busca_produtos_servicos, name='busca'),
    path('produtos/<int:id>', detalhe_produto, name='detalhe_produto'),
    path('servicos/<int:id>', detalhe_servico, name='detalhe_servico')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
