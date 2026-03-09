class urna {
  constructor() {
    this.votos = { candidatoA: 0, candidatoB: 0 }
    this.encerrada = false
  }

  votar(candidato) {
    if (this.encerrada) return false
    if (this.votos[candidato] === undefined) return false

    this.votos[candidato]++
    return true
  }

  encerrarVotacao() {
    this.encerrada = true
  }

  obterVencedor() {
    if (this.votos.candidatoA > this.votos.candidatoB) return 'Candidato A'
    if (this.votos.candidatoB > this.votos.candidatoA) return 'Candidato B'
    return 'Empate'
  }
}

module.exports = urna