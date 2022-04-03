import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-simple-text-section",
    templateUrl: "./simple-text-section.component.html",
    styleUrls: ["./simple-text-section.component.scss"],
})
export class SimpleTextSectionComponent implements OnInit {
    @Input() heading: string;
    @Input() content: string;

    constructor() {}

    ngOnInit(): void {}
}
