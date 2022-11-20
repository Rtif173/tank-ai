import P5 from "p5";
import { Bullet } from "./bullet";
import { Player } from "./player";
import game from "./game"
import { Visualiser } from "./visualizer";
import AISettings from "./AISettings";
let v = new Visualiser();
export class Manager{
    constructor(numOfPlayers: number){
        for (let i = 0; i < numOfPlayers; i++) {
            new Player(0, {x: Math.random()*game.mapX, y: Math.random()*game.mapY});            
            // new Player(0, {x: 1, y: 1}, -Math.PI/4);            
        }
    }
    update(){
        for (const player of Player.players) {
            player.update()
        }
        Bullet.moveAll();
    }
    draw(p5: P5){
        for (const player of Player.players) {
            player.draw(p5);
        }
        Bullet.drawAll(p5);
        v.draw(Player.players[Player.players.length - 1], AISettings.visualise);
    }
}