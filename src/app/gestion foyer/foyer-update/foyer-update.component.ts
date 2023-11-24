import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {FoyerService} from "../../services/foyer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Foyer} from "../../models/Foyer";
import {Bloc} from "../../models/Bloc";
import {Universite} from "../../models/Universite";
import {UniversiteService} from "../../services/universite.service";
import {BlocService} from "../../services/bloc.service";

@Component({
  selector: 'app-foyer-update',
  templateUrl: './foyer-update.component.html',
  styleUrls: ['./foyer-update.component.css']
})
export class FoyerUpdateComponent implements OnInit {
  @Input() foy: Foyer = new Foyer();
  @Output() updateSuccess: EventEmitter<void> = new EventEmitter<void>();
  foyer: Foyer = new Foyer();
  universites: Universite[] = [];
  blocs: Bloc[] = [];
  selectedBlocs: Bloc[][] = [[]];

  constructor(
    private s: FoyerService,
    private ac: ActivatedRoute,
    private router: Router,
    private u: UniversiteService,
    private b: BlocService
  ) {}

  ngOnInit() {
    this.loadUniversites();
    this.loadBlocs();

    this.s.getFoyerById(this.ac.snapshot.params['id']).subscribe(
      (data) => {
        this.foyer = data;

        // Initialize selectedBlocs with an array containing an empty array
        this.selectedBlocs = [this.foyer.bloc || []];
      }
    );
  }


  update(): void {
    const idUniversite = this.foyer.universite.idUniversite;
    const idBloc: number[] = this.selectedBlocs.flatMap((blocs) => blocs.map((bloc) => bloc.idBloc));

    if (idUniversite) {
      const associatedMessage = `The selected Université or bloc might be associated with other data. Are you sure you want to update?`;

      if (confirm(associatedMessage)) {
        const updatedFoyer = {
          ...this.foyer,
          bloc: this.selectedBlocs[0], // Assuming you are only using the first dropdown for bloc selection
        };

        // Use this.foy.idFoyer instead of this.ac.snapshot.params['id']
        this.s.updateFoyerWithAssociations(
          updatedFoyer,
          this.foy.idFoyer,
          idUniversite,
          idBloc
        ).subscribe(
          () => {
            alert('Modification effectuée');
            this.updateSuccess.emit(); // Emit the event when the update is successful
            this.router.navigate(['/Foyer']);
          },
          (error) => {
            console.error('Failed to update and associate with university and bloc:', error);
            alert('Failed to update and associate with university and bloc');
          }
        );
      }
    }}


  private loadUniversites(): void {
    this.u.getUniversite().subscribe(
      (data) => {
        this.universites = data;
      }
    );
  }

  private loadBlocs(): void {
    this.b.getBlocs().subscribe(
      (data) => {
        this.blocs = data;
      }
    );
  }

  addDropdown(): void {
    if (this.selectedBlocs[0]) {
      this.selectedBlocs.push([...this.selectedBlocs[0]]);
    } else {
      // Handle the case where selectedBlocs[0] is undefined
      this.selectedBlocs.push([]);
    }
  }

  removeDropdown(index: number): void {
    if (this.selectedBlocs.length > 1) {
      this.selectedBlocs.splice(index, 1);
    } else {
      alert('At least one Bloc must be chosen.');
    }
  }
}

