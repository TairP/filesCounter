import log from '@ajar/marker';
import { count } from 'console';
import { readdir } from 'fs';
import fs from 'fs/promises';
import path from 'path';

console.time('MyProcess took');

(async () => {
    async function countFiles(dirPath, count = 0) {
        const dirContents = await fs.readdir(dirPath, {withFileTypes: true})
        for (let content of dirContents) {
            if (content.isFile()) {
                count++
            } else if (content.isDirectory()) {
                count = await countFiles(path.join(dirPath, content.name), count)
            }
            log.blue(dirPath + ' - file num ' + count)
        }
        return count
    }
    const result = await countFiles('./node_modules')
    log.magenta('We have ' + result + ' files')
})().catch(log.error)

console.timeEnd('MyProcess took');