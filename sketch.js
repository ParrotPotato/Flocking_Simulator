const flock = [];
let firstBoid = null;
let quadtree = null;
function setup(){
    createCanvas(1908,1060);
    let count = 0 ;
    for(var i = 0 ; i < 300 ; i++){
            flock.push(new Boid());
    }
    firstBoid = new Boid();
    // firstBoid.color.set(0,255,0);
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
    quadtree = new Quadtree(new Rectangle(width/2, height/2, width/2, height/2), 4);
    for(let b of flock){
        quadtree.insert(b);
    }
    quadtree.insert(firstBoid);
    for(let b of flock){
        b.flock(quadtree);
        b.update();
    }
    firstBoid.flock(quadtree);
    firstBoid.update();

    // quadtree.show();
    quadtree = null;
}