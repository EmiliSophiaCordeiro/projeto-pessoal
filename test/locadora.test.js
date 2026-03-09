const Locadora = require('../locadora')

describe('Testes do Sistema de Locadora', () => {
  let sistema

  beforeEach(() => {
    sistema = new Locadora()
  })

  test('1. Deve adicionar um carro com sucesso', () => {
    expect(sistema.adicionarCarro(1, 'Civic', 'Sedan')).toBe(true)
  })

  test('2. Não deve adicionar carro com dados faltando', () => {
    expect(sistema.adicionarCarro(null, 'Civic')).toBe(false)
  })

  test('3. Carro recém-adicionado deve estar disponível', () => {
    sistema.adicionarCarro(1, 'Civic', 'Sedan')
    expect(sistema.frota[0].disponivel).toBe(true)
  })

  test('4. Deve realizar aluguel e retornar contrato', () => {
    sistema.adicionarCarro(1, 'Civic', 'Sedan')
    const contrato = sistema.alugar(1, 3)
    expect(contrato.total).toBe(300)
  })

  test('5. Deve aplicar 10% de desconto para aluguéis longos (>7 dias)', () => {
    sistema.adicionarCarro(1, 'Civic', 'Sedan')
    const contrato = sistema.alugar(1, 10)
    expect(contrato.total).toBe(900)
  })

  test('6. Deve impedir aluguel de carro inexistente', () => {
    expect(sistema.alugar(99, 3)).toBeNull()
  })

  test('7. Deve impedir aluguel com dias inválidos (zero ou negativo)', () => {
    sistema.adicionarCarro(1, 'Civic', 'Sedan')
    expect(sistema.alugar(1, 0)).toBeNull()
  })

  test('8. Carro deve ficar indisponível após aluguel', () => {
    sistema.adicionarCarro(1, 'Civic', 'Sedan')
    sistema.alugar(1, 3)
    expect(sistema.frota[0].disponivel).toBe(false)
  })

  test('9. Deve calcular multa corretamente para 3 dias de atraso', () => {
    expect(sistema.calcularMulta(3)).toBe(150)
  })

  test('10. Multa deve ser zero se não houver atraso', () => {
    expect(sistema.calcularMulta(0)).toBe(0)
  })
})