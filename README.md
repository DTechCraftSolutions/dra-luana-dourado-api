# App

dr-luana-api

## RFs (Requisitos funcionais)

paciente:

- [x] Deve ser possivel cadastrar um paciente
- [x] Deve ser possivel editar os dados de um paciente

Profissionais:

- [x] Deve ser possivel cadastrar
- [x] Deve ser possivel autenticar
- [x] Deve ser possivel ver detalhes

Agendamentos:

- [] Deve ser possivel cadastrar um agendamento
- [] Deve ser possivel ver agendamentos por data e convenio
- [] Deve ser possivel editar os dados do agendamento
- [] Deve ser possivel cancelar um agendamento

Procedimento:

- [] Deve ser possivel cadastrar um procedimento
- [] Deve ser possivel editar um procedimento do tipo recorrente

## RNs (Regras de negócio)

Profissionais:

- [x] Ao castrar deve-se perguntar se é um dentista ou não

Agendamentos:

- [] Não pode editar a "data" do agendamento
