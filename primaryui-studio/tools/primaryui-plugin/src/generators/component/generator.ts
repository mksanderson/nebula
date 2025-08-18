import { Tree, formatFiles, names } from '@nx/devkit';
import * as yaml from 'yaml';
import { join, dirname } from 'path';
import { readFileSync } from 'fs';

interface Options {
  name?: string;
  intent?: string;
  recipe?: string;
  featureDir: string;
}

function generateFromIntent(tree: Tree, intentPath: string, featureDir: string, nameOpt?: string) {
  const intentRaw = readFileSync(intentPath, 'utf8');
  const intent = yaml.parse(intentRaw);
  const compName = nameOpt || intent.name;
  const n = names(compName);
  const className = `${n.className}GeneratedComponent`;
  const selector = `pui-${n.fileName}`;
  const inputs = Object.keys(intent.props_schema?.properties || {})
    .map(p => `@Input() ${p}: any;`)
    .join('\n  ');
  const template = `<div>${intent.purpose}</div>`;
  const content = `import { Component, Input } from '@angular/core';\n@Component({selector: '${selector}', standalone: true, template: \`${template}\`})\nexport class ${className} {\n  ${inputs}\n}`;
  const outPath = join(featureDir, `${n.fileName}.generated.component.ts`);
  tree.write(outPath, content);
}

function generateFromRecipe(tree: Tree, recipePath: string, featureDir: string, nameOpt?: string) {
  const recipeRaw = readFileSync(recipePath, 'utf8');
  const recipe = JSON.parse(recipeRaw);
  const compName = nameOpt || recipe.name || 'GeneratedRecipe';
  const n = names(compName);
  const className = `${n.className}GeneratedComponent`;
  const selector = `pui-${n.fileName}`;
  const children: string[] = [];
  (recipe.components || []).forEach((c: any, i: number) => {
    const intentFile = join(dirname(recipePath), c.intent);
    generateFromIntent(tree, intentFile, featureDir);
    const childName = names(yaml.parse(readFileSync(intentFile, 'utf8')).name).fileName;
    children.push(`<pui-${childName}></pui-${childName}>`);
  });
  const template = children.join('\n');
  const content = `import { Component } from '@angular/core';\n@Component({selector: '${selector}', standalone: true, template: \`${template}\`})\nexport class ${className} {}`;
  const outPath = join(featureDir, `${n.fileName}.generated.component.ts`);
  tree.write(outPath, content);
}

export default async function generator(tree: Tree, options: Options) {
  const featureDir = options.featureDir || 'apps/studio/src/app/generated';
  if (options.intent) {
    generateFromIntent(tree, options.intent, featureDir, options.name);
  } else if (options.recipe) {
    generateFromRecipe(tree, options.recipe, featureDir, options.name);
  } else {
    throw new Error('Either intent or recipe path must be provided');
  }
  await formatFiles(tree);
}
