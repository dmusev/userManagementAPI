import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { HomeService } from './../home.service';

@Component({
  moduleId: module.id,
  selector: 'app-home-create-table-modal',
  templateUrl: './home.table.create.modal.view.html',
  styleUrls: ['./home.table.create.modal.styles.css'],
  providers: [ HomeService ]
})
export class HomeTableCreateModalComponent {
    @Input() data: any = [];
    @ViewChild('modalCreateWindow') public modalCreateWindow: ModalDirective;
    @Output() userCreate = new EventEmitter<any>();

    createForm: FormGroup;

    ajaxReqError: boolean = false;
    userExistsError: boolean = false;

    constructor(private homeService: HomeService, private fb: FormBuilder) {
       this.createForm = fb.group({
        'emailAddress' : [null, Validators.required],
        'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
        'forename': '',
        'surname': ''
      });
    }

    public showModal(): void {
        this.userExistsError = false;
        this.ajaxReqError = false;
        this.modalCreateWindow.show();
    }

    public hideModal(): void {
        this.createForm.reset();
        this.modalCreateWindow.hide();
    }
    public createUser(formValue: any): void {
        if (formValue) {
         // Update user ajax call
         this.homeService.createUser(formValue)
                           .subscribe(
                               data => {
                                    this.hideModal();
                                    this.userCreate.emit(data);
                                },
                                err => {
                                    // Log errors if any
                                    if(err.status === 409){
                                        this.userExistsError = true;
                                        return;
                                    }
                                    this.ajaxReqError = true;
                                });
        }
    }
    
    public onCreateUserClick(): any {
        this.showModal();
    }
 }
