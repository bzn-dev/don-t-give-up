import { database } from './objetos.js';

class Reserva {
    constructor(quarto, nomeReservante) {
        this.quarto = quarto;
        this.nomeReservante = nomeReservante;
        console.log(`Sua reserva para o quarto ${quarto.id} foi realizada com sucesso. Esta reserva tem 30 segundos de duração.`);
        this.startTimer();
    }

    startTimer() {
        let count = 30;
        const timer = setInterval(() => {
            console.log(`Tempo restante: ${count} segundos`);
            count--;
            if (count < 0) {
                clearInterval(timer);
                this.quarto.disponibilidade = 1;
                console.log(`A reserva para o quarto ${this.quarto.id} expirou. O quarto agora está disponível.`);
            }
        }, 1000);
    }
}

// Função para fazer uma nova reserva
function novaReserva() {
    const nomeReservante = prompt('Digite o seu nome ou "voltar" para retornar ao menu.');
    if (nomeReservante === 'voltar') {
        return;
    }

    const tipoQuarto = prompt("Digite o tipo de quarto desejado:\nVIP 💎\nComum 🛏️\nDigite 'voltar' para retornar ao menu.");
    if (tipoQuarto === 'voltar') {
        return;
    }

    const tipoQuartoCapitalizado = tipoQuarto.toUpperCase();
    if (!['VIP', 'COMUM'].includes(tipoQuartoCapitalizado)) {
        console.log('Tipo de quarto inválido.');
        return;
    }

    // Listar quartos disponíveis apenas do tipo selecionado
    listarQuartosDisponiveis(tipoQuartoCapitalizado);

    const idQuarto = Number(prompt('Digite o ID do quarto desejado'));

    // Verificar se o quarto está disponível e do tipo selecionado
    const quartoSelecionado = database.quartosdb.find((quarto) => quarto.id === idQuarto && quarto.disponibilidade === 1 && quarto.tipo.toUpperCase() === tipoQuartoCapitalizado);

    if (!quartoSelecionado) {
        console.log('Quarto selecionado não está disponível ou não corresponde ao tipo escolhido.');
        return;
    }

    // Reservar o quarto
    quartoSelecionado.disponibilidade = 0; // Marcar como indisponível
    new Reserva(quartoSelecionado, nomeReservante);
}

// Função para listar quartos disponíveis de um tipo específico
function listarQuartosDisponiveis(tipo) {
    console.clear();
    console.log(`Quartos ${tipo} disponíveis:`);
    const quartosDisponiveis = database.quartosdb.filter((quarto) => quarto.tipo.toUpperCase() === tipo && quarto.disponibilidade === 1);
    if (quartosDisponiveis.length === 0) {
        console.log('Nenhum quarto disponível.');
    } else {
        quartosDisponiveis.forEach((quarto) => {
            console.log(`ID: ${quarto.id}, Descrição: ${quarto.descricao}`);
        });
    }
}

// Função para cancelar uma reserva
function cancelarReserva() {
    const idQuarto = Number(prompt('Digite o ID do quarto que deseja cancelar a reserva ou digite "voltar" para retornar ao menu.'));

    if (isNaN(idQuarto) || idQuarto <= 0) {
        console.log('ID do quarto inválido.');
        return;
    }

    // Verificar se o quarto está reservado
    const quartoSelecionado = database.quartosdb.find((quarto) => quarto.id === idQuarto && quarto.disponibilidade === 0);

    if (!quartoSelecionado) {
        console.log('Quarto selecionado não está reservado ou não existe.');
        return;
    }

    // Cancelar reserva
    quartoSelecionado.disponibilidade = 1; // Marcar como disponível novamente
    console.log(`Reserva do quarto ${idQuarto} cancelada.`);
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

// Função para iniciar o novo sistema de tempo para as reservas
function iniciarSistemaDeTempo() {
    console.log('Sistema de tempo para as reservas iniciado.');
    // Adicione aqui o código para o novo sistema de tempo
}

// Menu de reserva
function menuReserva() {
    while (true) {
        const opcaoReserva = prompt('O que você deseja fazer?\n1 - Reservar um Quarto 🛌\n2 - Cancelar Reserva 🚫\n3 - Ver quartos disponíveis 🏨\n4 - Iniciar sistema de tempo para as reservas ⏲️\n5 - Voltar 🔙');

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
                iniciarSistemaDeTempo();
                break;
            case '5':
                return; // Voltar ao menu anterior

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
