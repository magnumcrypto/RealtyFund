import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Output() responseData: EventEmitter<any> = new EventEmitter<any>;
  @Input() uri: string = '';


  constructor(public postService: PostService) { }
  reactiveForm = new FormGroup({
    orden_alfabetico: new FormControl('', { nonNullable: true }),
    disponibilidad: new FormControl('', { nonNullable: true }),
    precio: new FormControl('', { nonNullable: true })
  })

  public onSubmit(uri: string) {
    const formValue = this.reactiveForm.getRawValue();
    const filters = {
      disponibilidad: formValue.disponibilidad || null,
      orden_alfabetico: formValue.orden_alfabetico || null,
      precio: formValue.precio || null
    };

    this.postService.sendFilters(uri, filters).subscribe(
      (response) => {
        console.log(response)
        this.responseData.emit(response);
      },
      (error) => {
        console.log('Error:')
        console.log(error);
      }
    );
  }
}
