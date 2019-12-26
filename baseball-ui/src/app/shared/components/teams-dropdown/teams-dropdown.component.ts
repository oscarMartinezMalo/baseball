import {
    Component,
    OnInit,
    forwardRef,
    Renderer2,
    ElementRef,
    Input
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    SelectControlValueAccessor,
    Validator,
    FormControl,
    NG_VALIDATORS
} from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'teams-dropdown',
    templateUrl: './teams-dropdown.component.html',
    styleUrls: ['./teams-dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TeamsDropdownComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TeamsDropdownComponent),
            multi: true
        }
    ]
})
export class TeamsDropdownComponent extends SelectControlValueAccessor
    implements OnInit, Validator {
    required: boolean = false;
    value: string;
    disabled: boolean;
    teams: string[];
    public progressMode = '';

    onChange: (_: any) => void;
    onTouched: () => void;
    compareWith: (o1: any, o2: any) => boolean;
    compareFn(c1: any, c2: any): boolean {
        return c1 && c2 ? c1 === c2 : c1 === c2;
    }

    writeValue(val: any): void {
        this.value = val;
    }
    registerOnChange(fn: (value: any) => any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    selectChange($event) {
        this.onTouched();
        this.onChange($event.value);
    }

    validate(control: FormControl): any {
        if (control) {
            if (control.hasError('required')) {
                this.required = true;
                return { required: true };
            } else {
                this.required = false;
                return { required: false };
            }
        }
    }

    // tslint:disable-next-line:variable-name
    constructor(_renderer: Renderer2, _elementRef: ElementRef) {
        super(_renderer, _elementRef);
    }

    ngOnInit() {
        this.progressMode = 'query';
        // Call Service here
        setTimeout(() => {
            this.teams = [
                'Team Badboys',
                'Team two',
                'Team three',
                'Team four'
            ];
            this.progressMode = '';
        }, 4000);
    }
}
