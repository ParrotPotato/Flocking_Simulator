const flock = [];
let firstBoid = null;
function setup(){
    createCanvas(500,500);
    let count = 0 ;
    for(var i = 0 ; i < 50 ; i++){
            flock.push(new Boid());
    }
    firstBoid = new Boid();
    firstBoid.color.set(0,255,0);
}   

function draw(){
    background(40);
    for(let b of flock){
        b.show();
    }
    firstBoid.show();
    update();
}

function update(){
    for(let b of flock){
        b.update();
        b.flock(flock);
    }
    firstBoid.update();
    firstBoid.flock(flock);
}