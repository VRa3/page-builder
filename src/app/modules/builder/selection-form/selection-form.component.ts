import { availablePremadeComponents } from "./available-premade-components";
import { Component, OnInit, ɵɵsetComponentScope } from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";

@Component({
    selector: "app-selection-form",
    templateUrl: "./selection-form.component.html",
    styleUrls: ["./selection-form.component.scss"],
})
export class SelectionFormComponent implements OnInit {
    availableComponentsForm = this.fb.group({
        components: this.fb.array([]),
    });

    get components() {
        return this.availableComponentsForm.get("components") as FormArray;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        availablePremadeComponents.forEach((component) => {
            const obj = {
                contains: component,
                checked: false,
                inputs: this.fb.array([]),
            };

            for (let input of component.inputs) {
                const key = this.getKeyName(input);
                const value = input[key];

                /**
                 * Watch out - the `value` here might be an array of string, but will be converted to string. Must be fixed
                 */
                obj.inputs.push(this.fb.group({ [key]: value }));
            }

            this.components.push(this.fb.group(obj));
        });
    }

    onSend() {
        console.log(this.availableComponentsForm);
    }

    getInputs(x) {
        return x.controls.inputs.controls;
    }

    getKeyName(x) {
        return Object.keys(x)[0];
    }

    log(x) {
        console.log(x);
    }
}
