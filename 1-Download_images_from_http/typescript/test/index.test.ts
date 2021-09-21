import { main } from "../src/index";

describe("When calling main as cli",() => {
    let exitMock: any = null;
    let errorConsole: any = null;
    let realProcess: any = null;
    let realConsole: any = null;

    beforeEach(() => {
        realProcess = process;
        realConsole = console;
        exitMock = jest.fn();
        errorConsole = jest.fn();
        global.process = { ...realProcess, exit: exitMock };
        global.console = {... realConsole, error: errorConsole};
    });

    afterEach(() => {
        global.process = realProcess;
        global.console = realConsole;
    });

    it("will fail if there are few arguments",()=>{

        main(['node','index.js']);
        expect(exitMock).toHaveBeenCalledWith(-1);
        expect(errorConsole).toHaveBeenCalledWith("Wrong number of arguments");
    });

    it("will fail if the file don't exist",()=>{

        main(['node','index.js',"urls.txt"]);

        expect(exitMock).toHaveBeenCalledWith(-1);
        expect(errorConsole).toHaveBeenCalledWith("File doesn't exist");
       
    });

    it("will work if the file was passed as argument",()=>{
        main(['node','index.js',"test/files/urls.txt"]);
        expect(true).toBeTruthy();
        expect(exitMock).not.toHaveBeenCalled();
        expect(errorConsole).not.toHaveBeenCalled();
    });

    it("will fail if there are too many arguments",()=>{
        

        main(['node','index.js',"urls.txt", "another one"]);

        expect(exitMock).toHaveBeenCalledWith(-1);
        expect(errorConsole).toHaveBeenCalledWith("Wrong number of arguments");
    });
});