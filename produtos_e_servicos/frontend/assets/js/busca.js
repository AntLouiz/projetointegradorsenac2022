$(document).ready(() => {
    const inputBusca = $('#busca')
    const resultadosDaBusca = $('#resultados-busca')

    inputBusca.keyup(e => {
        const termo = e.target.value
        resultadosDaBusca.empty()

        if (!termo) {
            resultadosDaBusca.empty()
            return
        }

        carregaBusca(true)
        obtemProdutosEServicos(resultadosDaBusca, termo)
    })

    $('#fecharModal').click(() => {
        $('#exampleModalCenter').modal('hide')
        $('.modal-body').empty()
    })
})


const obtemProdutosEServicos = _.debounce(function (resultadosDaBuscaContainer, termo) {
    $.get(`busca?termo=${termo}`, function (data) {
        const dados = JSON.parse(data) || []
        const itens = dados.map(produtoOuServico => {
            const dadosProdutoOuServico = produtoOuServico.fields
            const tipo = produtoOuServico.model.split('.')[1] === 'produto' ? 'P' : 'S'
            return obtemItemBusca(produtoOuServico.pk, dadosProdutoOuServico.nome, dadosProdutoOuServico.descricao, dadosProdutoOuServico.imagem, tipo)
        })
        resultadosDaBuscaContainer.empty()

        carregaBusca(false)
        resultadosDaBuscaContainer.append(itens)
    })
}, 250)


$('#exampleModalCenter').on('show.bs.modal', e => {
    const id = e.target.getAttribute('data-id')
    const tipo = e.target.getAttribute('data-tipo')
    console.log(tipo)
    const url = tipo === 'P' ? `produtos` : `servicos`

    $.get(`${url}/${id}`, function (data) {
        const dados = JSON.parse(data)
        $('#chamar-no-whats').click(() => {
            window.open(`https://wa.me/${dados.anunciante.telefone}`)
        })

        insereConteudoModal(dados)
    })
})


const carregaBusca = carregando => {
    const loader = $('#resultados-loader')
    if (carregando) {
        loader.removeClass('desabilitado')
    } else {
        if (loader.hasClass('desabilitado')) return
        loader.addClass('desabilitado')
    }
}


const obtemItemBusca = (itemId, nome, descricao, urlImagemAnuncio, tipo) => {
    const item = $(`
        <li class="listing-item item-resultado" data-toggle="modal" data-target="#exampleModal">
            <div class="listing-content">
                <div class="listing-author">
                    <img src="${urlImagemAnuncio ? `media/${urlImagemAnuncio}`: "media/img/listing/no-photo-available.png"}" alt="">
                    <h6>${nome}</h6>
                    <span>${descricao}</span>
                </div>
            </div>
        </li>
    `)

    item.click(() => {
        $('#exampleModalLongTitle').html(`${nome}`)
        $('#exampleModalCenter').attr('data-id', itemId)
        $('#exampleModalCenter').attr('data-tipo', tipo)
        $('#exampleModalCenter').modal('show')
    })

    return item
}

const insereConteudoModal = (dadosAnuncio) => {
    const modalBody = $('.modal-body')
    const conteudo = $(`
        <div class="modal-conteudo">
        <div class="dados-anunciante">
            <div class="modal-listing-info listing-info">
            <div class="listing-bottom">
                <div class="listing-author">
                    <h6>${dadosAnuncio.anunciante.nome}</h6>
                    <img src="${dadosAnuncio.anunciante.imagem}" alt="">
                </div>
            </div>
        </div>
            <div class="modal-descricao">${dadosAnuncio.descricao}</div>
            <div class="galeria-de-imagens">
                <img src="${dadosAnuncio.imagem}" />
            </div>
        </div>
    `)

    modalBody.html(conteudo)
}