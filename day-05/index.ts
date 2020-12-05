import fs from 'fs';

class Seat {
    x: Number;
    y: Number;

    constructor (x: Number, y: Number) {
        this.x = x;
        this.y = y;
    }
}

const seats: Seat[] = [];

const input = fs.readFileSync('./input.txt', 'utf8').trim().split('\r\n');

function getSeatId(seatLocation: string): number {
    const row = { min: 0, max: 127 };
    const column = { min: 0, max: 7 };
    for (let c = 0; c < seatLocation.length; c++) {
        const diffRow = (row.max - row.min + 1) / 2;
        const diffCol = (column.max - column.min + 1) / 2;
        switch (seatLocation[c]) {
            case 'F':
                row.max -= diffRow;
                break;
            case 'B':
                row.min += diffRow;
                break;
            case 'L':
                column.max -= diffCol;
                break;
            case 'R':
                column.min += diffCol;
                break;
        }
    }

    // console.log(row.min, row.max, column.min, column.max);
    seats.push(new Seat(row.max, column.max));

    return row.max * 8 + column.max;
}

console.log(input.map(seat => getSeatId(seat)).reduce((a, b) => Math.max(a, b)));


const o: number[] = input.map(seat => getSeatId(seat)).sort((a, b) => a - b);

for (let i = 0; i < o.length; i++) {
    if (o[i-1] === o[i] - 1 && o[i+1] === o[i] + 1) {
        // console.log('yes');
    } else {
        console.log(o[i]);
    }
}

