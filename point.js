class Rectangle{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    contains(boid){
        if(this.x + this.w >= boid.position.x && 
            this.x - this.w <= boid.position.x && 
            this.y + this.h >= boid.position.y && 
            this.y - this.h <= boid.position.y)
                return true;
        return false;
    }

    intersects(other){
        let rightx = this.x + this.w;
        let leftx = this.x - this.w;
        let topy = this.y - this.h;
        let boty = this.y + this.h;

        let otheRightX = other.x + other.w;
        let otherLeftX = other.x - other.w;
        let otherTopY = other.y - other.h;
        let otherBotY = other.y + other.h;

        if(
            (rightx < otheRightX && rightx <= otherLeftX) || 
            (leftx >=  otheRightX && leftx > otherLeftX) || 
            (topy >= otherBotY && topy > otherTopY) || 
            (boty < otherBotY && boty <= otherTopY)
            )
            return false;

        return true;
    }
}
