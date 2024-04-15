import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout-pop',
  templateUrl: './logout-pop.component.html',
  styleUrl: './logout-pop.component.scss'
})
export class LogoutPopComponent {
  @Output() leaveClicked = new EventEmitter<void>();
  @Output() closedPopup = new EventEmitter<void>();

  close() {
    this.closedPopup.emit();
  }

  onLeaveClick() {
    this.leaveClicked.emit();
  }
}
