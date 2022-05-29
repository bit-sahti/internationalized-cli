import fsPromises from 'fs/promises'

class Repository {
     static async save (data) {
        const { pathname: databaseUrl} = new URL('../database.json', import.meta.url)
        
        const currentData = JSON.parse(await fsPromises.readFile(databaseUrl))
        
        currentData.push(data)
        
        await fsPromises.writeFile(databaseUrl, JSON.stringify(currentData))
     }
}

export { Repository }