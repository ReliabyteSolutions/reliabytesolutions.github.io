(function() {
    'use strict';

    angular.module('app',[
        'templates',
        'app.shell',
        'app.default'
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

    angular.module('app.shell',[
        'AdalAngular',
        'ui.router'
    ]);
})();
(function() {
    'use strict';

    angular.module('app.default',[
        'templates',
        'ui.router'
    ]);
})();

(function () {
    'use strict';

    angular.module('app.shell')
        .config(Config);

    Config.$inject = [
        '$urlRouterProvider',
        '$locationProvider',
        '$stateProvider',
        '$httpProvider',
        'adalAuthenticationServiceProvider'
    ];

    function Config(
        $urlRouterProvider,
        $locationProvider,
        $stateProvider,
        $httpProvider,
        adalAuthenticationServiceProvider
    ) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        $urlRouterProvider.otherwise('/home');

        adalAuthenticationServiceProvider.init({
            tenant: 'peoriaholyfamily.com',
            clientId: '9b70d71a-c2bc-45e4-8f00-ded27a52aa1f'
        }, $httpProvider );

        $stateProvider.state({
            name: 'shell',
            url: '',
            abstract: true,
            templateUrl: 'shell/shell.html',
            controller: 'ShellCtrl',
            controllerAs: 'shell'
        })
    }
})();
(function() {
    'use strict';

    angular.module('app.default')
        .config(['$stateProvider', function($stateProvider) {

            $stateProvider.state('shell.home', {
                url: '/home',
                templateUrl: 'pages/default/default.html'
            });

        }])
})();




(function() {
    'use strict';

    angular.module('app.shell')
        .controller('ShellCtrl', Shell);

    Shell.$inject = ['adalAuthenticationService'];

    function Shell(adalAuthenticationService) {
        this.userPicture = "/assets/user.jpg";

        this.login = function() {
            adalAuthenticationService.login();
        };

        this.header = 'shell/shell.header.html';

        this.panelStatus = 'closed';
        var panelTypes = {
            'notification': 'shell/shell.panel.notification.html',
            'profile': 'shell/shell.panel.profile.html'
        };
        this.togglePanel = function(type) {
            var status = this.panelStatus;
            if (status === 'opened') {
                status = this.panelStatus = 'closed';
            }
            else if (status === 'closed') {
                this.panel = panelTypes[type];
                status = this.panelStatus = 'opened';
            }
            else status = this.panelStatus = 'closed';
        };

    }
})();
(function() {
    'use strict';

    angular.module('app.shell')
        .controller('NotificationPanelCtrl', NotificationPanel);

    function NotificationPanel() {

    }
})();
(function() {
    'use strict';

    angular.module('app.shell')
        .controller('ProfilePanelCtrl', ProfilePanel);

    function ProfilePanel() {
        this.photo = "/assets/user.jpg";
        this.displayName = "Jason Banister";

        this.view = function() {console.log('view')};
        this.changePassword = function() {console.log('change-password')};
        this.signOut = function() {console.log('sign-out')};
    }
})();
/**
 * Created by jbani on 7/7/2015.
 */
