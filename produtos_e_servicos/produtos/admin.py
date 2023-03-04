from django.contrib import admin

from produtos.models import Anunciante, Endereco, HorarioFuncionamento, Produto, Servico

# Register your models here.
admin.site.register(Produto)
admin.site.register(Servico)
admin.site.register(Anunciante)
admin.site.register(HorarioFuncionamento)
admin.site.register(Endereco)
