"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var home_component_1 = require("./home.component");
var home_table_component_1 = require("./homeTable/home.table.component");
var home_table_update_modal_component_1 = require("./homeUpdateModal/home.table.update.modal.component");
var home_table_create_moda_component_1 = require("./homeCreateModal/home.table.create.moda.component");
var home_routing_1 = require("./home.routing");
var ng2_table_1 = require("ng2-table/ng2-table");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var HomeModule = (function () {
    function HomeModule() {
    }
    return HomeModule;
}());
HomeModule = __decorate([
    core_1.NgModule({
        declarations: [home_component_1.HomeComponent, home_table_component_1.HomeTableComponent, home_table_update_modal_component_1.HomeTableUpdateModalComponent, home_table_create_moda_component_1.HomeTableCreateModalComponent],
        imports: [common_1.CommonModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, home_routing_1.HomeRouting,
            ng2_table_1.Ng2TableModule,
            ngx_bootstrap_1.PaginationModule.forRoot(), ngx_bootstrap_1.ModalModule.forRoot()
        ],
    })
], HomeModule);
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map