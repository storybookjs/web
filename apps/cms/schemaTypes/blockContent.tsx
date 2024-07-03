import SanityImageUrlBuilder from '@sanity/image-url'
import {defineType, defineArrayMember, defineField, PreviewProps} from 'sanity'
import {PlayIcon, TwitterIcon, ImageIcon} from '@sanity/icons'
import {Flex, Text, Box} from '@sanity/ui'
import YouTubePlayer from 'react-player/youtube'

const imageUrlBuilder = SanityImageUrlBuilder({
  projectId: '2fn86m3z',
  dataset: 'production',
})

export function YouTubePreview(props: PreviewProps) {
  const {title: url} = props

  return (
    <Flex padding={3} align="center" justify="center">
      {typeof url === 'string' ? <YouTubePlayer url={url} /> : <Text>Add a YouTube URL</Text>}
    </Flex>
  )
}

export function ImagePreview({image, large, caption}: any) {
  const url = image ? imageUrlBuilder.image(image).width(600).url() : ''
  console.log(caption)

  return (
    <Flex padding={3} direction="column">
      {url ? (
        <img src={url} alt="" style={{width: '100%'}} />
      ) : (
        <Box style={{backgroundColor: 'rgba(82, 104, 252, 0.06)', height: 200, borderRadius: 4}} />
      )}
      <div
        style={{
          paddingTop: '1rem',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontFamily:
              'Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Liberation Sans",Helvetica,Arial,system-ui,sans-serif',
            fontWeight: 400,
            fontSize: '0.8125rem',
            letterSpacing: '0',
          }}
        >
          {large ? 'Large' : 'Fit'} - {caption ? caption : 'No caption'}
        </span>
      </div>
    </Flex>
  )
}

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
      title: 'Image',
      icon: ImageIcon,
      components: {
        preview: ImagePreview,
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
          caption: 'caption',
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'tweet',
      title: 'Tweet',
      icon: TwitterIcon,
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
      icon: PlayIcon,
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
    defineArrayMember({
      name: 'youtube',
      type: 'object',
      title: 'YouTube',
      icon: PlayIcon,
      fields: [
        defineField({
          name: 'url',
          type: 'url',
          title: 'YouTube video URL',
        }),
      ],
      preview: {
        select: {title: 'url'},
      },
      components: {
        preview: YouTubePreview,
      },
    }),
  ],
})
