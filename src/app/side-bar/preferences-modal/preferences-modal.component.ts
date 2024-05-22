import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Pref, PreferencesService } from '../preferences.service';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-preferences-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatInput,
    MatButtonToggleModule
  ],
  templateUrl: './preferences-modal.component.html',
  styleUrl: './preferences-modal.component.scss'
})
export class PreferencesModalComponent {
  config: Pref;
  constructor(public dialogRef: MatDialogRef<PreferencesModalComponent>, private preferenceService: PreferencesService) { }

  ngOnInit() {
    this.preferenceService.preferences.subscribe(pref => {
      this.config = pref;
    });
  }

  save() {
    this.preferenceService.setPreferences(this.config);
  }
}
