import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  @Output() leaveClicked = new EventEmitter<void>();
  @Output() closedPopup = new EventEmitter<void>();

  close() {
    this.closedPopup.emit();
  }

  onLeaveClick() {
    this.leaveClicked.emit();
  }
}
