import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({    
    exports:[
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})
export class CoreModule {

}