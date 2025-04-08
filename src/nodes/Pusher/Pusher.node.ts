import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    NodeConnectionType,
} from 'n8n-workflow';


import Pusher from 'pusher';

export class PusherNode implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Pusher',
        name: 'pusher',
        group: ['output'],
        version: 1,
        description: 'Send events and manage channels using Pusher API',
        defaults: {
            name: 'Pusher',
        },
        inputs: ['main'] as NodeConnectionType[],
        outputs: ['main'] as NodeConnectionType[],
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
                options: [
                    { name: 'Trigger Event', value: 'trigger' },
                    { name: 'Get Channel Info', value: 'channelInfo' },
                    { name: 'List Presence Users', value: 'presenceUsers' },
                ],
                default: 'trigger',
            },
            {
                displayName: 'Channel Name',
                name: 'channel',
                type: 'string',
                default: '',
                required: true,
            },
            {
                displayName: 'Event Name',
                name: 'eventName',
                type: 'string',
                default: '',
                displayOptions: {
                    show: {
                        operation: ['trigger'],
                    },
                },
            },
            {
                displayName: 'Payload (JSON)',
                name: 'payload',
                type: 'json',
                default: '{}',
                displayOptions: {
                    show: {
                        operation: ['trigger'],
                    },
                },
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        const credentials = await this.getCredentials('pusherApi');
        const pusher = new Pusher({
            appId: credentials.appId as string,
            key: credentials.key as string,
            secret: credentials.secret as string,
            cluster: credentials.cluster as string,
            useTLS: true,
        });

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;
            const channel = this.getNodeParameter('channel', i) as string;

            if (operation === 'trigger') {
                const eventName = this.getNodeParameter('eventName', i) as string;
                const payload = this.getNodeParameter('payload', i) as object;
                await pusher.trigger(channel, eventName, payload);
                returnData.push({ json: { success: true, channel, eventName, payload } });
            }

            if (operation === 'channelInfo') {
                const res = await pusher.get({ path: `/channels/${channel}` });
                const body = await res.json();
                returnData.push({ json: body });
            }

            if (operation === 'presenceUsers') {
                const res = await pusher.get({ path: `/channels/${channel}/users` });
                const body = await res.json();
                returnData.push({ json: body });
            }
        }

        return [returnData];
    }
}
