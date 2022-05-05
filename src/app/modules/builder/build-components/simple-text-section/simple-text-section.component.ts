import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "app-simple-text-section",
    templateUrl: "./simple-text-section.component.html",
    styleUrls: ["./simple-text-section.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class SimpleTextSectionComponent {
    @Input() heading: string;
    @Input() content: string;
}
