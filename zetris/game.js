"use strict"

const randomIndex = (array) => {
	return array[Math.floor(Math.random() * array.length)];
}

const Coordinate = class {
	constructor (x, y) {
		this.x = x;
		this.y = y;
	}
}

const blocks = [ //block notation: width, height, t/f for each from top left to bottom right horizontally TODO: load this from json
	//base pieces hardcoded for now
	//rules, centered rounded to left when place, flat side down
	//placement math: width / block width to floor is x, top most row is first row in column array so it doesnt matter too much how to calculate that
	[4, 1, true, true, true, true],
	[2, 2, true, true, true, true],
	[2, 3, true, false, true, false, true, true],
	[2, 3, false, true, false, true, true, true],
	[3, 2, false, true, true, true, true, false],
	[3, 2, true, true, false, false, true, true],
	[3, 2, false, true, false, true, true, true],
];
let columns
const main = () => {
	let canvas = document.querySelector("#gameTarget");
	let ctx = canvas.getContext("2d");
	const bWidth = 10
	const bHeight = 21

	ctx.fillStyle = "green"

	const menu = () => {
	
	}
	const startGame = () => {

		//setup columns
		columns = new Array(bWidth).fill(false,0,bWidth);
		for (let column in columns) {
			columns[column] = new Array(bHeight).fill(false,0,bHeight)
		}
		let movingBlocks = []

		const render = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//TODO: make this only part of the screen but for now the whole thing can be used
			for (let column in columns) {
				for (let row in columns[column]) {
					if (columns[column][row]) {
						ctx.fillRect(column * 20, row * 20, 20, 20);
					}
				}
			}
		}

		const pause = () => {

		}
		const newBlock = () => {
			const newBlock = randomIndex(blocks);
			const width = newBlock[0];
			const height = newBlock[1];
			for (let block in newBlock) {
				if (block > 1) {
					console.log((bWidth / 2), Math.ceil(width / 2), (block - 2) % width)
					if(newBlock[block]) {/*
					ALGORITHM???
					y: (block / width to floor
					*/
						let block2 = block - 2;
						columns[(bWidth / 2) - Math.ceil(width / 2) + (block2 % width)][Math.floor(block2 / width)] = newBlock[block]; //TODO: figure out algorithm to place these
						movingBlocks.push(new Coordinate(Math.floor(bWidth / width + block - 2), Math.floor((block - 2) / height)))
					}
				}
			}
			console.log(columns)
		}
		const doLines = () => {
			//clearing lines and doing scores
		}
		const freezeBlocks = () => {
			movingBlocks = [];
			doLines();
			newBlock();
		}
		const rotate = () => {
			render();
		}
		const collisionDetector = (dir) => {
			//0 = down
			//1 = left
			//2 = right
			//uhhh make switch
			switch (dir) {
				case 0:
					for (let coordinate in movingBlocks) {
						//if coord below is not moving and filled return true
					}
					return false
				case 1:
					return false
				case 2:
					return false
			}
		}
		const gameTick = (detected) => {
			if (collisionDetector(0)) { //if not collide

			} else {
				freezeBlocks()
			}
			render();
		}
		const horizontalMove = (dir) => {
			//dir = true is right, false is left
			if (dir) {

			} else {

			}
		}
		const endGame = () => {

		}

		newBlock();
		render();
	}
	startGame() //until menu is made
}
document.addEventListener("DOMContentLoaded", () => {
	main()
})
