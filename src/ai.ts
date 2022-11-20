import AISettings from "./AISettings";
import { calcMean, cleanWeights, mutation, newLink, delLink, sumArray, zeroOrNotIndexes } from "./mathematics";

export class AI{
    weightsMove: Array<number> = [];
    weightsAngular: Array<number> = [];
    weightsShoot: Array<number> = [];

    zeroInsexesShoot: Array<number> = [];
    notZeroInsexesShoot: Array<number> = [];

    speedAngular: number = 0;
    speedMove: number = 0;
    Shoot: number = 0;

    generation: number;
    data: Array<number> = [];
    constructor(
        generation: number, 
        parrentWeightsMove: Array<number> = [], 
        parrentWeightsAngular: Array<number> = [],
        parrentWeightsShoot: Array<number> = [],
    ){
        this.generation = generation;
        if(generation == 0){
            this.weightsAngular = new Array(AISettings.numberOfRays).fill(0);
            newLink(this.weightsAngular, zeroOrNotIndexes(this.weightsAngular).zeroIndexes, 5);
            this.weightsAngular.push(1);

            this.weightsMove = new Array(AISettings.numberOfRays).fill(0);
            newLink(this.weightsMove, zeroOrNotIndexes(this.weightsMove).zeroIndexes, 5);
            this.weightsMove.push(1);

            this.weightsShoot = new Array(AISettings.numberOfRays).fill(0);
            newLink(this.weightsShoot, zeroOrNotIndexes(this.weightsShoot).zeroIndexes, 3);

        } else {
            let dice = Math.random()
            if(dice<AISettings.changeWeightProbability){
                mutation(
                    parrentWeightsMove,
                    {x:-1, y:1},
                    1/(Math.log(generation)+1),
                    AISettings.numberOfRays*0.15
                )
            } else if (dice<AISettings.changeWeightProbability+AISettings.newLinkProbability){
                newLink(parrentWeightsMove, zeroOrNotIndexes(parrentWeightsMove).zeroIndexes, 1)
            } else if (dice<AISettings.changeWeightProbability+AISettings.newLinkProbability+AISettings.delLinkProbability){
                delLink(parrentWeightsMove, zeroOrNotIndexes(parrentWeightsMove).notZeroIndexes, 1)
            }
            
            
            dice = Math.random()
            if(dice<AISettings.changeWeightProbability){
                mutation(
                    parrentWeightsAngular,
                    {x:-1, y:1},
                    1/(Math.log(generation)+1),
                    AISettings.numberOfRays*0.15
                )
            } else if (dice<AISettings.changeWeightProbability+AISettings.newLinkProbability){
                newLink(parrentWeightsAngular, zeroOrNotIndexes(parrentWeightsAngular).zeroIndexes, 1)
            } else if (dice<AISettings.changeWeightProbability+AISettings.newLinkProbability+AISettings.delLinkProbability){
                delLink(parrentWeightsAngular, zeroOrNotIndexes(parrentWeightsAngular).notZeroIndexes, 1)
            }


            dice = Math.random()
            if(dice<AISettings.changeWeightProbability){
                mutation(
                    parrentWeightsShoot,
                    {x:0, y:1},
                    1/(Math.sqrt(generation)),
                    AISettings.numberOfRays*0.15
                )
            } else if (dice<AISettings.changeWeightProbability+AISettings.newLinkProbability){
                newLink(parrentWeightsShoot, zeroOrNotIndexes(parrentWeightsShoot).zeroIndexes, 1)
            } else if (dice<AISettings.changeWeightProbability+AISettings.newLinkProbability+AISettings.delLinkProbability){
                delLink(parrentWeightsShoot, zeroOrNotIndexes(parrentWeightsShoot).notZeroIndexes, 1)
            }

            this.weightsMove = parrentWeightsMove;
            this.weightsAngular = parrentWeightsAngular;

            // const c = cleanWeights(parrentWeightsShoot, 0.9);
            // this.weightsShoot = c.weights;
            // this.zeroInsexesShoot = c.zeroIndexes;
            // this.notZeroInsexesShoot = c.notZeroIndexes;
        }
        console.log(this.weightsMove, this.weightsAngular)

    }
    calc(data: Array<number>){
        data = data.map(e=>e/AISettings.rayLen<0.9? 1:0);
        data.push(sumArray(data) < 0.1? 1:0);
        this.data = data;
        
        this.speedAngular = calcMean(data, this.weightsAngular);
        this.speedMove = calcMean(data, this.weightsMove);
        this.Shoot = calcMean(data, this.weightsShoot);
    }
}