import redirects_docs_r from './redirects_docs_[r]';
import redirects_docs_v from './redirects_docs_[v]';
import redirects_addons from './redirects_addons';
import redirects_basics from './redirects_basics';
import redirects_docs_basics from './redirects_basics';
import redirects_configurations from './redirects_configurations';
import redirects_designSystem from './redirects_design-system';
import redirects_docs_addons from './redirects_docs_addons';
import redirects_docs_configurations from './redirects_docs_configurations';
import redirects_docs_examples from './redirects_docs_examples';
import redirects_docs_formats from './redirects_docs_formats';
import redirects_docs_getStarted from './redirects_docs_get-started';
import redirects_docs_logos from './redirects_docs_logos';
import redirects_docs_presets from './redirects_docs_presets';
import redirects_docs_testing from './redirects_docs_testing';
import redirects_examples from './redirects_examples';
import redirects_guides from './redirects_guides';
import redirects_integrations from './redirects_integrations';
import redirects_logos from './redirects_logos';
import redirects_migrationGuides from './redirects_migration-guides';
import redirects_recipes from './redirects_recipes';
import redirects_status from './redirects_status';
import redirects_tags from './redirects_tags';
import redirects_telemetry from './redirects_telemetry';
import redirects_testing from './redirects_testing';
import redirects_versions from './redirects_versions';
import redirects_docs_configure from './redirects_docs_configure';
import redirects_docs_workflows from './redirects_docs_workflows';
import redirects_docs_api from './redirects_docs_api';
import redirects_docs_whyStorybook from './redirects_docs_why-storybook';
import redirects_docs_writtingDocs from './redirects_docs_writting-docs';
import redirects_docs_writtingTests from './redirects_docs_writting-tests';
import redirects_docs_essentials from './redirects_docs_essentials';
import redirects_docs_writtingStories from './redirects_docs_writting-stories';
import redirects_docs_builders from './redirects_docs_builders';
import redirects_docs_contribute from './redirects_docs_contribute';

// Merge all redirects into a single list
// The order of the list is important
// The first matching redirect will be used

export const listOfRedirects: RedirectData[] = [
  ...redirects_addons,
  ...redirects_basics,
  ...redirects_configurations,
  ...redirects_designSystem,
  ...redirects_docs_addons,
  ...redirects_docs_api,
  ...redirects_docs_basics,
  ...redirects_docs_builders,
  ...redirects_docs_configure,
  ...redirects_docs_configurations,
  ...redirects_docs_contribute,
  ...redirects_docs_essentials,
  ...redirects_docs_getStarted,
  ...redirects_docs_examples,
  ...redirects_docs_formats,
  ...redirects_docs_logos,
  ...redirects_docs_presets,
  ...redirects_docs_testing,
  ...redirects_docs_workflows,
  ...redirects_docs_whyStorybook,
  ...redirects_docs_writtingDocs,
  ...redirects_docs_writtingStories,
  ...redirects_docs_writtingTests,
  ...redirects_docs_r,
  ...redirects_docs_v,
  ...redirects_examples,
  ...redirects_guides,
  ...redirects_integrations,
  ...redirects_logos,
  ...redirects_migrationGuides,
  ...redirects_recipes,
  ...redirects_status,
  ...redirects_tags,
  ...redirects_telemetry,
  ...redirects_testing,
  ...redirects_versions,
];
