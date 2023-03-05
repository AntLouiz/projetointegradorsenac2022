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
})



const obtemProdutosEServicos = _.debounce(function (resultadosDaBuscaContainer, termo) {
    $.get(`busca?termo=${termo}`, function (data) {
        const dados = JSON.parse(data) || []
        const itens = dados.map(produtoOuServico => {
            const dadosProdutoOuServico = produtoOuServico.fields
            return obtemItemBusca(dadosProdutoOuServico.nome, dadosProdutoOuServico.imagem)
        })
        resultadosDaBuscaContainer.empty()

        carregaBusca(false)
        resultadosDaBuscaContainer.append(itens)
    })
}, 250)


const carregaBusca = carregando => {
    const loader = $('#resultados-loader')
    if (carregando) {
        loader.removeClass('desabilitado')
    } else {
        if (loader.hasClass('desabilitado')) return
        loader.addClass('desabilitado')
    }
}


const obtemItemBusca = (nome, urlImagemAnunciante) => {
    const item = $(`
        <li class="listing-item">
            <div class="listing-content">
                <div class="listing-author">
                    <img src="media/${urlImagemAnunciante}" alt="">
                    <h6>${nome}</h6>
                </div>
            </div>
        </li>
    `)

    return item
}
