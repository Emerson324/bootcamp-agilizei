#language: pt
Funcionalidade: Listagem

    Como um usuário, desejo acessar a Listagem
    Para que possa visualizar meus dados de cadastro

Cenario: Listagem sem registros
    Dado que o site não possui registros
    Quando acessar a listagem 
    Então devo visualizar a listagem vazia

Cenario: Listagem com registros
    Dado que o site possui apenas um registros
    Quando acessar a listagem
    Então devo visualizar apenas um registro 