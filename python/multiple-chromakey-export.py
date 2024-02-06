import requests
import json
import time
import os
from urllib.parse import urlparse
from posixpath import basename

token = '##JWT##' # API KEY
jobs = [
  {
    'language': 'en',
    'text': 'Hello, this is my first video.',
    'model': 'M000045058',
    'clothes': 'BG00002320'
  },
  {
    'language': 'en',
    'text': 'Hello, this is my second video.',
    'model': 'M000045058',
    'clothes': 'BG00002320'
  },
  {
    'language': 'en',
    'text': 'Hello, this is my third video.',
    'model': 'M000045058',
    'clothes': 'BG00002320'
  }
]

def generate_video():
  for job in jobs:
    # #1. Request export
    response = requests.post(
      'https://app.deepbrain.io/api/odin/v3/simple/video',
      json = job,
      headers = {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    )

    data = response.json()

    if response.status_code == 200 and data.get('success'):
      project_key = data['data']['projectId']
      print(f'Export succeed - {project_key}')
    else:
      print('Export failed')
      continue

    # #2. Check progress & download
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
