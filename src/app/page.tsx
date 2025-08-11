'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Components
import { Button, PageLayout, PageFooter } from '@/components';

// Hooks
import { useMounted } from '@/hooks';

// Styles
import buttonStyles from '@/styles/components/buttons.module.css';
import typographyStyles from '@/styles/utilities/typography.module.css';

export default function Home(): React.JSX.Element {
  const [time, setTime] = useState<string>('');
  const isMounted = useMounted();

  useEffect(() => {
    const updateTime = (): void => setTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PageLayout>
      <h1 className={typographyStyles.tabularNums}>
        {isMounted ? time : '00:00:00'}
      </h1>

      <PageFooter>
        <div className={buttonStyles.buttonGroup}>
          <Button href="/next" variant="secondary">
            <Image
              className={typographyStyles.logo}
              src="/next.svg"
              alt="Next.js logo"
              width={90}
              height={19}
              priority
            />
          </Button>
          <Button href="/start" variant="secondary">
            Start →
          </Button>
        </div>
      </PageFooter>
    </PageLayout>
  );
}
