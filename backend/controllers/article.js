import { connection } from "../index.mjs";
import Article from "../schemes/articlemodel.js";
import { mapRelationData } from './function/relationDataMapper.js';

//get all the relation data
export const getAllRelationArticleUser = (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Current page number, default is 1
    const limit = parseInt(req.query.limit) || 10; // Number of results per page, default is 10
    const offset = (page - 1) * limit; // Calculate the offset
    
    const query = `
      SELECT *
      FROM users
      JOIN user_articles ON users.userid = user_articles.userId
      JOIN articles ON user_articles.articleId = articles.id
      LIMIT ${limit} OFFSET ${offset} 
    `;
    
    connection.query(query, (error, results) => {
      if (error) {
        // Handle the database query error with a 500 status code
        return res.status(500).json({ error: "Internal Server Error" });
      }
    
      const relationData = results.map(mapRelationData);
    
      const totalViewsCount = results.reduce((sum, row) => sum + row.viewsCount, 0);
    
      res.status(200).json({
        countAllViews: totalViewsCount,
        relationData,
        page,
        totalPages: Math.ceil(results.length / limit)
      });
    });
  };

//get all the  data
export const getAllArticleUser = (req, res, next) => {
    const query = `
      SELECT *
      FROM articles
    `;
    
    connection.query(query, (error, results) => {
      if (error) {
        // Handle the database query error with a 500 status code
        return res.status(500).json({ error: "Internal Server Error" });
      }
    
      res.status(200).json({
        results
      });
    });
  };

  // get by id relation
  export const getArticleById = async (req, res, next) => {
    try {
      const articleId = req.params.id;
      
      const query = `
        SELECT *
        FROM users
        JOIN user_articles ON users.userid = user_articles.userId
        JOIN articles ON user_articles.articleId = articles.id
        WHERE articles.id = ${articleId}
      `;
      
      connection.query(query, (error, results) => {
        if (error) {
          // Handle the database query error with a 500 status code
          return res.status(500).json({ error: "Internal Server Error" });
        }
        
        // Check if the article exists
        if (results.length === 0) {
          return res.status(404).json({ message: "Article not found" });
        }
        
        const relationData = results.map(mapRelationData);
        
        res.status(200).json({ relationData });
      });
    } catch (error) {
      // Handle any other errors that might occur
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
    // get by id
    export const getOnlyArticleById = async (req, res, next) => {
      try {
        const articleId = req.params.id;
        
        const query = `
        SELECT *
        FROM articles
          WHERE articles.id = ${articleId}
        `;
        
        connection.query(query, (error, results) => {
          if (error) {
            // Handle the database query error with a 500 status code
            return res.status(500).json({ error: "Internal Server Error" });
          }
          
          // Check if the article exists
          if (results.length === 0) {
            return res.status(404).json({ message: "Article not found" });
          }
          
          
          res.status(200).json({ results });
        });
      } catch (error) {
        // Handle any other errors that might occur
        return res.status(500).json({ error: "Internal Server Error" });
      }
    };
  // search home and relation 
  export const getSearchRelationArticleUser = (req, res, next) => {
    const { search, page, limit } = req.query;
    const offset = (page - 1) * limit;
  
    let query = `
      SELECT *,
        COUNT(*) OVER() AS totalCount
      FROM users
      JOIN user_articles ON users.userid = user_articles.userId
      JOIN articles ON user_articles.articleId = articles.id
    `;
  
    let countQuery = `
      SELECT COUNT(*) AS totalCount
      FROM users
      JOIN user_articles ON users.userid = user_articles.userId
      JOIN articles ON user_articles.articleId = articles.id
    `;
  
    if (search !== "") {
      const searchQuery = connection.escape(`%${search}%`); // Escaping and formatting search term
  
      query += `
        WHERE users.username LIKE ${searchQuery}
          OR articles.title LIKE ${searchQuery}
          OR articles.content LIKE ${searchQuery}
          OR articles.author LIKE ${searchQuery}
          OR articles.publishedAt LIKE ${searchQuery}
          OR articles.category LIKE ${searchQuery}
          OR articles.category LIKE ${searchQuery}
          OR users.fname LIKE ${searchQuery}
          OR users.lname LIKE ${searchQuery}
      `;
  
      countQuery += `
        WHERE users.username LIKE ${searchQuery}
          OR articles.title LIKE ${searchQuery}
          OR articles.content LIKE ${searchQuery}
          OR articles.author LIKE ${searchQuery}
          OR articles.publishedAt LIKE ${searchQuery}
          OR articles.category LIKE ${searchQuery}
          OR articles.category LIKE ${searchQuery}
          OR users.fname LIKE ${searchQuery}
          OR users.lname LIKE ${searchQuery}
      `;
    }
  
    query += `
      LIMIT ${limit}
      OFFSET ${offset}
    `;
  
    connection.query(query, (error, results) => {
      if (error) {
        // Handle the database query error with a 500 status code
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      connection.query(countQuery, (countError, countResults) => {
        if (countError) {
          // Handle the count query error with a 500 status code
          return res.status(500).json({ error: "Internal Server Error" });
        }
  
        const totalCount = countResults[0].totalCount;
        const relationData = results.map(mapRelationData);
  
        const totalViewsCount = results.reduce((sum, row) => sum + row.viewsCount, 0);
  
        res.status(200).json({
          countAllViews: totalViewsCount,
          relationData,
          totalCount,
        });
      });
    });
  };
  
//create 

export const createArticle = (req, res, next) => {
    try {
      const userId = req.params.id; // Extract the userId from the URL params
        const image = req.body.image || "";
        const viewsCount = req.body.viewsCount || "";
        const likesCount = req.body.likesCount || "";
      const {
        title,
        content,
        author,
        category,
        tags,
    } = req.body;
    
    const publishedAt = new Date();
    const updatedAt = new Date();

    //check tag if it more than 0
    const tagsString = Array.isArray(tags) && tags.length > 0 ? tags.join(", ") : "";

      const article = new Article(
        title,
        content,
        author,
        publishedAt ,
        updatedAt,
        category,
        tagsString, // Use the tags string here
        image,
        viewsCount,
        likesCount
      );
  
      connection.query("INSERT INTO articles SET ?", article, (error, articleResult) => {
        if (error) {
          // Handle the database query error with a 500 status code
          return res.status(500).json({ error: "Internal Server Error" });
        }
  // pull the insertId out to save in another tabe relation
        const userArticle = {
          userId,
          articleId: articleResult.insertId
        };
  
        connection.query("INSERT INTO user_articles SET ?", userArticle, (error, userArticleResult) => {
          if (error) {
            throw error;
          }
  
          res.status(201).json({
            message: "Article created successfully.",
            article: {
              ...article,
              id: articleResult.insertId
            },
            userArticle: {
              ...userArticle,
              id: userArticleResult.insertId
            }
          });
        });
      });
    } catch (err) {
      next(err);
    }
  };
  
  // update the article
export const updateArticle = (req, res, next) => {
    try {
      const articleId = req.params.id; // Extract the articleId from the URL params
      const {
        title,
        content,
        author,
        category,
        tags,
        image,
        viewsCount,
        likesCount
      } = req.body;
  
      // Build the update object with only the changed fields
      const updateObj = {};
      if (title) updateObj.title = title;
      if (content) updateObj.content = content;
      if (author) updateObj.author = author;
      if (category) updateObj.category = category;
      if (tags) updateObj.tags = tags.join(", "); // Join tags with a comma
      if (image) updateObj.image = image;
      if (viewsCount) updateObj.viewsCount = viewsCount;
      if (likesCount) updateObj.likesCount = likesCount;
  
      // Add updatedAt field with current timestamp
      updateObj.updatedAt = new Date();
  
      connection.query("UPDATE articles SET ? WHERE id = ?", [updateObj, articleId], (error, result) => {
        if (error) {
          // Handle the database query error with a 500 status code
          return res.status(500).json({ error: "Internal Server Error" });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Article not found." });
        }
  
        res.status(201).json({
          message: "Article updated successfully.",
          article: {
            ...updateObj,
            publishedAt: req.body.publishedAt,
            updatedAt: updateObj.updatedAt
          }
        });
      });
    } catch (err) {
      next(err);
    }
  };
  
  //delete the relation data article
  export const deleteArticle = (req, res, next) => {
    try {
      const articleId = req.params.id;
  
      // Delete associated records in the user_articles table
      const deleteUserArticlesQuery = `
        DELETE FROM user_articles
        WHERE articleId = ?
      `;
  
      // Delete the article
      const deleteArticleQuery = `
        DELETE FROM articles
        WHERE id = ?
      `;
  
      connection.beginTransaction((err) => {
        if (err) {
          throw err;
        }
  
        // Delete associated records in the user_articles table
        connection.query(deleteUserArticlesQuery, [articleId], (error, userArticlesResult) => {
          if (error) {
            connection.rollback(() => {
              throw error;
            });
          }
  
          // Check if any user_articles records were deleted
          const affectedUserArticlesRows = userArticlesResult.affectedRows || 0;
  
          // If no user_articles records were deleted, rollback the transaction and respond with an error
          if (affectedUserArticlesRows === 0) {
            connection.rollback(() => {
              return res.status(404).json({ message: "Article not found" });
            });
          } else {
            // Delete the article
            connection.query(deleteArticleQuery, [articleId], (error, articleResult) => {
              if (error) {
                connection.rollback(() => {
                  throw error;
                });
              }
  
              // Check if the article was deleted successfully
              const affectedArticleRows = articleResult.affectedRows || 0;
  
              if (affectedArticleRows === 0) {
                connection.rollback(() => {
                  return res.status(404).json({ message: "Article not found" });
                });
              }
  
              connection.commit((err) => {
                if (err) {
                  connection.rollback(() => {
                    throw err;
                  });
                }
  
                // Send the response indicating successful deletion
                res.status(204).json({ message: "Article deleted successfully" });
              });
            });
          }
        });
      });
    } catch (err) {
      next(err);
    }
  };
  
  // view counter
  export const incrementArticleView = async (req, res, next) => {
    try {
      const id = req.params.id;
      // Update the viewsCount even the data is 0
      const updateViewsQuery = `
        UPDATE articles SET viewsCount = IFNULL(viewsCount, 0) + 1 WHERE id = ?
      `;
      connection.query(updateViewsQuery, [id], (error, results) => {
        if (error) {
          throw error;
        }
  //
        if (results.affectedRows === 0) {
          // Article not found
          return res.status(404).json({ error: "Article not found." });
        }
  
        return res.status(200).json({ message: "Article view count incremented successfully." });
      });
    } catch (error) {
      next(error);
    }
  };