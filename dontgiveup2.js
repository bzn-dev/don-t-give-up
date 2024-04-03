import { database } from './objetos.js';

// Função para fazer uma nova reserva
function novaReserva() {
    var nomeReservante = prompt('Digite aqui o seu nome ou "voltar" para voltar.');
    if (nomeReservante === 'voltar') {
        menuReserva();
    }

    var tipoQuarto = prompt("Digite o tipo de quarto desejado.\n\nTipos disponíveis:\nVIP 💎\nComum 🛏️\nDigite voltar para 'voltar' ao menu anterior 🔙");
    if (tipoQuarto === 'VIP') {
        listarQuartosDisponiveis('VIP');
    } else if (tipoQuarto === 'Comum') {
        listarQuartosDisponiveis('Comum');
    } else if (tipoQuarto === 'voltar') {
        menuReserva();
    } else {
        console.log('Tipo de quarto inválido');
        return;
    }

    var idQuarto = Number(prompt('Digite o ID do quarto desejado'));

    // Verificar se o quarto está disponível
    var quartoSelecionado = database.quartosdb.find((quarto) => quarto.id === idQuarto && quarto.disponibilidade === 1);

    if (quartoSelecionado) {
        // Reservar o quarto
        const reserva = { idQuarto, nomeReservante, tipoQuarto, idReservante };
        quartoSelecionado.disponibilidade = 0; // Marcar como indisponível
        console.log(`Quarto ${quartoSelecionado.id} reservado com sucesso para ${nomeReservante}`);
    } else {
        console.log('Quarto selecionado não está disponível ou não existe.');
    }
}

// Função para cancelar uma reserva
function cancelarReserva() {
    var idQuarto = Number(prompt('Digite o ID do quarto que deseja cancelar a reserva ou digite "voltar" para voltar ao menu anterior.'));

    // Verificar se o quarto está reservado
    var quartoSelecionado = database.quartosdb.find((quarto) => quarto.id === idQuarto && quarto.disponibilidade === 0);

    if (quartoSelecionado) {
        // Cancelar reserva
        quartoSelecionado.disponibilidade = 1; // Marcar como disponível novamente
        console.log(`Reserva do quarto ${quartoSelecionado.id} cancelada.`);
    } else if (quartoSelecionado === 'voltar') {
        menuReserva();
    } else {
        console.log('Quarto selecionado não está reservado ou não existe.');
    }
}

// Função para listar quartos disponíveis de um tipo específico
function listarQuartosDisponiveis(tipo) {
    console.clear();
    console.log(`Quartos ${tipo} disponíveis:`);
    var quartosDisponiveis = database.quartosdb.filter((quarto) => quarto.tipo === tipo && quarto.disponibilidade === 1);
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
        var opcaoReserva = prompt('O que você deseja fazer? *** seu verme ***\n1 - Reservar um Quarto 🛌\n2 - Cancelar Reserva 🚫\n3 - Ver quartos disponíveis 🏨\n4 - Voltar 🔙');

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

menuReserva();
console.log(database.reservasdb);
