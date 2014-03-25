'use strict';

angular.module('chatapp', ['ngCookies',
                          'ngResource',
                          'ui.bootstrap',
                          'ui.router',
                          'ui.select2',
                          'chatapp.controllers',
                          'chatapp.services',
                          'chatapp.directives'
                          ]);

angular.module('chatapp.controllers', ['chatapp.controllers.chatrooms',
                                        'chatapp.controllers.messages',
                                        'chatapp.controllers.users',
                                        'chatapp.controllers.header',
                                        'chatapp.controllers.index'
                                      ]);

angular.module('chatapp.services', ['chatapp.services.chatrooms',
                                      'chatapp.services.messages',
                                      'chatapp.services.users',
                                      'chatapp.services.global'
                                    ]);

