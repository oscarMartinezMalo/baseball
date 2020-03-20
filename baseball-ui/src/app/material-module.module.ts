import { NgModule } from '@angular/core';
import {
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule
} from '@angular/material';

@NgModule({
    exports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        MatExpansionModule,
        MatRadioModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDialogModule
    ]
})
export class MaterialModuleModule {}
