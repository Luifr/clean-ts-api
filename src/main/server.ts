import app from './config/app';

// TODO: Get por from config file or env
const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
