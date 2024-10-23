import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

const generateKeyAndIV = (): { key: Buffer; iv: Buffer, location_folder:string, build_paths:string[] } => {
    /* setting initial params */
    const location_folder:string = path.join(`C:\\Users\\iampop\\Desktop\\camt study\\research\\myutility`);
    const build_paths:string[] = ["src/*"];
    
    
    
    const key = crypto.randomBytes(32);  // 256-bit key
    const iv = crypto.randomBytes(16);   // 16-byte IV

    return { key, iv, location_folder, build_paths};
};

const saveKeyAndIVToJson = (filePath: string, key: Buffer, iv: Buffer, location_folder:string, build_paths:string[]) => {
    const keyIvData = {
        key: key.toString('hex'),  // Convert to hex for easy storage
        iv: iv.toString('hex'),
        location_folder: location_folder,
        build_paths: build_paths
    };
    fs.writeFileSync(filePath, JSON.stringify(keyIvData, null, 2), 'utf8');
    console.log('Key and IV saved to JSON file at '+filePath);
};

// Example usage:
const { key, iv, location_folder, build_paths} = generateKeyAndIV();
const jsonFilePath = path.join(__dirname, 'key-iv.json');

saveKeyAndIVToJson(jsonFilePath, key, iv, location_folder, build_paths);