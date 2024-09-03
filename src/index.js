import fs from 'fs';
import path from 'path';
import { calculateCommissionFees } from './calculateCommissionFees.js';

// Read input file
const inputFilePath = process.argv[2];
const inputData = JSON.parse(fs.readFileSync(path.resolve(inputFilePath), 'utf-8'));

// Calculate fees
const fees = calculateCommissionFees(inputData);

// Output results
fees.forEach(fee => console.log(fee));
