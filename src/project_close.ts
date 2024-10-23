import * as crypto from 'crypto';
import * as fs from 'fs';
import archiver from 'archiver';
import * as path from 'path';
import * as glob from 'glob';

const jsonFilePath: string = path.join(__dirname, 'key-iv.json');

const loadKeyAndIVFromJson = (filePath: string): { key: Buffer; iv: Buffer, location_folder: string, build_paths: string[] } => {
    const data = fs.readFileSync(filePath, 'utf8');
    const { key, iv, location_folder, build_paths } = JSON.parse(data);
    return { key: Buffer.from(key, 'hex'), iv: Buffer.from(iv, 'hex'), location_folder, build_paths };  // Convert back to Buffer
};

// Example usage to load the key and IV
const { key: loadedKey, iv: loadedIv, location_folder: location_folder, build_paths: build_paths } = loadKeyAndIVFromJson(jsonFilePath);

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
            if (ext === '.ts' || ext === '.json') {
                folders.push(fullPath);    // เก็บไฟล์
            }

        }
    });

    return folders;
};

interface EncryptZipInput {
    locationFolder: string;
    folderName: string;
    zipFileName: string;
    encryptedFileName: string;
    key: Buffer;
    iv: Buffer;
}

// Function to check if it's a file or folder synchronously
const isFolder = (inputPath: string): boolean => {
    try {
        const stats = fs.statSync(inputPath);

        if (stats.isFile()) {
            return false;
        } else if (stats.isDirectory()) {
            return true;
        } else {
            throw new Error(`${inputPath} is neither a file nor a folder.`);
        }
    } catch (err) {
        throw new Error(`${inputPath} is neither a file nor a folder.`);
    }
};

// Function to zip and encrypt a folder
const zipAndEncryptFolder = async (input: EncryptZipInput): Promise<void> => {
    const folderPath = path.join(input.locationFolder, input.folderName);
    const zipFilePath = path.join(input.locationFolder, input.zipFileName);
    const encryptedZipPath = path.join(input.locationFolder, input.encryptedFileName);

    // Function to zip a folder
    const zipFolder = (folderPath: string, zipFilePath: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const output = fs.createWriteStream(zipFilePath);
            const archive = archiver('zip', { zlib: { level: 9 } });

            output.on('close', () => {
                console.log(`Zipped folder size: ${archive.pointer()} bytes`);
                resolve();
            });

            archive.on('error', (err: Error) => reject(err));

            archive.pipe(output);

            archive.directory(folderPath, false); // Add the folder to the archive
            archive.finalize(); // Complete the archive
        });
    };

    // Function to archive a file
    const zipFile = (filePath: string, archivePath: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const output = fs.createWriteStream(archivePath); // Create a writable stream to the zip file
            const archive = archiver('zip', { zlib: { level: 9 } }); // Create a zip archive with maximum compression

            output.on('close', () => {
                console.log(`Archived file size: ${archive.pointer()} bytes`);
                resolve();
            });

            archive.on('error', (err: Error) => reject(err)); // Handle any errors

            archive.pipe(output); // Pipe the archive data to the file

            archive.file(filePath, { name: path.basename(filePath) }); // Add the file to the archive

            archive.finalize(); // Finalize the archive
        });
    };

    // Function to encrypt a file
    const encryptFile = (filePath: string, encryptedFilePath: string, key: Buffer, iv: Buffer): Promise<void> => {
        return new Promise((resolve, reject) => {
            const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
            const input = fs.createReadStream(filePath);
            const output = fs.createWriteStream(encryptedFilePath);

            input.pipe(cipher).pipe(output);

            output.on('finish', () => {
                console.log('File successfully encrypted');
                resolve();
            });

            output.on('error', (err: Error) => reject(err));
        });
    };

    try {
        if (isFolder(folderPath)) {
            // Zip the folder
            await zipFolder(folderPath, zipFilePath);
        }else{
            // Zip the file
            await zipFile(folderPath, zipFilePath)
                .then(() => {
                    
                })
                .catch((err) => {
                    console.error('Error archiving file:', err);
                });
        }


        // Encrypt the zipped folder
        await encryptFile(zipFilePath, encryptedZipPath, input.key, input.iv);

        // Delete the unencrypted zip file after encryption
        try {
            // fs.unlinkSync(zipFilePath);
            console.log('star zip: ' + zipFilePath);
        } catch (err) {

        }

        console.log('Encryption complete!');
    } catch (err) {
        console.error('Error during zipping or encryption:', err);
    }
};

const getFolderPath = (filePath: string): string => {
    return path.dirname(filePath);
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
    const input: EncryptZipInput = {
        locationFolder: location_folder,     // Replace with actual path
        folderName: path.join(item),                    // Folder to zip
        zipFileName: path.join(item + ".zip"),           // Zip file name
        encryptedFileName: path.join(item+".pack"), // Encrypted file name
        key: loadedKey,
        iv: loadedIv
    };

    zipAndEncryptFolder(input);
}



