import { database } from './objetos.js';

// Função para fazer uma nova reserva
function novaReserva() {
    var nomeReservante = prompt('Digite aqui o seu nome ou "voltar" para voltar.');
    if (nomeReservante === 'voltar') {
        return;
    }

    var tipoQuarto = prompt("Digite o tipo de quarto desejado.\n\nTipos disponíveis:\nVIP 💎\nComum 🛏️\nDigite voltar para 'voltar' ao menu anterior 🔙");
    if (tipoQuarto === 'voltar') {
        return;
    }

    // Verificar se o tipo de quarto é válido
    if (tipoQuarto !== 'VIP' && tipoQuarto !== 'Comum') {
        console.clear();
        console.log('Tipo de quarto inválido.');
        return;
    }

    // Listar quartos disponíveis apenas do tipo selecionado
    listarQuartosDisponiveis(tipoQuarto);

    // Pedir o ID do quarto do usuário
    var idQuarto = Number(prompt('Digite o ID do quarto desejado'));

    // Verificar se o quarto está disponível e do tipo selecionado
    var quartoSelecionado = database.quartosdb.find((quarto) => quarto.id === idQuarto && quarto.disponibilidade === 1 && quarto.tipo === tipoQuarto);

    if (quartoSelecionado) {
        // Reservar o quarto
        quartoSelecionado.disponibilidade = 0; // Marcar como indisponível
        database.reservasdb.push({ idQuarto, nomeReservante, tipoQuarto });
        console.log(`Quarto ${idQuarto} reservado com sucesso para ${nomeReservante}.`);
    } else {
        console.log('Quarto selecionado não está disponível ou não corresponde ao tipo escolhido.');
    }
}

// Função para cancelar uma reserva
function cancelarReserva() {
    var idQuarto = Number(prompt('Digite o ID do quarto que deseja cancelar a reserva.'));

    // Verificar se o quarto está reservado
    var reservaParaCancelar = database.reservasdb.find((reserva) => reserva.idQuarto === idQuarto);

    if (reservaParaCancelar) {
        // Cancelar reserva
        const quartoSelecionado = database.quartosdb.find((quarto) => quarto.id === idQuarto);
        quartoSelecionado.disponibilidade = 1; // Marcar como disponível novamente
        const indexReserva = database.reservasdb.indexOf(reservaParaCancelar);
        database.reservasdb.splice(indexReserva, 1);
        console.log(`Reserva do quarto ${idQuarto} cancelada.`);
    } else {
        console.log('Você não tem uma reserva para esse quarto ou o ID do quarto está incorreto.');
    }
}

// Função para listar quartos disponíveis de um tipo específico
function listarQuartosDisponiveis(tipo) {
    console.clear();
    console.log(`Quartos ${tipo} disponíveis:`);
    const quartosDisponiveis = database.quartosdb.filter((quarto) => quarto.tipo === tipo && quarto.disponibilidade === 1);
    if (quartosDisponiveis.length === 0) {
        console.log('Nenhum quarto disponível.');
    } else {
        quartosDisponiveis.forEach((quarto) => {
            console.log(`ID: ${quarto.id}, Descrição: ${quarto.descricao}`);
        });
    }
}

// Função para ver todos os quartos disponíveis
function listarTodosQuartosDisponiveis() {
    console.clear();
    console.log('Todos os quartos disponíveis:');
    database.quartosdb.forEach((quarto) => {
        if (quarto.disponibilidade === 1) {
            console.log(`ID: ${quarto.id}, Tipo: ${quarto.tipo}, Descrição: ${quarto.descricao}`);
        }
    });
}

// Menu de reserva
function menuReserva() {
    while (true) {
        var opcaoReserva = prompt('O que você deseja fazer?\n1 - Reservar um Quarto 🛌\n2 - Cancelar Reserva 🚫\n3 - Ver quartos disponíveis 🏨\n4 - Voltar 🔙');

        switch (opcaoReserva) {
            case '1':
                novaReserva();
                break;
            case '2':
                cancelarReserva();
                break;
            case '3':
                listarTodosQuartosDisponiveis();
                break;
            case '4':
                return; // Voltar
            default:
                console.log('Opção inválida.');
                break;
        }
    }
}

// Executar menu de reserva
menuReserva();

// Exibir registros de reservas
console.log(database.reservasdb);
