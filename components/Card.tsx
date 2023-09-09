import Link from "next/link";
import { ReactElement } from "react";
import Category from "./Category";

type CardProps = {
  id: number;
  title: string;
  description: string;
  category: number[];
  image: string;
  slug: string;
  onImageError: (id: number) => void;
  getCategoryName: (id: number) => string;
};
const Card = ({
  id,
  title,
  description,
  category,
  image,
  slug,
  onImageError,
  getCategoryName,
}: CardProps): ReactElement => {
  return (
    <Link
      href={slug}
      className="block max-w-sm bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <img
        src={image}
        alt={title}
        className="object-cover w-full mb-6 max-h-40"
        onError={() => onImageError(id)}
      />

      <div className="px-6 pb-6">
        <div className="space-x-2 mb-2">
          {category.length > 0 &&
            category.map((cat) => (
              <Category key={cat} text={getCategoryName(cat)} />
            ))}
        </div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default Card;
