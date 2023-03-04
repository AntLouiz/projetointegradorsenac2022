from django.shortcuts import render

from produtos.models import Servico, Produto

# Create your views here.
def listagem_produtos(request):
    produtos = Produto.objects.all()

    return render(request, 'templates/listagem_produtos.html', { 'produtos': produtos })

def listagem_servicos(request):
    servicos = Servico.objects.all()

    return render(request, 'templates/listagem_servicos.html', { 'servicos': servicos })
