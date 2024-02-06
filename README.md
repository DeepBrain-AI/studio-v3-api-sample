<h1 align="center">
  <a href="https://deepbrain.io"><img src="https://docs.deepbrain.io/img/db_logo.svg" alt="DeepBrain AI"></a>
</h1>

# AI STUDIO 3.0 API Sample Code

## Getting Started

This project provides API sample codes written in various languages, demonstrating how to use the Ai Studio 3.0 API. Before running the code, please check the following setup and execution instructions.

### JavaScript (Node.js) Environment Setup
To run this code, Node.js must be installed. All JavaScript (Node.js) examples require the installation of `node-fetch`` via npm for HTTP communication. Here is the installation command:

```bash
  npm install node-fetch
```
Alternatively, you can use other HTTP client modules like axios:


### Python Environment Setup
To run this code, Python 3 must be installed. All Python examples use `requests`` for HTTP communication. Here is the installation command:

```bash
  pip install requests
```

(Optional) It is common and recommended to install necessary packages locally within the project folder using venv, instead of globally. Here are the commands to set up venv and install packages:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows
.\venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# Install packages
pip install requests
```

This will create a virtual environment named venv in the project folder, and only the required packages will be installed within this virtual environment.

## Running Sample Codes
This project includes various sample codes written in different languages. To execute each sample code, use the following commands.

### JavaScript (Node.js) Execution
```bash
  # Export multiple chroma key sample
  npm run node_sample_1

  # Export from json template sample
  npm run node_sample_2

  # Export from exist project sample
  npm run node_sample_3
```
Python Execution
```bash
  # Export multiple chroma key sample
  npm run python_sample_1

  # Export from json template sample
  npm run python_sample_2

  # Export from exist project sample
  npm run python_sample_3
```
Using these commands will execute the sample codes written in each language.

## Detailed Explanation of API and Sample Codes
For a detailed explanation of the sample codes and information about API endpoints, please refer to [here](https//docs.deepbrain.io/aistudiov3/getting-started).