export const failAndExit = (message: string) => {
    console.error(message);
    process.exit(-1);
}