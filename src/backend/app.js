const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weather');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Athugaðu að þetta er til staðar
app.use(express.json());
app.use('/api/weather', weatherRoutes);


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
