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
var ngx_bootstrap_1 = require("ngx-bootstrap");
var home_service_1 = require("./../home.service");
var HomeTableUpdateModalComponent = (function () {
    function HomeTableUpdateModalComponent(homeService) {
        this.homeService = homeService;
        this.data = [];
        this.userUpdate = new core_1.EventEmitter();
        this.ajaxReqError = false;
        this.modalModel = {
            id: '',
            emailAddress: '',
            forename: '',
            surname: ''
        };
    }
    HomeTableUpdateModalComponent.prototype.showModal = function (model) {
        this.modalModel.id = model._id ? model._id : '';
        this.modalModel.emailAddress = model.emailAddress ? model.emailAddress : '';
        this.modalModel.forename = model.forename ? model.forename : '';
        this.modalModel.surname = model.surname ? model.surname : '';
        this.ajaxReqError = false;
        this.modalUpdateWindow.show();
    };
    HomeTableUpdateModalComponent.prototype.hideModal = function () {
        this.modalUpdateWindow.hide();
    };
    HomeTableUpdateModalComponent.prototype.updateUser = function (form) {
        var _this = this;
        if (form.valid) {
            // Update user ajax call
            this.homeService.updateUser(this.modalModel)
                .subscribe(function (data) {
                _this.userUpdate.emit(data);
                _this.hideModal();
            }, function (err) {
                // Log errors if any
                console.warn(err);
                _this.ajaxReqError = true;
            });
        }
    };
    HomeTableUpdateModalComponent.prototype.removeUser = function () {
        var _this = this;
        // Update user ajax call
        this.homeService.removeUser(this.modalModel)
            .subscribe(function (data) {
            _this.userUpdate.emit(data);
            _this.hideModal();
        }, function (err) {
            // Log errors if any
            console.warn(err);
            _this.ajaxReqError = true;
        });
    };
    return HomeTableUpdateModalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HomeTableUpdateModalComponent.prototype, "data", void 0);
__decorate([
    core_1.ViewChild('modalUpdateWindow'),
    __metadata("design:type", ngx_bootstrap_1.ModalDirective)
], HomeTableUpdateModalComponent.prototype, "modalUpdateWindow", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HomeTableUpdateModalComponent.prototype, "userUpdate", void 0);
HomeTableUpdateModalComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-home-update-table-modal',
        templateUrl: './home.table.update.modal.view.html',
        styleUrls: ['./home.table.update.modal.styles.css'],
        providers: [home_service_1.HomeService]
    }),
    __metadata("design:paramtypes", [home_service_1.HomeService])
], HomeTableUpdateModalComponent);
exports.HomeTableUpdateModalComponent = HomeTableUpdateModalComponent;
//# sourceMappingURL=home.table.update.modal.component.js.map