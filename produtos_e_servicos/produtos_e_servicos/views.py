from django.shortcuts import render

from produtos.models import Produto, Servico


def index(request):
    produtos = Produto.objects.all()[:2]
    servicos = Servico.objects.all()[:6]

    return render(request, 'templates/index.html', { 'produtos': produtos, 'servicos': servicos })
