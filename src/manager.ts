import P5 from "p5";
import { Bullet } from "./bullet";
import { Player } from "./player";
import game from "./game"
import { Visualiser } from "./visualizer";
import AISettings from "./AISettings";
import { Point2d } from "./typings";
import { Target } from "./target";

let v = new Visualiser();
export class Manager {
    declare visualizedPlayer: Player;
    constructor() {
        Target.genTargets();
    }
    createPlayers() {
        for (let i = 0; i < AISettings.numberOfPlayers; i++) {
            let pos: Point2d;
            if (AISettings.beginPosition) {
                pos = AISettings.beginPosition
            } else {
                pos = { x: Math.random() * game.mapX, y: Math.random() * game.mapY }
            }
            new Player(0, pos, AISettings.beginAngle);
            // new Player(0, {x: 1, y: 1}, -Math.PI/4);            
        }
        this.visualizedPlayer = Player.players[Player.players.length - 1];
    }
    update() {
        if (Player.players.length == 0) {
            this.createPlayers()
        }
        for (const player of Player.players) {
            player.update()
        }
        Bullet.moveAll();
    }
    draw(p5: P5) {
        for (const player of Player.players) {
            player.draw(p5);
        }
        p5.fill("black");
        Bullet.drawAll(p5);
        Target.drawAll(p5);
        v.draw(this.visualizedPlayer, AISettings.visualise);
    }
}