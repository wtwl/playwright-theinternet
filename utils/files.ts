import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export class FilesUtils {

    public static readCSV = function (filePath: string) {
        const records = parse(fs.readFileSync(path.join(__dirname, "..", "test_data", filePath)), {
            columns: true,
            skip_empty_lines: true
        });
        return records;    
    }

    public static isFileExist = async function (filePath: string) {
        return !!(await fs.promises.stat(filePath).catch(e => false));
    }


    public static removeDirectory(directoryPath: string) {
        fs.rmSync(directoryPath, { recursive: true, force: true });
    }
}