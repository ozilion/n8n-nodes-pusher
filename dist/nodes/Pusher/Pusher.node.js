"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pusher = exports.PusherNode = void 0;
const n8n_workflow_1 = require("n8n-workflow");
// Pusher kütüphanesini import edelim
const PusherLib = __importStar(require("pusher"));
class PusherNode {
    constructor() {
        this.description = {
            displayName: 'Pusher',
            name: 'pusher',
            group: ['output'],
            version: 1,
            description: 'Send events and manage channels using Pusher API',
            subtitle: '={{$parameter["operation"]}}',
            icon: 'file:icon.svg',
            defaults: {
                name: 'Pusher',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'pusherApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Trigger Event',
                            value: 'trigger',
                            description: 'Trigger an event on a channel',
                            action: 'Trigger an event on a channel',
                        },
                        {
                            name: 'Trigger Batch',
                            value: 'triggerBatch',
                            description: 'Trigger multiple events in a single API call',
                            action: 'Trigger multiple events in a single API call',
                        },
                        {
                            name: 'Get Channel Info',
                            value: 'channelInfo',
                            description: 'Get information about a channel',
                            action: 'Get information about a channel',
                        },
                        {
                            name: 'Get Channels',
                            value: 'getChannels',
                            description: 'Get a list of all channels in an app',
                            action: 'Get a list of all channels in an app',
                        },
                        {
                            name: 'Get Users',
                            value: 'getUsers',
                            description: 'Get a list of users in a presence channel',
                            action: 'Get a list of users in a presence channel',
                        },
                        {
                            name: 'Authenticate Channel',
                            value: 'authenticateChannel',
                            description: 'Authenticate a private or presence channel',
                            action: 'Authenticate a channel',
                        },
                        {
                            name: 'Authenticate User',
                            value: 'authenticateUser',
                            description: 'Generate authentication for a user',
                            action: 'Authenticate a user',
                        },
                        {
                            name: 'Terminate User Connections',
                            value: 'terminateUserConnections',
                            description: 'Terminate all connections for a user',
                            action: 'Terminate user connections',
                        },
                        {
                            name: 'Send to User',
                            value: 'sendToUser',
                            description: 'Send an event to a specific authenticated user',
                            action: 'Send an event to a user',
                        },
                    ],
                    default: 'trigger',
                },
                // Fields for Trigger Event operation
                {
                    displayName: 'Channel Name',
                    name: 'channel',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['trigger', 'channelInfo', 'getUsers', 'authenticateChannel'],
                        },
                    },
                    placeholder: 'my-channel',
                    description: 'The name of the channel',
                },
                {
                    displayName: 'Event Name',
                    name: 'eventName',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['trigger', 'sendToUser'],
                        },
                    },
                    placeholder: 'my-event',
                    description: 'The name of the event',
                },
                {
                    displayName: 'Payload',
                    name: 'payload',
                    type: 'json',
                    default: '{}',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['trigger', 'sendToUser'],
                        },
                    },
                    placeholder: '{"message": "Hello world"}',
                    description: 'The payload to send with the event',
                },
                {
                    displayName: 'Socket ID',
                    name: 'socketId',
                    type: 'string',
                    default: '',
                    required: false,
                    displayOptions: {
                        show: {
                            operation: ['trigger', 'authenticateChannel'],
                        },
                    },
                    placeholder: '1234.567890',
                    description: 'The socket ID to exclude from receiving the event (optional)',
                },
                // Fields for Trigger Batch operation
                {
                    displayName: 'Events',
                    name: 'events',
                    type: 'json',
                    default: '[{"channel": "my-channel", "name": "my-event", "data": {"message": "Hello world"}}]',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['triggerBatch'],
                        },
                    },
                    description: 'The events to trigger in batch (max 10 events)',
                    placeholder: '[{"channel": "my-channel", "name": "my-event", "data": {"message": "Hello world"}}]',
                },
                // Fields for Get Channel Info operation
                {
                    displayName: 'Info',
                    name: 'info',
                    type: 'multiOptions',
                    displayOptions: {
                        show: {
                            operation: ['channelInfo'],
                        },
                    },
                    options: [
                        {
                            name: 'Subscription Count',
                            value: 'subscription_count',
                            description: 'Get the number of connections subscribed to the channel',
                        },
                        {
                            name: 'User Count (Presence Channels Only)',
                            value: 'user_count',
                            description: 'Get the number of distinct users subscribed to the channel',
                        },
                    ],
                    default: ['subscription_count'],
                    description: 'The information to retrieve about the channel',
                },
                // Fields for Get Channels operation
                {
                    displayName: 'Filter Prefix',
                    name: 'filterByPrefix',
                    type: 'string',
                    default: '',
                    required: false,
                    displayOptions: {
                        show: {
                            operation: ['getChannels'],
                        },
                    },
                    placeholder: 'presence-',
                    description: 'Filter channels by prefix (e.g., "presence-")',
                },
                {
                    displayName: 'Include Info',
                    name: 'info',
                    type: 'boolean',
                    default: false,
                    displayOptions: {
                        show: {
                            operation: ['getChannels'],
                        },
                    },
                    description: 'Whether to include additional channel information',
                },
                // Fields for Authenticate User operation
                {
                    displayName: 'Socket ID',
                    name: 'socketId',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['authenticateUser'],
                        },
                    },
                    placeholder: '1234.567890',
                    description: 'The socket ID to authenticate',
                },
                {
                    displayName: 'User Data',
                    name: 'userData',
                    type: 'json',
                    default: '{"id": "user-123", "name": "John Doe"}',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['authenticateUser'],
                        },
                    },
                    description: 'The user data for authentication (must include an id property)',
                },
                // Fields for Authenticate Channel operation
                {
                    displayName: 'Channel Data',
                    name: 'channelData',
                    type: 'json',
                    default: '{"user_id": "user-123", "user_info": {"name": "John Doe"}}',
                    required: false,
                    displayOptions: {
                        show: {
                            operation: ['authenticateChannel'],
                        },
                    },
                    description: 'The channel data for presence channel authentication (required for presence channels)',
                },
                // Fields for Terminate User Connections operation
                {
                    displayName: 'User ID',
                    name: 'userId',
                    type: 'string',
                    default: '',
                    required: true,
                    displayOptions: {
                        show: {
                            operation: ['terminateUserConnections', 'sendToUser'],
                        },
                    },
                    placeholder: 'user-123',
                    description: 'The user ID whose connections should be terminated',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        // Get credentials
        const credentials = await this.getCredentials('pusherApi');
        // Initialize Pusher client
        const pusherClient = new PusherLib.default({
            appId: credentials.appId,
            key: credentials.key,
            secret: credentials.secret,
            cluster: credentials.cluster || 'mt1',
            useTLS: credentials.useTLS || true,
        });
        for (let i = 0; i < items.length; i++) {
            try {
                const operation = this.getNodeParameter('operation', i);
                // Trigger Event operation
                if (operation === 'trigger') {
                    const channel = this.getNodeParameter('channel', i);
                    const eventName = this.getNodeParameter('eventName', i);
                    const payload = JSON.parse(this.getNodeParameter('payload', i));
                    const socketId = this.getNodeParameter('socketId', i, '');
                    // Prepare params object for optional socket_id
                    const params = socketId ? { socket_id: socketId } : {};
                    // Get optional info parameter
                    const infoParam = this.getNodeParameter('info', i, []);
                    if (infoParam && infoParam.length > 0) {
                        Object.assign(params, { info: infoParam.join(',') });
                    }
                    // Trigger the event
                    const response = await pusherClient.trigger(channel, eventName, payload, params);
                    let responseData;
                    if (response) {
                        responseData = await response.json();
                    }
                    else {
                        responseData = { success: true };
                    }
                    returnData.push({
                        json: {
                            success: true,
                            operation,
                            channel,
                            eventName,
                            payload,
                            ...responseData,
                        },
                    });
                }
                // Trigger Batch operation
                else if (operation === 'triggerBatch') {
                    const events = JSON.parse(this.getNodeParameter('events', i));
                    // Make sure events is an array and has at most 10 items
                    if (!Array.isArray(events)) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Events must be an array', {
                            itemIndex: i,
                        });
                    }
                    if (events.length > 10) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'You can trigger at most 10 events in a batch', { itemIndex: i });
                    }
                    // Trigger batch of events
                    const response = await pusherClient.triggerBatch(events);
                    let responseData;
                    if (response) {
                        responseData = await response.json();
                    }
                    else {
                        responseData = { success: true };
                    }
                    returnData.push({
                        json: {
                            success: true,
                            operation,
                            events,
                            ...responseData,
                        },
                    });
                }
                // Get Channel Info operation
                else if (operation === 'channelInfo') {
                    const channel = this.getNodeParameter('channel', i);
                    const info = this.getNodeParameter('info', i);
                    const params = {};
                    if (info && info.length > 0) {
                        params.info = info.join(',');
                    }
                    const response = await pusherClient.get({
                        path: `/channels/${channel}`,
                        params,
                    });
                    const responseData = await response.json();
                    returnData.push({
                        json: {
                            operation,
                            channel,
                            ...responseData,
                        },
                    });
                }
                // Get Channels operation
                else if (operation === 'getChannels') {
                    const filterByPrefix = this.getNodeParameter('filterByPrefix', i, '');
                    const includeInfo = this.getNodeParameter('info', i, false);
                    const params = {};
                    if (filterByPrefix) {
                        params.filter_by_prefix = filterByPrefix;
                    }
                    if (includeInfo) {
                        params.info = 'user_count,subscription_count';
                    }
                    const response = await pusherClient.get({
                        path: '/channels',
                        params,
                    });
                    const responseData = await response.json();
                    returnData.push({
                        json: {
                            operation,
                            ...responseData,
                        },
                    });
                }
                // Get Users operation
                else if (operation === 'getUsers') {
                    const channel = this.getNodeParameter('channel', i);
                    if (!channel.startsWith('presence-')) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Only presence channels are supported for this operation', { itemIndex: i });
                    }
                    const response = await pusherClient.get({
                        path: `/channels/${channel}/users`,
                    });
                    const responseData = await response.json();
                    returnData.push({
                        json: {
                            operation,
                            channel,
                            ...responseData,
                        },
                    });
                }
                // Authenticate User operation
                else if (operation === 'authenticateUser') {
                    const socketId = this.getNodeParameter('socketId', i);
                    const userData = JSON.parse(this.getNodeParameter('userData', i));
                    if (!userData.id) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'User data must include an id property', { itemIndex: i });
                    }
                    const authResponse = pusherClient.authenticateUser(socketId, userData);
                    returnData.push({
                        json: {
                            operation,
                            auth: authResponse,
                        },
                    });
                }
                // Authenticate Channel operation
                else if (operation === 'authenticateChannel') {
                    const channel = this.getNodeParameter('channel', i);
                    const socketId = this.getNodeParameter('socketId', i);
                    let channelData;
                    if (channel.startsWith('presence-')) {
                        channelData = JSON.parse(this.getNodeParameter('channelData', i, '{}'));
                        if (!channelData.user_id) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Channel data for presence channels must include a user_id property', { itemIndex: i });
                        }
                    }
                    const authResponse = pusherClient.authorizeChannel(socketId, channel, channelData);
                    returnData.push({
                        json: {
                            operation,
                            channel,
                            auth: authResponse,
                        },
                    });
                }
                // Terminate User Connections operation
                else if (operation === 'terminateUserConnections') {
                    const userId = this.getNodeParameter('userId', i);
                    await pusherClient.terminateUserConnections(userId);
                    returnData.push({
                        json: {
                            success: true,
                            operation,
                            userId,
                        },
                    });
                }
                // Send to User operation
                else if (operation === 'sendToUser') {
                    const userId = this.getNodeParameter('userId', i);
                    const eventName = this.getNodeParameter('eventName', i);
                    const payload = JSON.parse(this.getNodeParameter('payload', i));
                    const response = await pusherClient.sendToUser(userId, eventName, payload);
                    let responseData;
                    if (response) {
                        responseData = await response.json();
                    }
                    else {
                        responseData = { success: true };
                    }
                    returnData.push({
                        json: {
                            success: true,
                            operation,
                            userId,
                            eventName,
                            payload,
                            ...responseData,
                        },
                    });
                }
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({ json: { error: error.message } });
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.PusherNode = PusherNode;
exports.Pusher = PusherNode;
