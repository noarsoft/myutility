import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as unzipper from 'unzipper';
import * as glob from 'glob';

const jsonFilePath: string = path.join(__dirname, 'key-iv.json');

const loadKeyAndIVFromJson = (filePath: string): { key: Buffer; iv: Buffer, location_folder: string, build_paths: string[] } => {
    const data = fs.readFileSync(filePath, 'utf8');
    const { key, iv, location_folder, build_paths } = JSON.parse(data);
    return { key: Buffer.from(key, 'hex'), iv: Buffer.from(iv, 'hex'), location_folder, build_paths };  // Convert back to Buffer
};

// Example usage to load the key and IV
const { key: loadedKey, iv: loadedIv, location_folder: location_folder, build_paths: build_paths } = loadKeyAndIVFromJson(jsonFilePath);

// AES encryption key and IV (Initialization Vector)
const key = loadedKey;  // 256-bit key
const iv = loadedIv;   // 16-byte IV

const getFileName = (filePath: string, withExtension = true): string => {
    if (withExtension) {
        return path.basename(filePath);  // Returns the file name with the extension
    } else {
        return path.basename(filePath, path.extname(filePath));  // Returns the file name without the extension
    }
};

const getFolderPath = (filePath: string): string => {
    return path.dirname(filePath);
};


const decryptFile = (encryptedFilePath: string, decryptedFilePath: string, key: Buffer, iv: Buffer): Promise<void> => {
    return new Promise((resolve, reject) => {
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        const input = fs.createReadStream(encryptedFilePath);
        const output = fs.createWriteStream(decryptedFilePath);

        input.pipe(decipher).pipe(output);

        output.on('finish', () => {
            // console.log('File successfully decrypted');
            resolve();
        });

        output.on('error', (err: Error) => reject(err));
    });
};

const unzipFile = async (zipFilePath: string, outputDir: string): Promise<void> => {
    fs.createReadStream(zipFilePath)
      .pipe(unzipper.Extract({ path: outputDir }))
      .on('close', () => {
        try {
            fs.unlinkSync(zipFilePath);
        } catch (err) {
            console.error('Error deleting the unencrypted zip file:', err);
        }
        console.log('File successfully unzipped.')
    });
};

const getFilesAndFolders = (dirPath: string): string[] => {
    const files: string[] = [];
    const folders: string[] = [];

    // อ่านข้อมูลไฟล์และโฟลเดอร์ที่อยู่ใน path ที่กำหนด
    const matches = glob.sync(dirPath, { windowsPathsNoEscape: true });
    matches.forEach((match) => {
        const fullPath = path.resolve(match);

        // Check if it's a file or a directory by using fs.lstatSync()
        const stat = fs.lstatSync(fullPath);
        if (stat.isDirectory()) {
            folders.push(fullPath);  // Add directories to the folder list
        } else {
            
            const ext = path.extname(fullPath).toLowerCase(); // ดึงนามสกุลไฟล์และแปลงเป็นตัวพิมพ์เล็ก
            if (ext === '.pack') {
                folders.push(fullPath);    // เก็บไฟล์
            }

        }
    });

    return folders;
};



const list_src_new:string[] = [];

for (const element of build_paths) {
    const list_src:string[] = getFilesAndFolders( path.join(location_folder, element));

    for (let index = 0; index < list_src.length; index++) {
        const element:string = list_src[index];
        
        const srcs:string[] = element.split(location_folder) as string[]
        list_src_new.push( srcs[1] as string )
    }    
}


console.log(list_src_new);

for (const item of list_src_new) {
    // After zipping the folder, encrypt the resulting zip file
    const encryptedZipPath = path.join(location_folder, item + ".pack");
    const decryptedZipPath = path.join(location_folder, item + ".zip");
    console.log(encryptedZipPath + " -> "+ decryptedZipPath);

    decryptFile(encryptedZipPath, decryptedZipPath, key, iv)
        .then(() => {
            console.log(encryptedZipPath)

            const zipFilePath = decryptedZipPath;
            const filename_ext = getFileName(zipFilePath);

            if(filename_ext.endsWith('.ts.zip') || filename_ext.endsWith('.json.zip'))
            {
                const outputDir = getFolderPath(zipFilePath);
                console.log(outputDir);
                unzipFile(zipFilePath, outputDir);
            }else{
                const outputDir = zipFilePath.split(".zip")[0];
                console.log(outputDir);
                unzipFile(zipFilePath, outputDir);
            }
        })
        .catch(err => console.error('Decryption error:', err));
}

