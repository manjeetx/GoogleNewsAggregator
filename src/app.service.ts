import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getNews(query) {
    if (!query.q) {
      throw new BadRequestException("querry for news q is required");

    }
    const url = 'https://gnews.io/api/v4/search';

    const params = {
      q: query.q,
      max: 100,
      token: process.env.GNEWS_API_KEY
    };

    const response = await axios.get(url, { params });

    const articles = response.data.articles.map(article => {
      return {
        title: article.title,
        description: article.description,
        url: article.url,
        imageUrl: article.image
      };
    });

    return articles;
  }
}
