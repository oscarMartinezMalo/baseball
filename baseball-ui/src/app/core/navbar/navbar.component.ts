import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
    @ViewChild('drawer') public drawer: MatSidenav;

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe([Breakpoints.Handset, Breakpoints.Small])
        .pipe(map(result => result.matches));
    afAuth: any;

    constructor(
        private breakpointObserver: BreakpointObserver,
        public authService: AuthService
    ) { }

    // tslint:disable-next-line: use-lifecycle-interface
    public async ngOnInit() {
        this.drawerClose();
    }

    public drawerClose(): void {
        this.isHandset$.subscribe(isHandset => {
            if (isHandset) {
                this.drawer?.toggle(false);
            }
        });
    }
}
