import { database } from "./objetos.js";


class Reserva1 {
    constructor(reservaID, quartoID, nomeUser, dataCheckIn, dataCheckOut) {
        this.reservaID = reservaID,
            this.quartoID = quartoID,
            this.nomeUser = nomeUser,
            this.dataCheckIn = dataCheckIn,
            this.dataCheckOut = dataCheckOut
    }
}

class Quarto {
    constructor(id, tipo, descricao) {
        this.id = id;
        this.tipo = tipo;
        this.descricao = descricao;
    }
}


// arquivo: classes.js
class Reserva {
    constructor(idQuarto, nomeReservante, tipoQuarto, dataReserva) {
        this.idQuarto = idQuarto;
        this.nomeReservante = nomeReservante;
        this.tipoQuarto = tipoQuarto;
        this.dataReserva = dataReserva;
        this.tempoRestante = 10; // Tempo em segundos (alterei para 10 segundos para teste)
    }

    iniciarTemporizador() {
        return new Promise((resolve, reject) => {
            const intervalo = setInterval(() => {
                this.tempoRestante--;

                if (this.tempoRestante === 0) {
                    this.quartoDisponivel();
                    clearInterval(intervalo);
                    resolve();
                } else {
                    console.log(`Tempo restante para a reserva: ${this.tempoRestante} segundos`);
                }
            }, 1000); // Intervalo de 1 segundo
        });
    }

    quartoDisponivel() {
        console.log(`Quarto ${this.idQuarto} disponível novamente!`);
        database.quartosdb.find((quarto) => quarto.id === this.idQuarto).disponibilidade = 1;
    }
}


export { Reserva, Quarto };