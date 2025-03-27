# Adding a new feature

### The pages in this section serve as references on how to add new full-stack features to the luna-2.0 codebase.

An example of a feature that spans the whole stack is the `Get DB Rows By Page` feature. This feature allows the user to click a button on the control panel to receive data from the SQLAlchemy database.

A full-stack feature will generally involve:

1. Adding UI elements in the Control Panel app, or another frontend app
2. Creating an endpoint in the Flask API
3. Database changes, if needed
4. WebSocket code changes may also be needed if the feature needs to send data between React apps, or from the backend to the frontend.
