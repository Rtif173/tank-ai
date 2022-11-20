export const settings = {
    mapX: 50,
    mapY: 50,
    size: 0,
    numOfTargets: 10
};

settings.size = Math.min(window.innerWidth / settings.mapX, window.innerHeight / settings.mapY)

export default settings;
