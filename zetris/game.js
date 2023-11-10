"use strict"

//note the large amount of stuff like column = Number(column); this is because for ... in loops return it as a string i cannot take this anymore

const randomIndex = (array) => {
	return array[Math.floor(Math.random() * array.length)];
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
			column = Number(column);
			columns[column] = new Array(bHeight).fill(false,0,bHeight)
		}
		let movingBlocks = new Array(bWidth).fill(false,0,bWidth);
		for (let column in movingBlocks) {
			column = Number(column);
			movingBlocks[column] = new Array(bHeight).fill(false,0,bHeight)
		}

		const render = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			//TODO: make this only part of the screen but for now the whole thing can be used
			for (let column in columns) {
				column = Number(column);
				for (let row in columns[column]) {
					row = Number(row);
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
			//const height = newBlock[1];
			console.log(movingBlocks)
			for (let block in newBlock) {
				block = Number(block);
				if (block > 1) {
					console.log((bWidth / 2), Math.ceil(width / 2), (block - 2) % width)
					if(newBlock[block]) {/*
					ALGORITHM???
					y: (block / width to floor
					*/
						let block2 = block - 2;
						let x = (bWidth / 2) - Math.ceil(width / 2) + (block2 % width)
						let y = Math.floor(block2 / width)
						columns[x][y] = newBlock[block]; //TODO: figure out algorithm to place these
						movingBlocks[x][y] = newBlock[block];
					}
				}
			}
			console.log(movingBlocks)
		}
		const doLines = () => {
			//clearing lines and doing scores
		}
		const freezeBlocks = () => {
			movingBlocks = new Array(bWidth).fill(false,0,bWidth);
			for (let column in movingBlocks) {
				column = Number(column);
				movingBlocks[column] = new Array(bHeight).fill(false,0,bHeight)
			}
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
					for (let column in movingBlocks) {
						column = Number(column);
						//if coord below is not moving and filled return true
						for (let block in movingBlocks[column]) {
							block = Number(block);
							if (movingBlocks[column][block]) {
								if (block >= bHeight - 1){
									return true;
								}
								if (!movingBlocks[column][block + 1]) {
									if (columns[column][block + 1]) {
										return true;
									}
								}
							}
						}
					}
					return false;
				case 1:
					for (let column in movingBlocks) {
						column = Number(column);
						//if coord to right is not moving and filled return true
						for (let block in movingBlocks[column]) {
							block = Number(block);
							if (movingBlocks[column][block]) {
								if (column <= 0) {
									return true;
								}
								if (!movingBlocks[column - 1][block]) {
									if (columns[column - 1][block]) {
										return true;
									}
								}
							}
						}
					}
					return false;
				case 2:
					for (let column in movingBlocks) {
						column = Number(column);
						//if coord to left is not moving and filled return true
						for (let block in movingBlocks[column]) {
							block = Number(block);
							if (movingBlocks[column][block]) {
								if (column >= bWidth) {
									return true;
								}
								if (!movingBlocks[column + 1][block]) {
									if (columns[column + 1][block]) {
										return true;
									}
								}
							}
						}
					}
					return false;
			}
		}
		const gameTick = () => {
			if (!collisionDetector(0)) {
				//if not collide

				//move moving blocks into a temporary new array, but shifted 1 block down
				//remove moving blocks from real array
				//then new array onto real array
				//then put the temporary one into the moving blocks array and discord the temporary one

				let movingBlocks2 = new Array(bWidth).fill(false,0,bWidth);

				for (let column in movingBlocks2) {
					column = Number(column);
					movingBlocks2[column] = new Array(bHeight).fill(false,0,bHeight)
				}

				//this whole damn thing is because arrays work on references therefore have to be algorithmically cloned
				for (let column in movingBlocks) {
					column = Number(column);
					for (let row in movingBlocks[column]) {
						row = Number(row)
						if (movingBlocks[column][row]) {
							//moving blocks into new array
							movingBlocks2[column][row + 1] = movingBlocks[column][row];

							//remove moving blocks from columns
							columns[column][row] = false;
						}
					}
				}
				for (let column in movingBlocks2) {
					column = Number(column);
					for (let row in movingBlocks2[column]) {
						row = Number(row)

						//put new moving blocks onto columns
						if (movingBlocks2[column][row]) {
							columns[column][row] = movingBlocks2[column][row];
						}
					}
				}	
				//put new moving blocks into real moving blocks
				movingBlocks = movingBlocks2;
				render();
				return false;
			} else {
				movingBlocks = false;
				freezeBlocks();
				render();
				return true;
			}
		}
		const horizontalMove = (dir) => {
			//dir = true is right, false is left
			if (dir) {
				if (!collisionDetector(1)) {
					render();
				}
			} else {
				if (!collisionDetector(2)) {
					render();
				}
			}
		}
		const endGame = () => {

		}

		newBlock();
		render();
		let ticks = setInterval(gameTick, 1000)
	}
	startGame() //until menu is made
}
document.addEventListener("DOMContentLoaded", () => {
	main()
})
