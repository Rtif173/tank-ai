import { intersect, lineLength } from "./mathematics";
import { Target } from "./target";
import { FinitLine } from "./typings";
import game from './game';
import P5 from "p5";
import AISettings from "./AISettings";

export class Ray {
    x: number = 0;
    y: number = 0;
    angle: number = 0;
    len: number = AISettings.rayLen;
    distance: number = 0;

    constructor(){
    }

    calc(){
        this.distance = this.len;
        let finitRay: FinitLine = {
            begin: {x: this.x, y: this.y}, 
            end: {x: this.x + this.len*Math.cos(this.angle), y: this.y - this.len*Math.sin(this.angle)}
        }
        for (let i = 0; i < Target.targets.length; i++) {
            const target = Target.targets[i];
            const w: number = target.size.x;
            const h: number = target.size.y;
            const otr: Array<FinitLine> = [
                {
                    begin: {x: target.pos.x * game.size, y: target.pos.y * game.size}, 
                    end: {x: (target.pos.x + w) * game.size, y: target.pos.y * game.size}
                },
                {
                    begin: {x: (target.pos.x + w) * game.size, y: target.pos.y * game.size}, 
                    end: {x: (target.pos.x + w) * game.size, y: (target.pos.y+h) * game.size}
                },
                {
                    begin: {x: (target.pos.x + w) * game.size, y: (target.pos.y+h) * game.size}, 
                    end: {x: (target.pos.x) * game.size, y: (target.pos.y+h) * game.size}
                },
                {
                    begin: {x: (target.pos.x) * game.size, y: (target.pos.y+h) * game.size}, 
                    end: {x: (target.pos.x) * game.size, y: (target.pos.y) * game.size}
                }
            ]
            
            for (let j = 0; j < otr.length; j++) {
                const intersection = intersect(finitRay, otr[j])
                if(intersection){
                    const newLen = lineLength(finitRay.begin, intersection)
                    if(this.distance > newLen){
                        this.distance = newLen;
                    }
                }
            }
            // console.log(this.distance)
            
        }
    }

    draw(p5: P5){
        p5.stroke("green");
        p5.strokeWeight(1);
        p5.line(
            this.x, this.y,
            this.x + this.distance*Math.cos(this.angle), this.y - this.distance*Math.sin(this.angle)
        )
    }
}

