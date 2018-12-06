import './ob-kb-percent-controller'
import './ob-kb-percent.css'

import mainTemplate from './ob-kb-percent.html'
import optionsTemplate from './ob-kb-percent-editor.html'

import { CATEGORY } from 'ui/vis/vis_category'
import { VisFactoryProvider } from 'ui/vis/vis_factory'
import { VisTypesRegistryProvider } from 'ui/registry/vis_types'
import { VisSchemasProvider } from 'ui/vis/editors/default/schemas';

const PercentProvider = (Private) => {
  const VisFactory = Private(VisFactoryProvider)

  return VisFactory.createAngularVisualization({
    name: 'obPercent',
    title: 'Percent View',
    icon: 'fa-hand-lizard',
    description: 'Percent metric visualization.',
    category: CATEGORY.OTHER,

    //visualization: VisController,

    visConfig: {
      defaults: {
        format: '0.000%',
        ratioFontSize: 60,
        label: 'Percent :',
        labelFontSize: 40,
        labelPlacement: 'top',
        displayIncrement: false,
        numeratorType: 'total',
        numerator: {
          nthBucket: 1,
          namedBucket: '',
        },
        denominatorType: 'total',
        denominator: {
          nthBucket: 1,
          namedBucket: '',
        },
      },
      template: mainTemplate,
    },
    editorConfig: {
      optionsTemplate: optionsTemplate,
    },
  })
}

VisTypesRegistryProvider.register(PercentProvider)
