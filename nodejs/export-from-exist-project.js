import fetch from "node-fetch";
import * as path from "path";
import * as fs from "fs";
import * as https from "https";

const token = '##JWT##'; // API KEY

// If you don't have a projectId yet, You can copy projectId from the prior example "Exporting an JSON-based Template".
const projectId = '##YOUR_PROJECT_ID##';

const generateVideo = async () => {
  // #1. Get project info
  const projectInfo = await fetch('https://app.deepbrain.io/api/odin/v3/editor/project/' + projectId,
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
      console.log('Get project succeed');
      return res.data.project;
    }
  });

  // #2. Edit scene data
  const project = { ...projectInfo };

  project.name = "Exporting an Existing Project-based";

  const modelIdx = project.scenes[0].clips.findIndex((clips) => clips.type === 'aiModel');
  // If you also want to replace your previous image with new image, you can undo comments line below.
  // const imageIdx = project.scenes[0].clips.findIndex((clips) => clips.type === 'image');

  // Please type in your substitute scripts that will replace your old script for new video.
  project.scenes[0].clips[modelIdx].script.org = "This is overriding old script";

  // If you also want to replace your previous image with new image, you can undo comments line below.
  // project.scenes[0].clips[imageIdx].source_url = "##NEW_IMAGE_URL##";

  // #3. Request export
  const projectKey = await fetch('https://app.deepbrain.io/api/odin/v3/editor/project',
    {
      method: 'POST',
      body: JSON.stringify({ scenes }),
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

  // #4. Check progress & download
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
            const parsedUrl = new URL(res.data.downloadUrl);
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

generateVideo();