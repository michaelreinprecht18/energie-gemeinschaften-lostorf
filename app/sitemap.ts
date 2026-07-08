import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { MetadataRoute } from 'next'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')
const siteUrl = 'https://lostorf.solar'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  const posts: MetadataRoute.Sitemap = files.map(filename => {
    const slug = filename.replace('.mdx', '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
    const { data } = matter(raw)
    return {
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(data.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    }
  })

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...posts,
    { url: `${siteUrl}/leg-karte.html`, changeFrequency: 'daily', priority: 0.6 },
    { url: `${siteUrl}/pv-karte.html`, changeFrequency: 'daily', priority: 0.6 },
    { url: `${siteUrl}/rechner/konsument`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/rechner/produzent`, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
