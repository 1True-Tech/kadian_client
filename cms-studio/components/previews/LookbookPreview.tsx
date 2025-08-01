import imageUrlBuilder from '@/lib/utils/imageUrlBuilder'
import { Badge, Box, Card, Flex, Stack, Text } from '@sanity/ui'

export const LookbookPreview = ({ value }: { value: any }) => {
  
  if (!value?.looks?.[0]?.image) return null

  const mainImage = value.looks[0].image
  const imageUrl = mainImage && imageUrlBuilder([mainImage], {
    width: 400,
    height: 600,
    fit: 'crop'
  })[0]

  const season = value.season ? `${value.season.name} ${value.season.year}` : ''
  const totalProducts = value.looks.reduce((sum: number, look: any) => 
    sum + (look.products?.length || 0), 0)

  return (
    <Card padding={4} radius={2} shadow={1}>
      <Flex gap={4}>
        {imageUrl && (
          <Box style={{ width: '200px', height: '300px', position: 'relative' }}>
            <img
              src={imageUrl}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
            {season && (
              <Badge tone="primary" style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '4px 8px'
              }}>
                {season}
              </Badge>
            )}
          </Box>
        )}
        <Stack space={3} flex={1}>
          <Text size={3} weight="semibold">
            {value.title?.en || 'Untitled Lookbook'}
          </Text>
          <Text size={1}>
            {value.looks?.length || 0} {'looks'} • {totalProducts} {'products'}
          </Text>
          {value.introduction?.en && (
            <Text size={1} muted style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {value.introduction.en[0]?.children[0]?.text}
            </Text>
          )}
          {value.tags && value.tags.length > 0 && (
            <Flex gap={2} wrap="wrap">
              {value.tags.map((tag: string) => (
                <Badge key={tag} tone="primary" mode="outline">
                  {tag}
                </Badge>
              ))}
            </Flex>
          )}
        </Stack>
      </Flex>
    </Card>
  )
}

// Register in schema
export const lookbookPreviewConfig = {
  select: {
    title: 'title',
    season: 'season',
    looks: 'looks',
    introduction: 'introduction',
    tags: 'tags'
  },
  component: LookbookPreview
}
