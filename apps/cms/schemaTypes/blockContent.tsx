import SanityImageUrlBuilder from '@sanity/image-url'
import {defineType, defineArrayMember} from 'sanity'

const imageUrlBuilder = SanityImageUrlBuilder({
  projectId: '2fn86m3z',
  dataset: 'production',
})

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: 'code',
      name: 'code',
      title: 'Code',
    }),
    defineArrayMember({
      type: 'object',
      name: 'image-block',
      title: 'New Image',
      components: {
        preview: (props: any) => {
          const url = imageUrlBuilder.image(props.image).width(600).url()
          return (
            <div
              style={{
                width: 'calc(100% - 1.5rem)',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                paddingTop: '0.75rem',
              }}
            >
              <img src={url} alt="" style={{width: '100%'}} />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  textTransform: 'uppercase',
                  fontFamily:
                    'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Liberation Sans",system-ui,sans-serif',
                  fontWeight: 600,
                  fontSize: '0.675rem',
                  letterSpacing: '0.03125rem',
                  borderTop: '1px solid #e3e4e8',
                  marginTop: '0.75rem',
                  paddingTop: '1rem',
                  paddingBottom: '0.75rem',
                  color: '#6a6e7d',
                }}
              >
                Position: {props.large ? 'Large' : 'Normal'}
              </div>
            </div>
          )
        },
      },
      fields: [
        {
          type: 'image',
          name: 'image',
          title: 'Image',
        },
        {
          type: 'boolean',
          name: 'large',
          title: 'Is large?',
          initialValue: false,
        },
        {
          type: 'string',
          name: 'caption',
          title: 'Caption',
        },
      ],
      preview: {
        select: {
          image: 'image',
          large: 'large',
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'tweet',
      title: 'Tweet',
      fields: [
        {
          type: 'string',
          name: 'tweetId',
          title: 'Tweet ID',
        },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'video',
      title: 'Video',
      fields: [
        {
          type: 'file',
          name: 'videoFile',
          title: 'Video File',
        },
        {
          type: 'string',
          name: 'caption',
          title: 'Caption',
        },
      ],
    }),
  ],
})
