import { database } from "./objetos.js";


var dataInicial 
var dataFinal

var ano=0 
var mes=0
var dia=0
var hora=0
var minuto=0


var idRes=0
function novoIdRes() {
    var desejaRes=prompt ("Deseja realizar uma nova reserva? Digite 's' ou 'S' para SIM ou qualquer tecla para cancelar")
    if (desejaRes==='s' || desejaRes==='S') {
        idRes=idRes+1;
        digitarDataInicial();
    } 
    else {console.log('FIM')};
return idRes
}


idRes=novoIdRes()


function digitarDataInicial (ano,mes,dia,hora,minuto){ //função para receber data e hora do início da reserva 
    
    var dataInicialTest = prompt('Digite aqui a data da sua entrada (check-in)\n\naaaa/mm/dd');
    var dataInicialFormat = dataInicialTest.split('/');

    var ano = parseInt(dataInicialFormat[0]);
    var mes = parseInt(dataInicialFormat[1]);
    var dia = parseInt(dataInicialFormat[2]);
    // -
    var horaInicialTest = prompt('Digite aqui o horário da sua entrada (check-in)\n\nhh:mm');
    var horaInicialFormat = horaInicialTest.split(':');

    var hora = parseInt(horaInicialFormat[0]);
    var minuto = parseInt(horaInicialFormat[1]);
    
    mes=mes-1 //porque 0 é jan e 11 é dez
    var data=new Date (ano,mes,dia,hora,minuto) //Cria uma instância de data
    data.getFullYear(ano); //retorna o ano da data especificada 
    data.setMonth(mes); //atribui o mês para uma data específica
    data.setDate(dia); //atribui o dia do mês pra uma data específica
    data.setHours(hora); //atribui as horas para uma data especificada
    data.setMinutes(minuto); //atribui os minutos para uma data específica
    dataInicial=data ; //resultado da função para ser usada depois no objeto 'reserva' no formato completo de data, (Tue Mar 19 2024 18:48:23 GMT-0300 (GMT-03:00))
    
};

var horaTesteIni=new Date (2024,3-1,21,7,0);
var dataBRTesteIni=(horaTesteIni.toLocaleDateString('pt-BR')); 
var horaBRTesteIni=(horaTesteIni.toLocaleTimeString('pt-BR'));

var horaTesteFin=new Date (2024,3-1,21,12,0);
var dataBRTesteFin=(horaTesteFin.toLocaleDateString('pt-BR')); 
var horaBRTesteFin=(horaTesteFin.toLocaleTimeString('pt-BR'));


testeDataInicial () 

function testeDataInicial () { 
while(dataInicial>=horaTesteIni && dataInicial<=horaTesteFin) 
{alert(`Selecione um horário de início antes das ${horaBRTesteIni} do dia ${dataBRTesteIni} ou após às ${horaBRTesteFin} do dia ${dataBRTesteFin}`);

dataInicial=0;
digitarDataInicial()}
if(dataInicial<horaTesteIni || dataInicial>horaTesteFin){digitarDataFinal()}
}

function digitarDataFinal (ano,mes,dia,hora,minuto){ 

    var dataFinalTest = prompt('Digite aqui a data da sua entrada (check-in)\n\naaaa/mm/dd');
    var dataFinalFormat = dataFinalTest.split('/');

    var ano = parseInt(dataFinalFormat[0]);
    var mes = parseInt(dataFinalFormat[1]);
    var dia = parseInt(dataFinalFormat[2]);
    // -
    var horaFinalTest = prompt('Digite aqui o horário da sua saída (check-out)\n\nhh:mm');
    var horaFinalFormat = horaFinalTest.split(':');

    var hora = parseInt(horaFinalFormat[0]);
    var minuto = parseInt(horaFinalFormat[1]);
    
    mes=mes-1
    var dataSaida=new Date (ano,mes,dia,hora,minuto)
    dataSaida.getFullYear(ano);
    dataSaida.setMonth(mes);
    dataSaida.setDate(dia);
    dataSaida.setHours(hora);
    dataSaida.setMinutes(minuto);
    dataFinal=dataSaida ; 
    testeDataFinal ()
};
    



function testeDataFinal () { //- 
while((dataFinal>=horaTesteIni && dataFinal<=horaTesteFin) || dataFinal<=dataInicial) 
{alert(`Selecione um horário final após a hora inicial ${dataInicial} e: antes das ${horaBRTesteIni} do dia ${dataBRTesteIni} ou após às ${horaBRTesteFin} do dia ${dataBRTesteFin}`);
dataFinal=0;
digitarDataFinal()}
}

function diaDaSemanaIniPorExtenso() {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return diasDaSemana[diaSemIni];
}
let diaSemIni = dataInicial.getDay(dataInicial)
const diaDaSemanaIni = diaDaSemanaIniPorExtenso(dataInicial);
var dataBRIni=(dataInicial.toLocaleDateString('pt-BR')); 
var horaBRIni=(dataInicial.toLocaleTimeString('pt-BR')); 

console.log(`Sua reserva inicia no(a) ${diaDaSemanaIni}, ${dataBRIni}, às ${horaBRIni}`);


function diaDaSemanaFinPorExtenso() {
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return diasDaSemana[diaSemFin];
}
let diaSemFin = dataFinal.getDay(dataFinal)
const diaDaSemanaFin = diaDaSemanaFinPorExtenso(dataFinal);
var dataBRFin=(dataFinal.toLocaleDateString('pt-BR'));
var horaBRFin=(dataFinal.toLocaleTimeString('pt-BR'));

console.log(`Sua reserva termina no(a) ${diaDaSemanaFin}, ${dataBRFin}, às ${horaBRFin}`);  
    
    //function reservaNova (){ //cria um novo objeto de reserva dentro do array reservas e altera as informações da nova (NÃO CONSEGUI FAZER FUNCIONAR QUANDO COLOCO ESTES COMANDOS ABAIXO DENTRO DA FUNÇÃO)
    //RAFAEL, substiuir as linhas abaixo por comando que salvam em uma classe!?
    var novaReserva={...database.reservasdb[0]};//incrementar aqui o idRes e adicionar mais um objeto ao array reservas
    novaReserva.numeroReserva=idRes;
    novaReserva.numeroQuarto='Quarto.id'; //ALTERAR AQUI! deve puxar da classe 'Quarto' do Rafael (ver como fazer).
    novaReserva.horaInicial=dataInicial; //puxa da função 'digitarDataInicial' 
    novaReserva.horaFinal=dataFinal;  //puxa da função 'digitarDataFinal' 
    //console.log(idRes) //exibe o número da reserva (é só pra teste, pode-se apagar esta linha depois)
//return novaReserva
//} 



//var novaReserva=reservaNova() //chama a função (SE ELA FOR CRIADA)
console.log(novaReserva) //exibe o conteúdo da nova reserva (é só pra teste, pode-se apagar esta linha depois)
database.reservasdb.push(novaReserva) //adiciona a nova reserva ao array reservas (COLOCAR ESTE COMANDO DENTRO DA FUNÇÃO reservaNova???)
console.log(reservas) //exibe o conteúdo do array reservas (é só pra teste, pode-se apagar esta linha depois)
console.log(`A sua reserva é a de Nº ${reservas[idRes].numeroReserva} e o seu quarto é o ${reservas[idRes].numeroQuarto}`)    //exibe o número da reserva e o quarto (VER EXATAMENTE COMO FAZER ISSO!!!)


//AQUI: VOLTAR PARA O MENU ANTERIOR OU PERGUNTAR SE QUER FAZER MAIS UMA RESERVA

console.log(database.quartosdb)