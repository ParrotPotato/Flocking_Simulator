class Quadtree{
    constructor(boundary, n){
        this.boundary = boundary;
        this.capacity = n;  
        this.boids = [] ; 

        this.subdivided = false;

        this.northWest = null;
        this.northEast = null;
        this.southWest = null;
        this.southEast = null;
    }

    insert(boid){
        if(!this.boundary.contains(boid)){
            return false;
        }
        
        if(this.boids.length < this.capacity){
            this.boids.push(boid);
            
            return true;
        }
        else {
            if(this.subdivided == false){
                this.divide();
            }
            if(this.northWest.insert(boid)) return true;
            if(this.northEast.insert(boid)) return true;
            if(this.southWest.insert(boid)) return true;
            if(this.southEast.insert(boid)) return true;
        }
        return false;
    }

    divide() {
        if(this.subdivided)
            return;

        let x = this.boundary.x;
        let y = this.boundary.y;
        let w = this.boundary.w;
        let h = this.boundary.h;

        let nw = new Rectangle(x - w/2, y - h/2, w/2, h/2);
        let ne = new Rectangle(x + w/2, y - h/2, w/2, h/2);
        let sw = new Rectangle(x - w/2, y + h/2, w/2, h/2);
        let se = new Rectangle(x + w/2, y + h/2, w/2, h/2);
        
        this.northWest = new Quadtree(nw, this.capacity);
        this.northEast = new Quadtree(ne, this.capacity);
        this.southWest = new Quadtree(sw, this.capacity);
        this.southEast = new Quadtree(se, this.capacity);

        this.subdivided = true;
    }

    queryRange(queryboundary){
        let boids_list = [];
        if(this.boundary.intersects(queryboundary) == false)
            return boids_list;

        for(let i =0 ; i < this.boids.length ; i++){
            if(queryboundary.contains(this.boids[i]) == true)
                boids_list.push(this.boids[i]);
        }

        if(this.subdivided == true){
            boids_list = boids_list.concat(this.northEast.queryRange(queryboundary));
            boids_list = boids_list.concat(this.northWest.queryRange(queryboundary));
            boids_list = boids_list.concat(this.southEast.queryRange(queryboundary));
            boids_list = boids_list.concat(this.southWest.queryRange(queryboundary));
        }

        return boids_list;
    }

    show() {
        strokeWeight(1);
        stroke(255);
        noFill();
        rectMode(CENTER);
        rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h *2);
        if(this.subdivided == true){
            this.northEast.show();
            this.northWest.show();
            this.southEast.show();
            this.southWest.show();
        }
    }
}