// relationDataMapper.js

export function mapRelationData(row) {
    const {
      fname,
      lname,
      username,
      uemail,
      userId,
      upicture,
      updateAt,
      userArticleId,
      articleId,
      title,
      content,
      author,
      publishedAt,
      updatedAt,
      category,
      tags,
      image,
      viewsCount,
      likesCount
    } = row;
  
    return {
      user: {
        fname,
        lname,
        username,
        uemail,
        userId,
        upicture,
        updateAt
      },
      userArticle: {
        id: userArticleId,
        userId,
        articleId
      },
      article: {
        id: articleId,
        title,
        content,
        author,
        publishedAt,
        updatedAt,
        category,
        tags,
        image,
        viewsCount,
        likesCount
      }
    };
  }
  