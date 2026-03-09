class locadora {
  constructor() {
    this.frota = []
    this.alugueis = []
  }

  adicionarCarro(id, modelo, categoria) {
    if (!id || !modelo || !categoria) return false
    this.frota.push({ id, modelo, categoria, disponivel: true })
    return true
  }

  alugar(id, dias) {
    const carro = this.frota.find(c => c.id === id)
    if (!carro || !carro.disponivel || dias <= 0) return null

    carro.disponivel = false
    
    let precoDiaria = carro.categoria === 'SUV' ? 150 : 100
    let total = precoDiaria * dias

    if (dias > 7) total *= 0.9

    const contrato = { idCarro: id, dias, total, status: 'ativo' }
    this.alugueis.push(contrato)
    return contrato
  }

  calcularMulta(diasAtraso) {
    if (diasAtraso <= 0) return 0
    return diasAtraso * 50
  }
}

module.exports = locadora