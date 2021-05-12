
export class Views {

    updateView(user, chances, frames) {

        //updates the total Score Box
        let playerTable = document.getElementById(user);
        // playerTable.getElementsByClassName('chance' + (0 + 1))[0].innerHTML = 'here';
        if(frames[frames.length - 1]){
        playerTable.getElementsByClassName('totalScoreFrame')[0].innerHTML = frames[frames.length - 1];
        }


        //Updates the Frame totals
        frames.forEach((frame, index) => {
            playerTable.getElementsByClassName('frame' + (index + 1))[0].innerHTML = frame;
        })
   
        //Updates all chances in the row
        chances.reduce((chanceRound, pins, index, array) => {

            //strike
            if (pins === 10 && chanceRound % 2 === 0 || chanceRound === 19) {
                if (chanceRound === 18) {
                    playerTable.getElementsByClassName('chance18')[0].innerHTML = 'X';
                } else if (chanceRound === 19) {
                    playerTable.getElementsByClassName('chance19')[0].innerHTML = 'X';
                } else if (chanceRound === 20) {
                    playerTable.getElementsByClassName('chance20')[0].innerHTML = 'X';
                } else {
                    
                    playerTable.getElementsByClassName('chance' + (chanceRound + 1))[0].innerHTML = 'X';
                    return chanceRound + 2;
                }
            }
            //spare
            if ((pins + array[index - 1]) === 10 && chanceRound % 2 != 0) {
                playerTable.getElementsByClassName('chance' + chanceRound)[0].innerHTML = '/';
            }
            // 1-9 pins
            else if (pins < 10) {
                playerTable.getElementsByClassName('chance' + chanceRound)[0].innerHTML = pins;
            }
            // gutter ball
            if (pins === 0) {
                playerTable.getElementsByClassName('chance' + chanceRound)[0].innerHTML = '-';
            }
            return chanceRound + 1;
        }, 0); // End Reduce

    }
}
