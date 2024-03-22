/* import { database } from './4objetos.js';

function criarReserva() {
    while(true){
    const nomeReservante = prompt('sarta o nome')
    if(nomeReservante === 'pare'){
        break;
    }

    var idQuarto = 1;
    var checkIn = new Date(2024, 2, 22, 14, 57);
    var checkOut = new Date(2024, 2, 22, 15, 0);

    var maiorId = 0;

        for (let reserva of database.reservasdb) {
            if (reserva.id > maiorId) {
                maiorId = reserva.id;
            }
        }

        const proximoId = maiorId + 1;

    const idReserva = proximoId;

    const reserva = {idReserva, idQuarto, nomeReservante, checkIn, checkOut}
    database.reservasdb.push(reserva);
    console.clear();
    console.log('Aqui está a lista de quartos:\n\n')

    database.reservasdb.forEach(reserva => {
        console.log(`ID: ${reserva.idReserva}, Quarto: ${reserva.idQuarto}, Nome: ${reserva.nomeReservante} CheckIn: ${checkIn}, CheckOut: ${checkOut}`);
    });
  }
}


criarReserva()
 */

console.log(new Date(2024, 2, 17, 16, 38))

