import fs from "fs";
import readline from "readline";

export const processLineByLine = async(filePath: string): Promise<string[]> => {
    const urls = [];
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    urls.push(line);
  }
  return urls;
};