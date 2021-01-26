import styles from '../styles/component/tags.module.scss';

type Tag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <ul className={styles.tagList}>
      {tags.map((tag) => {
        return (
          <li className={styles.tagListItem} key={tag.id}>
            {tag.name}
          </li>
        );
      })}
    </ul>
  );
};

export default Tags;
