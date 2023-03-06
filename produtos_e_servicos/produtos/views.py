import json
import time
from django.http import HttpResponse
from django.shortcuts import render
from django.core import serializers
from django.db.models import Q

from produtos.models import Servico, Produto

# Create your views here.
def listagem_produtos(request):
    produtos = Produto.objects.all()

    return render(request, 'templates/listagem_produtos.html', { 'produtos': produtos })

def listagem_servicos(request):
    servicos = Servico.objects.all()

    return render(request, 'templates/listagem_servicos.html', { 'servicos': servicos })


def busca_produtos_servicos(request):
    time.sleep(0.5)
    
    termo = request.GET.get('termo')
    produtos = Produto.objects.filter(Q(nome__contains=termo) | Q(descricao__contains=termo) | Q(anunciante__nome__contains=termo))
    servicos = Servico.objects.filter(Q(nome__contains=termo) | Q(descricao__contains=termo) | Q(anunciante__nome__contains=termo))


    produtos_e_servicos = serializers.serialize('json', [*produtos, *servicos])

    return HttpResponse(produtos_e_servicos)

def detalhe_produto(request, id):
    produto = Produto.objects.get(id=id)

    dados = json.dumps({
        'id': produto.id,
        'nome': produto.nome,
        'descricao': produto.descricao,
        'imagem': produto.imagem.url if produto.imagem else '',
        'anunciante': {
            'nome': produto.anunciante.nome,
            'telefone': produto.anunciante.telefone,
            'imagem': produto.anunciante.imagem.url if produto.anunciante.imagem else ''
        },
    })

    return HttpResponse(dados)

def detalhe_servico(request, id):
    servico = Servico.objects.get(id=id)

    dados = json.dumps({
        'id': servico.id,
        'nome': servico.nome,
        'descricao': servico.descricao,
        'imagem': servico.imagem.url if servico.imagem else '',
        'anunciante': {
            'nome': servico.anunciante.nome,
            'telefone': servico.anunciante.telefone,
            'imagem': servico.anunciante.imagem.url if servico.anunciante.imagem else ''
        },
    })

    return HttpResponse(dados)