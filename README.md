# n8n-nodes-pusher

This n8n community node allows you to integrate with [Pusher.com](https://pusher.com) services, providing real-time channels and messaging capabilities to your n8n workflows.

## Features

This node supports the following Pusher.com operations:

- **Trigger Event**: Send an event to a specific channel
- **Trigger Batch**: Send multiple events in a single API call
- **Get Channel Info**: Retrieve information about a specific channel
- **Get Channels**: List all channels in your Pusher application
- **Get Users**: List users in a presence channel
- **Authenticate Channel**: Generate authentication for private or presence channels
- **Authenticate User**: Generate authentication for users
- **Terminate User Connections**: End all active connections for a user
- **Send to User**: Send an event to a specific authenticated user

## Installation

Follow these steps to install this custom node:

### Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings > Community Nodes**
3. Click on **Install**
4. Enter `n8n-nodes-pusher` in the **Name** field
5. Click **Install**

### Manual Installation

1. Navigate to your n8n installation directory
2. Run the following command:
```bash
npm install n8n-nodes-pusher
```
3. Start n8n

## Configuration

To use this node, you need to have a Pusher.com account and create an app there. Once you have your Pusher app, you'll need the following credentials:

- **App ID**: Your Pusher App ID
- **Key**: Your Pusher API Key
- **Secret**: Your Pusher API Secret
- **Cluster**: Your Pusher app's cluster (e.g., "eu", "us", "ap1")

Add these credentials in the n8n **Credentials** section when creating a new Pusher API credential.

## Usage Examples

### Trigger an Event

Sends a message to a Pusher channel that can be received by any client subscribed to that channel.

1. Add a Pusher node
2. Select the **Trigger Event** operation
3. Set the **Channel Name** (e.g., "my-channel")
4. Set the **Event Name** (e.g., "my-event")
5. Add the **Payload** as a JSON object (e.g., `{"message": "Hello from n8n!"}`)

### Send to Authenticated User

Sends a message to a specific authenticated user across all their connections.

1. Add a Pusher node
2. Select the **Send to User** operation
3. Enter the **User ID** of the user you want to send to
4. Set the **Event Name** (e.g., "private-message")
5. Add the **Payload** as a JSON object (e.g., `{"message": "This is a private message"}`)

## Compatibility

This node is compatible with n8n version 1.0.0 and later, and has been specifically tested with n8n version 1.85.4.

## Resources

- [Pusher.com Documentation](https://pusher.com/docs/)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
