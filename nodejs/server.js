const express = require('express');
const app = express();

app.use(express.json());

app.use(require('./ee'));

app.use('/', express.static('www'));

const port = 3000;
app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));