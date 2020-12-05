import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf8').trim().split('\r\n');

interface Position {
    x: number,
    y: number
}

const delta = { x: 3, y: 1 };
function part1(delta: Position): number {
    const height = input.length;
    let x = 0;
    let trees = 0;
    for (let i = delta.y; i < height; i += delta.y) { // Move y
        x += delta.x; // Move x
        const row = input[i].split(''); // Array of the current row
        const step = x % row.length; // Calculate position
        const tile = row[step]; // Current tile
        if (tile === '#') {
            trees++; // Count a tree if tile is #
        }
    }
    return trees;
}

function part2(): number {
    const slopes = [{x:1, y:1}, {x:3, y:1}, {x:5, y:1}, {x:7, y:1}, {x:1, y:2}];
    return slopes.reduce((total: number, slope: Position) => total *= part1(slope), 1);
}

console.log(part1(delta), part2());


