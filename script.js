import { database } from './objetos.js';
import { Reserva } from './classes.js';

document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');

    // Event Listeners para cada botão
    document.getElementById('reservar').addEventListener('click', novaReserva);
    document.getElementById('cancelar').addEventListener('click', cancelarReserva);
    document.getElementById('listar').addEventListener('click', listarQuartosDisponíveis);
    document.getElementById('relatar').addEventListener('click', function () {
        alert('Vou fingir que você não fez isso');
    });
    document.getElementById('sair').addEventListener('click', function () {
        alert('Você cometeu suicídio, que peninha, estamos horrorizados com tal acontecimento!');
    });

    function novaReserva() {
        const nomeReservante = prompt('Digite o seu nome ou "voltar" para retornar ao menu.');
        if (nomeReservante === 'voltar') {
            return;
        }

        const tipoQuarto = prompt("Digite o tipo de quarto desejado:\nVIP 💎\nComum 🛏️\nDigite 'voltar' para retornar ao menu.");
        if (tipoQuarto === 'voltar') {
            return;
        }

        const tipoQuartoFormatado = tipoQuarto.toUpperCase();
        if (!['VIP', 'COMUM'].includes(tipoQuartoFormatado)) {
            alert('Tipo de quarto inválido.');
            return;
        }

        const quartosDisponiveis = database.quartosdb.filter((quarto) => quarto.tipo.toUpperCase() === tipoQuartoFormatado && quarto.disponibilidade === 1);
        if (quartosDisponiveis.length === 0) {
            alert('Nenhum quarto disponível.');
            return;
        }

        const idQuarto = Number(prompt('Digite o ID do quarto desejado'));
        const quartoSelecionado = quartosDisponiveis.find((quarto) => quarto.id === idQuarto);

        if (!quartoSelecionado) {
            alert(`Quarto selecionado não faz parte da categoria *${tipoQuartoFormatado}* ou está indisponível. Voltando à página inicial.`);
            return;
        }

        quartoSelecionado.disponibilidade = 0;
        const dataReserva = new Date();
        const reserva = new Reserva(idQuarto, nomeReservante, tipoQuartoFormatado, dataReserva);
        database.reservasdb.push(reserva);
        alert(`Quarto ${idQuarto} reservado com sucesso para ${nomeReservante}.`);
    }

    function cancelarReserva() {
        const idQuarto = Number(prompt('Digite o ID do quarto que deseja cancelar a reserva ou digite "voltar" para retornar ao menu.'));

        if (isNaN(idQuarto) || idQuarto <= 0) {
            alert('ID do quarto inválido.');
            return;
        }

        const quartoSelecionado = database.quartosdb.find((quarto) => quarto.id === idQuarto && quarto.disponibilidade === 0);

        if (!quartoSelecionado) {
            alert('Quarto selecionado não está reservado ou não existe.');
            return;
        }

        quartoSelecionado.disponibilidade = 1;
        alert(`Reserva do quarto ${idQuarto} cancelada.`);
    }

    function listarQuartosDisponíveis() {
        console.clear();
        console.log('Todos os quartos disponíveis:');
        database.quartosdb.forEach((quarto) => {
            if (quarto.disponibilidade === 1) {
                console.log(`ID: ${quarto.id}, Tipo: ${quarto.tipo}, Descrição: ${quarto.descricao}`);
            }
        });
    }
});
