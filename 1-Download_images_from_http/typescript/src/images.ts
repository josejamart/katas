import http from "http";
import fs from "fs";

export const getImage = (url: string): Promise<String> => {
    const file = fs.createWriteStream("file.jpg");
    return new Promise<String>((resolve, reject) => {
       var post_req = http.request(url, (res) => {
           res.pipe(file);
           res.on('close', () => resolve("file.jpg"));
       });
   
       post_req.end();
    });
}