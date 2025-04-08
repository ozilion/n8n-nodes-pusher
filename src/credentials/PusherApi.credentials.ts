import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class PusherApi implements ICredentialType {
    name = 'pusherApi';
    displayName = 'Pusher API';
    properties: INodeProperties[] = [
        {
            displayName: 'App ID',
            name: 'appId',
            type: 'string',
            default: '',
        },
        {
            displayName: 'Key',
            name: 'key',
            type: 'string',
            default: '',
        },
        {
            displayName: 'Secret',
            name: 'secret',
            type: 'string',
            default: '',
        },
        {
            displayName: 'Cluster',
            name: 'cluster',
            type: 'string',
            default: 'eu',
        },
    ];
}

