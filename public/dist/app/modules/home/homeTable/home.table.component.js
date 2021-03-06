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
var HomeTableComponent = (function () {
    function HomeTableComponent() {
        this.data = [];
        this.userUpdated = new core_1.EventEmitter();
        this.rows = [];
        this.columns = [
            { title: 'Email Address', name: 'emailAddress', filtering: { filterString: '', placeholder: 'Filter by email address' } },
            { title: 'Forename', name: 'forename', sort: 'asc', filtering: { filterString: '', placeholder: 'Filter by forename' } },
            { title: 'Surname', name: 'surname', sort: '', filtering: { filterString: '', placeholder: 'Filter by surname' } },
            { title: 'Created', name: 'created', sort: '' },
            { title: 'Role', name: 'role' },
        ];
        this.page = 1;
        this.itemsPerPage = 10;
        this.maxSize = 5;
        this.numPages = 1;
        this.length = 0;
        this.totalItems = 0;
        this.config = {
            paging: true,
            sorting: { columns: this.columns },
            filtering: { filterString: '' },
            className: ['table-striped', 'table-bordered']
        };
        this.length = this.data.length;
        this.totalItems = this.length;
    }
    HomeTableComponent.prototype.ngOnInit = function () {
        this.onChangeTable(this.config);
    };
    HomeTableComponent.prototype.ngOnChanges = function (changes) {
        this.onChangeTable(this.config);
    };
    // Table functions
    HomeTableComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.data; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    HomeTableComponent.prototype.changeSort = function (data, config) {
        if (!config.sorting) {
            return data;
        }
        var columns = this.config.sorting.columns || [];
        var columnName = void 0;
        var sort = void 0;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        // simple sorting
        return data.sort(function (previous, current) {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    };
    HomeTableComponent.prototype.changeFilter = function (data, config) {
        var _this = this;
        var filteredData = data;
        this.columns.forEach(function (column) {
            if (column.filtering && data) {
                filteredData = filteredData.filter(function (item) {
                    if (item[column.name] !== null) {
                        return item[column.name].match(column.filtering.filterString);
                    }
                });
            }
        });
        if (!config.filtering) {
            return filteredData;
        }
        if (config.filtering.columnName) {
            return filteredData.filter(function (item) {
                return item[config.filtering.columnName].match(_this.config.filtering.filterString);
            });
        }
        var tempArray = [];
        if (filteredData) {
            filteredData.forEach(function (item) {
                var flag = false;
                _this.columns.forEach(function (column) {
                    if (item[column.name] && item[column.name].toString().match(_this.config.filtering.filterString)) {
                        flag = true;
                    }
                });
                if (flag) {
                    tempArray.push(item);
                }
            });
        }
        filteredData = tempArray;
        return filteredData;
    };
    HomeTableComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.data, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    HomeTableComponent.prototype.onCellClick = function (data) {
        if (data.row) {
            this.modalUpdateWindow.showModal(data.row);
        }
    };
    HomeTableComponent.prototype.userUpdate = function (response) {
        if (response.success) {
            this.userUpdated.emit(response);
        }
    };
    HomeTableComponent.prototype.userCreate = function (response) {
        if (response.success) {
            this.userUpdated.emit(response);
        }
    };
    return HomeTableComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HomeTableComponent.prototype, "data", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HomeTableComponent.prototype, "userUpdated", void 0);
__decorate([
    core_1.ViewChild('modalUpdateWindow'),
    __metadata("design:type", Object)
], HomeTableComponent.prototype, "modalUpdateWindow", void 0);
__decorate([
    core_1.ViewChild('modalCreateWindow'),
    __metadata("design:type", Object)
], HomeTableComponent.prototype, "modalCreateWindow", void 0);
HomeTableComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'app-home-table',
        templateUrl: './home.table.view.html',
        styleUrls: ['./home.table.styles.css'],
    }),
    __metadata("design:paramtypes", [])
], HomeTableComponent);
exports.HomeTableComponent = HomeTableComponent;
//# sourceMappingURL=home.table.component.js.map