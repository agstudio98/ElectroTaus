import { Main } from '../sections/main';
import { About } from '../sections/about';
import { Timeline } from '../sections/timeline';
import { Offerts } from '../sections/offerts';
import { Sales } from '../sections/sales';
import { Carrousel } from '../sections/carrousel';

export function Home() {
  return (
    <div>
      <Main />
      <About />
      <Timeline />
      <Offerts />
      <Sales />
      <Carrousel />
    </div>
  );
}
