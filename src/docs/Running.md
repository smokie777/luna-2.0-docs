# Running

### How to run the luna-2.0 app locally

1. **Start WebSocket server**
   - `cd javascript/websocket; npm start`
2. **Start Control Panel**
   - `cd javascript/control_panel; npm start`
3. **Start Python backend**
   - `source .venv/bin/activate`
   - `python3 server.py`
4. **Start Discord Bot**
   - `python3 luna_discord_bot.py`
   - If this command fails, you may need to navigate to Applications/python and run the install certificates script
5. **Setup local streaming environment**

   - Open OBS and start virtual camera to enable the vtuber's idle animation
   - Open VTube studio, and enable "preview speech"
   - Open windows media player (for eleven labs tts)
   - Open 3 windows of firefox:
     | View | Url |
     | -------- | ------- |
     | Control Panel/Subtitles | http://localhost:3001 |
     | Stream Overlay | http://localhost:3001/overlay or http://localhost:3001/overlaywithtimer |
     | Stream Animations | http://localhost:3001/animations |
   - Open Spotify/YouTube and play some music
   - Open Twitch chat popout
   - Open Streamlabs, and click Go Live!
   - Send `@luna !live` in Discord to generate an automated going live message
