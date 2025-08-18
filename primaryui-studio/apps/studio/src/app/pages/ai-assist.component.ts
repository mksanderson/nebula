import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OpenRouterService } from '../core/openrouter.service';
import Ajv from 'ajv';

// ScreenSpec schema minimal copy for validation
const screenSpecSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["recipeId", "schemaRef", "layout", "actions"],
  "properties": {
    "recipeId": { "type": "string" },
    "schemaRef": { "type": "string" },
    "layout": { "type": "object" },
    "actions": { "type": "array" }
  }
};

// Intent schema for validation
const intentSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "required": ["name", "purpose", "props_schema"],
  "properties": {
    "name": { "type": "string" },
    "purpose": { "type": "string" },
    "props_schema": { "type": "object" }
  }
};

@Component({
  selector: 'pui-ai-assist',
  standalone: true,
  template: `
  <form [formGroup]="form" (ngSubmit)="submit()">
    <textarea formControlName="prompt" placeholder="Describe your asset"></textarea>
    <select formControlName="target">
      <option value="ScreenSpec">ScreenSpec</option>
      <option value="Intent">Intent</option>
    </select>
    <select formControlName="model">
      <option value="anthropic/claude-3.5-sonnet">claude-3.5-sonnet</option>
      <option value="openai/gpt-4o-mini">gpt-4o-mini</option>
    </select>
    <button type="submit">Generate</button>
  </form>
  <pre *ngIf="result">{{ result | json }}</pre>
  <div *ngIf="errors.length">
    <p *ngFor="let e of errors">{{e}}</p>
  </div>
  `
})
export class AiAssistComponent {
  form = this.fb.group({
    prompt: ['', Validators.required],
    target: ['ScreenSpec'],
    model: ['anthropic/claude-3.5-sonnet']
  });
  result: any = null;
  errors: string[] = [];
  private ajv = new Ajv();

  constructor(private fb: FormBuilder, private ai: OpenRouterService) {}

  submit() {
    this.errors = [];
    const { prompt, model, target } = this.form.value as any;
    const schema = target === 'Intent' ? intentSchema : screenSpecSchema;
    this.ai.chat(model, [{ role: 'user', content: prompt }], schema)
      .subscribe({
        next: (json) => {
          const validate = this.ajv.compile(schema);
          if (validate(json)) {
            this.result = json;
          } else {
            this.errors = (validate.errors || []).map(e => `${e.instancePath} ${e.message}`);
          }
        },
        error: err => this.errors = [err.message]
      });
  }
}
