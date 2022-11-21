import P5 from "p5"
import { Target } from "./target"
import { Point2d } from "./typings"
import game from "./game"
import { Player } from "./player"

export class Bullet{
    speed: number = 7
    angle: number
    x: number
    y: number
    player: Player;


    static bullets: Array<Bullet> = []

    constructor(player: Player){
        this.player = player;
        this.x = player.tank.x;
        this.y = player.tank.y;
        this.angle = player.tank.angle;
        Bullet.bullets.push(this)
    }
    draw(p5: P5){
        p5.circle(this.x, this.y, 3)
    }
    move(){
        this.x = this.x + Math.cos(this.angle) * this.speed;
        this.y = this.y - Math.sin(this.angle) * this.speed;
        this.detectCollision();
    }
    static moveAll(){
        for (const bullet of Bullet.bullets) {
            bullet.move();
            bullet.detectCollision();
        }
    }
    static drawAll(p5: P5){
        for (const bullet of Bullet.bullets) {
            bullet.draw(p5)
        }
    }
    detectCollision(){
        let bulletPos: Point2d = {x: Math.floor(this.x/game.size), y: Math.floor(this.y/game.size)}
        for (let i = 0; i < Target.targets.length; i++) {
            const target = Target.targets[i];
            if(target.pos.x == bulletPos.x && target.pos.y == bulletPos.y){
                target.destroy();
                this.destroy();
                this.player.targetAttack();
                Bullet.bullets = [];
                new Target({
                    x: Math.floor(Math.random()*game.mapX),
                    y: Math.floor(Math.random()*game.mapY),
                });
            }
        }
        
    }
    destroy(){
        Bullet.bullets.splice(Bullet.bullets.indexOf(this), 1);
    }
}