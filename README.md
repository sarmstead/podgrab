# PODGRAB

## I know you ...
You're just like me. You're trying to move a podcast from [CAST](https://tryca.st/) to a WordPress site. 

Simple enough, except CAST doesn't have a way to batch download your podcast files. Bummer! Enter **PODGRAB**. Simply enter your CAST podcast XML url and watch the magic happen.

## Import your audio files!
Install dependencies
```
npm install
```

Create an environment variable for your podcast url. Run this code:
```
npm run pg-init
```
Enter your CAST podcast XML feed url when prompted.

Import your podcasts
```
npm run pg
```
The code above creates a `podgrab` directory if there isn't one, as well as a `podcasts` directory nested inside of it. It will then query your CAST XML url, create a `podgrab.sh` script, and save each mp3 file to your `podcasts` directory.

## Cleanup
To remove the entire `podgrab` directory, run this code:
```
npm pg-toss-all
```

To remove just your `podgrab.sh` script, run:
```
npm run pg-toss
```
Keep in mind that this script does not remove your mp3 files, which could cause a conflict when importing more audio files in the future.