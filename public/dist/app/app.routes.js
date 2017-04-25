"use strict";
var router_1 = require("@angular/router");
var login_component_1 = require("./components/login/login.component");
// Guards
var login_guard_component_1 = require("./components/login/login.guard.component");
var authGuard_component_1 = require("./utils/authGuard.component");
// Route Configuration
exports.routes = [
    { path: '', component: login_component_1.LoginComponent, canActivate: [login_guard_component_1.LoginGuard] },
    { path: 'login', component: login_component_1.LoginComponent, canActivate: [login_guard_component_1.LoginGuard] },
    // Lazy loading module
    { path: 'home', loadChildren: 'app/modules/home/home.module#HomeModule', canActivate: [authGuard_component_1.AuthGuard], data: { roles: ['admin', 'regular'] } },
    // otherwise redirect to login
    { path: '**', redirectTo: '/' }
];
// Export
exports.Routing = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routes.js.map