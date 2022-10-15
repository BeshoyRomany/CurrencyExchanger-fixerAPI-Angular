export class SharedMethods {
    concateStrings(joinSymbol: string = '-', ...strings: string[]){
       return strings.join(` ${joinSymbol} `);
    }
}