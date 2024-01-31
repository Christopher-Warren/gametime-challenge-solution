import { useEffect, useState } from 'react';

// import './App.css';
import ResultsList from './components/ResultsList';
import searchIcon from './assets/search.svg';
import closeIcon from './assets/close.svg';

import logo from './assets/gametime.svg';
import { fetchEntities } from './api/fetchEntities';

import styles from './App.module.css';

type Event = {
  event: {
    id: string;
    name: string;
  };
  venue: {
    id: string;
    name: string;
  };
  performers: {
    id: string;
    hero_image_url: string;
  }[];
};

type Performer = {
  id: string;
  name: string;
  category: string;
  hero_image_url: string;
};
type Venue = {
  id: string;
  name: string;
  city: string;
  image_url: string;
};

export interface Entities {
  events: Event[];
  performers: Performer[];
  venues: Venue[];
}

function App() {
  const [term, setTerm] = useState('');
  const [entities, setEntities] = useState<Entities | null>(null);

  // Debounce API calls
  useEffect(() => {
    if (!term) {
      setEntities(null);
      return;
    }
    const timeoutId = setTimeout(async () => {
      const data = await fetchEntities(term);
      setEntities(data);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [term]);

  const noResults =
    !entities?.events.length &&
    !entities?.performers.length &&
    !entities?.venues.length;

  return (
    <main>
      <div className={styles.logo}>
        <img src={logo} alt="" />
      </div>

      <div className={styles.searchContainer}>
        <img className={styles.searchIcon} src={searchIcon} alt="" />
        <input
          placeholder="Search for an Event, Performer, or Venue"
          className={styles.inputSearch}
          type="text"
          value={term}
          onChange={(e) => {
            setTerm(e.currentTarget.value);
          }}
        />
        {term && (
          <button onClick={() => setTerm('')} className={styles.closeButton}>
            <img className={styles.closeButtonIcon} src={closeIcon} alt="" />
          </button>
        )}
      </div>

      {entities && <ResultsList entities={entities} noResults={noResults} />}
    </main>
  );
}

export default App;
