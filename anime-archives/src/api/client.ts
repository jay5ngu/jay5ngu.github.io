import type { Show } from "../types/shows";

const BASE_URL = "";

export async function searchAnimeByName(): Promise<Show[]> {
    var shows = [{
        "id": 151807,
        "title": {
            "romaji": "Ore dake Level Up na Ken",
            "english": "Solo Leveling",
            "native": "\u4ffa\u3060\u3051\u30ec\u30d9\u30eb\u30a2\u30c3\u30d7\u306a\u4ef6"
        },
        "startDate": {
            "month": 1,
            "year": 2024
        },
        "coverImage": {
            "medium": "https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx151807-it355ZgzquUd.png"
        },
        "description": "They"
    }]

    return shows;
}