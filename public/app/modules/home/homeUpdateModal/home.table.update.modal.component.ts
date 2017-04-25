import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { HomeService } from './../home.service';

@Component({
  moduleId: module.id,
  selector: 'app-home-update-table-modal',
  templateUrl: './home.table.update.modal.view.html',
  styleUrls: ['./home.table.update.modal.styles.css'],
  providers: [ HomeService ]
})
export class HomeTableUpdateModalComponent {
    @Input() data: any = [];
    @ViewChild('modalUpdateWindow') public modalUpdateWindow: ModalDirective;
    @Output() userUpdate = new EventEmitter<any>();

    ajaxReqError: boolean = false;

    public modalModel = {
        id: '',
        emailAddress: '',
        forename: '',
        surname: ''
    };

    constructor(private homeService: HomeService) {}

    public showModal(model: any): void {
        this.modalModel.id = model._id ? model._id : '';
        this.modalModel.emailAddress = model.emailAddress ? model.emailAddress : '';
        this.modalModel.forename = model.forename ? model.forename : '';
        this.modalModel.surname = model.surname ? model.surname : '';

        this.ajaxReqError = false;
        this.modalUpdateWindow.show();
    }

    public hideModal(): void {
        this.modalUpdateWindow.hide();
    }
     
    public updateUser(form: any): void {
        if (form.valid) {
         // Update user ajax call
         this.homeService.updateUser(this.modalModel)
                           .subscribe(
                               data => {
                                     this.userUpdate.emit(data);
                                     this.hideModal();
                                },
                                err => {
                                    // Log errors if any
                                    console.warn(err);
                                    this.ajaxReqError = true;
                                });
        }
    }

    removeUser(): void {
        // Update user ajax call
         this.homeService.removeUser(this.modalModel)
                           .subscribe(
                               data => {
                                     this.userUpdate.emit(data);
                                     this.hideModal();
                                },
                                err => {
                                    // Log errors if any
                                    console.warn(err);
                                    this.ajaxReqError = true;
                                });
    }
 }
