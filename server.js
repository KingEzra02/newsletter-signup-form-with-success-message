const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 
const { subscribe } = require('diagnostics_channel');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const subscribers = [];

app.post('/api/subscribe', (req, res) => {
    const email = req.body.email;

    if(!email){
        return res.status(400).json({
            success: false,
            message: 'Email is required'
        });
    }

    if(subscribers.includes(email)){
        return res.json({
            success: true,
            message: 'Already subscribed'
        });
    }
    subscribers.push(email);
    console.log('New subscriber:', email);

    res.json({
        success: true,
        message: 'Subcription successful'
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
