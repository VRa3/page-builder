import { SimpleTextSectionComponent } from "./../build-components/simple-text-section/simple-text-section.component";
import { NavbarComponent } from "./../build-components/navbar/navbar.component";
export class ComponentsFactory {
    static create(type: string) {
        switch (true) {
            case type === "NavbarComponent":
                return NavbarComponent;
                break;
            case type === "SimpleTextSectionComponent":
                return SimpleTextSectionComponent;
                break;
        }
    }
}
