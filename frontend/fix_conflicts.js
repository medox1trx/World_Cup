const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('<<<<<<< HEAD')) {
        const lines = content.split('\n');
        const newLines = [];
        let skip = false;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.startsWith('<<<<<<< HEAD')) {
                skip = true;
                continue;
            }
            if (skip && line.startsWith('=======')) {
                skip = false;
                continue;
            }
            if (!skip && line.startsWith('>>>>>>>')) {
                continue;
            }
            
            if (!skip) {
                newLines.push(line);
            }
        }
        
        fs.writeFileSync(file, newLines.join('\n'), 'utf8');
        console.log('Fixed conflict in: ' + file);
    }
});

console.log('Done resolving conflicts.');
