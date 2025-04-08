import app from './app';

const PORT : string|3000 = process.env.PORT || 3000;
app.listen(PORT, () : void => {
    console.log(`UserAccount service running on port ${PORT}`);
});