import { Reserva, Quarto } from './3classes.js';
import JsonHandler from './4JsonHandler.js';

const jsonHandler = new JsonHandler('http://localhost:3000/ler', 'http://localhost:3000/escrever');



jsonHandler.lerArquivoJson((error, json) => {
    if (error) {
        console.error('Erro ao ler arquivo JSON:', error);
        return;
    }

    console.log('Conteúdo do arquivo JSON:', json);

    // Verificar quantos quartos existem no JSON
    const numQuartos = json.quartos ? json.quartos.length : 0;

    // Adicionar um novo quarto sequencialmente
    const novoQuarto = new Quarto(numQuartos + 1, 'VIP', 'Quarto VIP: Espaçoso e confortável.');
    if (!json.quartos) {
        json.quartos = [];
    }
    json.quartos.push(novoQuarto);

    // Escrever os dados atualizados de volta no arquivo JSON
    jsonHandler.escreverArquivoJson(json, (error) => {
        if (error) {
            console.error('Erro ao escrever arquivo JSON:', error);
            return;
        }
        console.log('Novo quarto adicionado com sucesso!');
    });
});


// function lerQuartos() {
//     jsonHandler.lerArquivoJson((error, json) => {
//         if (error) {
//             console.error('Erro ao ler arquivo JSON:', error);
//             return;
//         }

//         console.log('Conteúdo do arquivo JSON:', json);
//     });
// }

// lerQuartos();


// var opcaoMenu = Number(
//     prompt('Bem-vindo ao Hotel Suicidio Proibido! 💀 \n\nDigite abaixo o que deseja fazer ou digite sair:\n\n1 - Reservar um quarto 🛌\n2 - Relatar um problema 🚨\n3 - Cometer suicídio e pagar a multa no valor de R$999.999,00 🩸⚰️💸')
// );

// if (opcaoMenu == 1) {
//     adicionarQuarto();
// } else if (opcaoMenu == 2) {
//     console.log('Vamos fingir que você não tentou fazer isso e privar-lhe da morte por enquanto.');
// } else if (opcaoMenu == 3) {
//     console.log('Você morreu e nos deve agora R$999.999,00');
// } else {
//     console.log('Seu suicídio não se concluirá aqui, vá embora!');
// }

// function adicionarQuarto() {
//     var tipo = prompt('Digite o tipo de quarto desejado: VIP || COMUM');
//     var descricao = '';
//     switch (tipo) {
//         case 'VIP':
//             descricao = 'Quarto VIP: Espaçoso, confortável e com vista panorâmica.';
//             break;
//         case 'COMUM': // Alterado de 'Comum' para 'COMUM' para corresponder ao objeto JSON
//             descricao = 'Quarto Comum: Simples e confortável.';
//             break;
//         default:
//             console.log('Tipo de quarto inválido.');
//             return;
//     }


//     jsonHandler.lerArquivoJson((error, json) => {
//         if (error) {
//             console.error('Erro ao ler arquivo JSON:', error);
//             return;
//         }

//         console.log('Conteúdo do arquivo JSON:', json);

//         // Verificar se há quartos no JSON e adicionar um novo quarto
//         const novoQuarto = new Quarto(json.quartos ? json.quartos.length + 1 : 1, tipo, descricao);

//         if (json.quartos) {
//             json.quartos.push(novoQuarto);
//         } else {
//             json.quartos = [novoQuarto];
//         }

//         // Escrever os dados atualizados de volta no arquivo JSON
//         jsonHandler.escreverArquivoJson(json, (error) => {
//             if (error) {
//                 console.error('Erro ao escrever arquivo JSON:', error);
//                 return;
//             }
//             console.log('Novo quarto adicionado com sucesso!');
//         });
//     });

//     console.log('Quarto adicionado com sucesso.');
// }

