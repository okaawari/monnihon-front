'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    // SAKURA SYSTEM
    const sakuraRoot = document.getElementById('sakura-root');
    if (!sakuraRoot) return;

    const createPetal = () => {
      if (sakuraRoot.children.length > 20) return;
      const petal = document.createElement('div');
      petal.className = 'petal';
      const size = Math.random() * 8 + 6;
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.animationDuration = `${Math.random() * 10 + 6}s`;
      petal.style.animationDelay = `${Math.random() * 5}s`;
      sakuraRoot.appendChild(petal);
      setTimeout(() => petal.remove(), 15000);
    };

    const interval = setInterval(createPetal, 1000);

    // REVEAL SYSTEM
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // NAV SYSTEM
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);

    // MOUSE PARALLAX
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.015;
      const watermark = document.querySelector('.hero-kanji-watermark') as HTMLElement;
      if (watermark) {
        watermark.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* SAKURA PARTICLES */}
      <div className="sakura-container" id="sakura-root"></div>

      {/* NAVIGATION */}
      <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
        <Link href="#" className="nav-logo">
          <div className="logo-icon">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 50 C20 80 80 80 80 50" stroke="#004c8c" strokeWidth="8" strokeLinecap="round" />
              <path d="M80 50 C80 20 20 20 20 50" stroke="#d2232a" strokeWidth="8" strokeLinecap="round" />
              <path d="M30 35 Q50 30 70 35" stroke="#004c8c" strokeWidth="6" strokeLinecap="round" />
              <path d="M42 35 V65" stroke="#004c8c" strokeWidth="4" />
              <path d="M58 35 V65" stroke="#d2232a" strokeWidth="4" />
              <path d="M50 48 Q55 52 50 56 Q45 52 50 48" fill="#d2232a" />
              <circle cx="50" cy="18" r="5" fill="#f9a825" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="brand">MONNIHON</span>
            <div className="logo-sub-row">
              <span className="jp">日本語</span>
              <span className="mn">ЯПОН ХЭЛ СУРАХ<br />ПЛАТФОРМ</span>
            </div>
          </div>
        </Link>
        <ul className="nav-links">
          <li><Link href="#features">Давуу тал</Link></li>
          <li><Link href="#courses">Хичээлүүд</Link></li>
          <li><Link href="#how">Яаж сурах вэ?</Link></li>
          <li><Link href="#pricing">Багцууд</Link></li>
        </ul>
        <Link href="#" className="nav-cta">Мэдэгдэл авах</Link>
        <div className="menu-toggle" id="menu-btn" onClick={() => setMenuActive(true)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <ul className={`mobile-drawer ${menuActive ? 'active' : ''}`} id="mobile-drawer">
        <div className="close-drawer" id="close-btn" onClick={() => setMenuActive(false)}>&times;</div>
        <li><Link href="#features" onClick={() => setMenuActive(false)}>Давуу тал</Link></li>
        <li><Link href="#courses" onClick={() => setMenuActive(false)}>Хичээлүүд</Link></li>
        <li><Link href="#how" onClick={() => setMenuActive(false)}>Яаж сурах вэ?</Link></li>
        <li><Link href="#pricing" onClick={() => setMenuActive(false)}>Багцууд</Link></li>
        <li><Link href="#" className="nav-cta" style={{ display: 'inline-block' }} onClick={() => setMenuActive(false)}>Мэдэгдэл авах</Link></li>
      </ul>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-bg-media"></div>
        <div className="hero-kanji-watermark" aria-hidden="true">日本語</div>

        <div className="reveal">
          <div className="badge-modern">
            <div className="dot" style={{ background: '#fbbf24', boxShadow: '0 0 10px #fbbf24' }}></div>
            Тун удахгүй — Хүлээлгийн жагсаалтад нэгдээрэй
          </div>
        </div>

        <h1 className="reveal delay-1">
          <span className="gradient-text">Япон хэлийг</span>
          <span className="accent-text">эх хэлээрээ сур</span>
        </h1>

        <p className="hero-desc reveal delay-2">
          Цагаан толгойгоос эхлээд өдөр тутмын яриа хүртэл сурах шинэ ертөнц тун удахгүй нээгдэнэ. Эхний 100 сурагчийн
          нэг болж тусгай хямдрал эдлээрэй.
        </p>

        <div className="btn-group reveal delay-3">
          <Link href="#" className="btn btn-primary">🌸 Хүлээх жагсаалтад нэгдэх</Link>
          <Link href="#features" className="btn btn-secondary">Боломжууд харах</Link>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features">
        <div className="section-header reveal">
          <div className="tagline">Давуу тал</div>
          <h2 className="h2-title">Сурахад <em>хялбар</em>, санахад амархан</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '600px' }}>Бид японы хэлийг монгол хүн сурахад
            хамгийн тохиромжтой, хамгийн хөгжилтэй байхаар зохион байгуулсан.</p>
        </div>

        <div className="features-grid">
          <div className="f-card reveal delay-1">
            <div className="f-icon">🇲🇳</div>
            <h3>Монгол тайлбар</h3>
            <p>Хүнд дүрмүүдийг хамгийн энгийнээр, эх хэл дээрээ тайлбарлаж өгөх тул та маш хурдан ойлгоно.</p>
            <div className="f-kanji">説</div>
          </div>
          <div className="f-card reveal delay-2">
            <div className="f-icon">🎧</div>
            <h3>Уугуул дуудлага</h3>
            <p>Японы уугуул хэлтэй яригчдын чанартай дуу бичлэгүүд ашиглан дуудлагаа хурдан сайжруулаарай.</p>
            <div className="f-kanji">声</div>
          </div>
          <div className="f-card reveal delay-3">
            <div className="f-icon">🃏</div>
            <h3>Ухаалаг систем</h3>
            <p>Интервал давталтын (SRS) аргачлал ашиглан шинэ үгсийг богино хугацаанд мартахгүйгээр цээжил.</p>
            <div className="f-kanji">記</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS & KANA BOARD */}
      <section id="how"
        style={{ backgroundImage: "url('/japanese_calligraphy_slate_bg.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,9,15,0.92)', zIndex: -1 }}></div>
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '100px', alignItems: 'center' }}>
          <div className="reveal">
            <div className="tagline">Яаж ажилладаг вэ</div>
            <h2 className="h2-title">4 алхамд <em>суралцаж</em> эхэл</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '48px', fontSize: '1.1rem' }}>Таны японы хэлний аялалыг
              хамгийн хялбар байхаар бид төлөвлөсөн.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ color: 'var(--cherry-500)', fontWeight: 950, fontSize: '1.8rem', lineHeight: 1 }}>01</div>
                <div>
                  <h4 style={{ fontFamily: '"Shippori Mincho B1", serif', marginBottom: '8px', fontSize: '1.3rem' }}>
                    Түвшнээ тогтоох</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>Богино тест өгөөд өөрт
                    тохирсон түвшнээсээ хичээлээ эхлүүлээрэй.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ color: 'var(--cherry-500)', fontWeight: 950, fontSize: '1.8rem', lineHeight: 1 }}>02</div>
                <div>
                  <h4 style={{ fontFamily: '"Shippori Mincho B1", serif', marginBottom: '8px', fontSize: '1.3rem' }}>Өдөр
                    бүр шинэ мэдлэг</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>Систем таны мэдлэгийг
                    хянаж, танд тохирсон дасгалуудыг өдөр бүр санал болгоно.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ color: 'var(--cherry-500)', fontWeight: 950, fontSize: '1.8rem', lineHeight: 1 }}>03</div>
                <div>
                  <h4 style={{ fontFamily: '"Shippori Mincho B1", serif', marginBottom: '8px', fontSize: '1.3rem' }}>
                    Дасгалаар бататгах</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>Сонсох, унших, бичих,
                    ярих чадвараа хамтад нь хөгжүүлээрэй.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="kana-board reveal delay-2">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span
                style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 800 }}>Interactive
                Kana Explorer</span>
            </div>
            <div className="kana-grid">
              {['あ a', 'い i', 'う u', 'え e', 'お o', 'か ka', 'き ki', 'く ku', 'け ke', 'こ ko', 'さ sa', 'し shi', 'す su', 'せ se', 'そ so'].map((kana) => {
                const [jp, en] = kana.split(' ');
                return (
                  <div key={en} className="kana-item">
                    <div className="jp">{jp}</div>
                    <div className="en">{en}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses"
        style={{ backgroundImage: "url('/japanese_learning_courses_bg.png')", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,12,16,0.92)', zIndex: -1 }}></div>
        <div className="section-header reveal">
          <div className="tagline">Хөтөлбөрүүд</div>
          <h2 className="h2-title">Танд <em>зориулсан</em> хичээлүүд</h2>
        </div>

        <div className="features-grid">
          <div className="f-card reveal delay-1" style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(15px)' }}>
            <div
              style={{ fontSize: '3.5rem', marginBottom: '28px', color: 'var(--cherry-500)', fontFamily: '"Noto Serif JP", serif' }}>
              あ</div>
            <h3>Бичиг үсэг</h3>
            <p>Япон хэлийг уншиж, бичиж сурах суурь. Тэмдэгт бүрийг дуудлага, зөв бичлэгийн дүрмийн хамт.</p>
            <div style={{ marginTop: '32px', fontWeight: 900, color: 'var(--text-main)', fontSize: '1.1rem' }}>24 хичээл 👉
            </div>
          </div>
          <div className="f-card reveal delay-2"
            style={{ background: 'rgba(15,23,42,0.8)', borderColor: 'var(--cherry-glow)', boxShadow: '0 0 40px var(--cherry-glow)' }}>
            <div
              style={{ fontSize: '3.5rem', marginBottom: '28px', color: 'var(--gold-400)', fontFamily: '"Noto Serif JP", serif' }}>
              漢</div>
            <h3>JLPT Шалгалтад бэлдэх</h3>
            <p>N5-аас N3 түвшний бүх кандзи, үгсийн сан, дүрмийн цогц хөтөлбөр.</p>
            <div style={{ marginTop: '32px', fontWeight: 900, color: 'var(--cherry-500)', fontSize: '1.1rem' }}>Багц үзэх 👉
            </div>
          </div>
          <div className="f-card reveal delay-3" style={{ background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(15px)' }}>
            <div
              style={{ fontSize: '3.5rem', marginBottom: '28px', color: 'var(--text-main)', fontFamily: '"Noto Serif JP", serif' }}>
              話</div>
            <h3>Бодит ярианы дасгал</h3>
            <p>Японд амьдрах болон ажиллахад хамгийн их хэрэг болох практик мэдлэг олгох хичээлүүд.</p>
            <div style={{ marginTop: '32px', fontWeight: 900, color: 'var(--text-main)', fontSize: '1.1rem' }}>36 хичээл 👉
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="section-header reveal" style={{ textAlign: 'center', marginInline: 'auto' }}>
          <div className="tagline" style={{ justifyContent: 'center' }}>Урьдчилсан захиалга</div>
          <h2 className="h2-title">Тун <em>удахгүй</em> нээгдэнэ</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem' }}>Одоогоор хөгжүүлэлтийн шатанд явж байна. Нээлтэд
            оролцож хөнгөлөлт аваарай.</p>
        </div>

        <div className="pricing-grid">
          <div className="p-card reveal delay-1">
            <div
              style={{ fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>
              1 Сар</div>
            <div className="p-price">₮5k</div>
            <ul className="p-features">
              <li><i>✓</i> Бүх хичээлд хязгааргүй хандах</li>
              <li><i>✓</i> Өдөр бүр шинэчлэгдэх дасгал</li>
              <li><i>✓</i> Сонсох, унших цогц систем</li>
              <li><i>✓</i> Түвшнээ тогтоох шалгалтууд</li>
              <li><i>✓</i> Стандарт хандалт</li>
            </ul>
            <Link href="#" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Урьдчилж захиалах</Link>
          </div>

          <div className="p-card reveal delay-2">
            <div
              style={{ fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>
              3 Сар</div>
            <div className="p-price">₮13k</div>
            <ul className="p-features">
              <li><i>✓</i> Бүх хичээлд хязгааргүй хандах</li>
              <li><i>✓</i> Өдөр бүр шинэчлэгдэх дасгал</li>
              <li><i>✓</i> Сонсох, унших цогц систем</li>
              <li><i>✓</i> Түвшнээ тогтоох шалгалтууд</li>
              <li><i>✓</i> 10% хэмнэлттэй</li>
            </ul>
            <Link href="#" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Урьдчилж захиалах</Link>
          </div>

          <div className="p-card featured reveal delay-3">
            <div className="popular-badge">ХИТ СОНГОЛТ</div>
            <div
              style={{ fontWeight: 800, color: 'var(--cherry-400)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>
              6 Сар</div>
            <div className="p-price">₮24k</div>
            <ul className="p-features">
              <li><i>✓</i> Бүх хичээлд хязгааргүй хандах</li>
              <li><i>✓</i> Өдөр бүр шинэчлэгдэх дасгал</li>
              <li><i>✓</i> Сонсох, унших цогц систем</li>
              <li><i>✓</i> Түвшнээ тогтоох шалгалтууд</li>
              <li><i>✓</i> 20% хэмнэлттэй</li>
            </ul>
            <Link href="#" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Урьдчилж захиалах</Link>
          </div>

          <div className="p-card reveal delay-4">
            <div className="popular-badge"
              style={{ background: 'linear-gradient(135deg, var(--gold-500), #b45309)', boxShadow: '0 10px 20px var(--gold-glow)' }}>
              ШИЛДЭГ УТГА</div>
            <div
              style={{ fontWeight: 800, color: 'var(--gold-400)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>
              1 Жил</div>
            <div className="p-price" style={{ color: 'var(--gold-400)' }}>₮42k</div>
            <ul className="p-features">
              <li><i>✓</i> Бүх хичээлд хязгааргүй хандах</li>
              <li><i>✓</i> Өдөр бүр шинэчлэгдэх дасгал</li>
              <li><i>✓</i> Сонсох, унших цогц систем</li>
              <li><i>✓</i> Түвшнээ тогтоох шалгалтууд</li>
              <li><i>✓</i> 30% хэмнэлттэй</li>
            </ul>
            <Link href="#" className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--gold-glow)' }}>Урьдчилж захиалах</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '0 8% 140px' }}>
        <div
          style={{ background: 'linear-gradient(135deg, #18181b, #09090b)', padding: '100px 60px', borderRadius: '48px', border: '1px solid var(--border-glow)', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.4)' }}>
          <div
            style={{ position: 'absolute', top: '-20%', left: '-10%', fontSize: '25rem', color: 'rgba(225, 29, 72, 0.03)', fontWeight: 950, pointerEvents: 'none', fontFamily: '"Noto Serif JP", serif' }}>
            学</div>
          <div className="reveal">
            <h2 className="h2-title">Япон хэлний аялалдаа <em>бэлэн</em> үү?</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 56px', fontSize: '1.2rem' }}>Бид тун
              удахгүй нээлтээ хийнэ. Имэйлээ бүртгүүлж, нээлтийн тусгай урамшууллыг түрүүлж аваарай.</p>
            <div className="btn-group">
              <Link href="#" className="btn btn-primary">🌸 Хүлээлгийн жагсаалт</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="#" className="nav-logo" style={{ marginBottom: '32px' }}>
              <div className="logo-icon">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 50 C20 80 80 80 80 50" stroke="#004c8c" strokeWidth="8"
                    strokeLinecap="round" />
                  <path d="M80 50 C80 20 20 20 20 50" stroke="#d2232a" strokeWidth="8"
                    strokeLinecap="round" />
                  <path d="M50 48 Q55 52 50 56 Q45 52 50 48" fill="#d2232a" />
                  <circle cx="50" cy="18" r="5" fill="#f9a825" />
                </svg>
              </div>
              <div className="logo-text">
                <span className="brand">MONNIHON</span>
                <div className="logo-sub-row">
                  <span className="jp">日本語</span>
                  <span className="mn">ЯПОН ХЭЛ СУРАХ<br />ПЛАТФОРМ</span>
                </div>
              </div>
            </Link>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, fontSize: '1rem', maxWidth: '320px' }}>Япон хэл суралцах
              хамгийн сонирхолтой, хэрэглэхэд хялбар монгол платформ.</p>
            <div style={{ marginTop: '24px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>info@monnihon.mn</div>
          </div>
          <div className="footer-col">
            <h4>Платформ</h4>
            <ul className="footer-links">
              <li><Link href="#courses">Хичээлүүд</Link></li>
              <li><Link href="#">Флэшкард</Link></li>
              <li><Link href="#">Шалгалт</Link></li>
              <li><Link href="#">Миний амжилт</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Тусламж</h4>
            <ul className="footer-links">
              <li><Link href="#">Түгээмэл асуулт</Link></li>
              <li><Link href="#">Нийгэмлэг</Link></li>
              <li><Link href="#">Нэвтрэх</Link></li>
              <li><Link href="#">Бүртгүүлэх</Link></li>
            </ul>
          </div>
        </div>
        <div
          style={{ paddingTop: '50px', borderTop: '1px solid var(--border-thin)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
          <p>© 2025 Monnihon. Бүх эрх хуулиар хамгаалагдсан.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="#" style={{ color: 'var(--text-dim)', fontWeight: 700 }}>Facebook</Link>
            <Link href="#" style={{ color: 'var(--text-dim)', fontWeight: 700 }}>Instagram</Link>
            <Link href="#" style={{ color: 'var(--text-dim)', fontWeight: 700 }}>YouTube</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
