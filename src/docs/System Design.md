# System Design

### luna-2.0 has a simplified microservices architecture.

<img src="system_design.png" alt="system design" height="500px" />

## **React Frontend**

The React Frontend consists of several SPA's (Single Page Applications) that are meant to run in different windows. Apps are separated by [react-router](https://reactrouter.com/) routes, communicate with each other using WebSockets, and communicate to the Python backend using REST.

React Frontend apps:

- Control Panel and Subtitle view
- Stream overlay
- Stream animation layer
- A stopwatch app
- Scrabble integration based on https://github.com/smokie777/react-scrabble

## **WebSocket Server**

The WebSocket server is a straightforward, lightweight server written in TypeScript. Use cases for this WebSocket server include:

- Sending data between React apps running in different windows
  - Example: pressing a button on the Control Panel to trigger an animation in the Animation app
- Sending data unilaterally from a Python backend module to a React frontend app
  - Example: sending real-time gift sub events received on the backend to the frontend, so the Animation app can play an animation

## **Python Backend**

The Python backend comprises many different modules. All AI functionality lives in the Python backend. Some modules receive data in real-time and emit this data through WebSockets, while other modules can be accessed through a Flask REST API. All modules can be run with one centralized command, which starts the Flask server, as well as several stand-alone modules, in separate threads.

- **Flask REST server**
  - The Flask server serves as the centralized entry point for all incoming requests.
- **Priority Queue system**
  - The priority queue system can enqueue large amounts of incoming requests in real-time, sort them based on priority, and dequeue them one by one so that the AI VTuber can react to them.
- **LLM integration**
  - luna-2.0 currently uses a [fine-tuned GPT-3.5 model](https://openai.com/index/gpt-3-5-turbo-fine-tuning-and-api-updates/)
  - See the fine-tuning section for more details on fine-tuning
- **[SQLAlchemy](https://www.sqlalchemy.org/) database layer** (with **[Marshmallow](https://marshmallow-sqlalchemy.readthedocs.io/en/latest/) deserialization library** for schemas)
  - The database layer is mainly used to store LLM messages for persistence across restarts/different streams
  - The database layer is also used, to a lesser extent to store statistical/analytical data, such as what channel point redemptions are the most popular
- **TTS integration**
  - luna-2.0 currently uses [Microsoft Azure](https://azure.microsoft.com/en-us/products/ai-services/ai-speech)
  - The main flow is:
    1. Make API request to Microsoft Azure to get the TTS sound file and subtitles
    2. Play the sound file through a virtual cable to allow the VTuber model to lip sync
    3. Send subtitles to frontend via WebSocket to be rendered in a view
  - There's also an ElevenLabs integration, but it's currently only being used for a channel point redemption, which is a TTS based on my voice 😒
- **STT integration**
  - The current STT integration uses Microsoft Azure real-time STT.
  - The main flow is:
    1. Press a button to speak into the microphone
    2. Speech data is sent to Microsoft Azure, which transcribes it into words
- **Image recognition integration**
  - This module allows luna-2.0 to react to screenshots, pictures, and videos.
  - The module uses [Microsoft Azure Dense Captioning](https://portal.vision.cognitive.azure.com/demo/dense-captioning) to generate captions for images, which are subsequently turned into prompts and sent to the LLM.
- **Twitch integration using PyTwitchAPI**
  - This module uses the PubSub, Chat, and Twitch API's to:
    1.  Read Twitch chat
    2.  Listen for new subs/bits/channel point redemptions
    3.  Process !commands in the live chat
    4.  Auto ban/timeout users
- **Discord bot**
  - This module is separate from the rest of the Python backend, and is not included in the one centralized command for running all Python backend moduels>
  - The discord bot has various functionality:
    1. Allow users to chat with luna-2.0 via text messages
    2. Allow users to chat with luna-2.0 via voice in a voice channel (uses SeaVoice for transcription)
    3. Generate automated going live messages
- **Testing**
  - The backend has a unit testing suite written using Python's unittest module
- **VTube Studio (VTS) Integration**
  - Currently, there is only a primitive system where Python can trigger key presses which will in turn trigger VTS hotkeys/actions.
  - Ideally, there would be a proper VTS integration, but unfortunately the VTS authentication system is mind blowingly difficult to work with
- **Singing functionality**
  - See the singing section for more details on this

### The total costs for running this project are as follows:

| Service             | $/Month |
| ------------------- | ------- |
| OpenAI Subscription | $20     |
| OpenAI Usage        | $10-$20 |
| Azure Usage         | $10-$20 |
| ElevenLabs Usage    | $5      |
| Total               | $45-$65 |

Fine-tuning GPT-3.5 also costs roughly $12 per 1000 rows of data.
