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
var forms_1 = require("@angular/forms");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var home_service_1 = require("./../home.service");
var HomeTableCreateModalComponent = (function () {
    function HomeTableCreateModalComponent(homeService, fb) {
        this.homeService = homeService;
        this.fb = fb;
        this.data = [];
        this.userCreate = new core_1.EventEmitter();
        this.ajaxReqError = false;
        this.userExistsError = false;
        this.createForm = fb.group({
            'emailAddress': [null, forms_1.Validators.required],
            'password': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])],
            'forename': '',
            'surname': ''
        });
    }
    HomeTableCreateModalComponent.prototype.showModal = function () {
        this.userExistsError = false;
        this.ajaxReqError = false;
        this.modalCreateWindow.show();
    };
    HomeTableCreateModalComponent.prototype.hideModal = function () {
        this.createForm.reset();
        this.modalCreateWindow.hide();
    };
    HomeTableCreateModalComponent.prototype.createUser = function (formValue) {
        var _this = this;
        if (formValue) {
            // Update user ajax call
            this.homeService.createUser(formValue)
                .subscribe(function (data) {
                _this.hideModal();
                _this.userCreate.emit(data);
            }, function (err) {
                // Log errors if any
                if (err.status === 409) {
                    _this.userExistsError = true;
                    return;
                }
                _this.ajaxReqError = true;
            });
        }
    };
    HomeTableCreateModalComponent.prototype.onCreateUserClick = function () {
        this.showModal();
    };
    return HomeTableCreateModalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HomeTableCreateModalComponent.prototype, "data", void 0);
__decorate([
    core_1.ViewChild('modalCreateWindow'),
    __metadata("design:type", ngx_bootstrap_1.ModalDirective)
], HomeTableCreateModalComponent.prototype, "modalCreateWindow", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HomeTableCreateModalComponent.prototype, "userCreate", void 0);
HomeTableCreateModalComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-home-create-table-modal',
        templateUrl: './home.table.create.modal.view.html',
        styleUrls: ['./home.table.create.modal.styles.css'],
        providers: [home_service_1.HomeService]
    }),
    __metadata("design:paramtypes", [home_service_1.HomeService, forms_1.FormBuilder])
], HomeTableCreateModalComponent);
exports.HomeTableCreateModalComponent = HomeTableCreateModalComponent;
//# sourceMappingURL=home.table.create.moda.component.js.map