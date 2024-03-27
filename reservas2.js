
//----------------------------------------------------------------------------------
var dataInicial //variável que será calculada na função digitarDataInicial
var dataFinal //variável que será calculada na função digitarFinal

var ano=0 //variáveis que serão digitadas no prompt
var mes=0
var dia=0
var hora=0
var minuto=0

//-------------------------------------------------------------------------------------
var idRes=0 //variável que será um número único para identificar uma reserva
function novoIdRes() { //função para perguntar se o usuário quer criar uma reserva, incrementa o idRes e chama a função digitarDataInicial
    var desejaRes=prompt ("Deseja realizar uma nova reserva? Digite 's' ou 'S' para SIM ou qualquer tecla para cancelar")
    if (desejaRes==='s' || desejaRes==='S') {idRes=idRes+1; //incrementa o idRes do objeto reserva e...
    digitarDataInicial(); //...chama a função digitarDataInicial
    } 
    else {console.log('FIM')}; //executar aqui uma função ou voltar ao menu anterior
return idRes
}

//------------------------------------------------------------------------------------------------------------
idRes=novoIdRes() //chama a função novoIdRes (acima)
//------------------------------------------------------------------------------------------------------------

function digitarDataInicial (ano,mes,dia,hora,minuto){ //função para receber data e hora do início da reserva 
    
    var dataInicialTest = prompt('Digite aqui a data da sua entrada (check-in)\n\nAno/mês/dia');
    var dataInicialFormat = dataInicialTest.split('/')

    var ano = parseInt(dataInicialFormat[0]);
    var mes = parseInt(dataInicialFormat[1]);
    var dia = parseInt(dataInicialFormat[2]);
    // -
    var horaInicialTest = prompt('Digite aqui o horário da sua entrada (check-in)\n\nHora:minuto');
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
    
}; //fim da função digitarDataInicial

//-----------------------------------------------------------------------------------------------------
//console.log(dataInicial)//PARA TESTE, APAGAR DEPOIS
//-----------------------------------------------------------------------------------------------------



//APAGAR ESSAS LINHAS ABAIXO DEPOIS (var horaTesteIni)---------------------------------------------------------------------------------------------------------------------
var horaTesteIni=new Date (2024,3-1,21,7,0); //var de horário inicial de reserva existente para teste. APAGAR DEPOIS! A função testeDataInicial deverá procurar horários do mesmo quarto no banco de dados (usando for para percorrer todo o array de objetos)
var dataBRTesteIni=(horaTesteIni.toLocaleDateString('pt-BR')); //altera data e hora para formato BR 
var horaBRTesteIni=(horaTesteIni.toLocaleTimeString('pt-BR'));

var horaTesteFin=new Date (2024,3-1,21,12,0); //var de horário final de reserva existente para teste. APAGAR DEPOIS! A função testeDataFinal deverá procurar horários do mesmo quarto no banco de dados (usando for para percorrer todo o array de objetos)
var dataBRTesteFin=(horaTesteFin.toLocaleDateString('pt-BR')); //altera data e hora para formato BR 
var horaBRTesteFin=(horaTesteFin.toLocaleTimeString('pt-BR'));
//APAGAR ESSAS LINHAS ACIMA DEPOIS var horaTesteFin----------------------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------------------------------------------------
testeDataInicial () //chama a função testeDataInicial (abaixo)
//-------------------------------------------------------------------------------------------------------------------------------------------------
//ALTERAR A FUNÇÃO ABAIXO CONFORME AS SEGUINTES OBSERVAÇÕES
function testeDataInicial () { //função que testa se a hora inicial digitada é compatível com reservas existentes
while(dataInicial>=horaTesteIni && dataInicial<=horaTesteFin) 
{alert(`Selecione um horário de início antes das ${horaBRTesteIni} do dia ${dataBRTesteIni} ou após às ${horaBRTesteFin} do dia ${dataBRTesteFin}`); 
//talvez seja necessário simplificar a mensagem acima (pois vai haver várias reservas no array de objetos) aí vai ficar muito complicado acredito, talvez trocar por "HORÁRIO RESERVADO, TENTE OUTRO" ou algo assim
dataInicial=0; //zera a data inicial antes de ela ser digitada novamente
digitarDataInicial()} //repete a função para o usuário escolher um horário livre
if(dataInicial<horaTesteIni || dataInicial>horaTesteFin){digitarDataFinal()} //se o horário de início está ok, pode-se digitar o horário de saída
//vai ter que mudar esta função para procurar horários do mesmo quarto no banco de dados, usando for
//trocar horaTesteIni por algo do tipo reservas[i]... e trocar horaTesteFin por reservas[i]... RAFAEL, NÃO SEI COMO FAZER, MAS ACHO QUE USA for!!!
}
//o início da nova reserva deverá ser ANTES DO INÍCIO ou APÓS O FINAL de uma EXISTENTE do mesmo quarto
//deverá ser usado um comando 'for' para percorrer os horários de início e fim de todas as reservas EXISTENTES do mesmo quarto


//------------------------------------------------------------------------------------------------------------------------------------------------
//console.log(dataInicial)//PARA TESTE, APAGAR DEPOIS
//------------------------------------------------------------------------------------------------------------------------------------------------

function digitarDataFinal (ano,mes,dia,hora,minuto){ //função para receber data e hora do final da reserva 
    

    var dataFinalTest = prompt('Digite aqui a data da sua entrada (check-in)\n\nAno/mês/dia');
    var dataFinalFormat = dataFinalTest.split('/')

    var ano = parseInt(dataFinalFormat[0]);
    var mes = parseInt(dataFinalFormat[1]);
    var dia = parseInt(dataFinalFormat[2]);
    // -
    var horaFinalTest = prompt('Digite aqui o horário da sua entrada (check-in)\n\nHora:minuto');
    var horaFinalFormat = horaFinalTest.split(':');

    var hora = parseInt(horaFinalFormat[0]);
    var minuto = parseInt(horaFinalFormat[1]);
    
    mes=mes-1 //porque 0 é jan e 11 é dez
    var dataSaida=new Date (ano,mes,dia,hora,minuto) //Cria uma instância de data (FINAL)
    dataSaida.getFullYear(ano); //retorna o ano da data especificada (FINAL)
    dataSaida.setMonth(mes); //atribui o mês para uma data específica (FINAL)
    dataSaida.setDate(dia); //atribui o dia do mês pra uma data específica (FINAL)
    dataSaida.setHours(hora); //atribui as horas para uma data especificada (FINAL)
    dataSaida.setMinutes(minuto); //atribui os minutos para uma data específica (FINAL)
    dataFinal=dataSaida ; //resultado da função para ser usada depois no objeto 'reseva' no formato completo de data (Tue Mar 19 2024 18:48:23 GMT-0300 (GMT-03:00))
    testeDataFinal () //...chama a função testeDataFinal para conferir se o horário final da reserva é compatível com reservas existente
    //...ou usar dataFinal (ver abaixo), fazer um return de dataFinal no final da função checkOut???
};
    
//-----------------------------------------------------------------------------------------------------
//console.log(dataFinal)//PARA TESTE, APAGAR DEPOIS
//-----------------------------------------------------------------------------------------------------    


//ALTERAR A FUNÇÃO ABAIXO CONFORME AS SEGUINTES OBSERVAÇÕES
function testeDataFinal () { //função que testa se a hora final digitada é compatível com reservas existentes
while((dataFinal>=horaTesteIni && dataFinal<=horaTesteFin) || dataFinal<=dataInicial) 
{alert(`Selecione um horário final após a hora inicial ${dataInicial} e: antes das ${horaBRTesteIni} do dia ${dataBRTesteIni} ou após às ${horaBRTesteFin} do dia ${dataBRTesteFin}`);
//talvez seja necessário simplificar a mensagem acima (pois vai haver várias reservas no array de objetos) aí vai ficar muito complicado acredito, talvez trocar por "HORÁRIO RESERVADO, TENTE OUTRO" ou algo assim
dataFinal=0; //zera a data final antes de ela ser digitada novamente
digitarDataFinal()} //repete a função para o usuário escolher um horário livre

}//o final da nova reserva deverá ser após o início dela própria e ANTES DO INÍCIO ou APÓS O FINAL de uma EXISTENTE do mesmo quarto
//deverá ser usado um comando 'for' para percorrer os horários de início e fim de todas as reservas EXISTENTES do mesmo quarto

//-----------------------------------------------------------------------------------------------------
//console.log(dataFinal)//PARA TESTE, APAGAR DEPOIS
//-----------------------------------------------------------------------------------------------------    

function diaDaSemanaIniPorExtenso() { //transformar o número do dia da semana em texto (início da reserva)
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return diasDaSemana[diaSemIni]; //diaSem é um número de 0 a 6 dado por getDay
}
let diaSemIni = dataInicial.getDay(dataInicial) //getDay retorna o dia da semana para a data especificada (número de 0 a 6, sendo 0 o domingo) e passa para a var para ser usado na função que retora o nome do dia da semana
const diaDaSemanaIni = diaDaSemanaIniPorExtenso(dataInicial); //cria a variável com o nome do dia da semana por extenso a partir do resultado da função para depois ser exibido ao usuário
var dataBRIni=(dataInicial.toLocaleDateString('pt-BR')); //variável com a data no formato dd/mm/aaaa para ser exibida ao usuário
var horaBRIni=(dataInicial.toLocaleTimeString('pt-BR')); //variável com a hora no formato hh:mm:ss para ser exibida ao usuário

console.log(`Sua reserva inicia no(a) ${diaDaSemanaIni}, ${dataBRIni}, às ${horaBRIni}`); //exibe a data e hora do início da reserva

//------------------------------------------------------------------------------------------------------------------------------------------------------------
function diaDaSemanaFinPorExtenso() { //transformar o número do dia da semana em texto (final da reserva)
    const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    return diasDaSemana[diaSemFin]; //diaSem é um número de 0 a 6 dado por getDay
}
let diaSemFin = dataFinal.getDay(dataFinal) //getDay retorna o dia da semana para a data especificada (número de 0 a 6, sendo 0 o domingo) e passa para a var para ser usado na função que retora o nome do dia da semana
const diaDaSemanaFin = diaDaSemanaFinPorExtenso(dataFinal); //cria a variável com o nome do dia da semana por extenso a partir do resultado da função para depois ser exibido ao usuário
var dataBRFin=(dataFinal.toLocaleDateString('pt-BR')); //variável com a data no formato dd/mm/aaaa para ser exibida ao usuário
var horaBRFin=(dataFinal.toLocaleTimeString('pt-BR')); //variável com a hora no formato hh:mm:ss para ser exibida ao usuário
//------------------------------------------------------------------------------------------------------------------------------------------------------------
console.log(`Sua reserva termina no(a) ${diaDaSemanaFin}, ${dataBRFin}, às ${horaBRFin}`); //exibe a data e hora do final da reserva

//-------------------------------------------------------------------------------------
    
    var reservas=[ //array q vai armazenar os objetos das reservas (ou substituir por uma classe do Rafael?)
    { 
        
        numeroReserva: 0, //este 1º objeto do array será copiado para criar as novas reservas
        numeroQuarto: 0, // 
        horaInicial: 0, //
        horaFinal: 0 //
    },
    
    ];
    
//---------------------------------------------------------------------------------
    
    
    //function reservaNova (){ //cria um novo objeto de reserva dentro do array reservas e altera as informações da nova (NÃO CONSEGUI FAZER FUNCIONAR QUANDO COLOCO ESTES COMANDOS ABAIXO DENTRO DA FUNÇÃO)
    //RAFAEL, substiuir as linhas abaixo por comando que salvam em uma classe!?
    var novaReserva={...reservas[0]};//incrementar aqui o idRes e adicionar mais um objeto ao array reservas
    novaReserva.numeroReserva=idRes;
    novaReserva.numeroQuarto='Quarto.id'; //ALTERAR AQUI! deve puxar da classe 'Quarto' do Rafael (ver como fazer).
    novaReserva.horaInicial=dataInicial; //puxa da função 'digitarDataInicial' 
    novaReserva.horaFinal=dataFinal;  //puxa da função 'digitarDataFinal' 
    //console.log(idRes) //exibe o número da reserva (é só pra teste, pode-se apagar esta linha depois)
//return novaReserva
//} 

//-----------------------------------------------------------------------------------------------------------

//var novaReserva=reservaNova() //chama a função (SE ELA FOR CRIADA)
console.log(novaReserva) //exibe o conteúdo da nova reserva (é só pra teste, pode-se apagar esta linha depois)
reservas.push(novaReserva) //adiciona a nova reserva ao array reservas (COLOCAR ESTE COMANDO DENTRO DA FUNÇÃO reservaNova???)
console.log(reservas) //exibe o conteúdo do array reservas (é só pra teste, pode-se apagar esta linha depois)
console.log(`A sua reserva é a de Nº ${reservas[idRes].numeroReserva} e o seu quarto é o ${reservas[idRes].numeroQuarto}`)    //exibe o número da reserva e o quarto (VER EXATAMENTE COMO FAZER ISSO!!!)

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

//AQUI: VOLTAR PARA O MENU ANTERIOR OU PERGUNTAR SE QUER FAZER MAIS UMA RESERVA