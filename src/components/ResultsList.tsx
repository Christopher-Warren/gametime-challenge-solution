import { Entities } from '../App';
import styles from './resultsList.module.css';

type RenderedItem = {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
};

const ResultsList = ({
  entities,
  noResults,
}: {
  entities: Entities;
  noResults: boolean;
}) => {
  const events = entities.events.map(({ event, performers, venue }) => {
    return {
      id: event.id,
      title: event.name,
      subtitle: venue.name,
      imageSrc: performers[0].hero_image_url,
    };
  });
  const performers = entities.performers.map((performer) => {
    return {
      id: performer.id,
      title: performer.name,
      subtitle: performer.category,
      imageSrc: performer.hero_image_url,
    };
  });
  const venues = entities.venues.map((venue) => {
    return {
      id: venue.id,
      title: venue.name,
      subtitle: venue.city,
      imageSrc: venue.image_url,
    };
  });

  const renderEntities = (entity: RenderedItem[]) => {
    return entity.map(({ title, subtitle, imageSrc, id }, index) => {
      if (index >= 3) return null;

      return (
        <li key={id}>
          <button className={styles.entityContainer}>
            <img className={styles.entityImage} src={imageSrc} alt="" />
            <div className={styles.overflowHidden}>
              <p className={styles.entityTitle}>{title}</p>
              <p className={styles.entitySubtitle}>{subtitle}</p>
            </div>
          </button>
        </li>
      );
    });
  };

  return (
    <div className={styles.listContainer}>
      {!noResults ? (
        <>
          <div>
            <h2>Events</h2>
            <ul>{renderEntities(events)}</ul>
          </div>
          <div>
            <h2>Performers</h2>
            <ul>{renderEntities(performers)}</ul>
          </div>
          <div>
            <h2>Venues</h2>
            <ul>{renderEntities(venues)}</ul>
          </div>
        </>
      ) : (
        <p className={styles.error}>No Results</p>
      )}
    </div>
  );
};
export default ResultsList;
