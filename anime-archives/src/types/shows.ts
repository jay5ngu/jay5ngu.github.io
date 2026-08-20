// Set data structure for shows
interface title {
  romaji: string;
  english: string;
  native: string;
}

interface coverImage {
    medium: string;
    large: string;
    extraLarge: string;
    color: string
}
export interface Show {
  id: number;
  title: title;
  // kind: "Anime" | "TV";
  startDate: string;
  coverImage: coverImage;
  description: string;
}