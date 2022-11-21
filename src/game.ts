export const game = {
    mapX: 50,
    mapY: 50,
    size: 0,
    numOfTargets: 1
};

game.size = Math.min(window.innerWidth / game.mapX, window.innerHeight / game.mapY)

export default game;
