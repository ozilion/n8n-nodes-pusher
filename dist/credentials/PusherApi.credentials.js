"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PusherApi = void 0;
class PusherApi {
    constructor() {
        this.name = 'pusherApi';
        this.displayName = 'Pusher API';
        this.documentationUrl = 'https://pusher.com/docs';
        this.properties = [
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
}
exports.PusherApi = PusherApi;
