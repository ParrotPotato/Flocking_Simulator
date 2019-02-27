class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    constructor(){
        this.x = 0;
        this.y = 0;
    }
}

class Node{
    constructor(point, data){
        this.pos = new Point(point.x, point.y);
        this.data = data;
    }
    
    constructor(){
        this.pos = new Point();
        this.data = 0 ;
    }
}