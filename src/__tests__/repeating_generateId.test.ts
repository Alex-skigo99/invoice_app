import { logger } from "../middleware/logger";
import { generateID } from "../services/invoice_service";

// Test the generateID function by Copilot  
function calculateRepeatingResults_1_by_Copilot(iterations: number = 10000): number {
    const results = new Map<string, number>();
    for (let i = 0; i < iterations; i++) {
        const id = generateID.get();
        results.set(id, (results.get(id) || 0) + 1);
    }
    let repeatingCount = 0;
    results.forEach((count) => {
        if (count > 1) {
            repeatingCount++;
        }
    });
    return repeatingCount;
};

// Test the generateID function by myself
function calculateRepeatingResults_2_by_myself(iterations: number = 10000): number {
    let repeatingCount = 0;
    const results = new Set<string>();
    for (let i = 0; i < iterations; i++) {
        const id = generateID.get();
        if (results.has(id)) {
            repeatingCount++;
        } else {
            results.add(id);
        }
    };
    return repeatingCount;
};

function measureExecutionTime(fn: Function, iterations: number): number {
    const start = performance.now();
    fn(iterations);
    const end = performance.now();
    return end - start;
}

describe('calculateRepeatingResults_1_by_Copilot', () => {
    it('should measure execution time', () => {
        const executionTime = measureExecutionTime(calculateRepeatingResults_1_by_Copilot, 10000);
        console.log('calculateRepeatingResults_1_by_Copilot Execution time:', executionTime);
        logger.info(`calculateRepeatingResults_1_by_Copilot Execution time: ${executionTime}`);
        expect(executionTime).toBeLessThan(1000); // Example threshold
    });
});

describe('calculateRepeatingResults_2_by myself', () => {
    it('should measure execution time', () => {
        const executionTime = measureExecutionTime(calculateRepeatingResults_2_by_myself, 10000);
        console.log('calculateRepeatingResults_2_by myself Execution time:', executionTime);
        logger.info(`calculateRepeatingResults_2_by myself Execution time: ${executionTime}`);
        expect(executionTime).toBeLessThan(1000); // Example threshold
    });
});

describe('generateID', () => {
    it('should generate < 100 duplicates after 10 000 iterations', () => {
        const repeatingCount = calculateRepeatingResults_1_by_Copilot();
        console.log('Repeating count:', repeatingCount);
        logger.info(`Repeating count: ${repeatingCount}`);
        expect(repeatingCount).toBeLessThan(100);
    });
});

// 2024-11-06T12:52:46.423Z [info]: calculateRepeatingResults_1_by_Copilot Execution time: 9.472749999999905 
// 2024-11-06T12:52:46.437Z [info]: calculateRepeatingResults_2_by myself Execution time: 8.501207999999906 
// 2024-11-06T12:52:46.448Z [info]: Repeating count: 7 
// 2024-11-06T12:53:10.424Z [info]: calculateRepeatingResults_1_by_Copilot Execution time: 9.117250000000013 
// 2024-11-06T12:53:10.437Z [info]: calculateRepeatingResults_2_by myself Execution time: 8.068333000000166 
// 2024-11-06T12:53:10.446Z [info]: Repeating count: 8 
// 2024-11-06T12:53:30.854Z [info]: calculateRepeatingResults_1_by_Copilot Execution time: 9.192207999999937 
// 2024-11-06T12:53:30.868Z [info]: calculateRepeatingResults_2_by myself Execution time: 8.721749999999929 
// 2024-11-06T12:53:30.876Z [info]: Repeating count: 9 
