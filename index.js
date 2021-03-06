const app = require('./src/app');
const sequelize = require('./src/db/sequelize');

sequelize.sync();

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`App is running on port ${PORT}`));
