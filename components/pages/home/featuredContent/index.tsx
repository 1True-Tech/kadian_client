import React from 'react'
import FcItem from './fcItem'
import { FeaturedContentItem } from './types'

type Props = {
  items:FeaturedContentItem[]
}

export default function FeaturedContent({items}: Props) {
  return (
    items.map((item, idx) => <FcItem item={item} key={idx} />)
  )
}