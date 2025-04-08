# n8n-nodes-pusher

This is an n8n community node for integrating with [Pusher](https://pusher.com), a real-time messaging service that enables developers to add live updates and notifications to their applications.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

This node allows you to:

- Trigger events on Pusher channels
- Get channel information
- List users in presence channels

## Installation

Follow these instructions to install this node:

### In n8n Desktop/Self-hosted:

1. Go to **Settings > Community Nodes**
2. Click on **Install**
3. Enter `n8n-nodes-pusher` in the "Enter npm package name" field
4. Click on **Install**

### In Docker:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n \
  n8n start --tunnel
```

After installation, you can find the Pusher node in the node panel under "Integrations" or by searching for "Pusher".

## Credentials

To use this node, you'll need a Pusher account and the following credentials:

- **App ID**: Your Pusher application ID
- **Key**: Your Pusher application key
- **Secret**: Your Pusher application secret
- **Cluster**: Your Pusher cluster (e.g., mt1, eu, ap1)

You can find these details in your Pusher dashboard.

## Node Reference

### Operations

1. **Trigger Event**
   - Channel Name: The name of the channel to send the event to
   - Event Name: The name of the event
   - Payload: JSON data to send with the event

2. **Get Channel Info**
   - Channel Name: The name of the channel to get information about

3. **List Presence Users**
   - Channel Name: The name of the presence channel to get users from

## Usage Examples

### Sending a notification

This workflow sends a notification to a Pusher channel when triggered.

1. Add a **Trigger** node (e.g., Manual Trigger)
2. Connect a **Pusher** node
3. Set operation to "Trigger Event"
4. Set channel name (e.g., "notifications")
5. Set event name (e.g., "new-notification")
6. Set payload (e.g., `{"message": "Hello from n8n!"}`)
7. Execute the workflow

### Building a chat application

This workflow fetches users in a presence channel for a chat application.

1. Add a **Trigger** node (e.g., Webhook)
2. Connect a **Pusher** node
3. Set operation to "List Presence Users"
4. Set channel name (e.g., "presence-chat")
5. Connect a **Respond to Webhook** node to return the users
6. Execute the workflow

## Resources

- [Pusher Documentation](https://pusher.com/docs)
- [n8n Documentation](https://docs.n8n.io/)

## Version History

- 1.0.3: Initial release

## License

[MIT](LICENSE.md)
