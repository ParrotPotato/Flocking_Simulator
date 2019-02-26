// @Reference : http://www.red3d.com/cwr/boids/
// @Reference : p5.js tutorials 



class Boid{
    constructor() {
        this.color = createVector(random(255), random(255), random(255));
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(random(-6,6), random(-6,6));
        this.accleration = createVector(0.0, 0.0);
        this.dColor = createVector();

        this.colorForce = 1.0;
        this.minVelocity = 2;
        this.maxVelocity = random(2,6);
        this.maxForce = 0.1;
    }

    show() {
        push();
        
        strokeWeight(1);
        noStroke();
        fill(this.color.x, this.color.y, this.color.z, 220);
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading());
        triangle(-5, 5, 10, 0, -5, -5);

        pop();
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.accleration);
        this.velocity.limit(this.maxVelocity);
        if(this.velocity.mag() < this.minVelocity){
            this.velocity.setMag(this.minVelocity);
        }

        if(this.position.x > width){
            this.position.x = this.position.x - width;
        }else if(this.position.x < 0){
            this.position.x = width + this.position.x;
        }

        if(this.position.y > height){
            this.position.y = this.position.y - height;
        }else if(this.position.y < 0){
            this.position.y = height + this.position.y;
        }

        this.color.add(this.dColor);
    }

    alignment (flock){
        let count = 0 ;
        let average = createVector();
        let vesion_radius = 30;

        for(let other of flock){
            let distance = dist(this.position.x , this.position.y , other.position.x , other.position.y );
            if(distance < vesion_radius && other != this){
                average.add(other.velocity);
                count += 1 ;
            }
        }

        if(count){
            average.div(count);
            average.sub(this.velocity);
        }
        return average;
    }

    cohesion(flock){
        let count = 0 ;
        let average = createVector();
        let vesion_radius = 20;

        for(let other of flock){
            let distance = dist(this.position.x , this.position.y , other.position.x , other.position.y );
            if(distance < vesion_radius && other != this){
                average.add(other.position);
                count += 1 ;
            }
        }

        if(count){
            average.div(count);
            average.sub(this.position);
            average.limit(this.maxForce);
        }
        return average;
    }

    seperation (flock) {
        let count = 0 ;
        let average  = createVector();
        let vesion_radius = 20;

        for(let other of flock){
            let distance = dist(this.position.x , this.position.y , other.position.x , other.position.y );
            
            if(distance < vesion_radius && other != this){
                let diff_vector = p5.Vector.sub(this.position, other.position);
                diff_vector.div(distance);
                average.add(diff_vector);
                count += 1;
            }
        }

        if(count){
            average.div(count);
            average.sub(this.velocity);
        }

        return average;
    }

    flockColor(boids){
        let count = 0 ;
        let average  = createVector();
        let vesion_radius = 30;

        for(let other of flock){
            let distance = dist(this.position.x , this.position.y , other.position.x , other.position.y );
            
            if(distance < vesion_radius && other != this){
                average.add(other.color);
                count += 1;
            }
        }

        if(count){
            average.div(count);
            average.sub(this.color);
        }
        return average;
    }

    flock(boids){
        let average_velocity = this.alignment(boids);
        let average_position = this.cohesion(boids);
        let average_seperation = this.seperation(boids);
        

        let force = createVector();

        force.add(average_position);
        force.add(average_velocity);
        force.add(average_seperation);

        force.setMag(this.maxForce);
        
        this.accleration = force;   
        
        let average_color_d = this.flockColor();
        average_color_d.setMag(this.colorForce);

        this.dColor = average_color_d;
    }

    

}