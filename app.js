const fs = require('fs').promises;
const Handlebars = require("handlebars");
const chokidar = require('chokidar');
const childProcess = require('child_process');
const vars = require('./variables');


(async () => {  
    try {
        await fs.access(process.env.BUILD_FOLDER_PATH);
    }catch(err) { 
        await fs.mkdir(process.env.BUILD_FOLDER_PATH);
    }   

    const directories = ['views', 'viewModels', 'models']
    await directories.forEach(async (directory) => {
        try {
            await fs.access(`${process.env.BUILD_FOLDER_PATH}/${directory}`);
        }catch(err) { 
            await fs.mkdir(`${process.env.BUILD_FOLDER_PATH}/${directory}`);
        }   
    })
})()

chokidar.watch('src/').on('add', async (srcPath) => {
    const buildPath = srcPath.replace('src',process.env.BUILD_FOLDER_PATH);
    const data = await fs.readFile(srcPath,'utf8');
    const template = Handlebars.compile(data)
    fs.writeFile(buildPath,template(vars),{ flag: 'w+' }
    ) 
    console.log(`Output is '${buildPath}'`);
}); 
childProcess.exec(`npx tailwindcss -i src/views/style.css -o ${process.env.BUILD_FOLDER_PATH}/views/style.css --watch`);
console.log(`Output of css file is '${process.env.BUILD_FOLDER_PATH}/views/style.css'`);
