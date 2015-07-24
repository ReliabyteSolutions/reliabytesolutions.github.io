(function() {
    'use strict';

    angular.module('workr',[
        'templates',
        'shell',
        'wkr.home',
        'wkr.tasks',
        'wkr.projects',
        'wkr.timesheet'
    ]).run(runBlock);

    runBlock.$inject = [
        '$rootScope',
        '$state',
        '$stateParams'
    ];

    function runBlock($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
})();
(function() {
    'use strict';

    angular.module('shell',[
        'ngTouch',
        'ui.router'
    ])
})();
(function() {
    'use strict';

    angular.module('wkr.home',[
        'ui.router',
        'templates',
        'shell'
    ]);
})();
(function() {
    'use strict';

    angular.module('wkr.projects',[
        'ui.router',
        'templates',
        'shell'
    ]);
})();
(function() {
    'use strict';

    angular.module('wkr.tasks',[
        'ui.router',
        'templates',
        'shell'
    ]);
})();
(function() {
    'use strict';

    angular.module('wkr.timesheet',[
        'ui.router',
        'templates',
        'shell'
    ]);
})();
(function () {
    'use strict';

    angular.module('shell')
        .config(Config);

    Config.$inject = [
        '$urlRouterProvider',
        '$locationProvider',
        '$stateProvider'
    ];

    function Config(
        $urlRouterProvider,
        $locationProvider,
        $stateProvider
    ) {
        $locationProvider.html5Mode(false);
        $locationProvider.hashPrefix('!');
        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('shell', {
            url: '',
            abstract: true,
            views: {
                'header@': {
                    templateUrl: 'shell/partials/header.html',
                    controller: 'HeaderCtrl',
                    controllerAs: 'header'
                },
                'navigation@': {
                    templateUrl: 'shell/partials/navigation.html',
                    controller: 'NavigationCtrl',
                    controllerAs: 'navigation'
                },
                'page@': {
                    templateUrl: 'shell/partials/page.html',
                    controller: 'PageCtrl',
                    controllerAs: 'page'
                }
            }
        })
    }
})();
(function() {
    'use strict';

    angular.module('wkr.home')
        .config(['$stateProvider', 'navigationSvcProvider', function($stateProvider, navigationSvcProvider) {
            navigationSvcProvider.addItem({title:'Home', sref:'shell.home', icon:'home'});
            
            $stateProvider.state('shell.home', {
                url: '/home',
                templateUrl: 'pages/home/home.html'
            });

        }])
})();




(function() {
    'use strict';

    angular.module('wkr.projects')
        .config(['$stateProvider', 'navigationSvcProvider', function($stateProvider, navigationSvcProvider) {
            navigationSvcProvider.addItem({title:'Projects', sref:'shell.projects', icon:'cubes'});
            
            $stateProvider.state('shell.projects', {
                url: '/projects',
                templateUrl: 'pages/projects/projects.html'
            });

        }])
})();




(function() {
    'use strict';

    angular.module('wkr.tasks')
        .config(['$stateProvider', 'navigationSvcProvider', function($stateProvider, navigationSvcProvider) {
            navigationSvcProvider.addItem({title:'Tasks', sref:'shell.tasks', icon:'tasks'});
            
            $stateProvider.state('shell.tasks', {
                url: '/tasks',
                templateUrl: 'pages/tasks/tasks.html'
            });

        }])
})();




(function() {
    'use strict';

    angular.module('wkr.timesheet')
        .config(['$stateProvider', 'navigationSvcProvider', function($stateProvider, navigationSvcProvider) {
            navigationSvcProvider.addItem({title:'Timesheets', sref:'shell.timesheet', icon:'ticket'});
            
            $stateProvider.state('shell.timesheet', {
                url: '/timesheet',
                templateUrl: 'pages/timesheet/timesheet.html'
            });
        }])
})();




(function() {
    'use strict';

    angular.module('shell')
        .controller('HeaderCtrl', Header);

    Header.$inject = ['navigationSvc', 'headerSvc'];
    function Header(navigationSvc, headerSvc) {
        this.userPicture = "/assets/user.jpg";

        this.navigationStatus = navigationSvc.status;
        this.navigationToggle = navigationSvc.toggle;

        this.menuStatus = headerSvc.status;
        this.menuToggle = headerSvc.toggle;
        this.menuClose = headerSvc.close;
    }
})();
(function() {
    'use strict';

    angular.module('shell')
        .controller('NavigationCtrl', Navigation);

    Navigation.$inject = ['navigationSvc'];
    function Navigation(navigationSvc) {
        this.menu = navigationSvc.menu();
        this.status = navigationSvc.status;

        this.open = navigationSvc.open;
        this.close = navigationSvc.close;
    }
})();
(function() {
    'use strict';

    angular.module('shell')
        .controller('PageCtrl', Page);

    Page.$inject = ['navigationSvc', 'headerSvc'];
    function Page(navigationSvc, headerSvc) {
        this.navigationStatus = navigationSvc.status;

        this.closeAll = function() {
            navigationSvc.close();
            headerSvc.close();
        }
    }
})();




(function() {
    'use strict';

    angular.module('shell')
        .provider('headerSvc', HeaderProvider);

    function HeaderProvider() {
        var _stat = 'profile-menu-closed';

        this.$get = function () {
            return {
                open: function() {
                    if (_stat === 'profile-menu-closed') return _stat = 'profile-menu-opened';
                },
                close: function() {
                    if (_stat === 'profile-menu-opened') return _stat = 'profile-menu-closed';
                },
                toggle: function() {
                    if (_stat === 'profile-menu-opened') return _stat = 'profile-menu-closed';
                    else if (_stat === 'profile-menu-closed') return _stat = 'profile-menu-opened';
                    else return _stat = 'profile-menu-closed';
                },
                status: function() {
                    return _stat;
                }
            };
        };
    }
})();
(function() {
    'use strict';

    angular.module('shell')
        .provider('navigationSvc', NavigationProvider);

    function NavigationProvider() {
        var _menu = [],
            _stat = 'navigation-closed';

        this.addItem = function(item) {
            _menu.push(item)
        };

        this.$get = function () {
            return {
                menu: function() {
                    return _menu;
                },
                open: function() {
                    if (_stat === 'navigation-closed') return _stat = 'navigation-opened';
                },
                close: function() {
                    if (_stat === 'navigation-opened') return _stat = 'navigation-closed';
                },
                toggle: function() {
                    if (_stat === 'navigation-opened') return _stat = 'navigation-closed';
                    else if (_stat === 'navigation-closed') return _stat = 'navigation-opened';
                    else return _stat = 'navigation-closed';
                },
                status: function() {
                    return _stat;
                }
            };
        };
    }
})();