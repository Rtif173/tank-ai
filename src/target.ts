import P5 from "p5";
import { Point2d } from "./typings";
import game from "./game";

export class Target {
    pos: Point2d
    size: Point2d

    static targets: Array<Target> = []

    constructor(pos: Point2d, size: Point2d = {x: 1, y: 1}) {
        this.pos = pos;
        this.size = size;
        Target.targets.push(this);
    }

    draw(p5: P5){
        p5.stroke("#a8a8a8");
        p5.strokeWeight(2);
        p5.fill("#333");
        p5.rect(
            this.pos.x * game.size, 
            this.pos.y * game.size, 
            this.size.x * game.size,
            this.size.y * game.size
        )
    }

    destroy() {
        Target.targets.splice(Target.targets.indexOf(this), 1);
    }

    static drawAll(p5: P5) {
        for (const target of Target.targets) {
            target.draw(p5);
        }
    }

    static genTargets(){
        for (let i = 0; i < game.numOfTargets; i++) {
            new Target({
                x: Math.floor(Math.random()*game.mapX),
                y: Math.floor(Math.random()*game.mapY),
            });            
        }
    }
}