
export class Views {

    updateView(chances, frames) {

        //updates the total Score Box
        document.getElementById('totalScoreFrame').innerHTML = frames[frames.length - 1];


        //Updates the Frame totals
        frames.forEach((frame, index) => {
            document.getElementById('frame' + (index + 1)).innerHTML = frame;
        })


        
        //Updates all chances in the row
        chances.reduce((chanceRound, pins, index, array) => {

            //strike
            if (pins === 10 && chanceRound % 2 === 0 || chanceRound === 19) {
                if (chanceRound === 18) {
                    document.getElementById('chance18').innerHTML = 'X';
                } else if (chanceRound === 19) {
                    document.getElementById('chance19').innerHTML = 'X';
                } else if (chanceRound === 20) {
                    document.getElementById('chance20').innerHTML = 'X';
                } else {
                    document.getElementById('chance' + (chanceRound + 1)).innerHTML = 'X';
                    return chanceRound + 2;
                }
            }
            //spare
            if ((pins + array[index - 1]) === 10 && chanceRound % 2 != 0) {
                document.getElementById('chance' + chanceRound).innerHTML = '/';
            }
            // 1-9 pins
            else if (pins < 10) {
                document.getElementById('chance' + chanceRound).innerHTML = pins;
            }
            // gutter ball
            if (pins === 0) {
                document.getElementById('chance' + chanceRound).innerHTML = '-';
            }
            return chanceRound + 1;
        }, 0); // End Reduce

    }
}
