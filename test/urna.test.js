const Urna = require('../urna')

describe('Testes do Sistema de Urna', () => {
  let urna

  beforeEach(() => {
    urna = new Urna()
  })

  test('1. Deve iniciar com zero votos para ambos', () => {
    expect(urna.votos.candidatoA).toBe(0)
    expect(urna.votos.candidatoB).toBe(0)
  })

  test('2. Deve computar voto para Candidato A', () => {
    expect(urna.votar('candidatoA')).toBe(true)
    expect(urna.votos.candidatoA).toBe(1)
  })

  test('3. Deve computar voto para Candidato B', () => {
    expect(urna.votar('candidatoB')).toBe(true)
    expect(urna.votos.candidatoB).toBe(1)
  })

  test('4. Não deve permitir voto em candidato inexistente', () => {
    expect(urna.votar('candidatoC')).toBe(false)
  })

  test('5. Deve declarar Candidato A como vencedor', () => {
    urna.votar('candidatoA')
    expect(urna.obterVencedor()).toBe('Candidato A')
  })

  test('6. Deve declarar Candidato B como vencedor', () => {
    urna.votar('candidatoB')
    expect(urna.obterVencedor()).toBe('Candidato B')
  })

  test('7. Deve declarar Empate se os votos forem iguais', () => {
    expect(urna.obterVencedor()).toBe('Empate')
  })

  test('8. Não deve permitir votar após encerrar a votação', () => {
    urna.encerrarVotacao()
    expect(urna.votar('candidatoA')).toBe(false)
  })

  test('9. Deve garantir que a urna inicia aberta', () => {
    expect(urna.encerrada).toBe(false)
  })

  test('10. Deve manter os votos após o encerramento', () => {
    urna.votar('candidatoA')
    urna.encerrarVotacao()
    expect(urna.votos.candidatoA).toBe(1)
  })
})