import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { PreferencesModalComponent } from './preferences-modal/preferences-modal.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  isExpanded = false;
  @ViewChild('drawer') drawer: MatDrawer;
  constructor(private dialog: MatDialog) { }

  openPreferences() {
    this.dialog.open(PreferencesModalComponent, {
      width: '500px',
      height: '650px'
    })
  }
}
