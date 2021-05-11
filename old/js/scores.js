// frame scores [6, 20, 30, 20, 16, 6, 20, 13, 3]
// running total [ 6, 26, 56, 76, 92, 98, 'resolved']
// const scoresData = [1,5,0,10,10,10,10,0,6,5,5,10,2,1];
// const scoresData = [10,10,10,10,10,10,10,10,10,10,10,10];
// const scoresData = [0,0,0,0,2,0, 0]

export class Scores {

    getFrameScore(chances) {
        let frames = [];

        chances.reduce((chanceIndex, currentValue, index, array) => {
            let c0 = currentValue;
            let c1 = array[chanceIndex + 1];
            let c2 = array[chanceIndex + 2];

            if (index === chanceIndex) {
                //strike
                if (c0 === 10) {

                    if ((c1 + c2)) {
                        frames.push((c0 + c1 + c2))
                        return chanceIndex + 1;
                    }
                    //spare
                } else if (c1 && c0 + c1 === 10) {

                    if ((c1 + c2)) {
                        frames.push((c0 + c1 + c2))
                        return chanceIndex + 2;
                    }
                    //open frame
                } else {

                    if (c1 || c1 === 0) {
                        frames.push((c0 + c1))
                        return chanceIndex + 2;
                    }

                }
            }
            return chanceIndex;

        }, 0);

        return frames;
    }

    framesTotals (frames){
        let totals = []
      frames.forEach((frame, index, array) => { 
          if((index - 1) >= 0){
            totals.push((frame + totals[index - 1]))
          }else{
              totals.push(frame)
          }
      })
        return totals;
    }
}