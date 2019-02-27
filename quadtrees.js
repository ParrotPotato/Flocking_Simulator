


class Quadtrees{

    constructor(){
        this.topLeft = new Point();
        this.botRight = new Point();

        this.n = null;
        this.topleftTree = null;
        this.topRightTree = null;
        this.botLeftTree = null;
        this.botRightTree = null;
    }


    constructor(topL_point , botR_point){
        this.topLeft = new Point(topL_point.x, topL_point.y);
        this.botRight = new Point(botR_point.x, botR_point.y);
        
        this.n = null;
        this.topleftTree = null;
        this.topRightTree = null;
        this.botLeftTree = null;
        this.botRightTree = null;
    }


    insert(node){
        if(node == null)
            return ;       
    }
}