import imageUrlBuilder from '@/cms-studio/lib/utils/imageUrlBuilder'
import { Box, Card, Stack, Text } from '@sanity/ui'

export const BlogPostPreview = ({value}: {value: any}) => {
  if (!value) return null

  const { title, excerpt, featuredImage, publishedAt } = value
  
  // Use our existing imageUrlBuilder utility
  const imageUrl = featuredImage && imageUrlBuilder([featuredImage], {
    width: 300,
    quality: 80
  })[0]
  
  return (
    <Card padding={3} radius={2} shadow={1}>
      <Stack space={4}>
        {imageUrl && (
          <Box style={{aspectRatio: '16/9', overflow: 'hidden', borderRadius: '4px'}}>
            <img 
              src={imageUrl} 
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </Box>
        )}
        <Stack space={3}>
          <Text size={2} weight="semibold">
            {title}
          </Text>
          {excerpt && (
            <Text size={1} muted>
              {excerpt.length > 140 ? excerpt.substring(0, 140) + '...' : excerpt}
            </Text>
          )}
          {publishedAt && (
            <Text size={0} muted>
              {new Date(publishedAt).toLocaleDateString()}
            </Text>
          )}
        </Stack>
      </Stack>
    </Card>
  )
}

// Register in schema
export const blogPreviewConfig = {
  select: {
    title: 'title',
    excerpt: 'excerpt',
    featuredImage: 'featuredImage',
    publishedAt: 'publishedAt'
  },
  component: BlogPostPreview
}
