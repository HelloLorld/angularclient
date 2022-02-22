import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TourService} from '../service/tour.service';
import {Tour} from '../model/tour.model';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {
  tours: Tour[];
  clicked: Set<number>;
  types: FormGroup;
  countries: FormGroup;
  checkbox = false;
  @Input() user: User = null;

  @Output()
  addingTour = new EventEmitter();

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (localStorage.getItem('userId') === null) {
      router.navigate(['/login']).then(r => location.reload());
    }
    this.types = fb.group({
      hot: false,
      sale: false,
      casual: false,
      hit: false
    });
    this.countries = fb.group({
      russia: false,
      china: false,
      ukraine: false,
      german: false,
      usa: false,
      greatBritain: false,
      kazakhstan: false
    });
  }


  ngOnInit(): void {
    this.tourService.findAll().subscribe(
      data => {
        this.tours = data;
        data.sort((a, b) => {
          if (a.id > b.id ) { return 1; }
          else if (a.id < b.id) { return -1; }
          else { return 0; }
        });
        this.clicked = new Set<number>();
        if (this.user != null) {this.tours = this.get_diff(this.user.tours, this.tours ); }
      }
    );
  }

  checkFilters(): boolean {
    const flagOfCountries = this.countries.get('russia').value || this.countries.get('china').value ||
      this.countries.get('ukraine').value || this.countries.get('german').value || this.countries.get('usa').value ||
      this.countries.get('greatBritain').value || this.countries.get('kazakhstan').value;
    const flagOfTypes = this.types.get('hot').value || this.types.get('sale').value || this.types.get('casual').value ||
      this.types.get('hit').value;
    return flagOfTypes || flagOfCountries;
  }

   clearFilters(): void {
     this.types = this.fb.group({
       hot: false,
       sale: false,
       casual: false,
       hit: false
     });
     this.countries = this.fb.group({
       russia: false,
       china: false,
       ukraine: false,
       german: false,
       usa: false,
       greatBritain: false,
       kazakhstan: false
     });
   }

  addTour(index: number): void {
    this.addingTour.emit(this.tours[index]);
    this.clicked.add(index);
  }

  get_diff(a1: Tour[], a2: Tour[]): Tour[] {
    let diff: Tour[];
    const set: Set<number> = new Set<number>();
    for (let i = 0; i < a1.length; i++) {
      set.add(a1[i].id);
    }
    diff = a2.filter(tour => {
      return !set.has(tour.id);
    });
    return diff;
  }
}
