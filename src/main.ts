import './style.css'
import P5 from "p5";
import game from './game';
import { Manager } from './manager';
import { getPlayerByCoord } from './canvasControl';
// import "p5/lib/addons/p5.dom";

// Creating the sketch itself
function sketch(p5: P5) {
	// The sketch setup method 
	p5.setup = () => {
		// Creating and positioning the canvas
		p5.createCanvas(game.mapX * game.size, game.mapY * game.size);
		// canvas.parent("app");

		p5.background(200);
	};

	// The sketch draw method
	p5.draw = () => {
		p5.background(200);

		m.update();
		m.draw(p5);	
	};

	p5.mouseClicked = () => {
		const newVisualizedPlayer = getPlayerByCoord({x: p5.mouseX, y: p5.mouseY});
		if (newVisualizedPlayer) {
			m.visualizedPlayer = newVisualizedPlayer;
		}
	}
};

let m = new Manager();
new P5(sketch);

// const info = document.querySelector("#info") as HTMLDivElement;

// var r = false;
// var l = false;
// var d = false;
// var u = false;
// var b = false;

// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);

// function keyDownHandler(e: KeyboardEvent) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         r = true;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         l = true;
//     }
//     else if(e.key == "Up" || e.key == "ArrowUp") {
//         u = true;
//     }
//     else if(e.key == "Down" || e.key == "ArrowDown") {
//         d = true;
//     }
// }

// function keyUpHandler(e: KeyboardEvent) {
//     if(e.key == "Right" || e.key == "ArrowRight") {
//         r = false;
//     }
//     else if(e.key == "Left" || e.key == "ArrowLeft") {
//         l = false;
//     }
//     else if(e.key == "Up" || e.key == "ArrowUp") {
//         u = false;
//     }
//     else if(e.key == "Down" || e.key == "ArrowDown") {
//         d = false;
//     }
// 	else if(e.key== " "){
// 		b = true;
// 	}
// }