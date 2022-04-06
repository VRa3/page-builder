import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BuilderRoutingModule } from "./builder-routing.module";
import { BuilderComponent } from "./builder.component";
import { NavbarComponent } from "./build-components/navbar/navbar.component";
import { SelectionFormComponent } from "./selection-form/selection-form.component";
import { SimpleTextSectionComponent } from "./build-components/simple-text-section/simple-text-section.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [BuilderComponent, NavbarComponent, SelectionFormComponent, SimpleTextSectionComponent],
    imports: [CommonModule, ReactiveFormsModule, FormsModule, BuilderRoutingModule],
})
export class BuilderModule {}
