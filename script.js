const CELL_SIZE = 10;
const PADDING = 5;
const WALL_COLOR = 'black';
const FREE_COLOR = 'white';
const BACKGROUND_COLOR = 'gray';
const TRACTOR_COLOR = 'red';
const WIDTH_ANIMATION = true;

const TRACTORS_NUMBER = 10;

const DELAY_TIMEOUT = 0;

const COLUMNS = 101;
const ROWS = 101;

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const matrix = createMatrix(COLUMNS, ROWS);

const tractors = [];
for (let i = 0; i < TRACTORS_NUMBER; i++) {
    tractors.push({
        x: Math.floor(COLUMNS / 2),
        y: Math.floor(ROWS / 2),
    })
}

main();

async function main() {
    while (!isValidMaze()) {
        for (const tractor of tractors) {
            moveTractor(tractor);
        }
        if (WIDTH_ANIMATION) {
            drawMaze();
            for (const tractor of tractors) {
                drawTractor(tractor);
            }
            await delay(DELAY_TIMEOUT);
        }
    }
    drawMaze();
}

function delay(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout))
}

function createMatrix(cols, rows) {
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        const row = [];

        for (let j = 0; j < cols; j++) {
            row.push(null)
        }
        matrix.push(row)
    }
    return matrix;
}

function drawMaze() {
    canvas.width = PADDING * 2 + COLUMNS * CELL_SIZE;
    canvas.height = PADDING * 2 + ROWS * CELL_SIZE;

    drawPath(
        BACKGROUND_COLOR,
        0,
        0,
        canvas.width,
        canvas.height
    );

    for (let x = 0; x < COLUMNS; x++) {
        for (let y = 0; y < ROWS; y++) {
            const color = matrix[y][x] ? FREE_COLOR : WALL_COLOR;

            drawPath(
                color,
                PADDING + x * CELL_SIZE,
                PADDING + y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
        }
    }
}

function drawPath(color, x, y, width, height) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect( x, y, width, height);
}

function drawTractor(tractor) {
    drawPath(
        TRACTOR_COLOR,
        PADDING + tractor.x * CELL_SIZE,
        PADDING + tractor.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
    );
}

function moveTractor(tractor) {
    const directions = [];

    if (tractor.x > 0) {
        directions.push([-2, 0])
    }
    if (tractor.x < COLUMNS - 1) {
        directions.push([2, 0])
    }
    if (tractor.y > 0) {
        directions.push([0, -2])
    }
    if (tractor.y < ROWS - 1) {
        directions.push([0, 2])
    }

    const [dx, dy] = getRandomItem(directions);

    tractor.x += dx;
    tractor.y += dy;

    if (!matrix[tractor.y][tractor.x]) {
        matrix[tractor.y][tractor.x] = true;
        matrix[tractor.y - dy / 2][tractor.x - dx / 2] = true;
    }
}

function getRandomItem(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function isValidMaze() {
    for (let y = 0; y < COLUMNS; y += 2 ) {
        for (let x = 0; x < ROWS; x += 2 ) {
            if (!matrix[y][x]) {
                return false;
            }
        }
    }
    return true;
}
























































