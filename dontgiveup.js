import { database } from "./objetos.js";

function novaReserva(){
    var nomeReservante = prompt('Digite aqui o seu nome');
    
    var tipoQuarto = prompt('Digite o tipo de quarto desejado.\n\nTipos disponíveis:\nVIP 💎\nComum 🛏️');
    if(tipoQuarto === 'VIP'){
        database.quartosdb.forEach(quarto => {
            if(quarto.tipo === 'VIP' && quarto.disponibilidade === 1){
                console.log(`ID: ${quarto.id}, Descrição: ${quarto.descricao}`)
            }

        });
    }
    if(tipoQuarto === 'Comum'){
        database.quartosdb.forEach(quarto => {
            if(quarto.tipo === 'Comum' && quarto.disponibilidade === 1){
                console.log(`ID: ${quarto.id}, Descrição: ${quarto.descricao}`)
            }
            else{
                console.log('Nenhum quarto Comum disponível.')
            }
        });
    }
    var checkIn = prompt('Digite a data da sua entrada (check-in)');
    var checkOut = prompt('Digite a data da sua saída (check-out)');
}

novaReserva()