textLog.value += '\nAs you are scavenging in a dilapidated corner store a hostile scavenger bursts in, sees you and attacks.';

if (player.currentHP>0 && scavenger.currentHP >0){
    textLog.value += "\nYou have 2 actions, what will you do?";
}

attackButton.addEventListener("click", attackClick);

function attackClick(){
    if(playerQueuedActions.length >1){
        return;
    }
    document.querySelector("#action-queue").innerText += attackTypeSelection.value +" attack ";
    playerQueuedActions.push(attackTypeSelection.value +" Attack");
    if (playerQueuedActions.length ===2){
        aimButton.disabled=true;
        attackButton.disabled=true;
    }
}

function aimClick(){
    if (playerQueuedActions.length >1 || attackTypeSelection.value =="Melee"){
        return;
    }
    document.querySelector("#action-queue").innerText += "Aim";
    playerQueuedActions.push("Aim");
    aimButton.disabled=true;
}

function clearActions(){
    document.querySelector("#action-queue").innerText = "";
    playerQueuedActions = [];
    if(attackTypeSelection.value =="Ranged"){
        aimButton.disabled=false;
    }
    attackButton.disabled=false;
}

function confirmActions(){
    let aiming;
    if(playerQueuedActions[0]==="Aim" || playerQueuedActions[1]==="Aim"){
        aiming=true;
    } else{
        aiming = false;
    }
    //    in this case, currently, the only other action should be a ranged attack but we will still check
    playerQueuedActions.forEach(function (action){
       if (action=="Ranged Attack"){
           rangedAttack(player, scavenger, aiming);
       }
        if (action=="Melee Attack"){
            //TODO: use meeleeAttack Function
            meleeAttack(player, scavenger, aiming);
        }
    });

    enemyTurn();
}

function enemyTurn(){
//    Todo: Write enemy turn

}

function meleeAttack(attacker, target){
    let roll = Math.floor(Math.random() * 100);
    textLog.value += "\nYou roll " + roll + " to hit.";
    if ((attacker.punchGood) >= roll){
        let damage = attacker.inventory[1].damage(attacker.meleeDamageBonus);
        textLog.value +="\n"+ attacker.name + " hit " + target.name + " for "+damage +" damage";
        target.currentHP -=damage;
        if(target.currentHP < 1){
            textLog.value +="\n"+target.name+" is deceased...";
            clearActions();
            return;
        } else {
            textLog.value +="\n"+target.name+" is still standing after your attack."
        }
    }else{
        textLog.value += "\n"+target.name+ " avoids your attack.";
    }
    clearActions();
}

function rangedAttack(attacker, target, aiming){
    let bonus = 0;
    if(aiming){
        bonus = 10;
    }
    console.log(attacker.inventory[0].ammoLeftInMag);
    if(attacker.inventory[0].ammoLeftInMag > 0) {
        let roll = Math.floor(Math.random() * 100);
        textLog.value += "\nYou roll " + roll + " to hit.";
        if ((attacker.shootGood + bonus) >= roll) {
            //    might want to incorporate a dodging mechanic later
            let damage = attacker.inventory[0].damage();
            textLog.value +="\n"+ attacker.name + " hit " + target.name + " for "+damage +" damage";
            attacker.inventory[0].ammoLeftInMag--;
            target.currentHP -=damage;
            if(target.currentHP < 1){
                textLog.value +="\n"+target.name+" is deceased...";
                clearActions();
                return;
            } else {
                textLog.value +="\n"+target.name+" didn't like getting shot. Imagine that."
            }
        }else{
            textLog.value += "\nYou missed. You should aim more carefully.";
        }
        clearActions();
    } else{
        textLog.value += "\nClick. No cartridges left in the magazine.";
        clearActions();
    }
}

clearActionsButton.addEventListener("click", clearActions);
aimButton.addEventListener("click", aimClick);
confirmActionsButton.addEventListener("click", confirmActions);

var playerQueuedActions = [];