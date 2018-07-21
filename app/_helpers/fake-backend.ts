import { BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { User } from '../_models/user';
 
export let fakeBackendProvider = {
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
        let testUser = { name: 'Test', uuid: '1234', verified: 'Y', credentials: {email: 'test@test.com', password: 'testtest'}};
        
        backend.connections.subscribe((connection: MockConnection) => {
            setTimeout(() => {
                if (connection.request.url.endsWith('/leagues') && connection.request.method === RequestMethod.Get) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { result: 'success' } })
                    ));
                }                
                if (connection.request.url.endsWith('/user') && connection.request.method === RequestMethod.Post) {
                    let params = JSON.parse(connection.request.getBody());
                    testUser.name = params.name;
                    testUser.verified = 'Y';
                    testUser.credentials.email = params.credentials.email;
                    testUser.credentials.password = params.credentials.passwordText;
 
                    if (testUser) {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { result: 'success' } })
                        ));
                    } else {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { result: 'failure' } })
                        ));
                    }
                }
                if (connection.request.url.endsWith('/user') && connection.request.method === RequestMethod.Put) {
                    let params = JSON.parse(connection.request.getBody());
                    testUser.name = params.name;
                    testUser.verified = 'Y';
                    testUser.credentials.email = params.credentials.email;
 
                    if (testUser) {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { result: 'success' } })
                        ));
                    } else {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { result: 'failure' } })
                        ));
                    }
                }                
                if (connection.request.url.endsWith('/user/' + testUser.credentials.email) && connection.request.method === RequestMethod.Get) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: testUser })
                    ));
                }
                if (connection.request.url.endsWith('/user/email') && connection.request.method === RequestMethod.Post) {
                    connection.mockRespond(new Response(
                        new ResponseOptions({ status: 200, body: { result: 'success' } })
                    ));
                }
                if (connection.request.url.endsWith('/user/forgotPassword') && connection.request.method === RequestMethod.Post) {
                    let params = JSON.parse(connection.request.getBody());
 
                    if (params.email === testUser.credentials.email) {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { result: 'success' } })
                        ));
                    } else {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { result: 'invalid' }  })
                        ));
                    }
                }
                if (connection.request.url.endsWith('/user/login') && connection.request.method === RequestMethod.Post) {
                    let params = JSON.parse(connection.request.getBody());
 
                    if (params.email === testUser.credentials.email && params.password === testUser.credentials.password) {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { result: 'success', token: 'fake-jwt-token', verified: testUser.verified } })
                        ));
                    } else {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { result: 'failure' } })
                        ));
                    }
                }
                if (connection.request.url.endsWith('/user/resetPassword') && connection.request.method === RequestMethod.Post) {
                    let params = JSON.parse(connection.request.getBody());

                    if (testUser.credentials.password != params.passwordCurrent) {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { result: 'failure' } })
                        ));
                    } else {
                        testUser.credentials.password = params.passwordText;
    
                        if (testUser) {
                            connection.mockRespond(new Response(
                                new ResponseOptions({ status: 200, body: { result: 'success' } })
                            ));
                        } else {
                            connection.mockRespond(new Response(
                                new ResponseOptions({ status: 200, body: { result: 'failure' } })
                            ));
                        }
                    }
                }
            }, 500);
        });
        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
}
