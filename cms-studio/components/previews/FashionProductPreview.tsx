import React from 'react'
import { Box, Card, Flex, Stack, Text, Badge, Grid } from '@sanity/ui'
import { fashionImageBuilder } from '../../lib/utils/fashionImageTransformer'

const ColorSwatch = ({ color }: { color: any }) => (
  <Box
    style={{
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: color.hex || color.value,
      border: '2px solid #fff',
      boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
    }}
  />
)

const PriceDisplay = ({ price, salePrice }: { price: number, salePrice?: number }) => {
  const formatPrice = (amount: number) => 
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' })
      .format(amount)

  return (
    <Text>
      {salePrice ? (
        <Flex gap={2} align="center">
          <Text style={{ textDecoration: 'line-through' }} muted>
            {formatPrice(price)}
          </Text>
          <Text  weight="bold">
            {formatPrice(salePrice)}
          </Text>
          <Badge tone="critical">
            {Math.round((1 - salePrice/price) * 100)}% OFF
          </Badge>
        </Flex>
      ) : (
        <Text weight="semibold">{formatPrice(price)}</Text>
      )}
    </Text>
  )
}

export const FashionProductPreview = ({ value }: { value: any }) => {
  if (!value?.mainImage) return null

  const imageUrl = fashionImageBuilder([value.mainImage], {
    treatment: 'catalog',
    colorScheme: 'original'
  })[0]

  const variantSizes = value.variants
    ?.map((v: any) => v.size?.name)
    .filter((s: string) => s)
    .sort()

  const variantColors = value.variants
    ?.map((v: any) => v.color)
    .filter((c: any) => c)

  const lowestPrice = Math.min(...(value.variants?.map((v: any) => v.price) || [value.basePrice]))
  const onSale = value.isOnSale && value.salePrice
  
  return (
    <Card padding={4} radius={2} shadow={1}>
      <Grid columns={[1, 1, 2]} gap={4}>
        <Box>
          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '4px',
                aspectRatio: '3/4',
                objectFit: 'cover'
              }}
            />
          )}
        </Box>
        <Stack space={4}>
          <Stack space={2}>
            {value.brand && (
              <Text size={1} weight="semibold" style={{ textTransform: 'uppercase' }}>
                {value.brand.name}
              </Text>
            )}
            <Text size={2} weight="bold">
              {value.name?.en || value.name}
            </Text>
            <PriceDisplay price={lowestPrice} salePrice={onSale ? value.salePrice : undefined} />
          </Stack>

          <Stack space={3}>
            {value.categories?.length > 0 && (
              <Flex gap={2} wrap="wrap">
                {value.categories.map((cat: any) => (
                  <Badge key={cat._ref} mode="outline">
                    {cat.name}
                  </Badge>
                ))}
              </Flex>
            )}
            
            {variantSizes?.length > 0 && (
              <Box>
                <Text size={1} weight="medium" style={{ marginBottom: '4px' }}>
                  Available Sizes:
                </Text>
                <Flex gap={2} wrap="wrap">
                  {variantSizes.map((size: string) => (
                    <Badge key={size} mode="outline" tone="primary">
                      {size}
                    </Badge>
                  ))}
                </Flex>
              </Box>
            )}

            {variantColors?.length > 0 && (
              <Box>
                <Text size={1} weight="medium" style={{ marginBottom: '4px' }}>
                  Available Colors:
                </Text>
                <Flex gap={2}>
                  {variantColors.map((color: any, idx: number) => (
                    <ColorSwatch key={idx} color={color} />
                  ))}
                </Flex>
              </Box>
            )}
          </Stack>

          {value.material && (
            <Text size={1}>
              Material: {value.material.name}
            </Text>
          )}

          {value.description?.en && (
            <Text size={1} muted style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {value.description.en}
            </Text>
          )}
        </Stack>
      </Grid>
    </Card>
  )
}

// Register in schema
export const fashionProductPreviewConfig = {
  select: {
    name: 'name',
    brand: 'brand',
    mainImage: 'mainImage',
    categories: 'categories',
    variants: 'variants',
    material: 'material',
    description: 'description',
    basePrice: 'basePrice',
    isOnSale: 'isOnSale',
    salePrice: 'salePrice'
  },
  component: FashionProductPreview
}
