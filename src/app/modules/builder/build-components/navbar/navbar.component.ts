import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent {
    @Input() brandText: string;
    @Input() elements: string[];
    @Input() dropdownText: string;
    @Input() dropdownElements: string[];
}
