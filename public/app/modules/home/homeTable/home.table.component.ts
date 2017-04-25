import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-home-table',
    templateUrl: './home.table.view.html',
    styleUrls: ['./home.table.styles.css'],
})
export class HomeTableComponent implements OnInit, OnChanges {
    @Input() data: any = [];
    @Output() userUpdated = new EventEmitter<boolean>();
    @ViewChild('modalUpdateWindow') modalUpdateWindow: any;
    @ViewChild('modalCreateWindow') modalCreateWindow: any;

    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: 'Email Address', name: 'emailAddress', filtering: { filterString: '', placeholder: 'Filter by email address' }},
        { title: 'Forename', name: 'forename', sort: 'asc', filtering: { filterString: '', placeholder: 'Filter by forename' }},
        { title: 'Surname', name: 'surname', sort: '', filtering: { filterString: '', placeholder: 'Filter by surname' }},
        { title: 'Created', name: 'created', sort: '' },
        { title: 'Role', name: 'role' },
    ];
    public page: Number = 1;
    public itemsPerPage: Number = 10;
    public maxSize: Number = 5;
    public numPages: Number = 1;
    public length: Number = 0;
    public totalItems: Number = 0;

    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table-striped', 'table-bordered']
    };

    public constructor() {
        this.length = this.data.length;
        this.totalItems = this.length;
    }

    public ngOnInit(): void {
        this.onChangeTable(this.config);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.onChangeTable(this.config);
    }

    // Table functions
    public changePage(page: any, data: Array<any> = this.data): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        // simple sorting
        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changeFilter(data: any, config: any): any {
        let filteredData: Array<any> = data;
        this.columns.forEach((column: any) => {
            if (column.filtering && data) {
                filteredData = filteredData.filter((item: any) => {
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
            return filteredData.filter((item: any) =>
                item[config.filtering.columnName].match(this.config.filtering.filterString));
        }

        let tempArray: Array<any> = [];
        if (filteredData) {
            filteredData.forEach((item: any) => {
                let flag = false;
                this.columns.forEach((column: any) => {
                    if (item[column.name] && item[column.name].toString().match(this.config.filtering.filterString)) {
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
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.data, this.config);
        let sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }

    public onCellClick(data: any): any {
        if (data.row) {
            this.modalUpdateWindow.showModal(data.row);
        }
    }

    public userUpdate(response: any) {
        if (response.success) {
            this.userUpdated.emit(response);
        }
    }

    public userCreate(response: any) {
        if (response.success) {
            this.userUpdated.emit(response);
        }
    }
}
