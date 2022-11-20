import P5 from "p5";
import game from "./game";
import { Point2d } from "./typings";


export class Tank {
    x: number
    y: number
    angle: number
    movementS = 0
    rotationS = 0.0

    constructor(beignPos: Point2d = {x: 1, y: 1}, angle: number = 0) {
        this.x = beignPos.x*game.size, this.y = beignPos.y*game.size; this.angle = angle;
    }

    draw(p5: P5) {
        p5.stroke(0);
        p5.strokeWeight(0);
        p5.fill("#0a96da");
        p5.ellipse(this.x, this.y, game.size, game.size);
    }
    update(){
        this.angle = (this.angle + this.rotationS) % (Math.PI * 2);
        
        this.x = this.x + this.movementS * Math.cos(this.angle);
        this.y = this.y - this.movementS * Math.sin(this.angle);
        if(this.y<0){
            this.y = 0
        }
        if(this.x<0){
            this.x = 0
        }
        if(this.x> game.mapX* game.size){
            this.x = game.mapX* game.size
        }
        if(this.y> game.mapY* game.size){
            this.y = game.mapY* game.size
        }
    }
}