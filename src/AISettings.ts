import { Point2d } from "./typings";

export default {
    numberOfRays: 45,
    rayLen: 1000, 
    sightAngle: Math.PI/2,
    shootThreshold: 0.25,
    numberOfPlayers: 300,
    changeWeightProbability: 0.5,
    delLinkProbability: 0.1,
    newLinkProbability: 0.4,
    visualise: "Shoot" as "Shoot"|"Move"|"Angular",
    drawRays: false,
    beginPosition: {x:1, y:1} as Point2d | null,
    beginAngle: -Math.PI*0.25 as number | undefined,
}