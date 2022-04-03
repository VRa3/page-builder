import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
    @Input() brandText: string;
    @Input() elements: string[];
    @Input() dropdownText: string;
    @Input() dropdownElements: string[];

    dropdownOpened = false;

    constructor() {}

    ngOnInit(): void {}
}
