import fetch from "node-fetch";
import * as path from "path";
import * as fs from "fs";
import * as https from "https";

const token = '##JWT##'; // API KEY

const generateVideo = async () => {
  // #1. Get scene data from json template
  const sceneInfo = `{
    "name": "Exporting an JSON-based Template.",
    "orientation": "landscape",
    "scenes": [
      {
        "background": {
          "id": "background",
          "type": "background",
          "source_type": "image",
          "source_url": "/images/background/bg_blue_gradient.png",
          "source_color": "rgb(54,188,37)"
        },
        "watermark": false,
        "clips": [
          {
            "id": "aiModel-1h4ij5h8e87",
            "type": "aiModel",
            "layer": 1,
            "top": 146.74129135713008,
            "left": 630.2493927359487,
            "script": {
              "org": "Hello, This is test video.",
              "tts": null
            },
            "effects": [
              {
                "type": "head-only"
              }
            ],
            "height": 2229,
            "width": 679,
            "model": {
              "ai_name": "M000045058",
              "emotion": "BG00002320",
              "language": "en",
              "source_url": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
              "editor": {
                "headCenterX": 613.3333333333334,
                "headCenterY": 290,
                "headWidth": 182,
                "headHeight": 185,
                "modelTightX": 367.33333333333337,
                "modelTightY": 168.16666666666669,
                "modelTightS": 1,
                "modelTightW": 679,
                "modelTightH": 2229,
                "modelOriginW": 1374,
                "modelOriginH": 2444,
                "scale": 0.3,
                "adjustX": -0.016860747210092203,
                "adjustY": -0.024822695035461,
                "spaceB": 46.833333333333314,
                "spaceT": 168.16666666666669,
                "spaceL": 367.33333333333337,
                "spaceR": 327.66666666666663,
                "top": 168.16666666666669,
                "left": 367.33333333333337,
                "height": 2229,
                "width": 679
              },
              "origin": {
                "height": 2444,
                "width": 1374
              },
              "deployImage": {
                "themb_src": "https://cdn.aistudios.com/ai/model-introduce/thumbnails/M000045058_BG00002320.png",
                "themb_width": 384,
                "themb_height": 240,
                "org_src": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320_org.png",
                "org_width": 1374,
                "org_height": 2444,
                "edit_src": "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
                "edit_width": 692,
                "edit_height": 2277
              },
              "deploySize": {
                "org_width": 1374,
                "org_height": 2444,
                "edit_width": 679,
                "edit_height": 2229
              },
              "editorValue": {
                "headCenterX": 613.3333333333334,
                "headCenterY": 290,
                "headWidth": 182,
                "headHeight": 185,
                "modelTightX": 367.33333333333337,
                "modelTightY": 168.16666666666669,
                "modelTightS": 1,
                "modelTightW": 679,
                "modelTightH": 2229,
                "modelOriginW": 1374,
                "modelOriginH": 2444,
                "scale": 0.3,
                "adjustX": -0.016860747210092203,
                "adjustY": -0.024822695035461,
                "spaceB": 46.833333333333314,
                "spaceT": 168.16666666666669,
                "spaceL": 367.33333333333337,
                "spaceR": 327.66666666666663
              },
              "maskFile": "M000045058_BG00002320H_alpha_INV.mp4"
            },
            "name": "aiModel-1h4ij5h8e87",
            "lockScalingFlip": true,
            "fill": "rgb(0,0,0)",
            "scaleX": 1,
            "scaleY": 1,
            "opacity": 100,
            "lockMovementX": false,
            "lockMovementY": false,
            "lockRotation": false,
            "lockScalingX": false,
            "lockScalingY": false,
            "lockSkewingX": false,
            "lockSkewingY": false,
            "lockUniScaling": false,
            "headOnly": null,
            "voiceOnly": false,
            "isDelete": false
          },
          {
            "id": "image-1hgur0eiu11",
            "type": "image",
            "layer": 2,
            "source_url": "https://cdn-studio.deepbrain.io/images/657c091a3dbfd5f37bf9ef8d.jpg",
            "width": 2333,
            "height": 3500,
            "left": 202.78299206561076,
            "top": 121.11799144894621,
            "name": "image-1hgur0eiu11",
            "lockScalingFlip": true,
            "fill": "rgb(0,0,0)",
            "scaleX": 0.1494529947853931,
            "scaleY": 0.1494529947853931,
            "lockMovementX": false,
            "lockMovementY": false,
            "lockRotation": false,
            "lockScalingX": false,
            "lockScalingY": false,
            "lockSkewingX": false,
            "lockSkewingY": false,
            "lockUniScaling": false
          }
        ],
        "thumbnailUrl": null,
        "sceneIdx": 0
      },
      {
        "background": {
          "id": "background",
          "type": "background",
          "source_type": "image",
          "source_url": "/images/background/bg_blue_gradient.png",
          "source_color": "rgb(54,188,37)"
        },
        "watermark": false,
        "clips": [
          {
            "id" : "aiModel-1h4ij5h8e87",
            "type" : "aiModel",
            "layer" : 1,
            "top" : 146.74129135713008,
            "left" : 630.2493927359487,
            "script" : {
              "org" : "",
              "tts" : null
            },
            "effects" : [
              {
                "type" : "head-only"
              }
            ],
            "height" : 2229,
            "width" : 679,
            "model" : {
              "ai_name" : "M000045058",
              "emotion" : "BG00002320",
              "language" : "en",
              "source_url" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
              "editor" : {
                "headCenterX" : 613.3333333333334,
                "headCenterY" : 290,
                "headWidth" : 182,
                "headHeight" : 185,
                "modelTightX" : 367.33333333333337,
                "modelTightY" : 168.16666666666669,
                "modelTightS" : 1,
                "modelTightW" : 679,
                "modelTightH" : 2229,
                "modelOriginW" : 1374,
                "modelOriginH" : 2444,
                "scale" : 0.3,
                "adjustX" : -0.016860747210092203,
                "adjustY" : -0.024822695035461,
                "spaceB" : 46.833333333333314,
                "spaceT" : 168.16666666666669,
                "spaceL" : 367.33333333333337,
                "spaceR" : 327.66666666666663,
                "top" : 168.16666666666669,
                "left" : 367.33333333333337,
                "height" : 2229,
                "width" : 679
              },
              "origin" : {
                "height" : 2444,
                "width" : 1374
              },
              "deployImage" : {
                "themb_src" : "https://cdn.aistudios.com/ai/model-introduce/thumbnails/M000045058_BG00002320.png",
                "themb_width" : 384,
                "themb_height" : 240,
                "org_src" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320_org.png",
                "org_width" : 1374,
                "org_height" : 2444,
                "edit_src" : "https://cdn.aistudios.com/ai/ai_mov_thm/tight_ai_mov_thm_M000045058_BG00002320.png",
                "edit_width" : 692,
                "edit_height" : 2277
              },
              "deploySize" : {
                "org_width" : 1374,
                "org_height" : 2444,
                "edit_width" : 679,
                "edit_height" : 2229
              },
              "editorValue" : {
                "headCenterX" : 613.3333333333334,
                "headCenterY" : 290,
                "headWidth" : 182,
                "headHeight" : 185,
                "modelTightX" : 367.33333333333337,
                "modelTightY" : 168.16666666666669,
                "modelTightS" : 1,
                "modelTightW" : 679,
                "modelTightH" : 2229,
                "modelOriginW" : 1374,
                "modelOriginH" : 2444,
                "scale" : 0.3,
                "adjustX" : -0.016860747210092203,
                "adjustY" : -0.024822695035461,
                "spaceB" : 46.833333333333314,
                "spaceT" : 168.16666666666669,
                "spaceL" : 367.33333333333337,
                "spaceR" : 327.66666666666663
              },
              "maskFile" : "M000045058_BG00002320H_alpha_INV.mp4"
            },
            "name" : "aiModel-1h4ij5h8e87",
            "lockScalingFlip" : true,
            "fill" : "rgb(0,0,0)",
            "scaleX" : 1,
            "scaleY" : 1,
            "opacity" : 100,
            "lockMovementX" : false,
            "lockMovementY" : false,
            "lockRotation" : false,
            "lockScalingX" : false,
            "lockScalingY" : false,
            "lockSkewingX" : false,
            "lockSkewingY" : false,
            "lockUniScaling" : false,
            "headOnly" : null,
            "voiceOnly" : false,
            "isDelete" : true
          },
          {
            "id": "videoImage-1hguqu268jj",
            "type": "videoImage",
            "layer": 2,
            "source_url": "https://cdn-studio.deepbrain.io/images/658279786cebbf10f29e2c5a.png",
            "width": 480,
            "height": 270,
            "video_url": "https://cdn-studio.deepbrain.io/videos/658279796cebbf10f29e2c5b.mp4",
            "volume": 100,
            "left": -4.5977011494253475,
            "top": -3.4483267519073024,
            "name": "videoImage-1hguqu268jj",
            "lockScalingFlip": true,
            "fill": "rgb(0,0,0)",
            "scaleX": 4.008091908352622,
            "scaleY": 4.008091908352622,
            "lockMovementX": false,
            "lockMovementY": false,
            "lockRotation": false,
            "lockScalingX": false,
            "lockScalingY": false,
            "lockSkewingX": false,
            "lockSkewingY": false,
            "lockUniScaling": false
          }
        ],
        "thumbnailUrl": null,
        "sceneIdx": 0
      }
    ]
  }`;


  // #2. Request export
  const projectKey = await fetch('https://app.deepbrain.io/api/odin/v3/editor/project',
    {
      method: 'POST',
      body: sceneInfo,
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

  // #3. Check progress & download
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