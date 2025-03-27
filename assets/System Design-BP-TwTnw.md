# System Design

### luna-2.0's implementation uses a simplified microservices architecture composed of a React Frontend, a Python Backend, and a WebSocket server.

<img src="system_design.png" alt="system design" height="500px" />

## **React Frontend**

The React Frontend consists of several SPA's (Single Page Applications) that are meant to run simultaneously in different windows. Apps are separated by [react-router](https://reactrouter.com/) routes, communicate with each other using WebSockets, and communicate to the Python backend using a REST API.

React Frontend apps:

- Control Panel and Subtitle view
- Stream overlay
- Stream animation layer
- A stopwatch app
- Scrabble integration based on https://github.com/smokie777/react-scrabble

## **WebSocket Server**

The WebSocket server is a straightforward, lightweight server written in TypeScript. Use cases for this WebSocket server include:

- Sending data between React apps running in different windows
  - Example: You can press a button on the Control Panel app to trigger an animation in the Animation app.
- Sending data unilaterally from a Python backend module to a React frontend app
  - Example: If the backend receives a real-time Twitch gift sub event, it can ping the Animation app to play an animation.

## **Python Backend**

The Python backend comprises many different modules. All AI functionality lives in the Python backend. Some modules receive data in real-time and emit this data through WebSockets, while other modules can be accessed through a Flask REST API. All modules can be run with one centralized command, which starts a Flask server, as well as several stand-alone modules, in separate threads.

- **Flask REST server**
  - The Flask server serves as the centralized entry point for all incoming requests.
- **Priority Queue system**
  - The priority queue system can asynchronously enqueue large amounts of incoming requests in real-time, sort them based on priority, and dequeue them synchronously for the AI VTuber to react to.
- **LLM integration**
  - luna-2.0 currently uses a [fine-tuned GPT-3.5 model](https://openai.com/index/gpt-3-5-turbo-fine-tuning-and-api-updates/). An upgrade to fine-tuned [GPT-4o-mini](https://platform.openai.com/docs/guides/fine-tuning) is planned for the near future.
  - This is the main LLM flow:
    1. Receive a Twitch chat message, or Twitch event, from the Twitch API
    2. Generate a prompt based on the message or event
    3. Include the prompt in an API request to [OpenAI's Chat Completions API](https://platform.openai.com/docs/api-reference/chat/create) to generate the AI VTuber's response
    4. Save the response in a local variable which will serve as short-term memory, and also make an entry to the [Messages](https://github.com/smokie777/luna-2.0/blob/main/python/db.py#L7) database table, which will serve as long-term memory
- **[SQLAlchemy](https://www.sqlalchemy.org/) database layer** (with **[Marshmallow](https://marshmallow-sqlalchemy.readthedocs.io/en/latest/) deserialization library** for schemas)
  - The database layer is mainly used to store LLM messages for persistence across restarts or different streams.
  - The database layer is also used, to a lesser extent, to store data such as how often various channel point redemptions are redeemed.
- **TTS integration**
  - luna-2.0 currently uses [Microsoft Azure](https://azure.microsoft.com/en-us/products/ai-services/ai-speech).
  - This is the main TTS flow:
    1. Make an API request to Microsoft Azure to get the TTS sound file and subtitles
    2. Play the sound file through a virtual cable to allow the VTuber model to lip sync along with the speech
    3. Send subtitles to the frontend via WebSocket to be rendered in a view and displayed live on stream
  - There is also an ElevenLabs integration, but that's currently only being used for a channel point redemption for a TTS that was trained using my own voice.
- **STT integration**
  - The current STT integration uses Microsoft Azure real-time STT.
  - This is the main STT flow:
    1. Press a button to speak into the microphone
    2. Speech data is sent to Microsoft Azure, which transcribes it into words
- **Image recognition integration**
  - The image recognition module allows the AI VTuber to react to screenshots, pictures, and videos.
  - The module uses [Microsoft Azure Dense Captioning](https://portal.vision.cognitive.azure.com/demo/dense-captioning) to generate captions for images, which are turned into prompts, and sent to the LLM.
- **Twitch integration using PyTwitchAPI**
  - The PyTwitchAPI module uses the PubSub, Chat, and Twitch API's to:
    1.  Read Twitch chat
    2.  Listen for new subs/bits/channel point redemptions
    3.  Process !commands in the live chat
    4.  Auto ban/timeout users that break the rules, or are detected to be spam bots
- **Discord bot**
  - The discord bot module is separate from the rest of the Python backend, and is not included in the one centralized command for running all Python backend modules.
  - Rather than making requests to the Flask server, or listening for incoming data using WebSockets, the discord bot instead simply imports and uses any necessary methods from other backend files. As a result, the discord bot module can be started and stopped independently at any time, and will not interfere with the rest of the backend application flow.
  - The discord bot has various functionalities:
    1. Users can chat with luna-2.0 via text messages
    2. Users can speak with luna-2.0 via voice in voice channels (this feature uses SeaVoice for transcription)
    3. The bot can generate automated going live messages
    4. The bot can timeout or ban users who break the rules
- **Testing**
  - The backend has a unit testing suite written using Python's [unittest](https://docs.python.org/3/library/unittest.html) framework.
- **VTube Studio (VTS) Integration**
  - Currently, there is only a primitive system where Python can trigger key presses, which will in turn trigger VTS hotkeys/actions.
  - Ideally, there would be a proper VTS integration, but unfortunately, I found the VTS authentication system too difficult to work with.
- **Singing functionality**
  - The AI VTuber can sing. See the singing sections in the docs for more details.

### The estimated monthly costs of running this project are as follows:

| Service             | $/Month |
| ------------------- | ------- |
| OpenAI Subscription | $20     |
| OpenAI Usage        | $10-$20 |
| Azure Usage         | $10-$20 |
| ElevenLabs Usage    | $5      |
| Total               | $45-$65 |

Running a GPT-3.5 fine-tuning job also costs roughly $12 per 1000 rows of data.
