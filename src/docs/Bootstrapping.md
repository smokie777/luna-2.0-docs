# Bootstrapping

## How to bootstrap the luna-2.0 app in a fresh environment

- **Install required software:**
  | Software | Required Version |
  | -------- | ------- |
  | Node.js | v19.7.0 |
  | Python | 3.10.10 |

- **Bootstrap JavaScript WebSocket and Control Panel apps**

  1. `cd javascript/websocket; npm i`
  2. `cd javascript/control_panel; npm i`

- **Bootstrap Python backend**

  1. Install [pip](ttps://pip.pypa.io/en/stable/installation/)
  2. Create venv: `python3 -m venv .venv`
  3. Activate venv: `source .venv/bin/activate`
  4. Confirm python is set up properly:

     - `which python` should display the venv python folder
     - `python -V` should display 3.10.10

  5. Install portaudio (required to install pyaudio): `brew install portaudio`
  6. Install packages: `pip install -r requirements.txt` (if this fails on the PyAudio step, may need to install or update XCode)
  7. Install ffmpeg for the TTS: `brew install ffmpeg`
     - Verify the installation was successful by running: `ffmpeg`
  8. Configure the desired TTS audio output streaming channel here: [get_pyaudio_output_audio_index()](https://github.com/smokie777/luna-2.0/blob/30fac96b08978be34af05589f6bb2e0a5f6e28f9/python/tts_helpers.py#L7)
  9. Ensure Firefox is configured to render all background windows/tabs, so that Streamlabs can stream all necessary views
     - Visit the URL: `about:config`
     - Set the following settings:
       | Setting | Required Value |
       | -------- | ------- |
       | `browser.tabs.loadInBackground` | true |
       | `dom.timeout.enable_budget_timer_throttling` | false |
       | `gfx.webrender.all` | true |
       | `layers.acceleration.force-enabled` | true |
