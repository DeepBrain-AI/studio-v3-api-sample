import fetch from "node-fetch";
import https from "https";
import url from "url";
import path from "path";
import fs from "fs";

const token = '##JWT##'; // API KEY
const jobs = [
  {
    language: 'en',
    text: 'Hello, this is my first video.',
    model: 'M000045058',
    clothes: 'BG00002320'
  },
  {
    language: 'en',
    text: 'Hello, this is my second video.',
    model: 'M000045058',
    clothes: 'BG00002320'
  },
  {
    language: 'en',
    text: 'Hello, this is my third video.',
    model: 'M000045058',
    clothes: 'BG00002320'
  }
];

const generateVideo = async () => {
  for (const i in jobs) {
    // #1. Request export
    let projectKey = await fetch('https://app.deepbrain.io/api/odin/v3/simple/video',
      {
        method: 'POST',
        body: JSON.stringify(jobs[i]),
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json()
    ).then((res) => {
      if (res.success == true) {
        console.log('Export succeed - ' + res.data.projectId);
        return res.data.projectId;
      }
    });

    // #2. Check progress & download
    let complete = 0;
    while (true) {
      if (complete) {
        break;
      }
      await fetch('https://app.deepbrain.io/api/odin/v3/editor/progress/' + projectKey,
        {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        }
      ).then((response) => response.json()
      ).then((res) => {
        if (res.success == true) {
          if (res.data.progress < 100) {
            console.log('Waiting... progress: ' + res.data.progress);
          } else { // export complete
            if (res.data.downloadUrl) {
              console.log('Start download - project key: ' + projectKey);
              const parsedUrl = url.parse(res.data.downloadUrl);
              const filename = path.basename(parsedUrl.pathname);
              if (!fs.existsSync('./videos')) {
                fs.mkdirSync('./videos', { recursive: true });
              }
              const file = fs.createWriteStream("./videos/" + filename);
              const request = https.get(res.data.downloadUrl, function (response) {
                response.pipe(file);

                file.on("finish", () => {
                  file.close();
                  console.log("Download completed");
                });
              });
              complete = 1;
            }
          }
        }
      });
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds
    }
  }
}

generateVideo();