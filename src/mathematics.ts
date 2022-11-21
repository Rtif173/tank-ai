import { Point2d, FinitLine } from "./typings";

function area(a: Point2d, b: Point2d, c: Point2d) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

export function lineLength(a: Point2d, b: Point2d) {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

export function intersect({ begin: a, end: b }: FinitLine, { begin: c, end: d }: FinitLine) {
    let thereIsIntersect = area(a, b, c) * area(a, b, d) <= 0 && area(c, d, a) * area(c, d, b) <= 0;
    if (thereIsIntersect) {
        let Z1 = area(a, b, c);
        let Z2 = area(a, b, d);
        let intersection: Point2d = {
            x: c.x + (d.x - c.x) * Math.abs(Z1) / Math.abs(Z2 - Z1),
            y: c.y + (d.y - c.y) * Math.abs(Z1) / Math.abs(Z2 - Z1),
        }
        return intersection
    } else {
        return false
    }
}

export function sumArray(arr: Array<number>) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum
}

export function repeatStr(str: string, n: number) {
    var new_str = '';
    while (n-- > 0) new_str += str;
    return new_str;
}

export function cleanWeights(weights: Array<number>, threshold: number) {
    let zeroIndexes = [] as Array<number>;
    let notZeroIndexes = [] as Array<number>;
    return {
        weights: weights.map((e, i) => {
            if (e < threshold) {
                zeroIndexes.push(i);
                return 0;
            } else {
                notZeroIndexes.push(i);
                return e;
            }
        }),
        zeroIndexes: zeroIndexes,
        notZeroIndexes: notZeroIndexes
    }
}

export function zeroOrNotIndexes(arr: Array<number>){
    let zeroIndexes = [] as Array<number>;
    let notZeroIndexes = [] as Array<number>;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]==0) {
            zeroIndexes.push(i)
        }
        else {
            notZeroIndexes.push(i)
        }
    }
    return {
        zeroIndexes,
        notZeroIndexes
    }
}

export function calcMean(data: Array<number>, weights: Array<number>) {
    let notZero = 0;
    let sum = 0;
    const maxLen = data.length<weights.length ? data.length : weights.length;
    for (let i = 0; i < maxLen; i++) {
        if (weights[i] != 0) {
            sum += data[i] * weights[i];
            notZero += 1;
        }
    }
    return sum / (notZero == 0? notZero:1)
}

export function randomIn(a: number, b: number) {
    if (a > b) {
        b = [a, a = b][0];
    }
    return (b - a) * Math.random() + a;
}

export function mutation(
    weights: Array<number>,
    weightsRange: Point2d,
    strengh: number,
    numberOfMutations: number, 
    notZeroIndexes: Array<number>
) {
    const len = notZeroIndexes.length;
    let numberOfAwalibleMutations = len > numberOfMutations ? numberOfMutations : len
    while(numberOfAwalibleMutations>0) {
        const mutatingElementIndex = notZeroIndexes[Math.floor(randomIn(0, len))];
        if (weights[mutatingElementIndex] < weightsRange.x + strengh) {
            weights[mutatingElementIndex] = randomIn(weightsRange.x, weights[mutatingElementIndex] + strengh)
        } else if (weights[mutatingElementIndex] < weightsRange.y - strengh){
            weights[mutatingElementIndex] = randomIn( weights[mutatingElementIndex]-strengh , weightsRange.y)
        } else {
            weights[mutatingElementIndex] = randomIn( weights[mutatingElementIndex]-strengh, weights[mutatingElementIndex] + strengh)
        }
        numberOfAwalibleMutations -= 1;
    }
    
}
export function delLink(
    weights: Array<number>,
    notZeroIndexes: Array<number>,
    numberOfMutations: number
){
    while(numberOfMutations > 0 && notZeroIndexes.length>1){
        let p = Math.floor(randomIn(0,notZeroIndexes.length))
        weights[notZeroIndexes[p]] = 0;
        notZeroIndexes.splice(p, 1);
        numberOfMutations -= 1;
    }
}
export function newLink(
    weights: Array<number>,
    zeroIndexes: Array<number>,
    numberOfMutations: number, 
    range:Point2d = {x:0,y:1}
){
    while(numberOfMutations > 0 && zeroIndexes.length>0){
        let p = Math.floor(randomIn(0,zeroIndexes.length))
        weights[zeroIndexes[p]] = randomIn(range.x, range.y);
        zeroIndexes.splice(p, 1);
        numberOfMutations -= 1;
    }
    console.log(weights);
}