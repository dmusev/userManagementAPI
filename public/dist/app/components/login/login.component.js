"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var login_service_1 = require("./login.service");
var shared_service_1 = require("./../../shared/shared.service");
var forms_1 = require("@angular/forms");
var LoginComponent = (function () {
    function LoginComponent(loginService, sharedService, fb) {
        this.loginService = loginService;
        this.sharedService = sharedService;
        this.fb = fb;
        this.loading = false;
        this.userNotFound = false;
        this.loginForm = fb.group({
            'email': [null, forms_1.Validators.required],
            'password': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])]
        });
    }
    LoginComponent.prototype.submitLogin = function (userCred) {
        var _this = this;
        this.loading = true;
        this.loginService.login(userCred)
            .subscribe(function (data) {
            _this.userNotFound = false;
            _this.sharedService.isUserLogged = true;
        }, function (error) {
            console.error(error);
            _this.userNotFound = true;
            _this.loading = false;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: './login.view.html',
        styleUrls: ['./login.styles.css'],
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        shared_service_1.SharedService,
        forms_1.FormBuilder])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map