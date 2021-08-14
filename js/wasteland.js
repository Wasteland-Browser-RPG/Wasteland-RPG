function statValueRoller(){
    let dTenOne = Math.ceil(Math.random()*10);
    let dTenTwo = Math.ceil(Math.random()*10);
    let dTenThree = Math.ceil(Math.random()*10);
    console.log(dTenOne + " " + dTenTwo + " " + dTenThree);
    if(dTenOne <= dTenTwo && dTenOne <= dTenThree){
        return dTenTwo+dTenThree;
    } else if (dTenTwo <= dTenThree && dTenTwo <= dTenOne){
        return dTenOne+dTenThree;
    } else {
        return dTenOne+dTenTwo;
    }
}
var player = {
    PunchGood: 25+statValueRoller(),
    ShootGood: 25+statValueRoller(),
    Toughness: 25+statValueRoller(),
    Agility: 25+statValueRoller(),
    //setting an object property in it's instantiation to be based on another property doesn't work so we gotta make a getter function
    //https://stackoverflow.com/questions/4616202/self-references-in-object-literals-initializers
    get Move() { delete this.Move;
        return this.Move = Math.floor(player.Agility/10 * 2);
        },
    get HP(){ delete this.HP;
        return this. HP = Math.floor(player.Toughness/10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
        },
    get meleeDamageBonus(){
        delete this.meleeDamageBonus;
        return this. meleeDamageBonus = Math.floor(player.PunchGood/10);
    }
}
console.log(player.HP);
console.log(player.Move);
console.log(player.meleeDamageBonus);

var nineMil = {
    magSize: 12,
    damage (){
        return 1 + Math.floor(Math.random()+10)
    },
    multiAttack: 3
}