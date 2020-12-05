import fs from 'fs';

class Passport {
    eyr: number;
    byr: number;
    hcl: string;
    ecl: string;
    hgt: string;
    iyr: number;
    pid: string;
    valid: boolean;

    constructor() {
        this.eyr = 0;
        this.byr = 0;
        this.hcl = '';
        this.ecl = '';
        this.hgt = '';
        this.iyr = 0;
        this.pid = '';
        this.valid = true;
    }

    validate() {
        const eyr: boolean = this.eyr >= 2020 && this.eyr <= 2030;
        const byr: boolean = this.byr >= 1920 && this.byr <= 2002;
        const hcl: boolean = (this.hcl.match(/^#([a-f0-9]{6})$$/)) ? true : false;
        const ecl: boolean = this.validateEyeColour();
        const hgt: boolean = this.validateHeight();
        const iyr: boolean = this.iyr >= 2010 && this.iyr <= 2020;
        const pid: boolean = (this.pid.match(/^[0-9]{9}$/)) ? true : false;

        console.log(`${eyr}\t${byr}\t${hcl}\t${ecl}\t${hgt}\t${iyr}\t${pid}`);
        console.log(`${this.eyr}\t${this.byr}\t${this.hcl}\t${this.ecl}\t${this.hgt}\t${this.iyr}\t${this.pid}`);
        return (eyr && byr && hcl && ecl && hgt && iyr && pid);
    }
    
    validateHeight(): boolean {
        const height = Number(this.hgt.substring(0, this.hgt.length - 2));
        const unit = this.hgt.slice(-2);

        if (unit === 'cm') {
            if (height >= 150 && height <= 193) {
                return true;
            }
        } else if (unit === 'in') {
            if (height >= 59 && height <= 76) {
                return true;
            }
        }
        return false;
    }
    
    validateEyeColour(): boolean {
        switch (this.ecl) {
            case 'amb':
            case 'blu':
            case 'brn':
            case 'gry':
            case 'grn':
            case 'hzl':
            case 'oth':
                return true;
            default:
                return false;
        }
    }
}

const input = fs.readFileSync('./input.txt', 'utf8').trim().split('\r\n');
const passports = input.reduce((passport, value) => {
    if (value !== '') {
        return `${passport} ${value}`;
    } else {
        return passport + '\n';
    }
}).split('\n').map(passport => passport.trim().split(' '));

function part1(): number {
    let validPassports = 0;
    passports.forEach(passport => {
        const hasCidField = (): boolean => {
            for (let field = 0; field < passport.length; field++) {
                if (passport[field].startsWith('cid')) {
                    return true;
                }
            }
            return false;
        };
        const valid: boolean = (passport.length === 8 || (passport.length === 7 && !hasCidField()));
        console.log(`Cid: ${hasCidField()}, fields: ${passport.length}, valid: ${(passport.length < 8 && hasCidField())}`);
        if (valid) {
            validPassports++;
        }
    });
    return validPassports;
}

const yeet = passports.map(passport => {
    const pp = new Passport();

    passport.forEach(field => {
        const [key, value] = field.split(':');
        switch (key) {
            case 'eyr':
                pp.eyr = Number(value);
                break;
            case 'byr':
                pp.byr = Number(value);
                break;
            case 'hcl':
                pp.hcl = value;
                break;
            case 'ecl':
                pp.ecl = value;
                break;
            case 'hgt':
                pp.hgt = value;
                break;
            case 'iyr':
                pp.iyr = Number(value);
                break;
            case 'pid':
                pp.pid = value;
                break;
        }

    });

    return pp;
});


let validatedPassports = 0; // 189 too high
yeet.forEach(passport => {
    if (passport.validate()) {
        validatedPassports++;
    }
})
console.log(validatedPassports);
// console.log(part1);