import {Component, OnInit} from '@angular/core';
import {Bloc} from "../model/Bloc";
import {BlocService} from "../Service/bloc.service";
import {Foyer} from "../model/Foyer";
import {FoyerService} from "../Service/foyer.service";

@Component({
  selector: 'app-foyer-list',
  templateUrl: './foyer-list.component.html',
  styleUrls: ['./foyer-list.component.css']
})
export class FoyerListComponent implements OnInit {
  foyers: Foyer[] = [];
  updatingFoyerId: number | null = null;
  search = '';

  constructor(private foyerservice: FoyerService) {}

  ngOnInit(): void {
    this.fetchFoyers();
  }

  private fetchFoyers(): void {
    this.foyerservice.getFoyer().subscribe((foyers) => {
      console.log('Foyers:', foyers);
      this.foyers = foyers;
    });
  }

  deleteFoyerById(id: number): void {
    if (confirm('Are you sure you want to delete this foyer?')) {
      this.foyerservice.deleteFoyerAndDesaffecterUniversite(id).subscribe(
        () => {
          this.foyers = this.foyers.filter(
            (foyer) => foyer.idFoyer !== id
          );
          this.updatingFoyerId = null;
          alert('Foyer deleted successfully');
        },
        (error) => {
          console.error('Failed to delete foyer:', error);
          alert('Failed to delete foyer');
        }
      );
    }
  }

  update(foyer: Foyer): void {
    console.log('Selected Foyer:', foyer);
    this.updatingFoyerId = foyer.idFoyer;
  }

  onFoyerUpdateSuccess(foyerId: number): void {
    // Clear updating state for the specific foyer
    if (this.updatingFoyerId === foyerId) {
      this.updatingFoyerId = null;
    }
    this.fetchFoyers(); // Refresh the list when an update is successful
  }

  isUpdating(foyerId: number): boolean {
    // Check if the specific foyer is updating
    return this.updatingFoyerId === foyerId;
  }

  traitemenet(t: any): void {
    // Clear updating state
    this.updatingFoyerId = null;
  }
}
