import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import type { Metadata } from 'next'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export async function generateStaticParams() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))
  return files.map(f => ({ slug: f.replace('.mdx', '') }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), 'utf8')
  const { data } = matter(raw)
  return { title: `${data.title} – Energie Gemeinschaften Lostorf`, description: data.description }
}

const S = {
  serif: 'var(--font-baskerville), Georgia, serif',
  sans: 'var(--font-nunito), system-ui, sans-serif',
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), 'utf8')
  const { content, data } = matter(raw)

  return (
    <>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: '#FFFFFF', borderBottom: '1px solid #D9CEB5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: S.serif, fontWeight: 700, color: '#1A1510', fontSize: 15, whiteSpace: 'nowrap' }}>
            Energie Gemeinschaften <span style={{ color: '#9A7B2E' }}>Lostorf</span>
          </Link>
          <Link href="/blog" style={{ fontFamily: S.sans, fontSize: 14, color: '#5C5248' }}>
            ← Alle Artikel
          </Link>
        </div>
      </nav>

      {/* Article header */}
      <div style={{ background: '#E7F9E4', padding: '64px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontFamily: S.sans, fontSize: 12, color: '#9A7B2E', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 16 }}>
          {new Date(data.date).toLocaleDateString('de-CH', { day: '2-digit', month: 'long', year: 'numeric' })}
          {data.author && <span style={{ color: '#D9CEB5', margin: '0 8px' }}>·</span>}
          {data.author}
        </div>
        <h1 style={{ fontFamily: S.serif, fontWeight: 700, fontSize: 'clamp(26px, 4vw, 44px)', color: '#1A1510', lineHeight: 1.2, maxWidth: 720, margin: '0 auto 16px' }}>
          {data.title}
        </h1>
        {data.description && (
          <p style={{ fontFamily: S.sans, fontSize: 18, fontWeight: 300, color: '#5C5248', maxWidth: 600, margin: '0 auto' }}>
            {data.description}
          </p>
        )}
      </div>

      {/* Article body */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 96px' }}>
        <div className="prose">
          <MDXRemote source={content} />
        </div>

        <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid #D9CEB5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Link href="/blog" style={{ fontFamily: S.sans, fontSize: 14, color: '#9A7B2E', fontWeight: 600 }}>
            ← Alle Artikel
          </Link>
          <Link href="/#kontakt" style={{ fontFamily: S.sans, fontSize: 14, color: '#9A7B2E', fontWeight: 600 }}>
            Fragen? Kontakt aufnehmen →
          </Link>
        </div>
      </main>

      <footer style={{ background: '#2C4A28', color: '#B8D9B4', padding: '32px 24px', textAlign: 'center' }}>
        <span style={{ fontFamily: S.serif, fontWeight: 700, fontSize: 14, color: '#E7F9E4' }}>
          Energie Gemeinschaften Lostorf
        </span>
      </footer>
    </>
  )
}
