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
           if(scavenger.currentHP <1){
               textLog.value+="\nWell, the fighting is over. You might as well check the body and scavenge around a bit before moving on."
               //Call to function for what happens after defeating foe
               return;
           }
       }
        if (action=="Melee Attack"){
            //TODO: use meeleeAttack Function
            meleeAttack(player, scavenger, aiming);
        }
    });
    if(scavenger.currentHP > 0){
        enemyTurn();
    }
}

function enemyTurn(){
//    Todo: Write enemy turn
//    let's randomize it so it's not the same thing every time.

    let roll = Math.floor(Math.random() * 3);
    console.log(roll);
//    possibilities at this point are:

//    Todo: add reload action

//    aim and shoot
    if(roll === 0){
      if(scavenger.inventory[0].ammoLeftInMag < 1){
          roll = 2;
      } else{
          rangedAttack(scavenger,player,true);
          if(player.currentHP <1){
              textLog.value+="\nYou have been slain. Game Over."
              confirmActionsButton.disabled=true;
              return;
          }
      }
    }
//    shoot twice
    if(roll === 1){
        if(scavenger.inventory[0].ammoLeftInMag < 1){
            roll =2;
        }else{
            rangedAttack(scavenger,player,false);
            if(player.currentHP <1){
                textLog.value+="\nYou have been slain. Game Over."
                confirmActionsButton.disabled=true;
                return;
            }
            rangedAttack(scavenger,player,false);
            if(player.currentHP <1){
                textLog.value+="\nYou have been slain. Game Over."
                confirmActionsButton.disabled=true;
                return;
            }
        }
    }
//    melee twice
    if(roll === 2){
        meleeAttack(scavenger,player);
        if(player.currentHP <1){
           textLog.value+="\nYou have been slain. Game Over."
            confirmActionsButton.disabled=true;
           return;
        }
        meleeAttack(scavenger,player);
        if(player.currentHP <1){
            textLog.value+="\nYou have been slain. Game Over."
            confirmActionsButton.disabled=true;
            return;
        }
    }
}

function meleeAttack(attacker, target){
    if(target.currentHP <1){
        clearActions();
        return;
    }
    let roll = Math.floor(Math.random() * 100);
    textLog.value += "\n"+ attacker.name +" roll " + roll + " to hit.";
    if ((attacker.punchGood) >= roll){
        let damage = attacker.inventory[1].damage(attacker.meleeDamageBonus)- Math.floor(target.Toughness/10);
        if(damage < 0){
            damage= 0;
        }
        textLog.value +="\n"+ attacker.name + " hit " + target.name + " for "+damage +" damage";
        target.currentHP -=damage;
        if(target.currentHP < 1){
            textLog.value +="\n"+target.name+" is deceased...";
            clearActions();
            //TODO: Handle end of combat. Is it looting time? Are there additional foes?
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
    if(target.currentHP < 1){
        clearActions();
        return;
    }
    let bonus = 0;
    if(aiming){
        bonus = 10;
    }
    console.log(attacker.inventory[0].ammoLeftInMag);
    if(attacker.inventory[0].ammoLeftInMag > 0) {
        let roll = Math.floor(Math.random() * 100);
        textLog.value += "\n" +attacker.name + " roll " + roll + " to hit.";
        if ((attacker.shootGood + bonus) >= roll) {
            //    might want to incorporate a dodging mechanic later
            let damage = attacker.inventory[0].damage()- Math.floor(target.Toughness/10);
            if(damage < 0){
                damage= 0;
            }
            textLog.value +="\n"+ attacker.name + " hit " + target.name + " for "+damage +" damage";
            attacker.inventory[0].ammoLeftInMag--;
            target.currentHP -=damage;
            if(target.currentHP < 1){
                textLog.value +="\n"+target.name+" is deceased...";
                clearActions();
                //TODO: Handle end of combat. Is it looting time? Are there additional foes?
                return;
            } else {
                textLog.value +="\n"+target.name+" didn't like getting shot. Imagine that."
            }
        }else{
            textLog.value += "\n"+ attacker.name+" missed. They should aim more carefully.";
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