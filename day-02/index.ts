import fs from 'fs';

interface Range {
    min: number,
    max: number
}

interface Policy {
    range: Range,
    letter: string,
    password: string
}

const input: Policy[] = fs.readFileSync('./input.txt', 'utf8')
    .trim().split('\r\n').map(row => {
        const [policy, password] = row.split(': ');
        const [range, letter] = policy.split(' ');
        const [min, max] = range.split('-').map(Number);
        return {
            range: {
                min: min,
                max: max
            },
            letter: letter,
            password: password
        }
    });

// const part1 = (input: Policy[]) => input.reduce((valid: number, policy: Policy) => {
//     const validCharacters: number = policy.password.split(policy.letter).join('').length;
//     const difference: number = policy.password.length - validCharacters;
//     const isWithinRange: boolean = difference >= policy.range.min && difference <= policy.range.max;
//     return (isWithinRange) ? valid + 1: valid;
// }, 0);

function filterPasswords(policy: Policy) {
    let matches = 0;
    policy.password.split('').forEach((letter: string) => {
        if (letter == policy.letter) {
            matches++;
        }
    });

    return (matches >= policy.range.min && matches <= policy.range.max);
}

const part1 = (input: Policy[]) => input.filter(filterPasswords).length;
const part2 = (input: Policy[]) => input.reduce((valid: number, policy: Policy) => {
    const first: boolean = policy.letter === policy.password[policy.range.min - 1];
    const second: boolean = policy.letter === policy.password[policy.range.max - 1];
    return valid + ((first !== second) ? 1 : 0);
}, 0);

console.log(part1(input), part2(input));