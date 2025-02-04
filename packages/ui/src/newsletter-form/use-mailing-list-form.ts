import * as React from 'react';
import type { FormikValues } from 'formik';

const config = {
  id: '18b5cea6e6',
  url: 'https://storybook.us18.list-manage.com/subscribe/post',
  server: 'us18',
  fields: {
    u: '06a6fce3ab1327784d4342396',
    id: '18b5cea6e6',
  },
};

type SubmitHandler = (values: FormikValues) => Promise<void>;

export function useMailingListForm(onSubscribe?: () => void): [boolean, SubmitHandler] {
  const [hasSubmitted, setSubmitStatus] = React.useState(false);

  const onSubmitForm: SubmitHandler = async (values) => {
    const data = new FormData();
    const fullFields = {
      ...config.fields,
      MERGE0: values.email as string,
    } as const;

    Object.keys(fullFields).forEach((key) =>
      { data.append(key, fullFields[key as keyof typeof fullFields]); }
    );

    await fetch(config.url, {
      method: 'POST',
      body: data,
      mode: 'no-cors',
    });

    if (onSubscribe) {
      onSubscribe();
    }

    setSubmitStatus(true);
  };

  return [hasSubmitted, onSubmitForm];
}