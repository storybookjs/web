import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {codeInput} from '@sanity/code-input'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'Storybook Blog',

  projectId: '2fn86m3z',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), codeInput(), media()],

  schema: {
    types: schemaTypes,
  },
})
