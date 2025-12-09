import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function Home() {
  const tHero = useTranslations('hero');
  const tStats = useTranslations('stats');

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            {tHero('title')}
          </h1>
          <p className={styles.heroSubtitle}>
            {tHero('subtitle')}
          </p>
          <div className={styles.heroCta}>
            <Link href="/retseptid" className={`${styles.btn} ${styles.btnPrimary}`}>
              {tHero('view_recipes')}
            </Link>
            <Link href="/lisa-retsept" className={`${styles.btn} ${styles.btnSecondary}`}>
              {tHero('add_recipe')}
            </Link>
          </div>
          <p className={styles.joinText}>Liitu Cooklyga</p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>1,500+</div>
              <div className={styles.statLabel}>{tStats('recipes')}</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>600+</div>
              <div className={styles.statLabel}>{tStats('users')}</div>
            </div>
          </div>
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollArrow}>↓</div>
          </div>
        </div>
      </section>
    </div>
  );
}
