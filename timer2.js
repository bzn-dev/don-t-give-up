import { Reserva } from './classes.js';
import { database } from './objetos.js';

export async function novaReserva() {
    const nomeReservante = prompt('Digite o seu nome ou "voltar" para retornar ao menu.');
    if (nomeReservante === 'voltar') {
        menuReserva();
        return;
    }

    const tipoQuarto = prompt("Digite o tipo de quarto desejado:\nVIP 💎\nComum 🛏️\nDigite 'voltar' para retornar ao menu.");
    if (tipoQuarto === 'voltar') {
        menuReserva();
        return;
    }

    const tipoQuartoCapitalizado = tipoQuarto.toUpperCase();
    if (!['VIP', 'COMUM'].includes(tipoQuartoCapitalizado)) {
        alert('Tipo de quarto inválido.');
        novaReserva();
        return;
    }

    console.clear();
    const quartosDisponiveis = database.quartosdb.filter(quarto => quarto.tipo.toUpperCase() === tipoQuartoCapitalizado && quarto.disponibilidade === 1);
    console.log(`Quartos ${tipoQuartoCapitalizado} disponíveis:`);
    if (quartosDisponiveis.length === 0) {
        console.log('Nenhum quarto disponível.');
    } else {
        quartosDisponiveis.forEach(quarto => {
            console.log(`ID: ${quarto.id}, Descrição: ${quarto.descricao}`);
        });
    }

    const idQuarto = Number(prompt('Digite o ID do quarto desejado'));

    const quartoSelecionado = quartosDisponiveis.find(quarto => quarto.id === idQuarto);

    if (!quartoSelecionado) {
        alert(`Quarto selecionado não faz parte da categoria *${tipoQuartoCapitalizado}* ou está indisponível. Voltando à página inicial.`);
        novaReserva();
        return;
    }

    quartoSelecionado.disponibilidade = 0;
    const dataReserva = new Date();
    const reserva = new Reserva(idQuarto, nomeReservante, tipoQuartoCapitalizado, dataReserva);
    database.reservasdb.push(reserva);
    alert(`Quarto ${idQuarto} reservado com sucesso para ${nomeReservante}.`);

    reserva.iniciarTemporizador().then(() => {
        console.log('Tempo da reserva expirou.');
        menuReserva();
    });
}

export function cancelarReserva() {
    const idQuarto = Number(prompt('Digite o ID do quarto que deseja cancelar a reserva ou digite "voltar" para retornar ao menu.'));

    if (isNaN(idQuarto) || idQuarto <= 0) {
        alert('ID do quarto inválido.');
        menuReserva();
        return;
    }

    const quartoSelecionado = database.quartosdb.find(quarto => quarto.id === idQuarto && quarto.disponibilidade === 0);

    if (!quartoSelecionado) {
        alert('Quarto selecionado não está reservado ou não existe.');
        menuReserva();
        return;
    }

    quartoSelecionado.disponibilidade = 1;
    alert(`Reserva do quarto ${idQuarto} cancelada.`);
    menuReserva();
}

export function listarTodosQuartosDisponiveis() {
    console.clear();
    console.log('Todos os quartos disponíveis:');
    database.quartosdb.forEach(quarto => {
        if (quarto.disponibilidade === 1) {
            console.log(`ID: ${quarto.id}, Tipo: ${quarto.tipo}, Descrição: ${quarto.descricao}`);
        }
    });
    menuReserva();
}

export function menuReserva() {
    const opcaoReserva = prompt('O que você deseja fazer?\n1 - Reservar um Quarto 🛌\n2 - Cancelar Reserva 🚫\n3 - Ver quartos disponíveis 🏨\n4 - Voltar 🔙');

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
            return;
        default:
            alert('Opção inválida.');
            menuReserva();
            break;
    }
}
