# App

dr-luana-api

## RFs (Requisitos funcionais)

paciente:

- [x] Deve ser possivel cadastrar um paciente

-[x] refactor model: {
full name: string
cpf: string
Rg: string
data de nacimento: sgring
telefone: string
observações: string
sexo: string
plano: string
numero da carteirinha: int
cep: string
rua: string
bairro: string
cidade: string
estado: string
numero: int
complemento: string

}

- [x] Deve ser possivel editar os dados de um paciente
- [x] Deve ser possivel ver os pacientes cadastrados

Profissionais:

- [x] Deve ser possivel cadastrar
- [x] Deve ser possivel autenticar
- [x] Deve ser possivel ver detalhes

Agendamentos:

- [x] Deve ser possivel cadastrar um agendamento
- [x] Deve ser possivel ver agendamentos por data e convenio
- [x] Deve ser possivel editar os dados do agendamento
- [x] Deve ser possivel cancelar um agendamento
- [x] Deve ser possivel ver detalhes de um agendamento (id=[paciente])
- [] Dever ser possivel editar o status de um agendamento (tipos=[em espera, em atendimento, finalizado, faltou, cancelado])
- [x] Dever ser possivel filtrar agendamentos do dia ou semana de um profissional

Procedimento:

- [x] Deve ser possivel cadastrar um procedimento
- [x] Deve ser possivel editar um procedimento do tipo recorrente

Tratamentos: -sabado

-[] Deve ser possivel criar um tratamento
-[] Deve ser possivel editar um tratamento
-[] Deve ser possivel alterar o status de um tratamento
-[] Deve ser possivel jogar imprimir um tratamento

Orçamento:

-[x] Deve ser possivel registrar um orçamento

-[x] Deve ser possivel editar um orçamento

## RNs (Regras de negócio)

Profissionais:

- [x] Ao castrar deve-se perguntar se é um dentista ou não

Agendamentos:

- [x] Não pode editar a "data" do agendamento
- [] Agendamentos cancelados não podem ser perdidos

Tratamento:
-[] Ele fica veinculado a um orçamento

Paciente:
-[] Deve verificar se o cpf é unico, assim como RG
