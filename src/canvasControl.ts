import game from "./game";
import { Player } from "./player";
import { Point2d } from "./typings";

export function getPlayerByCoord(coord: Point2d){
    let clickPos = {
        x: Math.floor(coord.x/game.size),
        y: Math.floor(coord.y/game.size)
    }
    for (const player of Player.players) {
        if(Math.floor(player.tank.x/game.size) == clickPos.x && Math.floor(player.tank.y/game.size) == clickPos.y){
            console.log(player)
            return player
        }
    }
    return null
}