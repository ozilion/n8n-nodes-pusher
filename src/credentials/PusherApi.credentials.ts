import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class PusherApi implements ICredentialType {
	name = 'pusherApi';
	displayName = 'Pusher API';
	documentationUrl = 'https://pusher.com/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'App ID',
			name: 'appId',
			type: 'string',
			default: '',
			required: true,
			description: 'The Pusher App ID',
		},
		{
			displayName: 'Key',
			name: 'key',
			type: 'string',
			default: '',
			required: true,
			description: 'The Pusher API Key',
		},
		{
			displayName: 'Secret',
			name: 'secret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The Pusher API Secret',
		},
		{
			displayName: 'Cluster',
			name: 'cluster',
			type: 'string',
			default: 'mt1',
			description: 'The Pusher cluster name',
		},
		{
			displayName: 'Use TLS',
			name: 'useTLS',
			type: 'boolean',
			default: true,
			description: 'Whether to use TLS encryption',
		},
	];
}
