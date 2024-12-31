import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SkeletonComponent } from './skeleton/skeleton.component';
import { FormsModule } from '@angular/forms';
import { GeminiService } from './gemini.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    SkeletonComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AiForAll';

  prompt: string = '';

  geminiService: GeminiService = inject(GeminiService);

  loading: boolean = false;

  chatHistory: any[] = [];

  constructor() {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if(res) {
        this.chatHistory.push(res);
      }
    })
  }

  async sendData(){
    if(this.prompt && !this.loading){
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }

  formatText(text: string){
    const result = text.replaceAll('*', '');
    return result;
  }
}
