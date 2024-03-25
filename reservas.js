var database = {
    quartosdb: [{ id: 1, tipo: 'VIP', descricao: 'Quarto VIP: Espaçoso, confortável e com vista panorâmica.' }],
    reservasdb: [{}]
}

function criarReserva() {
    while (true) {
        const nomeReservante = prompt('sarta o nome')
        if (nomeReservante === 'pare') {
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

        const reserva = { idReserva, idQuarto, nomeReservante, checkIn, checkOut }
        database.reservasdb.push(reserva);
        console.clear();
        console.log('Aqui está a lista de quartos:\n\n')

        database.reservasdb.forEach(reserva => {
            console.log(`ID: ${reserva.idReserva}, Quarto: ${reserva.idQuarto}, Nome: ${reserva.nomeReservante} CheckIn: ${checkIn}, CheckOut: ${checkOut}`);
        });
    }
}



var dataInput = prompt('Digite a data da sua entrada (check in)\n\nAno/mês/dia')
var dataInputFormat = dataInput.split('/')

var dia = parseInt(dataInputFormat[2]);
var mes = parseInt(dataInputFormat[1] - 1);
var ano = parseInt(dataInputFormat[0]);

var checkIn = new Date(ano, mes, dia, 8, 0)
var checkOut
var now = new Date()


// console.log(checkIn)
// console.log(dataInputFormat)

if (checkIn < now) {
    console.log('Data inválida!')
}
else {
    console.log('Data válida')
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000); // 60000 milissegundos = 1 minuto
}


// console.log(now)

