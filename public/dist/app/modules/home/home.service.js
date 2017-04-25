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
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
// Import RxJs required methods
require("rxjs/add/operator/map");
var HomeService = (function () {
    function HomeService(http, router) {
        this.http = http;
        this.router = router;
        this.getUrlPath = '/api/users/getUsers';
        this.createUrlPath = '/api/users/createUser';
        this.updateUrlPath = '/api/users/updateUser';
        this.removeUrlPath = '/api/users/removeUser';
    }
    HomeService.prototype.getUsers = function () {
        return this.http.get(this.getUrlPath)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HomeService.prototype.createUser = function (userParams) {
        var bodyString = JSON.stringify(userParams);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.createUrlPath, bodyString, options)
            .map(function (res) {
            var response = res.json(); // .json() on the response to return data
            if (response) {
                return response;
            }
        }).catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); }); // catch errors if any
    };
    HomeService.prototype.updateUser = function (userParams) {
        var bodyString = JSON.stringify(userParams);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.updateUrlPath + "/" + userParams.id, bodyString, options)
            .map(function (res) {
            var response = res.json(); // .json() on the response to return data
            if (response) {
                return response;
            }
        }).catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); }); // catch errors if any
    };
    HomeService.prototype.removeUser = function (userParams) {
        return this.http.delete(this.removeUrlPath + '/' + userParams.id)
            .map(function (res) {
            var response = res.json(); // .json() on the response to return data
            if (response) {
                return response;
            }
        }).catch(function (error) { return Rx_1.Observable.throw(error || 'Server error'); }); // catch errors if any
    };
    return HomeService;
}());
HomeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.Router])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map