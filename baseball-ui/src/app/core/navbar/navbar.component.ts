import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {
  @ViewChild('drawer', { static: true }) public drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) { }

  // tslint:disable-next-line: use-lifecycle-interface
  public async ngOnInit() {
    this.drawerClose();
  }

  public drawerClose(): void {
    this.isHandset$.subscribe((isHandset) => {
      if (isHandset) {
        this.drawer.toggle(false);
      }
    });
  }
}
