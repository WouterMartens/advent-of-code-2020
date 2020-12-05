import fs from 'fs';

interface Part {
    name: string,
    solution: number
}

const input: number[] = fs.readFileSync('./input.txt', 'utf8')
    .trim().split('\r\n').map(Number);

const match: number = 2020;
const results: Part[] = [];

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        if(input[i] + input[j] === match) {
            const part1 = { name: 'part1', solution: input[i] * input[j] };
            if (results.indexOf(part1) === -1) results.push(part1);
        }
        for (let k = 0; k < input.length; k++) {
            if (input[i] + input[j] + input[k] === match) {
                const part2 = { name: 'part2', solution: input[i] * input[j] * input[k] };
                if (results.indexOf(part2) === -1) results.push(part2);
            }
        }
    }
}

console.log(results);