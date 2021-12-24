textLog.value += '\nAs you are scavenging in a delapidated corner store a hostile scavenger bursts in, sees you and attacks.';

while (player.currentHP>0 && scavenger.currentHP >0){
    textLog.value += "\nYou have 2 actions, what will you do?\nAttack\nAim\nDodge\nItem";

}

attackButton.addEventListener("click", attackClick);

function attackClick(){
    document.querySelector("#action-queue").innerText += attackTypeSelection.value +" attack ";
}