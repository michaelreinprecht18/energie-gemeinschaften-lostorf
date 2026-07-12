import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import type { Metadata } from 'next'
import SiteNav from '../components/SiteNav'
import SiteFooter from '../components/SiteFooter'

export const metadata: Metadata = {
  title: 'Blog – Energiegemeinschaften Lostorf',
  description: 'Artikel und Neuigkeiten rund um LEG, vZEV und Solarstrom in Lostorf.',
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

function getPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  return files
    .map(filename => {
      const slug = filename.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8')
      const { data } = matter(raw)
      return { slug, title: data.title, date: data.date, description: data.description, author: data.author }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

const S = {
  serif: 'var(--font-baskerville), Georgia, serif',
  sans: 'var(--font-nunito), system-ui, sans-serif',
}

export default function BlogPage() {
  const posts = getPosts()

  return (
    <>
      <SiteNav />

      {/* Header */}
      <div style={{ background: '#E7F9E4', padding: '64px 24px 48px', textAlign: 'center' }}>
        <span style={{ fontFamily: S.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9A7B2E' }}>
          Aktuelles
        </span>
        <h1 style={{ fontFamily: S.serif, fontWeight: 500, fontSize: 'clamp(28px, 4vw, 42px)', color: '#1A1510', marginTop: 12, marginBottom: 16, lineHeight: 1.2 }}>
          Blog
        </h1>
        <p style={{ fontFamily: S.sans, fontSize: 17, fontWeight: 300, color: '#5C5248', maxWidth: 520, margin: '0 auto' }}>
          Hintergründe, Erklärungen und Neuigkeiten rund um LEG, vZEV und Solarstrom in Lostorf.
        </p>
      </div>

      {/* Post list */}
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '56px 24px 96px' }}>
        {posts.length === 0 && (
          <p style={{ fontFamily: S.sans, color: '#5C5248', textAlign: 'center' }}>Noch keine Artikel vorhanden.</p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: 'block' }}>
              <article style={{
                background: '#FFFFFF',
                border: '1px solid #D9CEB5',
                borderRadius: 12,
                padding: '28px 28px 24px',
                transition: 'border-color 0.15s',
              }}>
                <div style={{ fontFamily: S.sans, fontSize: 12, color: '#9A7B2E', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {new Date(post.date).toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' })}
                  {post.author && <span style={{ color: '#D9CEB5', margin: '0 8px' }}>·</span>}
                  {post.author}
                </div>
                <h2 style={{ fontFamily: S.serif, fontWeight: 500, fontSize: 22, color: '#1A1510', marginBottom: 10, lineHeight: 1.3 }}>
                  {post.title}
                </h2>
                {post.description && (
                  <p style={{ fontFamily: S.sans, fontSize: 15, color: '#5C5248', lineHeight: 1.65, margin: 0 }}>
                    {post.description}
                  </p>
                )}
                <div style={{ fontFamily: S.sans, fontSize: 14, color: '#9A7B2E', marginTop: 16, fontWeight: 600 }}>
                  Artikel lesen →
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </>
  )
}
