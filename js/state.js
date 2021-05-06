//state and method are necessarily conected, so I'll outline the method thinking behind the state structure below.
//number of pins input => initial frame score and a change in number of chances  
//in cases where more than one frame score is being added to, 
// i think it would probably be simpler to add to two frames at once (frame and frame+1), 
// rather than keeping only one active and then having to loop back to add to a previous one.
// if an array of frame scores is used to keep track of the score per frame 
// (and it seems like keeping separate frame scores at least until game end would be important for bowlers)
// don't push a frame's score to it until chances=0;
// there's no need to have a separate index to keep track of which score in the arrya goes with which frame--
// if they're sequentially pushed, the frame is index + 1.

// I made a few different models so you can use whichever works best with your preferred method. 
// Obviously, you'll probably need to modify as you progress and get a clearer understanding by doing.

// no nested objects
class Player    {

    constructor(name){
        this.name = name;
        this.frameScore = 0;
        this.frameScores = [];
        this.gameScore = 0;
        this.totalScore = 0;
        this.frame = 0;
        this.chances = 0;
    }
}


//this is most like what we had during the meeting
class Player    {

    constructor(name){
        this.name = name;
        this.frameScore = 0;
        this.frameScores = []; //no need to have an array to push each frame to if we include score in the nested frame object
        this.gameScore = 0;
        this.totalScore = 0;
        this.frame = {
            num = 1,
            unresolved = true, //no need for unresolved state, simply check if chances remain
            chances = 2
        }
    }
}


//I think this is the most efficient option, 
//and since we'll know the simple structure at all times, finding something in the nested object should be no trouble.
class Player    {
    
    constructor(name){
        this.name = name;
        this.frame = {
            num = 1,
            score = 0,
            chances = 2
        }
        this.frameScores = []; //we actually do need an array if we want to keep track of separate frames until the end of the game.
        //the frame nested object will reset at the start of every new frame
        this.gameScore = 0;
        this.totalScore = 0;
    }
}
//despite how ugly this looks, I think it's the best option, 
// because it connects specific frames to specific scores without introducing a frames number variable and it keeps them all equally accessible.
class Player    {

    constructor(name){
        this.name = name;
        this.frames = [{'score': 0, 'chances': 2}, 
                       {'score': 0, 'chances': 2}, 
                       {'score': 0, 'chances': 2},
                       {'score': 0, 'chances': 2},
                       {'score': 0, 'chances': 2},
                       {'score': 0, 'chances': 2},
                       {'score': 0, 'chances': 2},
                       {'score': 0, 'chances': 2},
                       {'score': 0, 'chances': 2},
                       {'score': 0, 'chances': 2} ]
        this.gameScore = 0;
        this.totalScore = 0;
    }
}