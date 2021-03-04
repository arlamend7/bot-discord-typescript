const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];

interface Date {
    EmailDate() : string
    BrazilDate() : string
}

Date.prototype.EmailDate = function (){
    return (this.getDate() + " " + meses[(this.getMonth())] + " " + this.getFullYear())
}
Date.prototype.BrazilDate = function (){
    return adicionaZero(this.getDate())  + "/" + adicionaZero(this.getMonth() + 1) + "/" + this.getFullYear(); 
}
function adicionaZero(numero){
    if (numero <= 9) 
        return "0" + numero;
    else
        return numero; 
}