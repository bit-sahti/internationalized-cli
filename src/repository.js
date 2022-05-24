import { writeFile, readFile } from 'fs/promises'

export const save = async (data) => {
    const { pathname: databaseUrl} = new URL('../database.json', import.meta.url)
    
    const currentData = JSON.parse(await readFile(databaseUrl))
    
    currentData.push(data)
    
    await writeFile(databaseUrl, JSON.stringify(currentData))
}
