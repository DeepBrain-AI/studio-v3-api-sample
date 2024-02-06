import requests
import json
import time
import os
from urllib.parse import urlparse
from posixpath import basename

token = '##JWT##' # API KEY

# If you don't have a projectId yet, You can copy projectId from the prior example "Exporting an JSON-based Template".
projectId = '##YOUR_PROJECT_ID##'

def generate_video():
  # #1. Get project info
  response = requests.get(
    f'https://app.deepbrain.io/api/odin/v3/editor/project/{projectId}',
    headers = {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  )

  project_info = response.json()

  if response.status_code == 200 and project_info.get('success'):
    print('Get project succeed')
    project = project_info['data']['project']
  else:
    print('Failed to get project info')
    return

  # #2. Edit scene data
  project['name'] = "Exporting an Existing Project-based"

  model_idx = next((index for (index, clips) in enumerate(project['scenes'][0]['clips']) if clips['type'] == 'aiModel'), None)
  # If you also want to replace your previous image with new image, you can undo comments line below.
  # image_idx = next((index for (index, clips) in enumerate(project['scenes'][0]['clips']) if clips['type'] == 'image'), None)
 
  # Please type in your substitute scripts that will replace your old script for new video.
  if model_idx is not None:
    project['scenes'][0]['clips'][model_idx]['script']['org'] = "This is overriding old script"

  # If you also want to replace your previous image with new image, you can undo comments line below.
  # if image_idx is not None:
  #   project['scenes'][0]['clips'][image_idx]['source_url'] = '##NEW_IMAGE_URL##'

  # #3. Request export
  url_request_export = 
  export_response = requests.post(
    'https://app.deepbrain.io/api/odin/v3/editor/project',
    json = {
      'scenes': project['scenes']
    },
    headers = {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  ).json()

  if export_response.get('success'):
    project_key = export_response['data']['projectId']
    print(f'Export succeed - {project_key}')
  else:
    print('Export failed')
    return

  # #4. Check progress & download
  complete = 0
  while True:
    if complete:
      break

    progress_response = requests.get(
      f'https://app.deepbrain.io/api/odin/v3/editor/progress/{project_key}',
      headers = {
          'Authorization': token,
          'Content-Type': 'application/json'
      }
    )

    progress_data = progress_response.json()

    if progress_response.status_code == 200 and progress_data.get('success'):
      if progress_data['data']['progress'] < 100:
        print(f'Waiting... progress: {progress_data["data"]["progress"]}')
      else:  # export complete
        if progress_data['data'].get('downloadUrl'):
          print(f'Start download - project key: {project_key}')
          parsed_url = urlparse(progress_data['data']['downloadUrl'])
          filename = basename(parsed_url.path)

          if not os.path.exists('./videos'):
            os.makedirs('./videos', exist_ok=True)

          file_path = f'./videos/{filename}'
          
          with open(file_path, 'wb') as file:
            download_response = requests.get(progress_data['data']['downloadUrl'])
            file.write(download_response.content)
            print('Download completed')
            complete = 1

    time.sleep(3)  # Wait 3 seconds

if __name__ == "__main__":
  generate_video()