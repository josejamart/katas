import { failAndExit } from "./errors";
import fs from "fs";
import { processLineByLine } from "./file";
import { getImage } from "./images";

export const main = async(argv: string[]) => {
    if(argv.length !== 3){
        failAndExit("Wrong number of arguments");
        return;
    }

    const filePath = argv[2];
    if(!fs.existsSync(filePath)){
        failAndExit("File doesn't exist");
        return;
    }

    const urls = await processLineByLine(filePath);
    const calls = urls.map((url: string) => getImage(url));
    await Promise.all(calls);
};

if(process.env.NODE_ENV !== 'test'){
    await main(process.argv);
}