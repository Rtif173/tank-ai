import { AI } from "./ai";
import { Bullet } from "./bullet";
import { Ray } from "./ray";
import { Tank } from "./tank";
import tankSettings from "./tankSettings";
import AISettings from "./AISettings";
import P5 from "p5";
import game from "./game"
import { Point2d } from "./typings";

export class Player {
    numberOfBullets: number = 5;
    tank: Tank;
    ai: AI;
    score = 0;
    lastShootTime: number = 0;
    rays: Array<Ray> = new Array(AISettings.numberOfRays);
    generation: number;
    buildTime: number = 0;

    static players: Array<Player> = [];

    constructor(
        generation: number, 
        pos: Point2d = {
            x: Math.random()*game.mapX, 
            y: Math.random()*game.mapY
        },
        angle: number = 2 * Math.random() * Math.PI, 
        pwm?: Array<number>, 
        pwa?: Array<number>, 
        pws?: Array<number>
    ) {
        this.tank = new Tank(pos, angle);
        this.ai = new AI(generation, pwm, pwa, pws);
        this.generation = generation;
        this.buildTime = Date.now();

        for (let i = 0; i < AISettings.numberOfRays; i++) {
            this.rays[i] = new Ray()
            this.rays[i].angle = this.tank.angle - AISettings.sightAngle / 2 + i * AISettings.sightAngle / AISettings.numberOfRays;
        }

        Player.players.push(this);

    }
    update() {
        //обновление позиции такна
        this.tank.update();
        //расчёт лучей
        for (const ray of this.rays) {
            ray.angle = (ray.angle + this.tank.rotationS) % (Math.PI * 2);
            ray.x = this.tank.x;
            ray.y = this.tank.y;
            ray.calc();
        }
        //расчёт по ии
        this.ai.calc(this.rays.map(ray => ray.distance));
        //установака скоростей танку
        this.tank.rotationS = (this.ai.speedAngular) / 30;
        this.tank.movementS = this.ai.speedMove * 5;
        if (this.ai.Shoot > AISettings.shootThreshold) {
            this.shoot()
        }
        if(Date.now() - this.buildTime>15000 && Date.now() - this.lastShootTime > 15000){
            this.destroy();
        }
    }
    draw(p5: P5) {
        for (const ray of this.rays) {
            ray.draw(p5)
        }
        this.tank.draw(p5);
    }
    shoot() {
        const now = Date.now()
        if (this.numberOfBullets > 0 && -this.lastShootTime + now > tankSettings.reloadTime) {
            new Bullet(this);
            this.numberOfBullets -= 1;
            this.lastShootTime = now;
        }
        if (this.numberOfBullets == 10) {
            this.destroy();
        }
    }
    targetAttack() {
        this.score += 1;
        this.numberOfBullets += 1;
        if(this.score>1){
            new Player(
                this.generation + 1,
                {x: this.tank.x/game.size, y: this.tank.y/game.size},
                undefined,
                this.ai.weightsMove,
                this.ai.weightsAngular,
                this.ai.weightsShoot
            )
        }
    }
    destroy() {
        console.log("die");
        Player.players.splice(Player.players.indexOf(this), 1);
        new Player(0)
    }
}