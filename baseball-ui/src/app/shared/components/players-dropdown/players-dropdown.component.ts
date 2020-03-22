import { Component, OnInit, Output, EventEmitter, forwardRef, ElementRef, Renderer2, Input } from '@angular/core';
import { SharedService } from '../../shared.service';
import { User } from '../../models/user';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, SelectControlValueAccessor, FormControl } from '@angular/forms';

@Component({
    selector: 'app-players-dropdown',
    templateUrl: './players-dropdown.component.html',
    styleUrls: ['./players-dropdown.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PlayersDropdownComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => PlayersDropdownComponent),
            multi: true
        }
    ]
})
export class PlayersDropdownComponent extends SelectControlValueAccessor
    implements OnInit, Validator {
    // Define a setter to detect changes when the input change
    private _teamSelected: string;
    @Input() set teamSelected(value: string) {
        this.loadPlayer(value).then(players => {
            // Message under FanOf to guide the user what should he do
            players.length > 0 ? this.message = '' : this.message = 'Team selected doesn\'t have any player';
        });

        this._teamSelected = value;
    }

    get teamSelected(): string {
        return this._teamSelected;
    }

    message = '';
    required = false;
    value: string;
    disabled: boolean;
    players: string[];
    showProgressbar = false;

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
                // return { required: true };
            } else {
                this.required = false;
                // return { required: false };
            }
        }
    }

    constructor(
        // tslint:disable-next-line: variable-name
        _renderer: Renderer2,
        // tslint:disable-next-line: variable-name
        _elementRef: ElementRef,
        private sharedService: SharedService) {
        super(_renderer, _elementRef);
    }

    async ngOnInit() { }

    async loadPlayer(team): Promise<string[]> {
        this.showProgressbar = true; // Start progress bar

        // Call service to get the teams
        const result = await this.sharedService.getPlayersFromCurrentTeam(team) as User[];
        this.players = result.map(py => (`${py.firstName} ${py.lastName}`)); // Get only the first and LastName from the users

        this.showProgressbar = false;
        return this.players;
    }

}
