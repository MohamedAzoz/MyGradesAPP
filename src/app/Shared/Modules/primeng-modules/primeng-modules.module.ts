import { NgModule } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    InputNumberModule,
    HttpClientModule,
    DropdownModule,
  ],
  exports: [
    FileUploadModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    InputNumberModule,
    HttpClientModule,
    DropdownModule,
    CommonModule
  ],
})
export class PrimengModulesModule {}
