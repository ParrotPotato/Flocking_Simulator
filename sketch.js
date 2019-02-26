const flock = [];

function setup(){
    createCanvas(800,800);
    for(var i = 0 ; i < 100 ; i++){
        flock.push(new Boid());
    }
}   


function draw(){
    background(40);
    for(let b of flock){
        b.show();
    }
    update();
}

function update(){
    for(let b of flock){
        b.update();
        b.flock(flock);
    }
}