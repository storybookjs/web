import { Manager } from './index';

export default {
  title: 'Manager',
  component: Manager,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      diffThreshold: 0.2, // Accommodate animation flake
    }
  }
};

export const DevelopmentTab = {
  args: {
    slide: 1,
  },
}

export const InteractionTab = {
  args: {
    slide: 2,
  }
}

export const VisualTestingTab = {
  args: {
    slide: 3,
  }
}

export const DocumentationTab = {
  args: {
    slide: 4,
  }
}

export const DevelopmentTabMobile = {
  ...DevelopmentTab,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}

export const InteractionTabMobile = {
  ...InteractionTab,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}


export const VisualTestingTabMobile = {
  ...VisualTestingTab,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}

export const DocumentationTabMobile = {
  ...DocumentationTab,
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}
