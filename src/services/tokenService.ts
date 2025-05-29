import {randomBytes} from 'crypto'


const generateToken = (bytes: number = 32): string => {
    const token = randomBytes(length).toString('hex');

    return token;
}
