import { database } from './objetos.js';

function menuPrincipal() {
    while (true) {
        var opcaoMenu = Number(
            prompt(
                'Bem-vindo ao Hotel Suicidio Proibido! 💀 \n\nDigite abaixo o que deseja fazer ou digite sair:\n\n1 - Reservar um quarto 🛌\n2 - Cancelar uma reserva 🚫\n3 - Listar quartos disponíveis 🏨\n4 - Relatar um problema 🚨\n5 - Sair do hotel tranquilamente 😌'
            )
        );

        if (opcaoMenu == 1) {
            alert('função criar reserva');
            continue;
        } else if (opcaoMenu == 2) {
            alert('função cancelar reserva');
            continue;
        } else if (opcaoMenu == 3) {
            alert('função listar quartos disponíveis');
        } else if (opcaoMenu === 4) {
            alert('Vou fingir que você não fez isso');
            continue;
        } else if (opcaoMenu === 109) {
            menuAdmin();
            break;
        } else {
            alert('Faz alguma coisa direito!');
            continue;
        }
    }
}

function menuAdmin() {
    alert('São uns vermes mesmo, não acha? Pois eu acho!');
    while (true) {
        var opcaoAdmin = Number(prompt('Vai querer fazer o que...?\n\nEspero que não esqueça dos comandos como da outra vez, ou terá consequências\n\n1 - Adicionar Quarto 🛏️✅\n2 - Remover Quarto 🛏️🚫\n3 - Lista de Quartos 🏨\n4 - Voltar 💻'));

        if (opcaoAdmin === 1) {
            adicionarQuarto();
            break;
        } else if (opcaoAdmin === 2) {
            removerQuarto();
            break;
        } else if (opcaoAdmin === 3) {
            lerQuartos();
            continue;
        } else if (opcaoAdmin === 4 || opcaoAdmin === 'voltar' || opcaoAdmin === 'VOLTAR') {
            menuPrincipal();
            break;
        } else {
            continue;
        }
    }
}

function adicionarQuarto() {
    while (true) {
        var tipo = prompt('Que tipo de quarto deseja adicionar?\n\nTipos existentes:\n💎 VIP\n🛏️ Comum\n\n("pare" ou break")');
        if (tipo === 'pare' || tipo === 'PARE' || tipo === 'break' || tipo === 'BREAK') {
            menuAdmin();
            break;
        }

        var descricao = '';
        if (tipo === 'VIP' || tipo === 'vip') {
            descricao = 'Quarto VIP: Espaçoso, confortável e com vista panorâmica.';
        } else if (tipo === 'COMUM' || tipo === 'comum') {
            descricao = 'Quarto Comum: Simples e confortável.';
        } else {
            console.log('Tipo de quarto inválido!');
            continue;
        }

        var maiorId = 0;

        for (let quarto of database.quartosdb) {
            if (quarto.id > maiorId) {
                maiorId = quarto.id;
            }
        }

        const proximoId = maiorId + 1;
        const disponibilidade = 1;
        const id = proximoId;
        const quarto = { id, tipo, descricao, disponibilidade };
        database.quartosdb.push(quarto);
        console.clear();
        console.log('Quarto adicionado com sucesso! Quantidade de quartos: ', database.quartosdb.length);
    }
}

function lerQuartos() {
    console.clear();
    console.log('Aqui está a lista de quartos disponíveis:\n\n');
    database.quartosdb.forEach((quarto) => {
        if (quarto.disponibilidade === 1) {
            console.log(`ID: ${quarto.id}, Tipo: ${quarto.tipo}, Descrição: ${quarto.descricao} Disponibilidade: Disponível`);
        }
    });
}

function lerReservas() {
    console.clear();
    console.log('Aqui está a lista de quartos reservados:\n\n');
    database.quartosdb.forEach((quarto) => {
        if (quarto.disponibilidade === 0) {
            console.log(`ID: ${quarto.id}, Tipo: ${quarto.tipo}, Descrição: ${quarto.descricao} Disponibilidade: Reservado/Indisponível`);
        }
    });
}

function removerQuarto() {
    lerQuartos();

    while (true) {
        lerQuartos();
        const idRemover = Number(prompt('Qual quarto você deseja remover? (verificar lista de quartos em console.log)\n\nLembre-se, depois de removido, não tem volta, e o índice começa por 0.\n\n* 109109 para sair.'));
        if (idRemover === 109109) {
            menuAdmin();
            break;
        }
        const id = idRemover;
        if (!isNaN(id)) {
            const indexQuarto = database.quartosdb.findIndex((quarto) => quarto.id === id);
            if (indexQuarto >= 0) {
                database.quartosdb.splice(indexQuarto, 1);
                alert(`Quarto ${idRemover} removido!`);
                lerQuartos();
            } else {
                alert('Não foi encontrado um quarto com esse ID! ' + id);
            }
        } else {
            alert('Digita algo direito!');
            continue;
        }
    }
}

menuPrincipal();
