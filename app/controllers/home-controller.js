var path = require('path');

module.exports = {
    index: (req, res) => { // Returns home page ( used for initial app load )
        res.sendFile('index.html', { root: path.join(__dirname, '../../public') });
    }
}